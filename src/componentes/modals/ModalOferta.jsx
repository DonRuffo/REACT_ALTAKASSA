import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import OfertaContext from "../../context/OfertasProvider";

const ModalOferta = ({ListarOfertas}) => {

    const { modalOf, setModalOf } = useContext(OfertaContext)
    const [formOf, setFormOf] = useState({
        precioPorDia: "",
        precioPorHora: "",
        servicio: "",
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
            ListarOfertas(rol, token)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
            error.response.data.msg.forEach((mensaje) => {
                toast.error(mensaje)
            })
        }

    }

    const handleChange = (e) => {
        setFormOf({
            ...formOf,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>  
            <div className="fixed bg-black bg-opacity-70 inset-0 transition-all duration-300">
                <ToastContainer />
                <div className="dark:bg-black dark:border-none outline outline-1 outline-green-900 outline-offset-1 fixed top-1/4 left-[60px] right-[60px] min-w-60 lg:top-1/4 lg:left-[550px] lg:right-[300px] rounded-lg shadow-2xl bg-white">
                    <h1 className="dark:bg-black border-b-2 border-green-800  bg-gray-300 rounded-lg pb-5 text-2xl font-semibold text-center pt-4 text-green-800">Nueva oferta</h1>
                    <form onSubmit={handleCreateOferta} className="mx-5">
                        <div className="my-3">
                            <div className="flex justify-around flex-wrap gap-2">
                                <div className="flex gap-2 items-center">
                                    <label htmlFor="precioPorDia" className="text-md font-semibold dark:text-white">Precio/Dia:</label>
                                    <input type="text" id="precioPorDia" name="precioPorDia" onChange={handleChange} value={formOf.precioPorDia || ""} className="dark:bg-gray-900 dark:text-slate-200 w-20 py-1 px-2 rounded-md border border-gray-600 bg-gray-300 focus:ring-1 focus:ring-blue-700 focus:outline-none focus:border-blue-700" />
                                </div>
                                <div className="flex gap-2 items-center">
                                    <label htmlFor="precioPorHora" className="text-md font-semibold  dark:text-white">Precio/Hora:</label>
                                    <input type="text" id="precioPorHora" name="precioPorHora" onChange={handleChange} value={formOf.precioPorHora || ""} className="dark:bg-gray-900 dark:text-slate-200 w-20 py-1 px-2 rounded-md border border-gray-600 bg-gray-300 focus:ring-1 focus:ring-blue-700 focus:outline-none focus:border-blue-700" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="flex justify-center gap-2 px-6 items-center">
                                <label htmlFor="servicio" className="text-md font-semibold dark:text-white">Servicio:</label>
                                <input type="text" id="servicio" name="servicio" onChange={handleChange} value={formOf.servicio || ""} className="dark:bg-gray-900 dark:text-slate-200 w-full py-1 px-2 rounded-md border border-gray-600 bg-gray-300 focus:ring-1 focus:ring-blue-700 focus:outline-none focus:border-blue-700" />
                            </div>
                        </div>
                        <div className="mb-3 px-6">
                            <label htmlFor="descripcion" className="text-md font-semibold block dark:text-white">Descripción: </label>
                            <textarea name="descripcion" id="descripcion" onChange={handleChange} value={formOf.descripcion || ""} className="dark:bg-gray-900 dark:text-slate-200 p-2 w-full rounded-md bg-gray-300 border border-gray-600 focus:ring-1 focus:ring-blue-700 focus:outline-none focus:border-blue-700"></textarea>
                        </div><br />
                        <div className="mb-3">
                            <div className="flex justify-around">
                                <button type="submit" className="py-2 px-7 text-white font-semibold bg-green-600 rounded-lg hover:bg-green-800 duration-300" onClick={() => { setTimeout(() => { setModalOf(false) }, 3000) }}>Crear</button>
                                <button type="button" className="py-2 px-6 text-white font-semibold bg-red-600 rounded-lg hover:bg-red-800 duration-300" onClick={() => { setModalOf(!modalOf) }}>Cerrar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}


export default ModalOferta