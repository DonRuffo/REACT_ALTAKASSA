import React, { useContext } from "react";
import { useState, useEffect } from "react";
import OfertaContext from "../../context/OfertasProvider";
import axios from "axios";

const ModalTrabajos = ({ idOferta }) => {
    const { modalTra, setModalTra } = useContext(OfertaContext)

    const [form, setForm] = useState({
        proveedor: {
            nombre: "",
            apellido: "",
            email: ""
        },
        precioPorDia: "",
        precioPorHora: "",
        servicio: "",
        descripcion: ""
    })
    const ObtenerOferta = async () => {
        try {
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
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (idOferta) ObtenerOferta();
    }, [idOferta]);
    return (
        <>
            <div className="fixed bg-black bg-opacity-50 inset-0 transition-all duration-300">
                <div className="fixed top-1/4 left-1/3 lg:w-1/2 lg:h-3/5 rounded-lg shadow-2xl bg-white border border-2 border-green-800">
                    <h1 className="border-b-2 border-green-800 bg-gray-300 rounded-lg pb-5 text-2xl font-semibold text-center pt-4 text-green-800">Solicitud de Trabajo</h1>
                    <div className="grid grid-cols-2">
                        <div className="border-r-2 border-black">
                            <h1 className="text-xl font-semibold text-center my-2">Seleccionar</h1>
                            <form>
                                <h1 className="font-semibold ml-5">Tipo:</h1>
                                <div className="mb-3 mt-1">
                                    <div className="flex justify-around">
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="precioPorDia" className="px-3 py-1 has-[input:checked]:text-indigo-800 has-[input:checked]:border-indigo-800 rounded-md text-md text-slate-600 font-semibold flex justify-between items-center gap-3 border">
                                                Precio/Dia:
                                                <input type="radio" id="precioPorDia" name="precio" className="appearance-none border w-4 h-4 rounded-full border border-gray-600 checked:border-4 checked:border-indigo-800 checked:shadow-sm checked:shadow-indigo-400" />
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="precioPorHora" className="px-3 py-1 has-[input:checked]:text-indigo-800 has-[input:checked]:border-indigo-800 rounded-md text-md text-slate-600 font-semibold flex justify-between items-center gap-3 border">
                                                Precio/Hora:
                                                <input type="radio" id="precioPorHora" name="precio" className="appearance-none border w-4 h-4 rounded-full border border-gray-600 checked:border-4 checked:border-indigo-800 checked:shadow-sm checked:shadow-indigo-400" />
                                            </label>
                                        </div>
                                    </div>
                                </div><hr />
                                <div className="mb-3 px-6">
                                    <label htmlFor="descripcion" className="text-md font-semibold block">Fecha: </label>
                                    <input type="date"  className="ring-1 ring-gray-300 rounded-md text-slate-600 font-semibold px-2"/>
                                </div><hr />
                                <h1 className="font-semibold ml-5 mt-1">Hora:</h1>
                                <div className="mb-7">
                                    <div className="flex justify-around gap-2 px-6">
                                        <div>
                                            <label htmlFor="servicio" className="text-md font-semibold mr-2">Desde:</label>
                                            <input type="text" id="servicio" name="servicio" placeholder="08:00" className="w-1/2  px-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-indigo-700 focus:outline-none focus:border-indigo-700" />
                                        </div>
                                        <div>
                                            <label htmlFor="servicio" className="text-md font-semibold mr-2">Hasta:</label>
                                            <input type="text" id="servicio" name="servicio" placeholder="17:00" className="w-1/2 px-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-indigo-700 focus:outline-none focus:border-indigo-700" />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mb-3">
                                    <div className="flex justify-around">
                                        <button type="submit" className="py-2 px-7 text-white font-semibold bg-green-600 rounded-lg hover:bg-green-800 duration-300" onClick={() => { setTimeout(() => { setModalTra(false) }, 3000) }}>Crear</button>
                                        <button type="button" className="py-2 px-6 text-white font-semibold bg-red-600 rounded-lg hover:bg-red-800 duration-300" onClick={() => { setModalTra(!modalTra) }}>Cerrar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-center my-2">Información</h1>
                            <div className="flex justify-center">
                                <table className="table-auto border-collapse border border-gray-300 w-5/6 mb-3">
                                    <thead className="bg-gray-300">
                                        <tr>
                                            <th>Campo</th>
                                            <th>Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center font-semibold">
                                        <tr>
                                            <td>Servicio</td>
                                            <td className="text-yellow-700">{form.servicio}</td>
                                        </tr>
                                        <tr>
                                            <td>Proveedor</td>
                                            <td className="text-yellow-700">{form.proveedor.nombre} {form.proveedor.apellido}</td>
                                        </tr>
                                        <tr>
                                            <td>Precio/Dia</td>
                                            <td className="text-green-700">${form.precioPorDia}</td>
                                        </tr>
                                        <tr>
                                            <td>Precio/Hora</td>
                                            <td className="text-green-700">${form.precioPorHora}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h1 className="font-semibold ml-5">Descripción</h1>
                            <p className="ml-5">{form.descripcion}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ModalTrabajos