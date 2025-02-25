import React, { useContext, useEffect, useState } from "react";
import OfertaContext from "../../context/OfertasProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ModalEditarOferta = ({idOferta, listarOfertas}) => {

    const [form, setForm] = useState({
        precioPorDia:"",
        precioPorHora:"",
        servicio:"",
        descripcion:""
    })
    const {setModalEditOf, modalEditOf} = useContext(OfertaContext)
    const ObtenerOferta = async () =>{
        try{
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
        }catch(error){
            console.log(error)
        }
    }
    
    const handleSubmitOferta = async (e) =>{
        e.preventDefault()
        try{
            const token = localStorage.getItem('token')
            const rol = localStorage.getItem('rol')
            const url = `${import.meta.env.VITE_BACKEND_URL}/actualizarOferta/${idOferta}`
            const options = {
                headers: {
                    method:'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url,form,options)
            toast.success(respuesta.data.msg)
            listarOfertas(rol, token)
        }catch(error){ 
            console.log(error);
            toast.error(error.response.data.msg)
        }
    }

    const handleChancheOfertas = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    useEffect(() => {
        if (idOferta) ObtenerOferta();
    }, [idOferta]);    
    return (
        <>
            <div className="fixed bg-black bg-opacity-70 inset-0 transition-all duration-300">
                <ToastContainer />
                <div className="dark:bg-black dark:border-none outline outline-1 outline-green-900 outline-offset-1 fixed top-1/4 left-[60px] right-[60px] min-w-60 lg:top-1/4 lg:left-[550px] lg:right-[300px] rounded-lg shadow-2xl bg-white border border-2 border-green-800">
                    <h1 className="dark:bg-black border-b-2 border-green-800 bg-gray-300 rounded-lg pb-5 text-2xl font-semibold text-center pt-4 text-green-800">Editar oferta</h1>
                    <form onSubmit={handleSubmitOferta}>
                        <div className="my-3">
                            <div className="flex justify-around flex-wrap gap-2">
                                <div className="flex gap-2 items-center">
                                    <label htmlFor="precioPorDia" className="text-md font-semibold dark:text-white">Precio/Dia:</label>
                                    <input type="text" id="precioPorDia" name="precioPorDia" onChange={handleChancheOfertas} value={form.precioPorDia || ""} className="dark:bg-gray-900 dark:text-slate-200 w-20 py-1 px-2 rounded-md border border-gray-600 bg-gray-300 focus:ring-1 focus:ring-blue-700 focus:outline-none focus:border-blue-700" />
                                </div>
                                <div className="flex gap-2 items-center">
                                    <label htmlFor="precioPorHora" className="text-md font-semibold dark:text-white">Precio/Hora:</label>
                                    <input type="text" id="precioPorHora" name="precioPorHora" onChange={handleChancheOfertas} value={form.precioPorHora || ""} className="dark:bg-gray-900 dark:text-slate-200 w-20 py-1 px-2 rounded-md border border-gray-600 bg-gray-300 focus:ring-1 focus:ring-blue-700 focus:outline-none focus:border-blue-700" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="flex justify-center items-center gap-2 px-6">
                                <label htmlFor="servicio" className="text-md font-semibold dark:text-white">Servicio:</label>
                                <input type="text" id="servicio" name="servicio" onChange={handleChancheOfertas} value={form.servicio || ""} className="dark:bg-gray-900 dark:text-slate-200 w-full py-1 px-2 rounded-md border border-gray-600 bg-gray-300 focus:ring-1 focus:ring-blue-700 focus:outline-none focus:border-blue-700" />
                            </div>
                        </div>
                        <div className="mb-3 px-6">
                            <label htmlFor="descripcion" className="text-md font-semibold block dark:text-white">Descripción: </label>
                            <textarea name="descripcion" id="descripcion" onChange={handleChancheOfertas} value={form.descripcion || ""} className="dark:bg-gray-900 dark:text-slate-200 p-2 w-full rounded-md bg-gray-300 border border-gray-600 focus:ring-1 focus:ring-blue-700 focus:outline-none focus:border-blue-700"></textarea>
                        </div><br />
                        <div className="mb-3">
                            <div className="flex justify-around">
                                <button type="submit" className="py-2 px-7 text-white font-semibold bg-green-600 rounded-lg hover:bg-green-800 duration-300" onClick={()=>{setTimeout(()=>{setModalEditOf(false)}, 5000)}}>Actualizar</button>
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