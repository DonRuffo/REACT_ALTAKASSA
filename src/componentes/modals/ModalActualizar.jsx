import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import OfertaContext from "../../context/OfertasProvider";
import { ToastContainer, toast } from "react-toastify";

const ModalActualizar = ({ idTrabajo, idOferta, actualizar}) => {
    const [selectedOption, setSelectedOption] = useState('');
    const { modalTraActual, setModalTraActual } = useContext(OfertaContext)
    const [formTrabajo, setFormTrabajo] = useState({
        fecha: "",
        servicio: "",
        tipo: "",
        precioTotal: null,
        desde: "08:00",
        hasta: "17:00"
    })

    const [formOferta, setFormOferta] = useState({
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
    const ObtenerTrabajo = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/verTrabajo/${idTrabajo}`
            const options = {   
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setFormTrabajo({
                ...formTrabajo,
                fecha:new Date(respuesta.data.fecha).toISOString().split('T')[0],
                servicio:respuesta.data.servicio,
                tipo:respuesta.data.tipo,
                precioTotal:respuesta.data.precioTotal,
                desde:respuesta.data.desde,
                hasta:respuesta.data.hasta
            })
        } catch (error) {
            console.log(error);
        }
    }
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
            setFormOferta(respuesta.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitTrabajo = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/actualizarTrabajo/${idTrabajo}`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url, formTrabajo, options)
            toast.success(respuesta.data.msg)
            actualizar()
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg)
        }
    }
    const calcularPrecioPorHoras = (trabajo) => {
        if (!trabajo.desde || !trabajo.hasta) return 0
    
        const formato = "2024-01-01";
        const desdeTime = new Date(`${formato}T${trabajo.desde}:00`)
        const hastaTime = new Date(`${formato}T${trabajo.hasta}:00`)
    
        if (isNaN(desdeTime) || isNaN(hastaTime)) return 0
    
        const diferenciaMs = hastaTime - desdeTime;
        const diferenciaHoras = diferenciaMs / (1000 * 60 * 60);
    
        const tarifaPorHora = parseFloat(formOferta.precioPorHora) || 0; 
        return diferenciaHoras * tarifaPorHora;
    };
    

    const handleChange = (e) => {
        setFormTrabajo(prev => {
            const nuevoObjeto = {
                ...prev,
                [e.target.name]: e.target.value
            }

            if (e.target.name === "desde" || e.target.name === "hasta") {
                nuevoObjeto.precioTotal = calcularPrecioPorHoras(prev)
            }
            return nuevoObjeto
        })
    }
    const handleRadioChange = (event) => {
        const tipoSeleccionado = event.target.value;
        setSelectedOption(tipoSeleccionado);
        console.log(formTrabajo)
        setFormTrabajo(prev => {
            const nuevoPrecio = tipoSeleccionado === "precioPorDia"
                ? parseFloat(formOferta.precioPorDia) || 0
                : calcularPrecioPorHoras(prev);
    
            return {
                ...prev,
                tipo: tipoSeleccionado,
                precioTotal: nuevoPrecio
            };
        });
    };
    
    useEffect(() => {
        ObtenerOferta().then(() => {
            ObtenerTrabajo();
        });
    }, []);
    
    useEffect(() => {
        if (formTrabajo.tipo === "precioPorHora") {
            setFormTrabajo(prev => ({
                ...prev,
                precioTotal: calcularPrecioPorHoras(prev)
            }));
        } else if (formTrabajo.tipo === "precioPorDia") {
            setFormTrabajo(prev => ({
                ...prev,
                precioTotal: parseFloat(formOferta.precioPorDia) || 0
            }));
        }
    }, [formTrabajo.desde, formTrabajo.hasta, formTrabajo.tipo]);

    return (
        <>
            <div className="fixed bg-black bg-opacity-50 inset-0 transition-all duration-300">
                <ToastContainer />
                <div className="fixed top-1/4 left-1/3 lg:w-1/2 lg:h-3/5 rounded-lg shadow-2xl bg-white border border-2 border-green-800">
                    <h1 className="border-b-2 border-green-800 bg-gray-300 rounded-lg pb-5 text-2xl font-semibold text-center pt-4 text-green-800">Solicitud de Trabajo</h1>
                    <div className="grid grid-cols-2">
                        <div className="border-r-2 border-black">
                            <h1 className="text-xl font-semibold text-center my-2">Seleccionar</h1>
                            <form onSubmit={handleSubmitTrabajo}>
                                <h1 className="font-semibold ml-5">Tipo:</h1>
                                <div className="mb-3 mt-1">
                                    <div className="flex justify-around">
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="precioPorDia" className="px-3 py-1 has-[input:checked]:text-indigo-800 has-[input:checked]:border-indigo-800 rounded-md text-md text-slate-600 font-semibold flex justify-between items-center gap-3 border">
                                                Precio/Dia:
                                                <input type="radio" id="precioPorDia" name="tipo" onChange={(e) => { handleChange(e); handleRadioChange(e) }} value="precioPorDia" checked={formTrabajo.tipo === "precioPorDia"} className="appearance-none border w-4 h-4 rounded-full border border-gray-600 checked:border-4 checked:border-indigo-800 checked:shadow-sm checked:shadow-indigo-400" />
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="precioPorHora" className="px-3 py-1 has-[input:checked]:text-indigo-800 has-[input:checked]:border-indigo-800 rounded-md text-md text-slate-600 font-semibold flex justify-between items-center gap-3 border">
                                                Precio/Hora:
                                                <input type="radio" id="precioPorHora" name="tipo" onChange={(e) => { handleChange(e); handleRadioChange(e) }} value="precioPorHora" checked={formTrabajo.tipo === "precioPorHora"} className="appearance-none border w-4 h-4 rounded-full border border-gray-600 checked:border-4 checked:border-indigo-800 checked:shadow-sm checked:shadow-indigo-400" />
                                            </label>
                                        </div>
                                    </div>
                                </div><hr />
                                <div className="mb-3 px-6">
                                    <label htmlFor="descripcion" className="text-md font-semibold block">Fecha: </label>
                                    <input type="date" name="fecha" onChange={handleChange} value={formTrabajo.fecha || ""} className="ring-1 ring-gray-300 rounded-md text-slate-600 font-semibold px-2" />
                                </div><hr />
                                {selectedOption === 'precioPorHora' && (
                                    <>
                                        <h1 className="font-semibold ml-5 mt-1">Hora: <span className="text-sm font-semibold text-slate-500"> (Selecciona a tu preferencia)</span></h1>
                                        <div className="mb-5">
                                            <div className="flex justify-around gap-2 px-6">
                                                <div>
                                                    <label htmlFor="servicio" className="text-md font-semibold mr-2">Desde:</label>
                                                    <input type="text" id="servicio" name="desde" onChange={handleChange} value={formTrabajo.desde || ""} placeholder="08:00" className="w-1/2  px-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-indigo-700 focus:outline-none focus:border-indigo-700" />
                                                </div>
                                                <div>
                                                    <label htmlFor="servicio" className="text-md font-semibold mr-2">Hasta:</label>
                                                    <input type="text" id="servicio" name="hasta" onChange={handleChange} value={formTrabajo.hasta || ""} placeholder="17:00" className="w-1/2 px-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-indigo-700 focus:outline-none focus:border-indigo-700" />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {selectedOption === 'precioPorDia' && (
                                    <>
                                        <h1 className="font-semibold ml-5 mt-1">Hora: </h1>
                                        <p className="ml-5"> Desde <b>08:00</b> hasta <b>17:00</b></p>
                                    </>
                                )}
                                <div className="mb-3 mt-7">
                                    <div className="flex justify-around">
                                        <button type="submit" className="py-2 px-7 text-white font-semibold bg-green-600 rounded-lg hover:bg-green-800 duration-300" onClick={() => { setTimeout(() => { setModalTraActual(false) }, 5000) }}>Actualizar</button>
                                        <button type="button" className="py-2 px-6 text-white font-semibold bg-red-600 rounded-lg hover:bg-red-800 duration-300" onClick={() => { setModalTraActual(!modalTraActual) }}>Cerrar</button>
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
                                            <td className="text-yellow-700">{formOferta.servicio}</td>
                                        </tr>
                                        <tr>
                                            <td>Proveedor</td>
                                            <td className="text-yellow-700">{formOferta.proveedor.nombre} {formOferta.proveedor.apellido}</td>
                                        </tr>
                                        <tr>
                                            <td>Precio/Dia</td>
                                            <td className="text-green-700">${formOferta.precioPorDia}</td>
                                        </tr>
                                        <tr>
                                            <td>Precio/Hora</td>
                                            <td className="text-green-700">${formOferta.precioPorHora}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h1 className="font-semibold ml-5">Descripción</h1>
                            <p className="ml-5">{formOferta.descripcion}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


export default ModalActualizar