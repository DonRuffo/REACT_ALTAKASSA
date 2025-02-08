import React, { useContext, useEffect, useState } from "react";
import OfertaContext from "../../context/OfertasProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ModalEditarOferta = ({idOferta}) => {

    const [form, setForm] = useState({
        precioPorDia:"",
        precioPorHora:"",
        servicio:"",
        descripcion:""
    })
    const {setModalEditOf, modalEditOf} = useContext(OfertaContext)
    const ObtenerOferta = async () =>{
        try{
            const url = `http://localhost:5000/api/verOferta/${idOferta}`
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
            const url = `http://localhost:5000/api/actualizarOferta/${idOferta}`
            const options = {
                headers: {
                    method:'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url,form,options)
            console.log(respuesta.data.msg)
            toast.success(respuesta.data.msg)
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
            <div className="fixed bg-black bg-opacity-50 inset-0 transition-all duration-300">
                <ToastContainer />
                <div className="fixed top-1/4 left-[580px] lg:w-1/3 lg:h-3/5 rounded-lg shadow-2xl bg-white border border-2 border-green-800">
                    <h1 className="border-b-2 border-green-800 bg-gray-300 rounded-lg pb-5 text-2xl font-semibold text-center pt-4 text-green-800">Editar oferta</h1>
                    <form onSubmit={handleSubmitOferta}>
                        <div className="my-3">
                            <div className="flex justify-around">
                                <div className="flex gap-2">
                                    <label htmlFor="precioPorDia" className="text-md font-semibold">Precio/Dia:</label>
                                    <input type="text" id="precioPorDia" name="precioPorDia" onChange={handleChancheOfertas} value={form.precioPorDia || ""} className="w-20 py-1 px-2 rounded-md border border-gray-600 bg-gray-300 focus:ring-1 focus:ring-blue-700 focus:outline-none focus:border-blue-700" />
                                </div>
                                <div className="flex gap-2">
                                    <label htmlFor="precioPorHora" className="text-md font-semibold ">Precio/Hora:</label>
                                    <input type="text" id="precioPorHora" name="precioPorHora" onChange={handleChancheOfertas} value={form.precioPorHora || ""} className="w-20 py-1 px-2 rounded-md border border-gray-600 bg-gray-300 focus:ring-1 focus:ring-blue-700 focus:outline-none focus:border-blue-700" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="flex justify-center gap-2 px-6">
                                <label htmlFor="servicio" className="text-md font-semibold">Servicio:</label>
                                <input type="text" id="servicio" name="servicio" onChange={handleChancheOfertas} value={form.servicio || ""} className="w-full py-1 px-2 rounded-md border border-gray-600 bg-gray-300 focus:ring-1 focus:ring-blue-700 focus:outline-none focus:border-blue-700" />
                            </div>
                        </div>
                        <div className="mb-3 px-6">
                            <label htmlFor="descripcion" className="text-md font-semibold block">Descripción: </label>
                            <textarea name="descripcion" id="descripcion" onChange={handleChancheOfertas} value={form.descripcion || ""} className="p-2 w-full rounded-md bg-gray-300 border border-gray-600 focus:ring-1 focus:ring-blue-700 focus:outline-none focus:border-blue-700"></textarea>
                        </div><br />
                        <div className="mb-3">
                            <div className="flex justify-around">
                                <button type="submit" className="py-2 px-7 text-white font-semibold bg-green-600 rounded-lg hover:bg-green-800 duration-300">Actualizar</button>
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