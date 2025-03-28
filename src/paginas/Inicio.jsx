import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoInicio from '../assets/SVG_Construccion.svg'
import logoMenu from '../assets/category.png'
import logoMenuAbierto from '../assets/hamburger.png'
import AuthContext from "../context/AuthProvider";
import axios from "axios";
import '../../CSS/fondos.css'
import OfertaContext from "../context/OfertasProvider";
import ModalTrabajos from "../componentes/modals/ModalTrabajos";

const Inicio = () => {
    const { auth, menu, handleMenu } = useContext(AuthContext)
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
            <div className="lg:hidden pb-2">
                <img src={logoMenu} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === true ? 'hidden' : ''} cursor-pointer duration-300`} />
                <img src={logoMenuAbierto} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === false ? 'hidden' : ''} cursor-pointer duration-300`} />
            </div>
            <section className="flex justify-center">
                <div className="rounded-md shadow-lg w-4/5 bg-white dark:bg-transparent border border-gray-100">
                    <h1 className="text-3xl text-center text-purple-700 font-semibold pt-4 px-3 md:px-0">¡Bienvenido de nuevo {auth.nombre}, agenda una cita!</h1>
                    <h2 className="text-xl text-center dark:text-white pt-3 pb-5 px-3 md:px-0">¡Los trabajadores esperan por brindarte sus servicios!</h2>
                    <div className="flex justify-center pb-5">
                        <img src={logoInicio} alt="Constructor" width={115} height={115} className='rounded-full border-2 border-black-600' />
                    </div>
                </div>
            </section><br />
            <section className="flex justify-center">
                <div className="w-5/6 ">
                    <h1 className="font-semibold text-2xl mb-3">Categorías</h1>
                    <div className="flex flex-wrap justify-around mb-2 gap-3">
                        {categorias.map((cat) => (
                            <Link key={cat} onClick={almacenarValor} className="px-4 py-2 mb-2 md:my-0 border-2 border-purple-700 rounded-md text-purple-800 font-semibold hover:bg-purple-800 hover:text-white duration-300">{cat}</Link>
                        ))}
                    </div><hr className="border-2 dark:border-gray-900" />
                </div>
            </section>
            <section className="mt-8">
                <h1 className="font-semibold text-2xl mb-5 dark:text-white">{valor ? valor : 'Principales Ofertas'}</h1>
                <div className={`${filtro ? 'hidden' : ''} flex justify-center gap-3 flex-wrap`}>
                    {oferta.map((of, index) => (
                        <div key={of._id} className="border radial-gradientOfertas-bg h-[250px] w-[225px] rounded-lg shadow-lg shadow-blue-400">
                            <h1 className="text-center pt-2 font-bold text-xl text-white pb-2 mb-2 border-b">
                                Oferta N°{index + 1}
                            </h1>
                            <h1 className="text-center text-lg mb-2">
                                <span className="font-semibold">Prov: </span><b className="text-slate-300">{of.proveedor.nombre} {of.proveedor.apellido}</b>
                            </h1>
                            <h1 className="text-center font-semibold text-yellow-500 text-lg mb-2">
                                {of.servicio}
                            </h1>
                            <p className="text-center font-semibold text-white">
                                Precio/Día:{" "}
                                <b className="text-xl ml-5 text-yellow-500">${of.precioPorDia}</b>
                            </p>
                            <p className="text-center font-semibold text-white">
                                Precio/Hora:{" "}
                                <b className="text-xl ml-5 text-yellow-500">${of.precioPorHora}</b>
                            </p>
                            <div className="flex justify-center mt-5">
                                <button className="px-2 py-1 rounded-md bg-blue-700 text-white font-semibold hover:bg-blue-800 hover:scale-105 duration-300" onClick={() => { handleModalTra(of._id); proveedorSeleccionado(of.proveedor._id); setModalTra(!modalTra) }}>Solicitar</button>
                            </div>
                            {modalTra && ofertaSeleccionada === of._id && (<ModalTrabajos idOferta={of._id} trabajos={ObtenerTrabajos} />)}
                        </div>
                    ))}
                </div>
                <div className={`${filtro ? '' : 'hidden'} flex justify-center gap-3 flex-wrap`}>
                    {ofertasFiltradas.length > 0 ? ofertasFiltradas.map((of, index) => (
                        <div key={of._id} className="border radial-gradientOfertas-bg h-[250px] w-[225px] rounded-lg shadow-lg shadow-blue-400">
                            <h1 className="text-center pt-2 font-bold text-xl text-white pb-2 mb-2 border-b">
                                Oferta N°{index + 1}
                            </h1>
                            <h1 className="text-center text-lg mb-2">
                                <span className="font-semibold">Prov: </span><b className="text-slate-300">{of.proveedor.nombre} {of.proveedor.apellido}</b>
                            </h1>
                            <h1 className="text-center font-semibold text-yellow-500 text-lg mb-2">
                                {of.servicio}
                            </h1>
                            <p className="text-center font-semibold text-white">
                                Precio/Día:{" "}
                                <b className="text-xl ml-5 text-yellow-500">${of.precioPorDia}</b>
                            </p>
                            <p className="text-center font-semibold text-white">
                                Precio/Hora:{" "}
                                <b className="text-xl ml-5 text-yellow-500">${of.precioPorHora}</b>
                            </p>
                            <div className="flex justify-center mt-5">
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