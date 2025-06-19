import axios from "axios";
import React ,{ useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import '../../../CSS/fondos.css'
import imgSoli from '../../assets/Descansando.svg'
import AuthStoreContext from "../../store/AuthStore";
import OfertaStore from "../../store/OfertaStore";
import {Tooltip} from 'react-tooltip';
import EsqueletoSoliCli from "../Esqueletos/EsqSolicitudesCli";
import socket from "../../context/SocketConexion";
import {DateTime} from 'luxon';

const SolicitudProv = () => {
    const { trabajosProvs, pulseTra, setTrabajosProvs } = OfertaStore()
    const { auth } = AuthStoreContext()
    const token = localStorage.getItem('token')
    const rol = localStorage.getItem('rol')

    const AceptarSolicitud = async (id, indx) => {
        const confirmar = confirm(`¿Estás seguro de aceptar el trabajo para ${indx}?`)
        if (confirmar) {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/agendarTrabajo/${id}`
                const options = {
                    headers: {
                        method: 'PUT',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.put(url, {}, options)
                toast.success(respuesta.data.msg)
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.msg)
            }
        } else {
            setTimeout(() => {
            }, 300)
        }
    }

    const RechazarSolicitud = async (id, indx) => {
        const confirmar = confirm(`¿Estás seguro de rechazar el trabajo para ${indx}?`)
        if (confirmar) {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/rechazarTrabajo/${id}`
                const options = {
                    headers: {
                        method: 'PUT',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.put(url, {}, options)
                toast.success(respuesta.data.msg)

            } catch (error) {
                console.log(error)
                toast.error(error.response.data.msg)

            }
        } else {
            setTimeout(() => {

            }, 300)
        }
    }

    useEffect(() => {
        if(!auth._id) return

        const nuevaSoli = ({ trabajoActual }) => {
            console.log(trabajoActual)
            if (auth._id === trabajoActual.proveedor._id) {
                setTrabajosProvs(prev => [...prev, trabajoActual])
            }
        }

        const trabajoAgendado = ({ id, trabajoActualizado }) => {
            if (auth._id === trabajoActualizado.proveedor._id) {
                setTrabajosProvs(prev => [...prev.filter(tra => tra._id !== id), trabajoActualizado])
            }
        }

        const trabajoRechazado = ({id, trabajoActualizado}) =>{
            if (auth._id === trabajoActualizado.proveedor._id) {
                setTrabajosProvs(prev => [...prev.filter(tra => tra._id !== id), trabajoActualizado])
            }
        }

        const trabajoEliminado = ({id, trabajo}) => {
            if (auth._id === trabajo.proveedor._id) {
                setTrabajosProvs(prev => prev.filter(of => of._id !== id))
            }
        }

        const trabajoActualizadoProv = ({id, trabajoActualizado}) =>{
            if(auth._id === trabajoActualizado.proveedor._id){
                setTrabajosProvs(prev => [...prev.filter((tra) => tra._id !== id), trabajoActualizado])
            }
        }

        socket.on('Nueva-solicitud', nuevaSoli)
        socket.on('Trabajo-agendado', trabajoAgendado)
        socket.on('Trabajo-rechazado', trabajoRechazado)
        socket.on('Trabajo-eliminado', trabajoEliminado)
        socket.on('Trabajo-actualizado', trabajoActualizadoProv)

        return () => {
            socket.off('Nueva-solicitud', nuevaSoli)
            socket.off('Trabajo-agendado', trabajoAgendado)
            socket.off('Trabajo-rechazado', trabajoRechazado)
            socket.off('Trabajo-eliminado', trabajoEliminado)
            socket.off('Trabajo-actualizado', trabajoActualizadoProv)
        }
    }, [auth._id])

    return (
        <>
            <ToastContainer />
            {pulseTra ? <EsqueletoSoliCli />
                : (
                    <>
                        <h1 className="text-center font-CalSans text-3xl text-purple-600 mt-20 lg:mt-5">Solicitudes</h1>
                        <h2 className="text-xl mb-5 text-center dark:text-white px-5">Aquí puedes ver tus solicitudes de trabajo como proveedor</h2>
                        <section>
                            <div className="flex justify-center gap-3 flex-wrap">
                                {trabajosProvs.length !== 0 &&
                                    trabajosProvs.some(tra => tra.status === "En espera") ? (
                                    trabajosProvs.map((tra, index) => (
                                        tra.status === "En espera" && (
                                            <div key={`${tra._id}-${index}`} className="w-fit h-fit max-w-64 py-2 px-5 radial-gradientTrabajos-bg rounded-lg shadow-lg shadow-cyan-300 mb-5">
                                                <h1 className="text-center text-2xl pb-2 border-b-2 font-semibold text-white">{tra.servicio}</h1>
                                                <div className="flex justify-center items-center gap-x-3 mt-1.5">
                                                    <div className="w-[65px] h-[65px] rounded-full overflow-hidden">
                                                        <img src={tra.cliente.f_perfil} alt="fotoPERFILprov" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="-space-y-0.5 ">
                                                        <p className="text-xl font-semibold text-white truncate w-28">{tra.cliente.nombre}</p>
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
                                                    <div data-tooltip-id="Aceptar" data-tooltip-content={'Aceptar'} className="py-0.5 rounded-md text-cyan-700 font-semibold hover:scale-105 duration-300 cursor-pointer" onClick={async () => { await AceptarSolicitud(tra._id, tra.servicio) }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                        </svg>
                                                        
                                                    </div>
                                                    <div data-tooltip-id="ubicacion" data-tooltip-content={'Ver ubicación'} className="py-0.5 rounded-md text-emerald-700 font-semibold hover:scale-105 duration-300 cursor-pointer">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                                        </svg>
                                                        
                                                    </div>
                                                    <div data-tooltip-id="Rechazar" data-tooltip-content={'Rechazar'} className="py-0.5 rounded-md text-red-700 font-semibold hover:scale-105 duration-300 cursor-pointer" onClick={async () => { await RechazarSolicitud(tra._id, tra.servicio) }} >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                        </svg>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )
                                    )) : (
                                    <div className="w-[250px] h-[265px] px-5 mb-5 shadow-lg dark:shadow-gray-800 bg-gray-100 rounded-lg dark:bg-gray-900 flex flex-col justify-center items-center">
                                        <img src={imgSoli} alt="SinSolicitudes" width={150} height={150} />
                                        <p className="text-lg dark:text-white font-semibold text-center">Aún no tienes solicitudes de servicio</p>
                                        <p className="text-lg dark:text-white font-semibold text-center">¡Pronto las tendrás!</p>
                                    </div>
                                )}
                            </div>
                        </section>
                        <Tooltip id="Aceptar" place="top" style={{
                            fontSize: 13
                        }} className="hidden lg:block" />
                        <Tooltip id="ubicacion" place="top" style={{
                            fontSize: 13
                        }} className="hidden lg:block" />
                        <Tooltip id="Rechazar" place="top" style={{
                            fontSize: 13
                        }} className="hidden lg:block" />

                    </>
                )}
        </>
    )
}

export default SolicitudProv