import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoInicio from '../../assets/SVG_Construccion.svg'
import axios from "axios";
import '../../../CSS/fondos.css'
import ModalTrabajos from "../../componentes/modals/ModalTrabajos";
import Cloudinary from "../../componentes/Cloudinary";
import { motion } from "framer-motion";
import LocationImg from '../../assets/Mapa.svg'
import SpinnerCargaModal from "../../componentes/RuedaCargaModal";
import { ToastContainer } from "react-toastify";
import ModalFotoProvs from "../../componentes/modals/ModalFotoProvs";
import AuthStoreContext from "../../store/AuthStore";
import OfertaStore from "../../store/OfertaStore";
import imgSinOfertas from '../../assets/Sinofertas.svg'
import EsqueletoInicioCli from "../Esqueletos/EsqInicioCli";


const Inicio = () => {
    const { auth, setAuth, foto, ubiActual, setUbiActual, pulseFoto, pulseUbiTra, pulseUbiActual, Perfil, ubiCliente, setUbicacionActual, ivActual } = AuthStoreContext()
    const { modalTra, setModalTra, oferta, setIdProveedor, modalProvs, setModalProvs } = OfertaStore()
    const [ofertaSeleccionada, setOfertaSeleccionada] = useState(null);
    const [valor, setValor] = useState('')
    const [filtro, setFiltro] = useState(false)
    const [ofertasFiltradas, setOfertasFiltradas] = useState([])
    const [carga, setCarga] = useState(false)

    const [valorUrl, setValorUrl] = useState('')
    const [indice, setIndex] = useState(0)

    const handleModalTra = (id) => {
        setOfertaSeleccionada(id);
    };

    const permitirUbi = async () => {
        try {
            const token = localStorage.getItem('token')
            const rol = localStorage.getItem('rol')
            await ubiCliente(token, rol)
            setCarga(false)
            setUbiActual(true)
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

    const obtenerUbi = async () => {
        try {
            const rol = localStorage.getItem('rol')
            const token = localStorage.getItem('token')
            //const dd = localStorage.getItem('dd')
            const urlCli = `${import.meta.env.VITE_BACKEND_URL}/ubiUser?iv=${ivActual}`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(urlCli, options)

            const ubiActual = {
                ubicacionActual: respuesta.data.ubiActual
            }
            setAuth(ubiActual)
            setUbicacionActual(respuesta.data.desencriptado)
            await Perfil(token, rol)
        } catch (error) {
            console.log('Error, no se obtiene la ubicacion', error)
        }
    }

    const categorias = [
        "Plomería",
        "Limpieza",
        "Carpintería",
        "Pintor",
        "Albañilería",
        "Técnico-Electrodomésticos",
        "Cerrajería",
        "Electricista",
        "Niñera",
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



    useEffect(() => {
        if(!ivActual) return
        obtenerUbi()
    }, [ivActual])

    useEffect(() => {
            socket.on('Crear-oferta', ({ ofertaPop }) => {
                if (auth.monedasTrabajos !== 0) {
                    setOferta(prev => [...prev, ofertaPop])
                }
    
                if (auth._id === ofertaPop.proveedor._id) {
                    setOfertaProvs(prev => [...prev, ofertaPop])
                }
            })
            return () => socket.off('Crear-oferta')
        }, [])
    return (
        <>
            <ToastContainer />
            {pulseFoto || pulseUbiActual || pulseUbiTra ? <EsqueletoInicioCli />
                : (
                    <>
                        <section className="flex justify-center mt-20 lg:mt-5">
                            <div className="rounded-md shadow-lg w-4/5 bg-gray-100 dark:bg-gray-900 dark:shadow-slate-700">
                                <h1 className="text-3xl text-center text-purple-600 font-CalSans pt-4 px-3 md:px-0">¡Bienvenido {auth.nombre}!</h1>
                                <h2 className="text-xl text-center dark:text-white pt-3 pb-5 px-3 md:px-0">¡Los proveedores esperan por brindarte sus servicios!</h2>
                                <div className="flex justify-center pb-4">
                                    <img src={logoInicio} alt="Constructor" width={125} height={125} className='rounded-full' />
                                </div>
                            </div>
                        </section>
                        <section className={`${foto && ubiActual ? 'hidden' : ''} my-5 flex flex-col justify-center items-center`}>
                            <h1 className="text-center text-xl mb-3 dark:text-white">Antes de comenzar, debes seguir estos pasos: </h1>
                            <div className="flex -space-x-1 justify-center mb-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-500">
                                    <p className="font-semibold text-lg dark:text-white">1</p>
                                </div>
                                <div className={`flex items-center justify-center`}>
                                    <div className={`${foto || ubiActual ? 'bg-emerald-500' : ''}  w-28 h-3`}></div>
                                </div>
                                <div className={`${foto || ubiActual ? 'bg-emerald-500' : ''} w-10 h-10 rounded-full flex items-center justify-center`}>
                                    <p className="font-semibold text-lg dark:text-white">2</p>
                                </div>
                            </div>
                            <motion.div className="flex justify-center flex-wrap gap-x-5 gap-y-5 lg:gap-y-0"
                                layout transition={{ duration: 300, ease: 'easeInOut' }}>
                                {foto === false && <Cloudinary />}
                                <motion.div layout id="localitation" className={`flex flex-col dark:bg-gray-900 bg-gray-100 outline-2 outline-emerald-700 h-[260px] w-[200px] rounded-lg items-center justify-center shadow-lg`}>
                                    <img src={LocationImg} alt="localization" width={125} height={125} />
                                    <h1 className="font-semibold text-center dark:text-white">Concede el permiso de ubicación</h1>
                                    <button type="button" className={`${ubiActual || carga ? 'hidden' : ''} px-3 py-1 rounded-2xl bg-emerald-700 mt-3 font-semibold text-white text-center cursor-pointer hover:bg-emerald-800 hover:brightness-110 transition-all duration-300`} onClick={async () => { await permitirUbi(); setCarga(true) }}>Permitir</button>
                                    {carga && <SpinnerCargaModal />}
                                    <p className={`${ubiActual ? '' : 'hidden'} px-3 py-1 rounded-2xl bg-emerald-200 text-emerald-800 font-semibold mt-3`}>Concedido</p>
                                </motion.div>
                            </motion.div>
                        </section>
                        <section className={`${foto && ubiActual ? '' : 'hidden'} flex justify-center`}>
                            <div className="w-5/6 ">
                                <h1 className="font-CalSans text-2xl mb-3 dark:text-white mt-3">Categorías</h1>
                                <div className="flex flex-wrap justify-around mb-4 gap-1">
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
                                        }} className="px-4 py-2 mb-2 md:my-0 border-2 border-emerald-600 rounded-md text-emerald-600 font-semibold hover:bg-emerald-600 hover:text-white duration-300">{cat}</Link>
                                    ))}
                                </div><hr className="border border-gray-300 dark:border-gray-800" />
                            </div>
                        </section>
                        <section className={`${foto && ubiActual ? '' : 'hidden'} mt-7`}>
                            <div className="flex justify-center">
                                <div className="w-5/6">
                                    <h1 id="aqui" className="font-CalSans text-2xl mb-5 dark:text-white">{valor ? valor : 'Principales Ofertas'}</h1>
                                </div>
                            </div>
                            <div className={`${filtro ? 'hidden' : ''} flex justify-center gap-x-5 flex-wrap`}>
                                {oferta.length > 0 ? oferta.map((of, index) => (
                                    <div key={of._id} className="flex items-center justify-between md:block radial-gradientOfertas-bg h-fit w-full py-1 md:p-4 md:w-fit md:max-w-48 rounded-lg shadow-lg shadow-purple-400 mb-5">
                                        <div className="flex justify-center ml-1.5 md:ml-0 ">
                                            <div className="flex justify-center h-[70px] w-[70px] md:h-[85px] md:w-[85px] rounded-full overflow-hidden cursor-pointer shrink-0" onClick={() => { setModalProvs(!modalProvs); setValorUrl(of.proveedor.f_perfil); setIndex(index) }}>
                                                <img src={of.proveedor.f_perfil} alt="imgProv" className="w-full h-full object-cover ring-2 ring-white" />
                                            </div>
                                        </div>
                                        {modalProvs && of.proveedor.f_perfil === valorUrl && index === indice && <ModalFotoProvs url={of.proveedor.f_perfil} />}
                                        <div className="flex flex-col justify-center ">
                                            <h1 className="md:text-center font-bold text-lg md:text-xl text-white pb-0.5 md:pb-3 truncate">
                                                {of.proveedor.nombre} {of.proveedor.apellido}
                                            </h1>
                                            <h1 className="md:text-center font-bold text-teal-200 text-md md:text-xl md:mb-1">
                                                {of.servicio}
                                            </h1>
                                            <div className="flex justify-center gap-x-3">
                                                <p className="md:text-center font-semibold text-white flex items-center">
                                                    <b className="text-md md:text-xl mr-1 text-teal-200">${of.precioPorDia}</b>
                                                    <span className="text-sm md:text-md text-nowrap">el día</span>
                                                </p>
                                                <p className="text-center font-semibold text-white flex items-center">
                                                    <b className="text-md md:text-xl mr-1 text-teal-200">${of.precioPorHora}</b>
                                                    <span className="text-sm md:text-md text-nowrap">la hora</span>
                                                </p>
                                            </div>
                                            <div className="md:flex pulsoBotones brightness-105 z-0 justify-center mt-3 hidden hover:animate-none">
                                                <button type="button" className="px-2 py-1 rounded-md bg-violet-300 text-violet-800 font-semibold hover:scale-105 duration-300 cursor-pointer" onClick={() => { handleModalTra(of._id); proveedorSeleccionado(of.proveedor._id); setModalTra(!modalTra) }}>Solicitar</button>
                                            </div>
                                            {modalTra && ofertaSeleccionada === of._id && (<ModalTrabajos idOferta={of._id} />)}
                                        </div>
                                        <div className="flex items-center justify-center mr-1.5 pulsoBotones brightness-105 z-0 md:hidden">
                                            <button type="button" className="flex flex-col items-center justify-center px-1 py-1 rounded-md bg-transparent text-white font-semibold brightness-110 z-0" onClick={() => { handleModalTra(of._id); proveedorSeleccionado(of.proveedor._id); setModalTra(!modalTra) }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                                </svg>
                                                <p className="text-xs">Solicitar</p>
                                            </button>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="flex flex-col justify-center items-center  bg-gray-100 dark:bg-gray-800 h-[250px] w-[225px] rounded-lg shadow-lg dark:shadow-slate-700 mb-5">
                                        <img src={imgSinOfertas} alt="dreaming" width={125} height={125} />
                                        <h1 className="font-semibold dark:text-white text-lg">No existen ofertas aún</h1>
                                    </div>
                                )}
                            </div>
                            <div className={`${filtro ? '' : 'hidden'} flex justify-center gap-x-5 flex-wrap`}>
                                {ofertasFiltradas.length > 0 ? ofertasFiltradas.map((of, index) => (
                                    <div key={of._id} className="flex items-center justify-between md:block radial-gradientOfertas-bg h-fit w-full py-1 lg:p-4 md:w-fit md:max-w-48 rounded-lg shadow-lg shadow-purple-400 mb-5">
                                        <div className="flex justify-center ml-1.5 md:ml-0">
                                            <div className="flex justify-center h-[70px] w-[70px] md:h-[85px] md:w-[85px] rounded-full overflow-hidden cursor-pointer" onClick={() => { setModalProvs(!modalProvs); setValorUrl(of.proveedor.f_perfil); setIndex(index) }}>
                                                <img src={of.proveedor.f_perfil} alt="imgProv" className="w-full h-full object-cover ring-2 ring-white" />
                                            </div>
                                        </div>
                                        {modalProvs && of.proveedor.f_perfil === valorUrl && index === indice && <ModalFotoProvs url={of.proveedor.f_perfil} />}
                                        <div className="flex flex-col justify-center">
                                            <h1 className="md:text-center font-bold text-lg md:text-xl text-white pb-0.5 md:pb-3">
                                                {of.proveedor.nombre} {of.proveedor.apellido}
                                            </h1>
                                            <h1 className="md:text-center font-bold text-teal-200 text-md md:text-xl md:mb-1">
                                                {of.servicio}
                                            </h1>
                                            <div className="flex justify-center gap-x-3">
                                                <p className="md:text-center font-semibold text-white flex items-center">
                                                    <b className="text-md md:text-xl mr-1 text-teal-200">${of.precioPorDia}</b>
                                                    <span className="text-sm md:text-md text-nowrap">el día</span>
                                                </p>
                                                <p className="text-center font-semibold text-white flex items-center">
                                                    <b className="text-md md:text-xl mr-1 text-teal-200">${of.precioPorHora}</b>
                                                    <span className="text-sm md:text-md text-nowrap">la hora</span>
                                                </p>
                                            </div>
                                            <div className="md:flex justify-center pulsoBotones mt-3 brightness-105 z-0 hidden">
                                                <button type="button" className="px-2 py-1 rounded-md bg-violet-300 text-violet-800 font-semibold hover:scale-105 duration-300 cursor-pointer" onClick={() => { handleModalTra(of._id); proveedorSeleccionado(of.proveedor._id); setModalTra(!modalTra) }}>Solicitar</button>
                                            </div>
                                            {modalTra && ofertaSeleccionada === of._id && (<ModalTrabajos idOferta={of._id} />)}
                                        </div>
                                        <div className="flex items-center justify-center pulsoBotones mr-1.5 brightness-105 z-0 md:hidden">
                                            <button type="button" className="flex flex-col items-center justify-center px-1 py-1 rounded-md bg-transparent text-white font-semibold" onClick={() => { handleModalTra(of._id); proveedorSeleccionado(of.proveedor._id); setModalTra(!modalTra) }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                                </svg>
                                                <p className="text-xs">Solicitar</p>
                                            </button>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-800 h-[250px] w-[225px] rounded-lg shadow-lg dark:shadow-slate-700 mb-5">
                                        <img src={imgSinOfertas} alt="dreaming" width={125} height={125} />
                                        <h1 className="font-semibold dark:text-white text-lg">No existen ofertas aún</h1>
                                    </div>
                                )
                                }
                            </div>
                        </section>
                    </>
                )}
        </>
    )
}


export default Inicio