import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import OfertaStore from "../../store/OfertaStore";
import AuthStoreContext from "../../store/AuthStore";
import socket from "../../context/SocketConexion";
import SpinnerCargaModal from "../RuedaCargaModal";

const ModalOferta = () => {


    const { Perfil, auth } = AuthStoreContext()
    const { modalOf, setModalOf, setOferta, setOfertaProvs } = OfertaStore()
    const [carga, setCarga] = useState(false)
    const [formOf, setFormOf] = useState({
        precioPorDia: "",
        precioPorHora: "",
        servicio: "Limpieza",
        descripcion: ""
    })

    const handleCreateOferta = async (e) => {
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/crearOferta`
            const token = localStorage.getItem('token')
            const rol = localStorage.getItem('rol')
            const options = {
                headers: {
                    method: 'POST',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.post(url, formOf, options)
            toast.success(respuesta.data.msg)
            await Perfil(token, rol)
            setCarga(false)
            setTimeout(() => {
                if (modalOf === true) {
                    setModalOf(false)
                }
            }, 2000)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
            error.response.data.msg.forEach((mensaje) => {
                toast.error(mensaje)
            })
            setCarga(false)
        }

    }

    const handleChange = (e) => {
        setFormOf({
            ...formOf,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        socket.on('Crear-oferta', ({ ofertaPop }) => {
            setOferta(prev => [...prev, ofertaPop])

            if (auth._id === ofertaPop.proveedor._id) {
                setOfertaProvs(prev => [...prev, ofertaPop])
            }
        })
        return () => socket.off('Crear-oferta')
    }, [])
    return (
        <>
            <div className="fixed bg-black/80 inset-0 transition-all duration-300">
                <ToastContainer />
                <div className="fixed dark:border-none outline-2 outline-emerald-700 dark:outline-emerald-500 top-1/5 md:top-1/4 left-[40px] right-[40px] md:left-[150px] md:right-[150px] min-w-64 lg:left-[550px] lg:right-[300px] bg-gradient-to-t from-white via-emerald-50 to-emerald-100 dark:from-black dark:via-emerald-950 dark:to-emerald-900 rounded-lg shadow-2xl">
                    <h1 className="border-b-2 border-emerald-700 dark:border-emerald-500 rounded-lg pb-5 text-2xl font-CalSans text-center pt-4 text-emerald-700 dark:text-emerald-500">Nueva oferta</h1>
                    <form onSubmit={handleCreateOferta} className="mx-2">
                        <div className="my-3">
                            <div className="flex justify-around flex-wrap gap-2">
                                <div className="flex gap-2 items-center">
                                    <label htmlFor="precioPorDia" className="text-md font-semibold dark:text-white">Precio/Dia:</label>
                                    <input type="text" id="precioPorDia" name="precioPorDia" onChange={handleChange} value={formOf.precioPorDia || ""} className="dark:bg-gray-900 dark:text-slate-200 w-20 py-1 px-2 rounded-md border border-gray-600 bg-white focus:ring-1 focus:ring-green-700 focus:outline-none focus:border-green-700" />
                                </div>
                                <div className="flex gap-2 items-center">
                                    <label htmlFor="precioPorHora" className="text-md font-semibold  dark:text-white">Precio/Hora:</label>
                                    <input type="text" id="precioPorHora" name="precioPorHora" onChange={handleChange} value={formOf.precioPorHora || ""} className="dark:bg-gray-900 dark:text-slate-200 w-20 py-1 px-2 rounded-md border border-gray-600 bg-white focus:ring-1 focus:ring-green-700 focus:outline-none focus:border-green-700" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="flex justify-center gap-2 px-6 items-center">
                                <label htmlFor="servicio" className="text-md font-semibold dark:text-white">Servicio:</label>
                                <select name="servicio" id="servicio" className="dark:bg-gray-900 dark:text-slate-200 w-full py-1 px-2 rounded-md border border-gray-600 bg-white focus:ring-1 focus:ring-green-700 focus:outline-none focus:border-green-700" onChange={handleChange}>
                                    <option value="Limpieza">Limpieza</option>
                                    <option value="Chófer">Chófer</option>
                                    <option value="Niñera">Niñera</option>
                                    <option value="Téc.Electrodomésticos">Téc.Electrodomésticos</option>
                                    <option value="Plomería">Plomería</option>
                                    <option value="Pintor">Pintor</option>
                                    <option value="Albañilería">Albañilería</option>
                                    <option value="Cerrajería">Cerrajería</option>
                                    <option value="Carpintería">Carpintería</option>
                                    <option value="Electricista">Electricista</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-3 px-6">
                            <label htmlFor="descripcion" className="text-md font-semibold block dark:text-white">Descripción: </label>
                            <textarea name="descripcion" id="descripcion" onChange={handleChange} value={formOf.descripcion || ""} className="overflow-hidden min-h-12 max-h-20 dark:bg-gray-900 dark:text-slate-200 p-2 w-full rounded-md bg-white border border-gray-600 focus:ring-1 focus:ring-green-700 focus:outline-none focus:border-green-700"></textarea>
                        </div><br />
                        <div className="mb-3">
                            <div className="flex justify-around">
                                <button type="submit" className="py-2 px-7 font-semibold text-emerald-700 bg-emerald-200 dark:text-emerald-200 dark:bg-emerald-900 rounded-lg hover:scale-105 duration-300 cursor-pointer" onClick={() => { setCarga(true) }}>{carga ? <SpinnerCargaModal h={6} w={6} HH={6} /> : 'Crear'}</button>
                                <button type="button" className="py-2 px-6 font-semibold text-red-700 bg-red-200 dark:text-red-200 dark:bg-red-900 rounded-lg hover:scale-105 duration-300 cursor-pointer" onClick={() => { setModalOf(!modalOf) }}>Cerrar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}


export default ModalOferta