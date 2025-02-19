import React, { useContext } from "react";
import { useState, useEffect } from "react";
import OfertaContext from "../../context/OfertasProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ModalTrabajos = ({ idOferta }) => {
    const { modalTra, setModalTra } = useContext(OfertaContext)
    const [selectedOption, setSelectedOption] = useState('');


    const handleRadioChange = (event) => {
        const tipoSeleccionado = event.target.value;
        setSelectedOption(tipoSeleccionado);

        setFormTrabajo(prev => {
            const nuevoPrecio = tipoSeleccionado === "precioPorDia"
                ? form.precioPorDia
                : calcularPrecioPorHoras(prev);

            return {
                ...prev,
                tipo: tipoSeleccionado,
                precioTotal: nuevoPrecio
            };
        });
    };


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

    const [formTrabajo, setFormTrabajo] = useState({
        oferta: idOferta,
        fecha: "",
        servicio: "",
        tipo: "",
        precioTotal: null,
        desde: "08:00",
        hasta: "17:00"
    })
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
            setFormTrabajo({
                ...formTrabajo,
                servicio: respuesta.data.servicio
            })
        } catch (error) {
            console.log(error)
        }
    }
    const calcularPrecioPorHoras = (trabajo) => {
        const formato = "2024-01-01";
        const desdeTime = new Date(`${formato}T${trabajo.desde}:00`);
        const hastaTime = new Date(`${formato}T${trabajo.hasta}:00`);

        const diferenciaMs = hastaTime - desdeTime;
        const diferenciaHoras = diferenciaMs / (1000 * 60 * 60);

        const tarifaPorHora = form.precioPorHora || 0;

        return diferenciaHoras * tarifaPorHora;
    };

    const handleChange = (e) => {
        setFormTrabajo(prev => {
            const nuevoEstado = {
                ...prev,
                [e.target.name]: e.target.value
            }

            if (e.target.name === "desde" || e.target.name === "hasta") {
                nuevoEstado.precioTotal = calcularPrecioPorHoras(nuevoEstado)
            }
            return nuevoEstado
        })
    };

    const handleSubmitTrabajo = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/crearTrabajo`
            const options = {
                headers: {
                    method: 'POST',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.post(url, formTrabajo, options)
            toast.success(respuesta.data.msg)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
            error.response.data.msg.forEach((mensaje) => {
                toast.error(mensaje)
            })
        }

    }

    useEffect(() => {
        if (idOferta) ObtenerOferta();
    }, [idOferta]);
    return (
        <>
            <div className="fixed bg-black bg-opacity-50 inset-0 transition-all duration-300">
                <ToastContainer />
                <div className="fixed top-1/4 lg:left-1/3 lg:w-1/2 lg:h-3/5 rounded-lg shadow-2xl bg-white border border-2 border-green-800">
                    <h1 className="border-b-2 border-green-800 bg-gray-300 rounded-lg pb-5 text-2xl font-semibold text-center pt-4 text-green-800">Solicitud de Trabajo</h1>
                    <div className="grid grid-cols-2">
                        <div className="border-r-2 border-black">
                            <h1 className="text-xl font-semibold text-center my-2">Seleccionar</h1>
                            <form onSubmit={handleSubmitTrabajo}>
                                <h1 className="font-semibold ml-5">Tipo:</h1>
                                <div className="mb-3 mt-1">
                                    <div className="flex justify-around flex-wrap gap-2 lg:gap-0">
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
                                <div className="mb-3 px-2 lg:px-6">
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
                                    <div className="flex justify-around flex-wrap gap-3 lg:gap-0">
                                        <button type="submit" className="py-2 px-7 text-white font-semibold bg-green-600 rounded-lg hover:bg-green-800 duration-300" onClick={() => { setTimeout(() => { setModalTra(false) }, 5000) }}>Crear</button>
                                        <button type="button" className="py-2 px-6 text-white font-semibold bg-red-600 rounded-lg hover:bg-red-800 duration-300" onClick={() => { setModalTra(!modalTra) }}>Cerrar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-center my-2">Información</h1>
                            <div className="flex justify-center">
                                <table className="table-auto border-collapse border border-gray-300 w-full mb-3">
                                    <thead className="bg-gray-300">
                                        <tr>
                                            <th>Campo</th>
                                            <th>Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center font-semibold">
                                        <tr className="border-b">
                                            <td>Servicio</td>
                                            <td className="text-yellow-700">{form.servicio}</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td>Proveedor</td>
                                            <td className="text-yellow-700">{form.proveedor.nombre} {form.proveedor.apellido}</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td>Precio/Dia</td>
                                            <td className="text-green-700">${form.precioPorDia}</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td>Precio/Hora</td>
                                            <td className="text-green-700">${form.precioPorHora}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h1 className="font-semibold ml-3">Descripción</h1>
                            <p className="mx-3">{form.descripcion}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ModalTrabajos