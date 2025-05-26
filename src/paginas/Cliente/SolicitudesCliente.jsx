import axios from "axios";
import React, { useEffect, useState } from "react";
import '../../../CSS/fondos.css'
import ModalActualizar from "../../componentes/modals/ModalActualizar";
import imgSinTrabajo from '../../assets/Tiempo.svg'
import { Link } from "react-router-dom";
import OfertaStore from "../../store/OfertaStore";
import AuthStoreContext from "../../store/AuthStore";
import EsqueletoSoliCli from "../Esqueletos/EsqSolicitudesCli";
import { Tooltip } from "react-tooltip";
import { DateTime } from "luxon";
import socket from "../../context/SocketConexion";

const SolicitudesCli = () => {
    const [trabajoSeleccionado, setTrabajoSeleccioando] = useState(null)
    const [ofertaSeleccionada, setOfertaSeleccionada] = useState(null)
    const { modalTraActual, setModalTraActual, trabajos, setTrabajos, pulseTra, ObtenerTrabajos } = OfertaStore()
    const { setOpcionActiva, auth } = AuthStoreContext()

    const seleccionarTrabajo = (id) => {
        setTrabajoSeleccioando(id)
    }


    const seleccionarOferta = (id) => {
        setOfertaSeleccionada(id)
    }

    const EliminarTrabajo = async (id, indx) => {
        const confirmar = confirm(`¿Estás seguro del eliminar la solicitud de ${indx}?`)
        if (confirmar) {
            try {
                const token = localStorage.getItem('token')
                const rol = localStorage.getItem('rol')
                const tipo = localStorage.getItem('tipo')
                const url = `${import.meta.env.VITE_BACKEND_URL}/eliminarTrabajo/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                await axios.delete(url, options)
                await ObtenerTrabajos(token, rol, tipo)
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(()=>{
        socket.on('Trabajo-eliminado', ({id, trabajo}) =>{
            if (auth._id === trabajo.cliente._id) {
                setTrabajos(prev => prev.filter(of => of._id !== id))
            }
        })
        return () => socket.off('Trabajo-eliminado')
    }, [])

    return (
        <>
            {pulseTra ? <EsqueletoSoliCli />
                : (
                    <>
                        <section>
                            <h1 className="text-3xl text-center text-cyan-600 font-CalSans mt-20 lg:mt-5">Solicitudes</h1>
                            <p className="text-xl text-center font-semibold mb-5 dark:text-white px-5">Aquí podrás visualizar tus solicitudes de trabajo como cliente</p>
                            <div className="flex justify-center gap-3 flex-wrap">
                                {trabajos.length !== 0 && trabajos.some(tra => tra.status === "En espera") ? (
                                    trabajos.map((tra) => (
                                        tra.status === "En espera" && (
                                            <div key={tra._id} className="w-fit h-fit max-w-64 py-2 px-5 radial-gradientTrabajos-bg rounded-lg shadow-lg shadow-cyan-300 mb-5">
                                                <h1 className="text-center text-2xl pb-1.5 border-b-2 font-semibold text-white">{tra.servicio}</h1>
                                                <div className="flex justify-center items-center text-wrap gap-x-3 mt-1.5">
                                                    <div className="w-[65px] h-[65px] rounded-full overflow-hidden shrink-0">
                                                        <img src={tra.proveedor.f_perfil} alt="fotoPERFILprov" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="-space-y-0.5">
                                                        <p className="text-xl font-semibold text-white truncate w-28">{tra.proveedor.nombre}</p>
                                                        <p className="font-semibold text-cyan-800">{tra.fecha.split('T')[0]}</p>
                                                        <p className="font-semibold">{DateTime.fromISO(tra.desde, {zone:'utc'}).setZone('America/Guayaquil').toFormat('HH:mm')} - {DateTime.fromISO(tra.hasta, {zone:'utc'}).setZone('America/Guayaquil').toFormat('HH:mm')}</p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-center mt-1.5">
                                                    <h1 className="text-4xl font-semibold text-amber-900">
                                                        ${tra.precioTotal = Math.round(tra.precioTotal * 100) / 100}
                                                    </h1>
                                                </div>
                                                <p className="text-center">Total {tra.tipo === 'precioPorDia' ? 'por Día' : 'por Horas'}</p>
                                                <div className="flex justify-around mt-1 gap-x-4">
                                                    <div data-tooltip-id="actualizar" data-tooltip-content={'Actualizar'} className="flex flex-col justify-center items-center px-3 py-0.5 rounded-md text-cyan-700  hover:scale-105 duration-300 cursor-pointer" onClick={() => { seleccionarTrabajo(tra._id); seleccionarOferta(tra.oferta._id); setModalTraActual(!modalTraActual) }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                                        </svg>
                                                    </div>
                                                    <div data-tooltip-id="eliminar" data-tooltip-content={'Eliminar'} className="flex flex-col justify-center items-center px-3 py-0.5 rounded-md text-red-700 font-semibold  hover:scale-105 duration-300 cursor-pointer" onClick={async () => { await EliminarTrabajo(tra._id, tra.servicio) }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                {trabajoSeleccionado === tra._id && ofertaSeleccionada === tra.oferta._id && modalTraActual && (<ModalActualizar idTrabajo={tra._id} idOferta={tra.oferta._id} />)}
                                            </div>
                                        )
                                    ))
                                ) : (
                                    <div className="w-[250px] h-[265px] mb-5 px-5 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-slate-700 flex flex-col justify-center items-center">
                                        <img src={imgSinTrabajo} alt="SinTrabajos" width={150} height={150} />
                                        <p className="text-lg text-gray-700 dark:text-white font-semibold text-center">Todavía no has solicitado ningún trabajo</p>
                                        <Link to='/dashboard' className="group flex justify-center items-center px-3 py-1 rounded-2xl bg-emerald-700 mt-3 font-semibold text-white text-center cursor-pointer hover:bg-emerald-800 hover:brightness-110 transition-all duration-300" onClick={() => setOpcionActiva('inicio')}>
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
                        <Tooltip id="actualizar" place="top" style={{
                            fontSize: 13
                        }} className="hidden lg:block" />
                        <Tooltip id="eliminar" place="top" style={{
                            fontSize:13
                        }} className="hidden lg:block" />
                    </>
                )}
        </>
    )
}


export default SolicitudesCli