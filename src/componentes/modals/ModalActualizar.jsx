import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import SpinnerCargaModal from "../RuedaCargaModal";
import Calendario from "../Calendario";
import MapaCliProv from "../MapaClient-Prov";
import OfertaStore from "../../store/OfertaStore";
import PropTypes from "prop-types";


const ModalActualizar = ({ idTrabajo, idOferta }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const { modalTraActual, setModalTraActual, mapaCliProv, setMapaCliProv } = OfertaStore()
    const [carga, setCarga] = useState(true)
    const [calendario, setCalendario] = useState(false)

    const fechaHoy = new Date()
    const numeroMes = fechaHoy.getMonth() + 1


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
                fecha: new Date(respuesta.data.fecha).toISOString().split('T')[0],
                servicio: respuesta.data.servicio,
                tipo: respuesta.data.tipo,
                precioTotal: respuesta.data.precioTotal,
                desde: respuesta.data.desde,
                hasta: respuesta.data.hasta
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
            setCarga(false)
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

    const compararFechas = (e) => {
        const fechaElegida = new Date(e.target.value)
        const fechaHoy = new Date()
        fechaHoy.setHours(0, 0, 0, 0)

        if (fechaElegida < fechaHoy) {
            alert("No puedes seleccionar una fecha pasada")
            e.target.value = formTrabajo.fecha
        }
    }


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
    const handleCalendarioChange = () => {
        setCalendario(!calendario)
        setMapaCliProv(false)
    }

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
            <div className="fixed bg-black/80 inset-0 transition-all duration-300">
                <ToastContainer
                    toastStyle={{ backgroundColor: '#1c2833 ', color: 'white' }}
                    closeOnClick
                    position="bottom-center"
                />
                <div className="fixed top-1/6 md:top-1/4 md:left-[60px] md:right-[60px] lg:left-1/3 lg:w-1/2 rounded-lg shadow-2xl bg-gradient-to-t from-white via-emerald-50 to-emerald-100 dark:from-black dark:via-emerald-950 dark:to-emerald-900 outline-2 dark:outline-emerald-500 outline-emerald-700">
                    <h1 className="border-b-2 border-emerald-700 dark:border-emerald-500 rounded-lg pb-5 text-2xl font-CalSans text-center pt-4 text-emerald-700 dark:text-emerald-500">Actualizar solicitud</h1>
                    <div className="grid grid-cols-2">
                        <div className="border-r-2 border-black dark:border-white">
                            <h1 className=" dark:text-white text-xl font-semibold text-center my-2">Seleccionar</h1>
                            <form onSubmit={handleSubmitTrabajo}>
                                <h1 className="font-semibold ml-5 dark:text-white ">Tipo:</h1>
                                <div className="mb-3 mt-1">
                                    <div className="flex justify-around flex-wrap gap-2 lg:gap-0">
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="precioPorDia" className=" dark:text-white px-3 py-1 has-[input:checked]:text-emerald-800 has-[input:checked]:dark:text-emerald-500 has-[input:checked]:border-emerald-800 has-[input:checked]:dark:border-emerald-500 rounded-md text-md text-slate-600 font-semibold flex justify-between items-center gap-3 border">
                                                Precio/Dia
                                                <input type="radio" id="precioPorDia" name="tipo" onChange={(e) => { handleChange(e); handleRadioChange(e) }} value="precioPorDia" checked={formTrabajo.tipo === "precioPorDia"} className="appearance-none border w-4 h-4 rounded-full border-gray-600 checked:border-4 checked:border-emerald-700 dark:checked:border-emerald-500" />
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="precioPorHora" className=" dark:text-white px-3 py-1 has-[input:checked]:text-emerald-800 has-[input:checked]:dark:text-emerald-500 has-[input:checked]:border-emerald-800 has-[input:checked]:dark:border-emerald-500 rounded-md text-md text-slate-600 font-semibold flex justify-between items-center gap-3 border">
                                                Precio/Hora
                                                <input type="radio" id="precioPorHora" name="tipo" onChange={(e) => { handleChange(e); handleRadioChange(e) }} value="precioPorHora" checked={formTrabajo.tipo === "precioPorHora"} className="appearance-none border w-4 h-4 rounded-full border-gray-600 checked:border-4 checked:border-emerald-700 dark:checked:border-emerald-500" />
                                            </label>
                                        </div>
                                    </div>
                                </div><hr className="border border-slate-500" />
                                <div className="mb-3 px-2 py-0.5 flex flex-col lg:flex-row flex-wrap justify-between md:justify-center lg:justify-between lg:px-5 gap-2 items-center">
                                    <div>
                                        <label htmlFor="descripcion" className="text-md font-semibold block dark:text-white">Fecha: </label>
                                        <input type="date" name="fecha" onChange={(e) => { handleChange(e); compararFechas(e) }} value={formTrabajo.fecha || ""} className="dark:bg-gray-800 dark:text-white ring-1 ring-gray-300 rounded-md text-slate-600 font-semibold px-2" />
                                    </div>
                                    <div className="flex justify-center items-center gap-x-3">
                                        <button type="button" className="flex flex-col justify-center items-center bg-transparent text-emerald-800 dark:text-emerald-500 text-sm mt-3 rounded-lg hover:scale-105 duration-300 cursor-pointer" onClick={() => { handleCalendarioChange() }}>
                                            {calendario ? <>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                                                </svg>
                                                <span className="text-xs font-semibold">Información</span>
                                            </>
                                                :
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                                    </svg>
                                                    <span className="text-xs font-semibold">Disponibilidad</span>
                                                </>

                                            }
                                        </button>
                                        <button type="button" className="flex flex-col justify-center items-center bg-transparent text-emerald-800 dark:text-emerald-500 text-sm mt-3 rounded-lg hover:scale-105 duration-300 cursor-pointer" onClick={() => { setMapaCliProv(!mapaCliProv) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                            </svg>
                                            <span className="text-xs font-semibold">Ubicación</span>
                                        </button>
                                    </div>
                                </div><hr className="border border-slate-500" />
                                {selectedOption === 'precioPorHora' && (
                                    <>
                                        <h1 className="font-semibold ml-5 mt-1 dark:text-white">Hora: <span className="text-sm font-semibold text-slate-500"> (Selecciona a tu preferencia)</span></h1>
                                        <div className="mb-5">
                                            <div className="flex justify-around gap-2 px-6">
                                                <div>
                                                    <label htmlFor="servicio" className="text-md font-semibold mr-2 dark:text-white">Desde:</label>
                                                    <input type="text" id="servicio" name="desde" onChange={handleChange} value={formTrabajo.desde || ""} placeholder="08:00" className="w-1/2  px-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-indigo-700 focus:outline-none focus:border-indigo-700" />
                                                </div>
                                                <div>
                                                    <label htmlFor="servicio" className="text-md font-semibold mr-2 dark:text-white">Hasta:</label>
                                                    <input type="text" id="servicio" name="hasta" onChange={handleChange} value={formTrabajo.hasta || ""} placeholder="17:00" className="w-1/2 px-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-indigo-700 focus:outline-none focus:border-indigo-700" />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {selectedOption === 'precioPorDia' && (
                                    <>
                                        <h1 className="font-semibold ml-5 mt-1 dark:text-white">Hora: </h1>
                                        <p className="ml-5 dark:text-white"> Desde <b>08:00</b> hasta <b>17:00</b></p>
                                    </>
                                )}
                                <div className="mb-3 mt-7">
                                    <div className="flex justify-around flex-wrap gap-2 lg:gap-0 md:pb-2">
                                        <button type="submit" className="py-2 px-7 font-semibold text-emerald-700 bg-emerald-200 dark:text-emerald-200 dark:bg-emerald-900 hover:scale-105 rounded-lg duration-300 cursor-pointer" onClick={() => { setTimeout(() => { setModalTraActual(false) }, 3000) }}>Actualizar</button>
                                        <button type="button" className="py-2 px-6 font-semibold text-red-700 bg-red-200 dark:text-red-200 dark:bg-red-900 hover:scale-105 rounded-lg duration-300 cursor-pointer" onClick={() => { setModalTraActual(!modalTraActual); setMapaCliProv(false) }}>Cerrar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className={`${calendario === false && mapaCliProv === false ? "" : "hidden"} transition ease-in-out duration-300`}>
                            <div className={`${carga ? 'hidden' : ''}`}>
                                <h1 className="flex justify-center items-center text-xl font-semibold text-center my-2 gap-x-1 dark:text-white">
                                    Información
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                                    </svg>
                                </h1>
                                <div className="flex justify-center mb-2">
                                    <div className="flex justify-center bg-gray-100 dark:bg-gray-800 w-[280px] py-2 rounded-xl shadow-md">
                                        <div className="flex flex-col justify-center ">
                                            <h1 className="font-semibold text-lg dark:text-white">{formOferta.proveedor.nombre} {formOferta.proveedor.apellido}</h1>
                                            <p className="dark:text-white">{formOferta.servicio}</p>
                                            <p className="dark:text-white"><span className="text-yellow-600 font-semibold">{(`${formOferta.precioPorDia ? '$' : ''}`) + formOferta.precioPorDia}</span> el día - <span className="text-yellow-600 font-semibold">{(`${formOferta.precioPorHora ? '$' : ''}`) + formOferta.precioPorHora}</span> la hora</p>
                                        </div>
                                        <div className="w-[75px] h-[75px] rounded-full overflow-hidden hidden md:block">
                                            <img src={formOferta.proveedor.f_perfil} alt="imgProv2" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </div>
                                <h1 className="font-semibold ml-3 dark:text-white">Descripción</h1>
                                <p className="mx-3 dark:text-white">{formOferta.descripcion}</p>
                            </div>
                            <div className={`${carga ? '' : 'hidden'} flex items-center justify-center pt-24`}>
                                <SpinnerCargaModal w={14} h={14} HH={20} />
                            </div>
                        </div>
                        <div className={`${calendario === true && mapaCliProv === false ? "" : "hidden"} transition ease-in-out duration-300`}>
                            <h1 className="flex justify-center items-center gap-x-1 text-xl text-center font-semibold mt-2 dark:text-white">
                                Disponibilidad
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                </svg>
                            </h1>
                            <div className="flex justify-center mt-3">
                                <Calendario dias={numeroMes} />
                            </div>
                            <p className="dark:text-white text-sm text-center mt-2">Las días en <b className="text-red-600">rojo</b> están agendados</p>
                        </div>
                        <div className={`${mapaCliProv ? '' : 'hidden'} w-full flex flex-col items-center`}>
                            {mapaCliProv && <MapaCliProv form={formOferta} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

ModalActualizar.propTypes = {
    idOferta: PropTypes.string.isRequired,
    idTrabajo: PropTypes.string.isRequired
}


export default ModalActualizar