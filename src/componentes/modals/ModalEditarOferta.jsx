import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import SpinnerCargaModal from "../RuedaCargaModal";
import OfertaStore from "../../store/OfertaStore";


const ModalEditarOferta = ({ idOferta }) => {

    const [carga , setCarga] = useState(true)

    const [form, setForm] = useState({
        precioPorDia: "",
        precioPorHora: "",
        servicio: "",
        descripcion: ""
    })
    const { setModalEditOf, modalEditOf, MisOfertas } = OfertaStore()
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
    return (
        <>
            <div className="fixed bg-black bg-opacity-70 inset-0 transition-all duration-300">
                <ToastContainer />
                <div className="dark:bg-black dark:border-none outline outline-1 outline-green-800 outline-offset-1 fixed top-1/4 left-[60px] right-[60px] min-w-60 lg:top-1/4 lg:left-[550px] lg:right-[300px] rounded-lg shadow-2xl bg-white border-2 border-green-800">
                    <h1 className="dark:bg-black border-b-2 border-green-700 bg-white rounded-lg pb-5 text-2xl font-semibold text-center pt-4 text-green-700">Editar oferta</h1>
                    <form onSubmit={handleSubmitOferta} className="mx-5">
                        <div className="my-3">
                            <div className="flex justify-around flex-wrap gap-2">
                                <div className="flex gap-2 items-center">
                                    <label htmlFor="precioPorDia" className="text-md font-semibold dark:text-white">Precio/Dia:</label>
                                    <input type="text" id="precioPorDia" name="precioPorDia" onChange={handleChancheOfertas} value={form.precioPorDia || ""} className={`${carga ? 'hidden' : ''} dark:bg-gray-900 dark:text-slate-200 w-20 py-1 px-2 rounded-md border border-gray-600 bg-white focus:ring-1 focus:ring-green-700 focus:outline-none focus:border-green-700`} />
                                    {carga && <SpinnerCargaModal w={8} h={8} HH={8}/>}
                                </div>
                                <div className="flex gap-2 items-center">
                                    <label htmlFor="precioPorHora" className="text-md font-semibold dark:text-white">Precio/Hora:</label>
                                    <input type="text" id="precioPorHora" name="precioPorHora" onChange={handleChancheOfertas} value={form.precioPorHora || ""} className={`${carga ? 'hidden' : ''} dark:bg-gray-900 dark:text-slate-200 w-20 py-1 px-2 rounded-md border border-gray-600 bg-white focus:ring-1 focus:ring-green-700 focus:outline-none focus:border-green-700`} />
                                    {carga && <SpinnerCargaModal w={8} h={8} HH={8}/>}
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
                                {carga && <SpinnerCargaModal w={8} h={8} HH={8}/>}
                            </div>
                        </div>
                        <div className="mb-3 px-6">
                            <label htmlFor="descripcion" className="text-md font-semibold block dark:text-white">Descripción: </label>
                            <textarea name="descripcion" id="descripcion" onChange={handleChancheOfertas} value={form.descripcion || ""} className={`${carga ? 'hidden' : ''} dark:bg-gray-900 dark:text-slate-200 p-2 w-full rounded-md bg-white border border-gray-600 focus:ring-1 focus:ring-green-700 focus:outline-none focus:border-green-700`}></textarea>
                            {carga && <SpinnerCargaModal w={8} h={8} HH={8}/>}
                        </div><br />
                        <div className="mb-3">
                            <div className="flex justify-around">
                                <button type="submit" className="py-2 px-7 text-white font-semibold bg-green-600 rounded-lg hover:bg-green-800 duration-300" onClick={() => { setTimeout(() => { setModalEditOf(false) }, 3000) }}>Actualizar</button>
                                <button type="button" className="py-2 px-6 text-white font-semibold bg-red-600 rounded-lg hover:bg-red-800 duration-300" onClick={() => { setModalEditOf(!modalEditOf) }}>Cerrar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}


export default ModalEditarOferta