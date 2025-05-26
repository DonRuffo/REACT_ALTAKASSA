import React,{ useEffect, useRef, useState } from "react";
import logoInicioProv from '../../assets/Motivacion.svg';
import ModalOferta from "../../componentes/modals/ModalOferta";
import LocationImg from '../../assets/Mapa.svg'
import SpinnerCarga from "../../componentes/RuedaCarga";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { motion } from "framer-motion";
import Cloudinary from "../../componentes/Cloudinary";
import logoOferta from '../../assets/Oferta.svg'
import AuthStoreContext from "../../store/AuthStore";
import OfertaStore from "../../store/OfertaStore";
import EsqueletoInicioProv from "../Esqueletos/EsqInicioProv";
import { Tooltip } from "react-tooltip";

const InicioProve = () => {
    const { auth, setAuth, ubiTrabajo, setUbiTrabajo, foto, pulseFoto, pulseUbiTra, pulseUbiActual, setUbicacionTrabajo, ubicacionTrabajo } = AuthStoreContext()
    const { modalOf, handleModalOf } = OfertaStore()
    const [carga, setCarga] = useState(false)
    const [revelar, setRevelar] = useState(false)
    const [popup, setPopup] = useState(false)

    const mapRef = useRef(null)
    const mapContainerRef = useRef(null)

    const iconMap = L.icon({
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    })

    // funcion para bajar hacia el mapa automaticamente

    const scrollMap = () => {
        if (revelar === false) {
            const container = document.getElementById('botonUbi')
            setTimeout(() => {
                container.scrollIntoView({ behavior: 'smooth' })
            }, 300)
        }
    }

    const scrollSegirudad = () => {
        if (popup === false) {
            const container = document.getElementById('botonUbi')
            setTimeout(() => {
                container.scrollIntoView({ behavior: 'smooth' })
            }, 300)
        }
    }
    //funcion para guardar ubicacion
    const guardarUbi = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords
                    try {
                        const url = `${import.meta.env.VITE_BACKEND_URL}/guardar-ubicacion-trabajo`
                        const token = localStorage.getItem('token')
                        const options = {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`
                            }
                        }
                        const respuesta = await axios.post(url, { latitude, longitude }, options)
                        const ubiNueva = {
                            ubicacionTrabajo: {
                                longitud: longitude,
                                latitud: latitude
                            }
                        }
                        toast.success(respuesta.data.msg)
                        setUbiTrabajo(true)
                        setCarga(false)
                        setAuth(ubiNueva)
                        resolve()
                    } catch (error) {
                        console.log(error)
                        toast.error(error.response?.data?.msg || "Error al guardar la ubicación")
                        setCarga(false)
                        reject()
                    }
                },
                    () => {
                        setUbiTrabajo(false)
                        reject()
                    }
                );
            } else {
                console.log('La geolocalización no está soportada por este navegador.')
                setUbiTrabajo(false)
                resolve()
            }
        })

    }

    //Creacion del mapa
    useEffect(() => {
        if (revelar) {
            if (mapRef.current) {
                mapRef.current.remove()
                mapRef.current = null
            }
            if (!mapRef.current && mapContainerRef.current) {
                mapRef.current = L.map(mapContainerRef.current).setView([0, 0], 2)
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "© OpenStreetMap contributors",
                }).addTo(mapRef.current);
                creacionMapa()
            }
        }
    }, [revelar, ubiTrabajo]);

    const creacionMapa = async () => {
        try {
            const latitud = ubicacionTrabajo.latitude
            const longitud = ubicacionTrabajo.longitude
            if (mapRef.current) {
                mapRef.current.setView([latitud, longitud], 15);
                L.marker([latitud, longitud], { icon: iconMap }).addTo(mapRef.current)
                    .bindPopup("¡Aquí estás!")
                    .openPopup();
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
        }
    }

    const desencriptar = async () => {
            const url = `${import.meta.env.VITE_BACKEND_URL}/ubiUserTra?prov=${auth.email}`
            try {
                const token = localStorage.getItem('token')
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.get(url, options)
                setUbicacionTrabajo(respuesta.data.desencriptado)
            } catch {
                console.log("No se puede desencriptar")
            }
        }
    useEffect(() => {
        if(!auth?.email) return
        desencriptar()
    }, [auth])

    return (
        <>
            <ToastContainer />
            {pulseFoto || pulseUbiActual || pulseUbiTra ? <EsqueletoInicioProv />
                : (
                    <div className="px-5">
                        <section className="flex justify-center mt-20 lg:mt-5 lg:mb-14">
                            <div className="rounded-md shadow-lg w-4/5 bg-gray-100 dark:bg-gray-800 dark:shadow-slate-700 transition-all duration-300">
                                <h1 className="text-3xl text-center text-purple-500 font-CalSans pt-4 px-3 md:px-0">¡Bienvenido {auth.nombre}!</h1>
                                <h2 className="text-xl text-center pt-3 pb-5 px-3 md:px-0 dark:text-white">Qué gusto tenerte aquí</h2>
                                <div className="flex justify-center pb-5">
                                    <img src={logoInicioProv} alt="Proveedor" width={125} height={130} />
                                </div>
                            </div>
                        </section>
                        <section className={` ${foto && ubiTrabajo ? 'hidden' : ''}`}>
                            <h1 className="text-center font-semibold text-lg dark:text-white">Antes de ingresar ofertas, sigue estos pasos:</h1><br />
                            <div className="flex justify-center -space-x-1 transition-all duration-300">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-500">
                                    <p className="font-semibold text-lg dark:text-white">1</p>
                                </div>
                                <div className={`flex items-center justify-center`}>
                                    <div className={`${foto ? 'bg-emerald-500' : ''} w-16 md:w-28 h-3 transition-all duration-300`}></div>
                                </div>
                                <div className={`${foto ? 'bg-emerald-500' : ''} w-10 h-10 rounded-full flex items-center justify-center`}>
                                    <p className="font-semibold text-lg dark:text-white">2</p>
                                </div>
                                <div className={`flex items-center justify-center`}>
                                    <div className={`${ubiTrabajo ? 'bg-emerald-500' : ''} w-16 md:w-28 h-3 transition-all duration-300`}></div>
                                </div>
                                <div className={`${ubiTrabajo ? 'bg-emerald-500' : ''} w-10 h-10 rounded-full flex items-center justify-center`}>
                                    <p className="font-semibold text-lg dark:text-white">3</p>
                                </div>
                            </div>
                        </section><br />
                        <h1 className={`${foto && ubiTrabajo ? '' : 'hidden'} text-xl font-semibold dark:text-white text-center`}>Ya puedes comenzar a crear</h1>
                        <section className="flex justify-center mt-4">
                            <motion.div layout className="w-4/5 flex justify-center gap-5 flex-wrap transition-all duration-300"
                                transition={{ duration: 0.3, ease: "easeInOut" }}>
                                {foto === false && <Cloudinary />}
                                <motion.div layout id="localitation" className={`${ubiTrabajo ? 'hidden' : ''} relative px-3 flex flex-col dark:bg-gray-900 bg-gray-100 outline-2 outline-emerald-700 ${foto ? '' : 'brightness-50 cursor-not-allowed pointer-events-none outline-0'} h-[260px] w-[200px] rounded-lg items-center justify-center shadow-lg`}>
                                    <div className="absolute top-3 right-3 flex justify-center items-center rounded-full w-8 h-8 bg-emerald-300">
                                        <p className="text-emerald-700 text-lg font-semibold">2</p>
                                    </div>
                                    <img src={LocationImg} alt="localization" width={125} height={125} className={`${carga ? 'hidden' : 'block'}`} />
                                    {carga && <SpinnerCarga />}
                                    <h1 className="font-semibold text-center dark:text-white">Ingresa la ubicación de tu trabajo</h1>
                                    <button type="button" className="px-3 py-1 rounded-2xl bg-emerald-700 mt-3 font-semibold text-white text-center cursor-pointer hover:bg-emerald-800 hover:brightness-110 transition-all duration-300" onClick={async () => { setCarga(true); await guardarUbi() }}>Ingresar</button>
                                </motion.div>
                                <motion.div layout className={`relative outline-2 outline-emerald-700 ${ubiTrabajo === false || foto === false || revelar ? 'cursor-not-allowed pointer-events-none brightness-50 outline-none' : ''} flex flex-col dark:bg-gray-900 bg-gray-100  h-[260px] w-[200px] rounded-lg items-center justify-center shadow-lg`}>
                                    <div className="absolute top-3 right-3 flex justify-center items-center rounded-full w-8 h-8 bg-emerald-300">
                                        <p className="text-emerald-700 text-lg font-semibold">3</p>
                                    </div>
                                    <img src={logoOferta} alt="logoOferta" width={125} height={125} />
                                    <h1 className={`font-semibold text-center dark:text-white`}>Crea una nueva oferta</h1>
                                    <button type="button" className="px-4 py-1 rounded-2xl bg-emerald-700 mt-3 font-semibold text-white text-center cursor-pointer hover:bg-emerald-800 hover:brightness-110 transition-all duration-300" onClick={handleModalOf}>Crear</button>
                                </motion.div>
                                <motion.div layout ref={mapContainerRef} id="map" className={`${revelar ? 'block' : 'hidden'} relative z-0 h-[300px] w-[225px] md:h-[260px] md:w-[350px] rounded-md transition-all duration-300`}></motion.div>
                                <motion.div id="botonUbi" layout className={`${ubiTrabajo ? '' : 'hidden'} h-[100px] md:h-[260px] flex flex-wrap md:w-auto gap-3 justify-center items-center transition-all duration-300`}>
                                    <div className="flex items-center gap-x-2">
                                        <div className="rounded-lg" >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="orange" className="size-18 cursor-pointer" onClick={async () => { setRevelar(!revelar); await creacionMapa(); scrollMap(); setPopup(false) }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                                            </svg>
                                            <p className={`${revelar ? 'hidden' : ''} dark:text-white font-semibold text-center`}>Ver</p>
                                            <p className={`${revelar ? '' : 'hidden'} dark:text-white font-semibold text-center`}>Ocultar</p>
                                        </div>
                                        <div data-tooltip-id="seguridad" data-tooltip-content={'Ubicación protegida'} className={`text-cyan-500 ${revelar ? 'hidden' : ''}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 cursor-pointer" onClick={() => { setPopup(!popup); scrollSegirudad() }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className={`${popup ? '' : 'hidden'} flex flex-col py-2 justify-center items-center w-52 text-cyan-500 outline-2 outline-cyan-500 bg-gray-100 dark:bg-gray-900 rounded-lg`}>
                                        <div className="flex flex-col items-center">
                                            <h1 className="text-black dark:text-white">Tu ubicación está protegida</h1>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 cursor-pointer">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                                            </svg>
                                        </div><br />
                                        <p className="text-sm px-3 text-center text-black dark:text-white">
                                            Solo usaremos tu ubicación real para mostrar a los clientes una zona aproximada donde trabajas.
                                            Nunca mostraremos tu dirección exacta ni la compartiremos públicamente.</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                            <Tooltip id="seguridad" place="right" style={{
                                fontSize: 13
                            }} className={`${popup ? 'hidden' : ''}`} />
                        </section><br /><br />

                        {modalOf && (<ModalOferta />)}
                    </div>
                )}
        </>
    )
}


export default InicioProve