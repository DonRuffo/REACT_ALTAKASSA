import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Calendario from "../Calendario";
import SpinnerCargaModal from "../RuedaCargaModal";
import ModalFotoPerfil from "./ModalFotoPerfil";
import MapaCliProv from "../MapaClient-Prov";
import OfertaStore from "../../store/OfertaStore";

const ModalTrabajos = ({ idOferta }) => {
    const { modalTra, setModalTra, idProveedor, setIdProveedor, setFechas, setTraProveedor, traProveedor, setModalPerfil, modalPerfil, mapaCliProv, setMapaCliProv, ObtenerTrabajos } = OfertaStore()
    const [selectedOption, setSelectedOption] = useState('');
    const [calendario, setCalendario] = useState(false)
    const [carga, setCarga] = useState(true)
    const [cargaTra, setCargaTra] = useState(false)

    const TrabajosAgendados = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/trabajos-agendados/${idProveedor}`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const respuesta = await axios.get(url, options)
            setTraProveedor(respuesta.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        TrabajosAgendados()
    }, [idProveedor])

    useEffect(() => {
        setFechas([]); // Primero limpiamos
        setTimeout(() => { // Esperamos un momento antes de agregar nuevas fechas
            const nuevasFechas = new Set();
            if (traProveedor.lenght !== 0) {
                traProveedor.forEach((tra) => {
                    if (tra.status === "Agendado") {
                        const partes = tra.fecha.split("T")[0].split("-");
                        const nuevaFecha = `${partes[1]}-${partes[2]}`;
                        nuevasFechas.add(nuevaFecha);
                    }
                });
                const fechasAGuardar = Array.from(nuevasFechas);
                setFechas(fechasAGuardar)
            }

        }, 200);
    }, [traProveedor]);

    const handleCalendarioChange = () => {
        setCalendario(!calendario)
        setMapaCliProv(false)
    }

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
            email: "",
            f_perfil: "",
            ubicacionTrabajo: {
                latitud: "",
                longitud: ""
            }
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
            setCarga(false)
            setFormTrabajo({
                ...formTrabajo,
                servicio: respuesta.data.servicio
            })
            setIdProveedor(respuesta.data.proveedor._id)
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

    const compararFechas = (e) => {
        const fechaElegida = new Date(e.target.value)
        const fechaHoy = new Date()
        fechaHoy.setHours(0, 0, 0, 0)

        if (fechaElegida < fechaHoy) {
            alert("No puedes seleccionar una fecha pasada")
            e.target.value = 'dd/mm/aaaa'
        }
    }

    const handleSubmitTrabajo = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const rol = localStorage.getItem('rol')
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
            await ObtenerTrabajos(token, rol)
            setCargaTra(false)
            setTimeout(()=>{
                if(modalTra === true){
                    setModalTra(false)
                }
            }, 2000)  
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
            error.response.data.msg.forEach((mensaje) => {
                toast.error(mensaje)
            })
            setCargaTra(false)
        }

    }

    useEffect(() => {
        if (idOferta) ObtenerOferta();
    }, [idOferta]);



    return (
        <>
            <div className="fixed bg-black/80 z-10 inset-0 transition-all duration-300">
                <div className="outline-2 outline-emerald-700 dark:outline-emerald-500 fixed top-1/4 md:left-[60px] md:right-[60px] lg:left-1/3 lg:w-1/2 rounded-lg shadow-2xl bg-gradient-to-t from-white via-emerald-50 to-emerald-100 dark:from-black dark:via-emerald-950 dark:to-emerald-900">
                    <h1 className="border-b-2 border-emerald-700 dark:border-emerald-500 rounded-lg pb-5 text-2xl font-semibold text-center pt-4 text-emerald-700 dark:text-emerald-500">Solicitud de Trabajo</h1>
                    <div className="grid grid-cols-2">
                        <div className="border-r-2 border-black dark:border-white">
                            <h1 className="text-xl font-semibold text-center my-2 dark:text-white ">Seleccionar</h1>
                            <form onSubmit={handleSubmitTrabajo}>
                                <h1 className="font-semibold ml-5 dark:text-white ">Tipo:</h1>
                                <div className="mb-3 mt-1">
                                    <div className="flex justify-around flex-wrap gap-2 lg:gap-0">
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="precioPorDia" className="  dark:text-white px-3 py-1 has-[input:checked]:text-indigo-800 has-[input:checked]:dark:text-purple-500 has-[input:checked]:border-indigo-600 has-[input:checked]:dark:border-purple-500 rounded-md text-md text-slate-600 font-semibold flex justify-between items-center gap-3 border">
                                                Precio/Dia
                                                <input type="radio" id="precioPorDia" name="tipo" onChange={(e) => { handleChange(e); handleRadioChange(e) }} value="precioPorDia" checked={formTrabajo.tipo === "precioPorDia"} className="appearance-none border w-4 h-4 rounded-full border-gray-600 checked:border-4 checked:border-purple-600" />
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="precioPorHora" className=" dark:text-white px-3 py-1 has-[input:checked]:text-indigo-800 has-[input:checked]:dark:text-purple-500 has-[input:checked]:border-indigo-600 has-[input:checked]:dark:border-purple-500 rounded-md text-md text-slate-600 font-semibold flex justify-between items-center gap-3 border">
                                                Precio/Hora
                                                <input type="radio" id="precioPorHora" name="tipo" onChange={(e) => { handleChange(e); handleRadioChange(e) }} value="precioPorHora" checked={formTrabajo.tipo === "precioPorHora"} className="appearance-none border w-4 h-4 rounded-full border-gray-600 checked:border-4 checked:border-purple-600" />
                                            </label>
                                        </div>
                                    </div>
                                </div> <hr className="border border-slate-500"/>
                                <div className="mb-3 px-2 py-0.5 lg:px-6 flex flex-wrap justify-between gap-2 items-center">
                                    <div>
                                        <label htmlFor="descripcion" className="text-md font-semibold block dark:text-white mb-1">Fecha: </label>
                                        <input type="date" name="fecha" onChange={(e) => { handleChange(e); compararFechas(e) }} value={formTrabajo.fecha || ""} className="dark:bg-gray-700 dark:text-white ring-1 ring-gray-300 rounded-md text-slate-600 font-semibold px-2" />
                                    </div>
                                    <div className="flex justify-center items-center gap-x-2">
                                        <button type="button" className="bg-transparent dark:text-white text-sm mt-3 rounded-lg hover:scale-105 duration-300 cursor-pointer" onClick={() => { handleCalendarioChange() }}>
                                            {calendario ? <svg width="35" height="35" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="12" y="8" width="40" height="48" rx="4" fill="#E5E7EB" stroke="#9CA3AF" stroke-width="2" />

                                                <rect x="18" y="14" width="28" height="4" rx="1" fill="#4F46E5" />

                                                <rect x="18" y="22" width="28" height="3" rx="1" fill="#A5B4FC" />
                                                <rect x="18" y="28" width="28" height="3" rx="1" fill="#A5B4FC" />
                                                <rect x="18" y="34" width="22" height="3" rx="1" fill="#A5B4FC" />

                                                <circle cx="32" cy="48" r="6" fill="#10B981" />
                                                <path d="M30 48l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg> : <svg width="35" height="35" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="8" y="12" width="48" height="44" rx="4" fill="#F3F4F6" stroke="#4B5563" stroke-width="2" />

                                                <rect x="8" y="12" width="48" height="10" fill="#D1D5DB" />

                                                <line x1="20" y1="8" x2="20" y2="16" stroke="#1F2937" stroke-width="3" />
                                                <line x1="44" y1="8" x2="44" y2="16" stroke="#1F2937" stroke-width="3" />

                                                <rect x="16" y="26" width="8" height="8" fill="#10B981" />
                                                <rect x="28" y="26" width="8" height="8" fill="#10B981" />
                                                <rect x="40" y="26" width="8" height="8" fill="#10B981" />
                                                <rect x="16" y="38" width="8" height="8" fill="#10B981" />
                                                <rect x="28" y="38" width="8" height="8" fill="#10B981" />
                                                <rect x="40" y="38" width="8" height="8" fill="#10B981" />
                                            </svg>}
                                        </button>
                                        <button type="button" className="bg-transparent dark:text-white text-sm mt-3 rounded-lg hover:scale-105 duration-300 cursor-pointer" onClick={() => { setMapaCliProv(!mapaCliProv) }}>
                                            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:text-white text-red-700 duration-300">
                                                <path d="M12 22C12 22 4 14.58 4 9C4 5.13401 7.13401 2 11 2H13C16.866 2 20 5.13401 20 9C20 14.58 12 22 12 22Z"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <circle cx="12" cy="9" r="3" strokeWidth="2" stroke="currentColor" />
                                            </svg>
                                        </button>
                                    </div>
                                </div><hr className="border border-slate-500"/>
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
                                                    <input type="text" id="servicio" name="hasta" onChange={handleChange} value={formTrabajo.hasta || ""} placeholder="17:00" className="w-1/2 px-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-indigo-700 focus-none focus:border-indigo-700" />
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
                                    <div className="flex justify-around flex-wrap gap-3 lg:gap-0 md:pb-2">
                                        <button type="submit" className="py-2 px-7 font-semibold text-emerald-700 bg-emerald-200 dark:text-emerald-200 dark:bg-emerald-900 hover:brightness-125 rounded-lg duration-300 cursor-pointer" onClick={() => { setCargaTra(!cargaTra) }}>{ cargaTra ? <SpinnerCargaModal w={6} h={6} HH={6}/> :'Crear'}</button>
                                        <button type="button" className="py-2 px-6 font-semibold text-red-700 bg-red-200 dark:text-red-200 dark:bg-red-900 hover:brightness-125 rounded-lg duration-300 cursor-pointer" onClick={() => { setModalTra(!modalTra); setMapaCliProv(false) }}>Cerrar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className={`${calendario === false && mapaCliProv === false ? "" : "hidden"} transition ease-in-out duration-300`}>
                            <div className={`${carga ? 'hidden' : ''}`}>
                                <h1 className="flex justify-center items-center text-xl font-semibold text-center my-2 gap-x-1 dark:text-white">
                                    Información
                                    <svg width="24" height="24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="12" y="8" width="40" height="48" rx="4" fill="#E5E7EB" stroke="#9CA3AF" stroke-width="2" />

                                        <rect x="18" y="14" width="28" height="4" rx="1" fill="#4F46E5" />

                                        <rect x="18" y="22" width="28" height="3" rx="1" fill="#A5B4FC" />
                                        <rect x="18" y="28" width="28" height="3" rx="1" fill="#A5B4FC" />
                                        <rect x="18" y="34" width="22" height="3" rx="1" fill="#A5B4FC" />

                                        <circle cx="32" cy="48" r="6" fill="#10B981" />
                                        <path d="M30 48l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </h1>
                                <div className="flex justify-center mb-2">
                                    <div className="flex justify-center bg-gray-100 dark:bg-gray-800 w-[280px] py-2 rounded-xl shadow-md">
                                        <div className="flex flex-col justify-center ">
                                            <h1 className="font-semibold text-lg dark:text-white">{form.proveedor.nombre} {form.proveedor.apellido}</h1>
                                            <p className="dark:text-white">{form.servicio}</p>
                                            <p className="dark:text-white"><span className="text-yellow-600 font-semibold">{(`${form.precioPorDia ? '$' : ''}`) + form.precioPorDia}</span> el día - <span className="text-yellow-600 font-semibold">{(`${form.precioPorHora ? '$' : ''}`) + form.precioPorHora}</span> la hora</p>
                                        </div>
                                        <div className="w-[75px] h-[75px] rounded-full overflow-hidden hidden md:block cursor-pointer" onClick={() => setModalPerfil(!modalPerfil)}>
                                            <img src={form.proveedor.f_perfil} alt="imgProv2" className="w-full h-full object-cover" />
                                        </div>
                                        {modalPerfil && <ModalFotoPerfil url={form.proveedor.f_perfil} />}
                                    </div>
                                </div>
                                <h1 className="font-semibold ml-3 dark:text-white">Descripción</h1>
                                <p className="mx-3 dark:text-white">{form.descripcion}</p>
                            </div>
                            <div className={`${carga ? '' : 'hidden'} flex items-center justify-center pt-24`}>
                                <SpinnerCargaModal w={14} h={14} HH={20} />
                            </div>
                        </div>
                        <div className={`${calendario === true && mapaCliProv === false ? "" : "hidden"} transition ease-in-out duration-300`}>
                            <h1 className="flex justify-center items-center gap-x-1 text-xl text-center font-semibold mt-2 dark:text-white">
                                Disponibilidad
                                <svg width="24" height="24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="8" y="12" width="48" height="44" rx="4" fill="#F3F4F6" stroke="#4B5563" stroke-width="2" />

                                    <rect x="8" y="12" width="48" height="10" fill="#D1D5DB" />

                                    <line x1="20" y1="8" x2="20" y2="16" stroke="#1F2937" stroke-width="3" />
                                    <line x1="44" y1="8" x2="44" y2="16" stroke="#1F2937" stroke-width="3" />

                                    <rect x="16" y="26" width="8" height="8" fill="#10B981" />
                                    <rect x="28" y="26" width="8" height="8" fill="#10B981" />
                                    <rect x="40" y="26" width="8" height="8" fill="#10B981" />
                                    <rect x="16" y="38" width="8" height="8" fill="#10B981" />
                                    <rect x="28" y="38" width="8" height="8" fill="#10B981" />
                                    <rect x="40" y="38" width="8" height="8" fill="#10B981" />
                                </svg>
                            </h1>
                            <div className="flex justify-center mt-3">
                                <Calendario />
                            </div>
                            <p className="dark:text-white text-sm text-center mt-2">Las días en <b className="text-red-600">rojo</b> están agendados</p>
                        </div>
                        <div className={`${mapaCliProv ? '' : 'hidden'} w-full flex flex-col items-center`}>
                            {mapaCliProv && <MapaCliProv form={form} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ModalTrabajos