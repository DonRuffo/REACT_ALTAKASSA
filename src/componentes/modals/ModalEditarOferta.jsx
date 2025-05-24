import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import SpinnerCargaModal from "../RuedaCargaModal";
import OfertaStore from "../../store/OfertaStore";
import socket from "../../context/SocketConexion";
import AuthStoreContext from "../../store/AuthStore";
import PropTypes from "prop-types";

const ModalEditarOferta = ({ idOferta }) => {

    const [carga, setCarga] = useState(true)

    const [form, setForm] = useState({
        precioPorDia: "",
        precioPorHora: "",
        servicio: "",
        descripcion: ""
    })
    const { setModalEditOf, modalEditOf, MisOfertas, setOferta, setOfertaProvs } = OfertaStore()
    const { auth } = AuthStoreContext()


    const ObtenerOferta = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/verOferta/${idOferta}`
            const token = localStorage.getItem('token')
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setForm(respuesta.data)
            setCarga(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitOferta = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const rol = localStorage.getItem('rol')
            const url = `${import.meta.env.VITE_BACKEND_URL}/actualizarOferta/${idOferta}`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url, form, options)
            toast.success(respuesta.data.msg)
            await MisOfertas(token, rol)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg)
        }
    }

    const handleChancheOfertas = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        if (idOferta) ObtenerOferta();
    }, [idOferta]);


    useEffect(() => {
        socket.on('Actualizar-oferta', ({ id, ofertaActual }) => {
            if (auth.monedasTrabajos !==0) {
              setOferta(prev => [...prev.filter(of => of._id !== id), ofertaActual])  
            }
            if (auth._id === ofertaActual.proveedor._id) {
                setOfertaProvs(prev => [...prev.filter(of => of._id !== id), ofertaActual])
            }
        })
        
        return () => socket.off('Actualizar-oferta')
    }, [])
    return (
        <>
            <div className="fixed bg-black/80 inset-0 transition-all duration-300">
                <ToastContainer />
                <div className=" dark:border-none outline-2 outline-emerald-700 dark:outline-emerald-500 fixed top-1/5 md:top-1/4 left-[40px] right-[40px] md:left-[150px] md:right-[150px] min-w-64 lg:left-[550px] lg:right-[300px] rounded-lg shadow-2xl bg-gradient-to-t from-white via-emerald-50 to-emerald-100 dark:from-black dark:via-emerald-950 dark:to-emerald-900">
                    <h1 className="border-b-2 border-emerald-700 dark:border-emerald-500  rounded-lg pb-5 text-2xl font-CalSans text-center pt-4 text-green-700 dark:text-emerald-500">Editar oferta</h1>
                    <form onSubmit={handleSubmitOferta} className="mx-5">
                        <div className="my-3">
                            <div className="flex justify-around flex-wrap gap-2">
                                <div className="flex gap-2 items-center">
                                    <label htmlFor="precioPorDia" className="text-md font-semibold dark:text-white">Precio/Dia:</label>
                                    <input type="text" id="precioPorDia" name="precioPorDia" onChange={handleChancheOfertas} value={form.precioPorDia || ""} className={`${carga ? 'hidden' : ''} dark:bg-gray-900 dark:text-slate-200 w-20 py-1 px-2 rounded-md border border-gray-600 bg-white focus:ring-1 focus:ring-green-700 focus:outline-none focus:border-green-700`} />
                                    {carga && <SpinnerCargaModal w={8} h={8} HH={8} />}
                                </div>
                                <div className="flex gap-2 items-center">
                                    <label htmlFor="precioPorHora" className="text-md font-semibold dark:text-white">Precio/Hora:</label>
                                    <input type="text" id="precioPorHora" name="precioPorHora" onChange={handleChancheOfertas} value={form.precioPorHora || ""} className={`${carga ? 'hidden' : ''} dark:bg-gray-900 dark:text-slate-200 w-20 py-1 px-2 rounded-md border border-gray-600 bg-white focus:ring-1 focus:ring-green-700 focus:outline-none focus:border-green-700`} />
                                    {carga && <SpinnerCargaModal w={8} h={8} HH={8} />}
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="flex justify-center items-center gap-2 px-6">
                                <label htmlFor="servicio" className="text-md font-semibold dark:text-white">Servicio:</label>
                                <select name="servicio" id="servicio" className={`${carga ? 'hidden' : ''} dark:bg-gray-900 dark:text-slate-200 w-full py-1 px-2 rounded-md border border-gray-600 bg-white focus:ring-1 focus:ring-green-700 focus:outline-none focus:border-green-700`}>
                                    <option value="Limpieza">Limpieza</option>
                                    <option value="Chofer">Chófer</option>
                                    <option value="Niñero/a">Niñero/a</option>
                                    <option value="Téc.Electrodomésticos">Téc.Electrodomésticos</option>
                                    <option value="Plomeria">Plomería</option>
                                    <option value="Pintor">Pintor</option>
                                    <option value="Albañilería">Albañilería</option>
                                    <option value="Cerrajeria">Cerrajería</option>
                                    <option value="Carpinteria">Carpintería</option>
                                    <option value="Electricista">Electricista</option>
                                </select>
                                {carga && <SpinnerCargaModal w={8} h={8} HH={8} />}
                            </div>
                        </div>
                        <div className="mb-3 px-6">
                            <label htmlFor="descripcion" className="text-md font-semibold block dark:text-white">Descripción: </label>
                            <textarea name="descripcion" id="descripcion" onChange={handleChancheOfertas} value={form.descripcion || ""} className={`${carga ? 'hidden' : ''} dark:bg-gray-900 dark:text-slate-200 p-2 w-full rounded-md bg-white border border-gray-600 focus:ring-1 focus:ring-green-700 focus:outline-none focus:border-green-700`}></textarea>
                            {carga && <SpinnerCargaModal w={8} h={8} HH={8} />}
                        </div><br />
                        <div className="mb-3">
                            <div className="flex justify-around">
                                <button type="submit" className="py-2 px-7 font-semibold text-emerald-700 bg-emerald-200 dark:text-emerald-200 dark:bg-emerald-900 hover:scale-105 rounded-lg duration-300 cursor-pointer" onClick={() => { setTimeout(() => { setModalEditOf(false) }, 3000) }}>Actualizar</button>
                                <button type="button" className="py-2 px-6 font-semibold text-red-700 bg-red-200 dark:text-red-200 dark:bg-red-900 hover:scale-105 rounded-lg duration-300 cursor-pointer" onClick={() => { setModalEditOf(!modalEditOf) }}>Cerrar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

ModalEditarOferta.propTypes = {
    idOferta:PropTypes.string.isRequired
}

export default ModalEditarOferta