import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import '../../../CSS/fondos.css'
import OfertaContext from "../../context/OfertasProvider";
import ModalActualizar from "../../componentes/modals/ModalActualizar";
import logoMenu from '../../assets/category.png'
import logoMenuAbierto from '../../assets/hamburger.png'
import AuthContext from "../../context/AuthProvider";
import imgSinTrabajo from '../../assets/Tiempo.svg'
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const SolicitudesCli = () => {
    const [trabajoSeleccionado, setTrabajoSeleccioando] = useState(null)
    const [ofertaSeleccionada, setOfertaSeleccionada] = useState(null)
    const { modalTraActual, setModalTraActual, trabajos, ObtenerTrabajos } = useContext(OfertaContext)
    const { menu, handleMenu } = useContext(AuthContext)

    const seleccionarTrabajo = (id) => {
        setTrabajoSeleccioando(id)
    }

    const seleccionarOferta = (id) => {
        setOfertaSeleccionada(id)
    }

    const EliminarTrabajo = async (id, indx) => {
        const confirmar = confirm(`¿Estás seguro del eliminar el trabajo de ${indx}?`)
        if (confirmar) {
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/eliminarTrabajo/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.delete(url, options)
                ObtenerTrabajos()
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>

            <div className="lg:hidden pb-2 mt-5">
                <img src={logoMenu} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === true ? 'hidden' : ''} cursor-pointer duration-300`} />
                <img src={logoMenuAbierto} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === false ? 'hidden' : ''} cursor-pointer duration-300`} />
            </div>
            <section>
                <h1 className="text-3xl text-center text-purple-600 font-semibold mt-5">Solicitudes</h1>
                <p className="text-xl text-center font-semibold mb-5 dark:text-white">Auí podrás visualizar tus solicitudes de trabajo</p>
                <div className="flex justify-center gap-3 flex-wrap">
                    {trabajos.length !== 0 ? trabajos.some(tra => tra.status === "En espera") ? (
                        trabajos.map((tra) => (
                            tra.status === "En espera" && (
                                <div key={tra._id} className="w-[310px] h-[285px] radial-gradientTrabajos-bg rounded-lg shadow-lg shadow-blue-500">
                                    <h1 className="text-center text-2xl mt-2 pb-2 border-b-2 font-semibold">{tra.servicio}</h1>
                                    <p className="text-center text-xl mt-1">Proveedor: <span className="text-white">{tra.proveedor.nombre} {tra.proveedor.apellido}</span></p>
                                    <div className="flex justify-around mt-2">
                                        <p className="font-semibold">Tipo: <span className="text-purple-700">{tra.tipo === 'precioPorDia' ? 'Por Día' : 'Por Horas'}</span></p>
                                        <p className="font-semibold">Fecha: <span className="text-purple-700">{tra.fecha.split('T')[0]}</span></p>
                                    </div>
                                    <p className="text-center font-semibold">Horario: <span className="text-white">{tra.desde} - {tra.hasta}</span></p>
                                    <div className="flex justify-center mt-3">
                                        <h1 className="text-5xl font-semibold">
                                            ${tra.precioTotal = Math.round(tra.precioTotal * 100) / 100}
                                        </h1>
                                    </div>
                                    <p className="text-center">Precio Total</p>
                                    <div className="flex justify-around mt-3">
                                        <button className="px-3 py-2 bg-blue-700 rounded-md text-white hover:bg-blue-900 hover:scale-105 duration-300" onClick={() => { seleccionarTrabajo(tra._id); seleccionarOferta(tra.oferta._id); setModalTraActual(!modalTraActual) }}>Actualizar</button>
                                        <button type="button" className="px-3 py-2 bg-red-700 rounded-md text-white hover:bg-red-900 hover:scale-105 duration-300" onClick={() => { EliminarTrabajo(tra._id, tra.servicio) }}>Eliminar</button>
                                    </div>
                                    {trabajoSeleccionado === tra._id && ofertaSeleccionada === tra.oferta._id && modalTraActual && (<ModalActualizar idTrabajo={tra._id} idOferta={tra.oferta._id} actualizar={ObtenerTrabajos} />)}
                                </div>
                            )
                        ))
                    ) : (
                        <p>No existen registros en espera</p>
                    ) : (
                        <div className="w-[300px] lg:w-[330px] h-[285px] mb-5 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg flex flex-col justify-center items-center">
                            <img src={imgSinTrabajo} alt="SinTrabajos" width={150} height={150} />
                            <p className="text-lg text-gray-700 dark:text-white font-semibold text-center">Todavía no has solicitado ningún trabajo</p>
                            <Link to='/dashboard' className="group flex justify-center items-center px-3 py-1 rounded-2xl bg-emerald-700 mt-3 font-semibold text-white text-center cursor-pointer hover:bg-emerald-800 hover:brightness-110 transition-all duration-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="group-hover:scale-110 transition-all duration-300"
                                >
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                                Solicitar
                            </Link>
                        </div>
                    )}
                </div>

            </section >
        </>
    )
}


export default SolicitudesCli