import React, { useEffect, useRef, useState } from "react";
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


const InicioProve = () => {
    const { auth, setAuth, menu, handleMenu, ubiTrabajo, setUbiTrabajo, foto, verificarUbicacionTrabajo } = AuthStoreContext()
    const { modalOf, handleModalOf } = OfertaStore()
    const [carga, setCarga] = useState(false)
    const [revelar, setRevelar] = useState(false)

    const mapRef = useRef(null)
    const mapContainerRef = useRef(null)

    const iconMap = L.icon({
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    })
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
                    (error) => {
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
            const latitud = auth.ubicacionTrabajo.latitud
            const longitud = auth.ubicacionTrabajo.longitud
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


    return (
        <>
            <ToastContainer />
            <section className="flex justify-center mt-5">
                <div className="rounded-md shadow-lg w-4/5 bg-gray-100 dark:bg-gray-800 dark:shadow-slate-700 transition-all duration-300">
                    <h1 className="text-3xl text-center text-purple-600 font-semibold pt-4 px-3 md:px-0">¡Bienvenido de nuevo {auth.nombre}!</h1>
                    <h2 className="text-xl text-center pt-3 pb-5 px-3 md:px-0 dark:text-white">El sistema espera por ti</h2>
                    <div className="flex justify-center pb-5">
                        <img src={logoInicioProv} alt="Proveedor" width={125} height={130} />
                    </div>
                </div>
            </section><br />
            <section className="mb-3">
                <h1 className="text-center font-semibold text-lg dark:text-white">Antes de ingresar ofertas, sigue estos pasos:</h1><br />
                <div className="flex justify-center transition-all duration-300">
                    <div className="w-10 h-10 rounded-full border flex items-center justify-center bg-emerald-500">
                        <p className="font-semibold text-lg dark:text-white">1</p>
                    </div>
                    <div className={`flex items-center justify-center`}>
                        <div className={`${foto ? 'bg-emerald-500' : ''} border-t border-b w-16 md:w-28 h-3 transition-all duration-300`}></div>
                    </div>
                    <div className={`${foto ? 'bg-emerald-500' : ''} w-10 h-10 rounded-full border flex items-center justify-center`}>
                        <p className="font-semibold text-lg dark:text-white">2</p>
                    </div>
                    <div className={`flex items-center justify-center`}>
                        <div className={`${ubiTrabajo ? 'bg-emerald-500' : ''} border-t border-b w-16 md:w-28 h-3 transition-all duration-300`}></div>
                    </div>
                    <div className={`${ubiTrabajo ? 'bg-emerald-500' : ''} w-10 h-10 rounded-full border flex items-center justify-center`}>
                        <p className="font-semibold text-lg dark:text-white">3</p>
                    </div>
                </div>
            </section>
            <section className="flex justify-center">
                <motion.div layout className="w-4/5 flex justify-center gap-5 flex-wrap transition-all duration-300"
                    transition={{ duration: 0.3, ease: "easeInOut" }}>
                    {foto === false && <Cloudinary />}
                    <motion.div layout id="localitation" className={`${ubiTrabajo ? 'hidden' : ''} px-3 flex flex-col dark:bg-gray-900 bg-gray-100 outline outline-emerald-700 ${foto ? '' : 'brightness-50 cursor-not-allowed pointer-events-none outline-0'} h-[260px] w-[200px] rounded-lg items-center justify-center shadow-lg`}>
                        <img src={LocationImg} alt="localization" width={125} height={125} className={`${carga ? 'hidden' : 'block'}`} />
                        {carga && <SpinnerCarga />}
                        <h1 className="font-semibold text-center dark:text-white">Ingresa la ubicación de tu trabajo</h1>
                        <button type="button" className="px-3 py-1 rounded-2xl bg-emerald-700 mt-3 font-semibold text-white text-center cursor-pointer hover:bg-emerald-800 hover:brightness-110 transition-all duration-300" onClick={async () => { setCarga(true); await guardarUbi() }}>Ingresar</button>
                    </motion.div>
                    <motion.div layout className={`outline outline-emerald-700 ${ubiTrabajo === false || foto === false || revelar ? 'cursor-not-allowed pointer-events-none brightness-50 outline-0' : ''} flex flex-col dark:bg-gray-900 bg-gray-100  h-[260px] w-[200px] rounded-lg items-center justify-center shadow-lg`}>
                        <img src={logoOferta} alt="logoOferta" width={125} height={125} />
                        <h1 className={`font-semibold text-center dark:text-white`}>Crea una nueva oferta</h1>
                        <button type="button" className="px-3 py-1 rounded-2xl bg-emerald-700 mt-3 font-semibold text-white text-center cursor-pointer hover:bg-emerald-800 hover:brightness-110 transition-all duration-300" onClick={handleModalOf}>Ingresar</button>
                    </motion.div>
                    <motion.div layout ref={mapContainerRef} id="map" className={`${revelar ? 'block' : 'hidden'} relative z-0 h-[300px] w-[225px] md:h-[260px] md:w-[350px] rounded-md transition-all duration-300`}></motion.div>
                    <motion.div layout className={`${ubiTrabajo ? '' : 'hidden'} h-[100px] lg:h-[260px] w-[100px] flex flex-col justify-center items-center transition-all duration-300`}>
                        <div className="outline outline-red-700 p-3 rounded-lg cursor-pointer" onClick={() => { setRevelar(!revelar); creacionMapa() }}>
                            <svg width="65" height="65" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 group-hover:text-white text-red-700 duration-300">
                                <path d="M12 22C12 22 4 14.58 4 9C4 5.13401 7.13401 2 11 2H13C16.866 2 20 5.13401 20 9C20 14.58 12 22 12 22Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="9" r="3" strokeWidth="2" stroke="currentColor" />
                            </svg>
                            <p className={`${revelar ? 'hidden' : ''} dark:text-white font-semibold text-center`}>Ver</p>
                            <p className={`${revelar ? '' : 'hidden'} dark:text-white font-semibold text-center`}>Ocultar</p>
                        </div>
                    </motion.div>
                </motion.div>
            </section><br /><br />
            {modalOf && (<ModalOferta />)}
        </>
    )
}


export default InicioProve