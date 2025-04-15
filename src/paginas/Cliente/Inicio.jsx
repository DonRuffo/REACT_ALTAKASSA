import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoInicio from '../../assets/SVG_Construccion.svg'
import logoMenu from '../../assets/category.png'
import logoMenuAbierto from '../../assets/hamburger.png'
import AuthContext from "../../context/AuthProvider";
import axios from "axios";
import '../../../CSS/fondos.css'
import OfertaContext from "../../context/OfertasProvider";
import ModalTrabajos from "../../componentes/modals/ModalTrabajos";
import Cloudinary from "../../componentes/Cloudinary";
import { motion } from "framer-motion";
import LocationImg from '../../assets/Mapa.svg'
import SpinnerCargaModal from "../../componentes/RuedaCargaModal";
import { ToastContainer } from "react-toastify";
import ModalFotoProvs from "../../componentes/modals/ModalFotoProvs";


const Inicio = () => {
    const { auth, setAuth, menu, handleMenu, foto, ubi, setUbi, ubiCliente } = useContext(AuthContext)
    const { modalTra, setModalTra, oferta, ObtenerTrabajos, setIdProveedor, modalProvs, setModalProvs } = useContext(OfertaContext)
    const [ofertaSeleccionada, setOfertaSeleccionada] = useState(null);
    const [valor, setValor] = useState('')
    const [filtro, setFiltro] = useState(false)
    const [ofertasFiltradas, setOfertasFiltradas] = useState([])
    const [carga, setCarga] = useState(false)

    const handleModalTra = (id) => {
        setOfertaSeleccionada(id);
    };

    const permitirUbi = async () => {
        try {
            const token = localStorage.getItem('token')
            const rol = localStorage.getItem('rol')
            await ubiCliente(token, rol)
            setCarga(false)
        } catch (error) {
            console.log('Error al dar ubicación', error.message)
        }
    }
    const proveedorSeleccionado = (idProv) => {
        setIdProveedor(idProv)
    }

    const almacenarValor = (e) => {
        setValor(e.target.textContent)
        setFiltro(true)
    }

    const categorias = [
        "Plomería",
        "Limpieza",
        "Carpintería",
        "Pintor",
        "Albañilería",
        "Técnico-Electrodomésticos",
        "Cerrajería",
        "Electricistas",
        "Niñero/a",
        "Chófer"
    ]

    useEffect(() => {
        if (valor) {
            const filtradas = oferta.filter((of) => of.servicio === valor)
            setOfertasFiltradas(filtradas)
        } else {
            setOfertasFiltradas([])
        }
    }, [valor, oferta])

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
                ubicacion:{
                    latitud:respuesta.data.ubiActual.latitud,
                    longitud:respuesta.data.ubiActual.longitud
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
        obtenerUbi()
    }, [])

    return (//#BA05FF COLOR DEL SISTEMA
        <>
            <div className="lg:hidden pb-2 mt-5">
                <img src={logoMenu} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === true ? 'hidden' : ''} cursor-pointer duration-300`} />
                <img src={logoMenuAbierto} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === false ? 'hidden' : ''} cursor-pointer duration-300`} />
            </div>
            <ToastContainer />
            <section className="flex justify-center mt-5">
                <div className="rounded-md shadow-lg w-4/5 bg-gray-100 dark:bg-transparent border border-gray-100">
                    <h1 className="text-3xl text-center text-purple-600 font-semibold pt-4 px-3 md:px-0">¡Bienvenido {auth.nombre}!</h1>
                    <h2 className="text-xl text-center dark:text-white pt-3 pb-5 px-3 md:px-0">¡Los trabajadores esperan por brindarte sus servicios!</h2>
                    <div className="flex justify-center pb-4">
                        <img src={logoInicio} alt="Constructor" width={125} height={125} className='rounded-full' />
                    </div>
                </div>
            </section>
            <section className={`${foto && ubi ? 'hidden' : ''} my-5 flex flex-col justify-center items-center`}>
                <h1 className="text-center text-xl mb-3 dark:text-white">Antes de comenzar, debes seguir estos pasos: </h1>
                <div className="flex justify-center mb-3">
                    <div className="w-10 h-10 rounded-full border flex items-center justify-center bg-emerald-500">
                        <p className="font-semibold text-lg dark:text-white">1</p>
                    </div>
                    <div className={`flex items-center justify-center`}>
                        <div className={`${foto || ubi ? 'bg-emerald-500' : ''} border-t border-b w-28 h-3`}></div>
                    </div>
                    <div className={`${foto || ubi ? 'bg-emerald-500' : ''} w-10 h-10 rounded-full border flex items-center justify-center`}>
                        <p className="font-semibold text-lg dark:text-white">2</p>
                    </div>
                </div>
                <motion.div className="flex justify-center flex-wrap gap-x-5 gap-y-5 lg:gap-y-0"
                    layout transition={{ duration: 300, ease: 'easeInOut' }}>
                    {foto === false && <Cloudinary />}
                    <motion.div layout id="localitation" className={`flex flex-col dark:bg-gray-900 bg-gray-100 outline outline-emerald-700 h-[260px] w-[200px] rounded-lg items-center justify-center shadow-lg`}>
                        <img src={LocationImg} alt="localization" width={125} height={125} />
                        <h1 className="font-semibold text-center dark:text-white">Concede el permiso de ubicación</h1>
                        <button type="button" className={`${ubi || carga ? 'hidden' : ''} px-3 py-1 rounded-2xl bg-emerald-700 mt-3 font-semibold text-white text-center cursor-pointer hover:bg-emerald-800 hover:brightness-110 transition-all duration-300`} onClick={() => { permitirUbi(); setUbi(true); setCarga(true) }}>Permitir</button>
                        {carga && <SpinnerCargaModal />}
                        <p className={`${ubi ? '' : 'hidden'} px-3 py-1 rounded-2xl bg-emerald-200 text-emerald-800 font-semibold mt-3`}>Concedido</p>
                    </motion.div>
                </motion.div>
            </section>
            <section className={`${foto && ubi ? '' : 'hidden'} flex justify-center`}>
                <div className="w-5/6 ">
                    <h1 className="font-semibold text-2xl mb-3 dark:text-white mt-3">Categorías</h1>
                    <div className="flex flex-wrap justify-around mb-2 gap-1">
                        {categorias.map((cat) => (
                            <Link key={cat} onClick={(e) => {
                                e.preventDefault()
                                almacenarValor(e)
                                setTimeout(() => {
                                    const category = document.getElementById("aqui")
                                    if (category) {
                                        category.scrollIntoView({ behavior: 'smooth' })
                                    }
                                }, 100)
                            }} className="px-4 py-2 mb-2 md:my-0 border-2 border-purple-600 rounded-md text-purple-600 font-semibold hover:bg-purple-600 hover:text-white duration-300">{cat}</Link>
                        ))}
                    </div><hr className="border-2 dark:border-gray-900" />
                </div>
            </section>
            <section className={`${foto && ubi ? '' : 'hidden'} mt-5`}>
                <h1 id="aqui" className="font-semibold text-2xl mb-5 dark:text-white">{valor ? valor : 'Principales Ofertas'}</h1>
                <div className={`${filtro ? 'hidden' : ''} flex justify-center gap-3 flex-wrap`}>
                    {oferta.map((of, index) => (
                        <div key={of._id} className="flex md:block radial-gradientOfertas-bg h-[90px] w-full md:h-[250px] md:w-[225px] rounded-lg shadow-lg shadow-purple-400 mb-5">
                            <div className="flex justify-center mt-2 ml-2 md:ml-0">
                                <div className="flex justify-center h-[75px] w-[75px] md:h-[85px] md:w-[85px] rounded-full overflow-hidden cursor-pointer" onClick={() => setModalProvs(!modalProvs)}>
                                    <img src={of.proveedor.f_perfil} alt="imgProv" className="w-full h-full object-cover ring-2 ring-white" />
                                </div>
                            </div>
                            {modalProvs && <ModalFotoProvs url={of.proveedor.f_perfil} />}
                            <div className="ml-2 md:ml-0 flex flex-col justify-center">
                                <h1 className="md:text-center font-bold text-lg md:text-xl text-white pb-0.5 md:pb-3">
                                    {of.proveedor.nombre} {of.proveedor.apellido}
                                </h1>
                                <h1 className="md:text-center font-bold text-yellow-400 text-md md:text-xl md:mb-1">
                                    {of.servicio}
                                </h1>
                                <div className="flex justify-center gap-x-3">
                                    <p className="md:text-center font-semibold text-white flex items-center">
                                        <b className="text-md md:text-xl mr-1 text-yellow-500">${of.precioPorDia}</b>
                                        el día
                                    </p>
                                    <p className="text-center font-semibold text-white flex items-center">
                                        <b className="text-md md:text-xl mr-1 text-yellow-500">${of.precioPorHora}</b>
                                        la hora
                                    </p>
                                </div>
                                <div className="md:flex justify-center mt-3 hidden">
                                    <button type="button" className="px-2 py-1 rounded-md bg-purple-700 text-white font-semibold hover:bg-purple-800 hover:scale-105 duration-300" onClick={() => { handleModalTra(of._id); proveedorSeleccionado(of.proveedor._id); setModalTra(!modalTra) }}>Solicitar</button>
                                </div>
                                {modalTra && ofertaSeleccionada === of._id && (<ModalTrabajos idOferta={of._id} trabajos={ObtenerTrabajos} />)}
                            </div>
                            <div className="flex items-center ml-1.5 md:hidden">
                                <button type="button" className="px-2 py-2 rounded-md bg-purple-700 text-white font-semibold" onClick={() => { handleModalTra(of._id); proveedorSeleccionado(of.proveedor._id); setModalTra(!modalTra) }}>
                                    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="32" cy="32" r="30" fill="none" stroke="white" strokeWidth="6" />

                                        <path d="M20 34 L28 42 L44 26" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={`${filtro ? '' : 'hidden'} flex justify-center gap-3 flex-wrap`}>
                    {ofertasFiltradas.length > 0 ? ofertasFiltradas.map((of, index) => (
                        <div key={of._id} className="flex md:block radial-gradientOfertas-bg h-[90px] w-full md:h-[250px] md:w-[225px] rounded-lg shadow-lg shadow-purple-400 mb-5">
                            <div className="flex justify-center mt-2 ml-2 md:ml-0">
                                <div className="flex justify-center h-[75px] w-[75px] md:h-[85px] md:w-[85px] rounded-full overflow-hidden cursor-pointer" onClick={() => setModalPerfil(!modalPerfil)}>
                                    <img src={of.proveedor.f_perfil} alt="imgProv" className="w-full h-full object-cover ring-2 ring-white" />
                                </div>
                            </div>
                            <div className="ml-2 md:ml-0 flex flex-col justify-center">
                                <h1 className="md:text-center font-bold text-lg md:text-xl text-white pb-0.5 md:pb-3">
                                    {of.proveedor.nombre} {of.proveedor.apellido}
                                </h1>
                                <h1 className="md:text-center font-bold text-yellow-400 text-md md:text-xl md:mb-1">
                                    {of.servicio}
                                </h1>
                                <div className="flex justify-center gap-x-3">
                                    <p className="md:text-center font-semibold text-white flex items-center">
                                        <b className="text-md md:text-xl mr-1 text-yellow-500">${of.precioPorDia}</b>
                                        el día
                                    </p>
                                    <p className="text-center font-semibold text-white flex items-center">
                                        <b className="text-md md:text-xl mr-1 text-yellow-500">${of.precioPorHora}</b>
                                        la hora
                                    </p>
                                </div>
                                <div className="md:flex justify-center mt-3 hidden">
                                    <button type="button" className="px-2 py-1 rounded-md bg-purple-700 text-white font-semibold hover:bg-purple-800 hover:scale-105 duration-300" onClick={() => { handleModalTra(of._id); proveedorSeleccionado(of.proveedor._id); setModalTra(!modalTra) }}>Solicitar</button>
                                </div>
                                {modalTra && ofertaSeleccionada === of._id && (<ModalTrabajos idOferta={of._id} trabajos={ObtenerTrabajos} />)}
                            </div>
                            <div className="flex items-center ml-1.5 md:hidden">
                                <button type="button" className="px-2 py-2 rounded-md bg-purple-700 text-white font-semibold" onClick={() => { handleModalTra(of._id); proveedorSeleccionado(of.proveedor._id); setModalTra(!modalTra) }}>
                                    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="32" cy="32" r="30" fill="none" stroke="white" strokeWidth="6" />

                                        <path d="M20 34 L28 42 L44 26" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="flex justify-center items-center border-dashed border-2 bg-gray-400 h-[250px] w-[225px] rounded-lg shadow-lg shadow-blue-400">
                            <h1 className="font-semibold text-gray-700 text-lg">No existen ofertas aún</h1>
                        </div>
                    )
                    }
                </div>
            </section>
        </>
    )
}


export default Inicio