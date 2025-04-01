import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import logoInicioProv from '../../assets/Motivacion.svg';
import logoMenu from '../../assets/category.png'
import logoMenuAbierto from '../../assets/hamburger.png'
import OfertaContext from "../../context/OfertasProvider";
import ModalOferta from "../../componentes/modals/ModalOferta";
import LocationImg from '../../assets/LOCATION.png'
import SpinnerCarga from "../../componentes/RuedaCarga";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { motion } from "framer-motion";


const InicioProve = () => {
    const { auth, menu, handleMenu, ubi, setUbi } = useContext(AuthContext)
    const { modalOf, handleModalOf, ListarOfertas } = useContext(OfertaContext)
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
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords
                try {
                    const url = `${import.meta.env.VITE_BACKEND_URL}/guardar-ubicacion-prov`
                    const token = localStorage.getItem('token')
                    const options = {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }
                    const respuesta = await axios.post(url, { latitude, longitude }, options)
                    toast.success(respuesta.data.msg)
                    setUbi(true)
                    setCarga(false)
                } catch (error) {
                    console.log(error)
                    toast.error(error.response?.data?.msg || "Error al guardar la ubicación")
                }
            });
        } else {
            alert("Tu navegador no soporta geolocalización.");
        }
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
    }, [revelar]);

    const creacionMapa = async() =>{
        try {
            let url
            const token = localStorage.getItem('token')
            const rol = localStorage.getItem('rol')
            if (rol === 'proveedor') {
                url = `${import.meta.env.VITE_BACKEND_URL}/obtenerUbicacion-prov`
            } else if (rol === 'cliente') {
                url = `${import.meta.env.VITE_BACKEND_URL}/obtenerUbicacion-cli`
            }
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const respuesta = await axios.get(url, options)
            const latitud = respuesta.data.latitud
            const longitud = respuesta.data.longitud
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
            <div className="lg:hidden mb-3 mt-5">
                <img src={logoMenu} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === true ? 'hidden' : ''} cursor-pointer duration-300`} />
                <img src={logoMenuAbierto} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === false ? 'hidden' : ''} cursor-pointer duration-300`} />
            </div>
            <section className="flex justify-center mt-5">
                <div className="rounded-md shadow-lg w-4/5 bg-white dark:bg-transparent border border-gray-100">
                    <h1 className="text-3xl text-center text-purple-600 font-semibold pt-4 px-3 md:px-0">¡Bienvenido de nuevo {auth.nombre}!</h1>
                    <h2 className="text-xl text-center pt-3 pb-5 px-3 md:px-0 dark:text-white">Listo para un nuevo trabajo, el sistema te espera</h2>
                    <div className="flex justify-center pb-5">
                        <img src={logoInicioProv} alt="Proveedor" width={130} height={130} className='rounded-full border-2 border-black-600' />
                    </div>
                </div>
            </section><br />
            <section className="flex justify-center">
                <motion.div layout className="w-4/5 flex justify-center gap-5 flex-wrap transition-all duration-300"
                    transition={{ duration: 0.3, ease: "easeInOut" }}>
                    <motion.div layout id="localitation" className={`${ubi ? 'hidden' : ''} flex flex-col border-4 border-gray-600 border-dashed bg-transparent h-[260px] w-[200px] rounded-lg cursor-pointer items-center justify-center shadow-lg`} onClick={() =>{setCarga(true); guardarUbi()}}>
                        <img src={LocationImg} alt="localization" width={90} height={90} className={`${carga ? 'hidden' : 'block'}`} />
                        {carga && <SpinnerCarga />}
                        <h1 className="font-semibold text-lg text-center dark:text-slate-300 text-slate-600">Ingresa tu ubicación primero</h1>
                    </motion.div>
                    <motion.div layout className={`${ubi === false || revelar ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer'} flex border-4 ${ubi === false || revelar ? 'dark:border-gray-900 dark:bg-gray-800' : 'dark:border-gray-600 dark:bg-gray-300 bg-gray-400'} border-dashed h-[260px] w-[200px] rounded-lg items-center justify-center shadow-lg`} onClick={handleModalOf}>
                        <h1 className={`font-semibold text-lg text-center ${ubi === false || revelar ? 'text-slate-300 dark:text-slate-600' : 'text-slate-600 dark:text-slate-700'}`}>Ingresa una nueva oferta</h1>
                    </motion.div>
                    <motion.div layout ref={mapContainerRef} id="map" className={`${revelar ? 'block' : 'hidden'} h-[300px] w-[225px] md:h-[260px] md:w-[350px] rounded-md transition-all duration-300`}></motion.div>
                </motion.div>
            </section>
            <section>
                <div className="flex justify-center lg:justify-end">
                    <button type="button" className="group flex justify-around font-semibold px-4 py-1 dark:text-white bg-transparent border-2 border-purple-700 rounded-xl hover:bg-purple-700 duration-300" onClick={() => {setRevelar(!revelar); creacionMapa()}}>
                        <p className={`${revelar ? 'hidden' : 'block'}`}>Ver Ubicación</p>
                        <p className={`${revelar ? 'block' : 'hidden'}`}>Cerrar</p>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 group-hover:text-white text-red-700 duration-300">
                            <path d="M12 22C12 22 4 14.58 4 9C4 5.13401 7.13401 2 11 2H13C16.866 2 20 5.13401 20 9C20 14.58 12 22 12 22Z"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="9" r="3" strokeWidth="2" stroke="currentColor" />
                        </svg>
                    </button>
                </div>
            </section>
            {modalOf && (<ModalOferta ListarOfertas={ListarOfertas} />)}
        </>
    )
}


export default InicioProve