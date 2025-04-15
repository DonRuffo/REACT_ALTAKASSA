import React, { useContext, useRef } from "react";
import { useState, useEffect } from "react";
import OfertaContext from "../../context/OfertasProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Calendario from "../Calendario";
import L from 'leaflet';
import SpinnerCargaModal from "../RuedaCargaModal";
import AuthContext from "../../context/AuthProvider";
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import ModalFotoPerfil from "./ModalFotoPerfil";

const ModalTrabajos = ({ idOferta, trabajos }) => {
    const { modalTra, setModalTra, idProveedor, setIdProveedor, setFechas, setTraProveedor, traProveedor, setModalPerfil, modalPerfil } = useContext(OfertaContext)
    const { auth } = useContext(AuthContext)
    const [selectedOption, setSelectedOption] = useState('');
    const [calendario, setCalendario] = useState(false)
    const mapRef = useRef(null)
    const containerRef = useRef(null)
    const [mapa, setMapa] = useState(false)
    const [carga, setCarga] = useState(true)

    //edicion del marcador para el mapa
    const iconMap = L.icon({
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    })

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
            setFechas(() => {
                const nuevasFechas = new Set();
                traProveedor.forEach((tra) => {
                    if (tra.status === "Agendado") {
                        const partes = tra.fecha.split("T")[0].split("-");
                        const nuevaFecha = `${partes[1]}-${partes[2]}`;
                        nuevasFechas.add(nuevaFecha);
                    }
                });
                return Array.from(nuevasFechas);
            });
        }, 100);
    }, [traProveedor]);

    const handleCalendarioChange = () => {
        setCalendario(!calendario)
        setMapa(false)
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
            ubicacion: {
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
            trabajos(rol, token)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
            error.response.data.msg.forEach((mensaje) => {
                toast.error(mensaje)
            })
        }

    }
    const obtenerUbi = async () => {
        try {
            const token = localStorage.getItem('token')
            const urlCli = `${import.meta.env.VITE_BACKEND_URL}/ubiCliente`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(urlCli, options)
            const ubiActual = {
                ubicacion: {
                    latitud: respuesta.data.ubiActual.latitud,
                    longitud: respuesta.data.ubiActual.longitud
                }
            }
            setAuth({
                ...auth,
                ...ubiActual
            })
        } catch (error) {
            console.log('Error, no se obtiene la ubicacion')
        }
    }

    useEffect(() => {
        if (idOferta) ObtenerOferta();
    }, [idOferta]);

    useEffect(() => {
        obtenerUbi
    }, [])

    //creacion del mapa
    const creacionMapa = () => {

        const latitudCli = auth.ubicacion.latitud
        const longitudCli = auth.ubicacion.longitud
        const latitudProv = form.proveedor.ubicacion.latitud
        const longitudProv = form.proveedor.ubicacion.longitud
        if (mapRef.current) {
            const marcadorCliente = L.marker([latitudCli, longitudCli], { icon: iconMap }).bindPopup('Aquí estas')

            const marcadorProveedor = L.marker([latitudProv, longitudProv], { icon: iconMap }).bindPopup(form.proveedor.nombre)

            marcadorCliente.addTo(mapRef.current).openPopup()
            marcadorProveedor.addTo(mapRef.current).openPopup()

            const bounds = L.latLngBounds([
                [latitudCli, longitudCli],
                [latitudProv, longitudProv]
            ])

            mapRef.current.fitBounds(bounds, { padding: [50, 50] })

        }
    }

    useEffect(() => {
        if (mapa) {
            if (mapRef.current) {
                mapRef.current.remove()
                mapRef.current = null
            }
            if (!mapRef.current && containerRef.current) {
                mapRef.current = L.map(containerRef.current).setView([0, 0], 2)
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "© OpenStreetMap contributors",
                }).addTo(mapRef.current);
            }
            creacionMapa()
        }
    }, [mapa])

    return (
        <>
            <div className="fixed bg-black bg-opacity-70 inset-0 transition-all duration-300">
                <ToastContainer />
                <div className="dark:bg-black outline outline-1 outline-green-800 outline-offset-1 fixed top-1/4 md:left-[60px] md:right-[60px] lg:left-1/3 lg:w-1/2 rounded-lg shadow-2xl bg-white">
                    <h1 className="dark:bg-black border-b-2 border-green-700 bg-white rounded-lg pb-5 text-2xl font-semibold text-center pt-4 text-green-700">Solicitud de Trabajo</h1>
                    <div className="grid grid-cols-2">
                        <div className="border-r-2 border-black dark:border-white">
                            <h1 className="text-xl font-semibold text-center my-2 dark:text-white ">Seleccionar</h1>
                            <form onSubmit={handleSubmitTrabajo}>
                                <h1 className="font-semibold ml-5 dark:text-white ">Tipo:</h1>
                                <div className="mb-3 mt-1">
                                    <div className="flex justify-around flex-wrap gap-2 lg:gap-0">
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="precioPorDia" className=" dark:text-white px-3 py-1 has-[input:checked]:text-indigo-800 has-[input:checked]:dark:text-purple-600 has-[input:checked]:border-indigo-800 has-[input:checked]:dark:border-purple-600 rounded-md text-md text-slate-600 font-semibold flex justify-between items-center gap-3 border">
                                                Precio/Dia
                                                <input type="radio" id="precioPorDia" name="tipo" onChange={(e) => { handleChange(e); handleRadioChange(e) }} value="precioPorDia" checked={formTrabajo.tipo === "precioPorDia"} className="appearance-none border w-4 h-4 rounded-full border-gray-600 checked:border-4 checked:border-indigo-800 checked:shadow-sm checked:shadow-indigo-400 dark:checked:purple-indigo-600 dark:checked:shadow-purple-400" />
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="precioPorHora" className="dark:text-white px-3 py-1 has-[input:checked]:text-indigo-800 has-[input:checked]:border-indigo-800 rounded-md text-md text-slate-600 font-semibold flex justify-between items-center gap-3 border">
                                                Precio/Hora
                                                <input type="radio" id="precioPorHora" name="tipo" onChange={(e) => { handleChange(e); handleRadioChange(e) }} value="precioPorHora" checked={formTrabajo.tipo === "precioPorHora"} className="appearance-none border w-4 h-4 rounded-full border-gray-600 checked:border-4 checked:border-indigo-800 checked:shadow-sm checked:shadow-indigo-400" />
                                            </label>
                                        </div>
                                    </div>
                                </div><hr />
                                <div className="mb-3 px-2 lg:px-6 flex gap-2 flex-wrap items-center">
                                    <div>
                                        <label htmlFor="descripcion" className="text-md font-semibold block dark:text-white mb-1">Fecha: </label>
                                        <input type="date" name="fecha" onChange={(e) => { handleChange(e); compararFechas(e) }} value={formTrabajo.fecha || ""} className="dark:bg-gray-800 dark:text-white ring-1 ring-gray-300 rounded-md text-slate-600 font-semibold px-2" />
                                    </div>
                                    <button type="button" className="bg-transparent ring-2 ring-green-600 dark:text-white text-sm px-2 py-1 mt-3 ml-11 md:ml-5 rounded-lg hover:scale-110 duration-300" onClick={() => { handleCalendarioChange() }}>{calendario ? 'Info' : 'Fechas'}</button>
                                    <button type="button" className="bg-transparent ring-2 ring-green-600 dark:text-white text-sm px-2 py-1 mt-3 rounded-lg hover:scale-110 duration-300" onClick={() => { setMapa(!mapa); creacionMapa() }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:text-white text-red-700 duration-300">
                                            <path d="M12 22C12 22 4 14.58 4 9C4 5.13401 7.13401 2 11 2H13C16.866 2 20 5.13401 20 9C20 14.58 12 22 12 22Z"
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <circle cx="12" cy="9" r="3" strokeWidth="2" stroke="currentColor" />
                                        </svg>
                                    </button>
                                </div><hr />
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
                                    <div className="flex justify-around flex-wrap gap-3 lg:gap-0 md:pb-2">
                                        <button type="submit" className="py-2 px-7 text-white font-semibold bg-green-600 rounded-lg hover:bg-green-800 duration-300" onClick={() => { setTimeout(() => { setModalTra(false) }, 3000) }}>Crear</button>
                                        <button type="button" className="py-2 px-6 text-white font-semibold bg-red-600 rounded-lg hover:bg-red-800 duration-300" onClick={() => { setModalTra(!modalTra) }}>Cerrar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className={`${calendario === false && mapa === false ? "" : "hidden"} transition ease-in-out duration-300`}>
                            <div className={`${carga ? 'hidden' : ''}`}>
                                <h1 className="text-xl font-semibold text-center my-2 dark:text-white">Información</h1>
                                <div className="flex justify-center mb-2">
                                    <div className="flex justify-center bg-gray-100 dark:bg-gray-900 w-[280px] py-2 rounded-xl shadow-md">
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
                        <div className={`${calendario === true && mapa === false ? "" : "hidden"} transition ease-in-out duration-300`}>
                            <h1 className="text-xl text-center font-semibold mt-2 dark:text-white">Disponibilidad</h1>
                            <div className="flex justify-center mt-3">
                                <Calendario />
                            </div>
                            <p className="dark:text-white text-sm text-center mt-2">Las días en <b className="text-red-600">rojo</b> están agendados</p>
                        </div>
                        <div className={`${mapa ? '' : 'hidden'} w-full flex flex-col items-center`}>
                            <h1 className="text-xl text-center font-semibold mt-2 dark:text-white mb-1">Ubicación</h1>
                            <div ref={containerRef} className={`rounded-md h-5/6 w-11/12 border`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ModalTrabajos