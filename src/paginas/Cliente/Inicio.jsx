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


const Inicio = () => {
    const { auth, menu, handleMenu, foto, setFoto, ubi } = useContext(AuthContext)
    const { modalTra, setModalTra, oferta, ObtenerTrabajos, setIdProveedor } = useContext(OfertaContext)
    const [ofertaSeleccionada, setOfertaSeleccionada] = useState(null);
    const [valor, setValor] = useState('')
    const [filtro, setFiltro] = useState(false)
    const [ofertasFiltradas, setOfertasFiltradas] = useState([])

    const handleModalTra = (id) => {
        setOfertaSeleccionada(id);
    };

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

    return (//#BA05FF COLOR DEL SISTEMA
        <>
            <div className="lg:hidden pb-2 mt-5">
                <img src={logoMenu} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === true ? 'hidden' : ''} cursor-pointer duration-300`} />
                <img src={logoMenuAbierto} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === false ? 'hidden' : ''} cursor-pointer duration-300`} />
            </div>
            <section className="flex justify-center mt-5">
                <div className="rounded-md shadow-lg w-4/5 bg-gray-100 dark:bg-transparent border border-gray-100">
                    <h1 className="text-3xl text-center text-purple-600 font-semibold pt-4 px-3 md:px-0">¡Bienvenido {auth.nombre}!</h1>
                    <h2 className="text-xl text-center dark:text-white pt-3 pb-5 px-3 md:px-0">¡Los trabajadores esperan por brindarte sus servicios!</h2>
                    <div className="flex justify-center pb-4">
                        <img src={logoInicio} alt="Constructor" width={125} height={125} className='rounded-full' />
                    </div>
                </div>
            </section>
            <section className={`${foto ? 'hidden' : ''} my-5 flex flex-col justify-center items-center`}>
                <h1 className="text-center text-xl mb-3">Antes de comenzar, debes seguir estos pasos: </h1>
                <div className="flex justify-center mb-3">
                    <div className="w-10 h-10 rounded-full border flex items-center justify-center bg-emerald-500">
                        <p className="font-semibold text-lg">1</p>
                    </div>
                    <div className={`flex items-center justify-center`}>
                        <div className={`${foto || ubi ? 'bg-emerald-500' : ''} border-t border-b w-28 h-3`}></div>
                    </div>
                    <div className={`${foto || ubi ? 'bg-emerald-500' : ''} w-10 h-10 rounded-full border flex items-center justify-center`}>
                        <p className="font-semibold text-lg">2</p>
                    </div>
                </div>
                <motion.div className="flex justify-center gap-x-5"
                    layout transition={{ duration: 300, ease: 'easeInOut' }}>
                    {foto === false && <Cloudinary />}
                    <motion.div layout id="localitation" className={`flex flex-col dark:bg-gray-900 bg-gray-100 outline outline-emerald-700 h-[260px] w-[200px] rounded-lg items-center justify-center shadow-lg`}>
                        <img src={LocationImg} alt="localization" width={125} height={125} />
                        <h1 className="font-semibold text-center dark:text-white">Concede el permiso de ubicación</h1>
                        <button type="button" className={`${ubi ? 'hidden' : ''} px-3 py-1 rounded-2xl bg-emerald-700 mt-3 font-semibold text-white text-center cursor-pointer hover:bg-emerald-800 hover:brightness-110 transition-all duration-300`}>Permitir</button>
                        <p className={`${ubi ? '' :'hidden'} px-3 py-1 rounded-2xl bg-emerald-200 text-emerald-800 font-semibold mt-3`}>Concedido</p>
                    </motion.div>
                </motion.div>
            </section>
            <section className={`${foto ? '' : 'hidden'} flex justify-center`}>
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
            <section className={`${foto ? '' : 'hidden'} mt-5`}>
                <h1 id="aqui" className="font-semibold text-2xl mb-5 dark:text-white">{valor ? valor : 'Principales Ofertas'}</h1>
                <div className={`${filtro ? 'hidden' : ''} flex justify-center gap-3 flex-wrap`}>
                    {oferta.map((of, index) => (
                        <div key={of._id} className="border radial-gradientOfertas-bg h-[250px] w-[225px] rounded-lg shadow-lg shadow-blue-400">
                            <h1 className="text-center pt-2 font-bold text-xl text-white pb-2 mb-1">
                                {of.proveedor.nombre} {of.proveedor.apellido}
                            </h1>
                            <h1 className="text-center text-lg mb-2">
                                <span className="font-semibold text-7xl">Img </span>
                            </h1>
                            <h1 className="text-center font-bold text-yellow-500 text-xl mb-1">
                                {of.servicio}
                            </h1>
                            <div className="flex justify-center gap-x-4">
                                <p className="text-center font-semibold text-white flex items-center">
                                    $/Día:
                                    <b className="text-xl ml-2 text-yellow-500">${of.precioPorDia}</b>
                                </p>
                                <p className="text-center font-semibold text-white flex items-center">
                                    $/Hora:
                                    <b className="text-xl ml-2 text-yellow-500">${of.precioPorHora}</b>
                                </p>
                            </div>

                            <div className="flex justify-center mt-3">
                                <button className="px-2 py-1 rounded-md bg-blue-700 text-white font-semibold hover:bg-blue-800 hover:scale-105 duration-300" onClick={() => { handleModalTra(of._id); proveedorSeleccionado(of.proveedor._id); setModalTra(!modalTra) }}>Solicitar</button>
                            </div>
                            {modalTra && ofertaSeleccionada === of._id && (<ModalTrabajos idOferta={of._id} trabajos={ObtenerTrabajos} />)}
                        </div>
                    ))}
                </div>
                <div className={`${filtro ? '' : 'hidden'} flex justify-center gap-3 flex-wrap`}>
                    {ofertasFiltradas.length > 0 ? ofertasFiltradas.map((of, index) => (
                        <div key={of._id} className="border radial-gradientOfertas-bg h-[250px] w-[225px] rounded-lg shadow-lg shadow-blue-400">
                            <h1 className="text-center pt-2 font-bold text-xl text-white pb-2 mb-1">
                                {of.proveedor.nombre} {of.proveedor.apellido}
                            </h1>
                            <h1 className="text-center text-lg mb-2">
                                <span className="font-semibold text-7xl">Img </span>
                            </h1>
                            <h1 className="text-center font-bold text-yellow-500 text-xl mb-1">
                                {of.servicio}
                            </h1>
                            <div className="flex justify-center gap-x-4">
                                <p className="text-center font-semibold text-white flex items-center">
                                    $/Día:
                                    <b className="text-xl ml-2 text-yellow-500">${of.precioPorDia}</b>
                                </p>
                                <p className="text-center font-semibold text-white flex items-center">
                                    $/Hora:
                                    <b className="text-xl ml-2 text-yellow-500">${of.precioPorHora}</b>
                                </p>
                            </div>

                            <div className="flex justify-center mt-3">
                                <button className="px-2 py-1 rounded-md bg-blue-700 text-white font-semibold hover:bg-blue-800 hover:scale-105 duration-300" onClick={() => { handleModalTra(of._id); proveedorSeleccionado(of.proveedor._id); setModalTra(!modalTra) }}>Solicitar</button>
                            </div>
                            {modalTra && ofertaSeleccionada === of._id && (<ModalTrabajos idOferta={of._id} trabajos={ObtenerTrabajos} />)}
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