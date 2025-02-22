import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import '../../CSS/fondos.css'
import OfertaContext from "../context/OfertasProvider";
import logoMenu from '../assets/category.png'
import logoMenuAbierto from '../assets/hamburger.png'
import AuthContext from "../context/AuthProvider";

const SolicitudProv = () => {
    const { trabajos, setTrabajos } = useContext(OfertaContext)
    const {menu, handleMenu} = useContext(AuthContext)

    const AceptarSolicitud = async (id, indx) => {
        const confirmar = confirm(`¿Estás seguro de aceptar el trabajo para ${indx}?`)
        if (confirmar) {
            try {
                const token = localStorage.getItem('token')
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
                ObtenerTrabajos()
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.msg)
            }
        }
    }

    const RechazarSolicitud = async (id, indx) => {
        const confirmar = confirm(`¿Estás seguro de rechazar el trabajo para ${indx}?`)
        if (confirmar) {
            try {
                const token = localStorage.getItem('token')
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
                ObtenerTrabajos()
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.msg)
            }
        }
    }

    return (
        <>
            <div className="lg:hidden pb-2">
                <img src={logoMenu} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === true ? 'hidden' : ''} cursor-pointer duration-300`} />
                <img src={logoMenuAbierto} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === false ? 'hidden' : ''} cursor-pointer duration-300`} />
            </div>
            <ToastContainer />
            <h1 className="text-center font-semibold text-3xl text-purple-800 mb-5">Solicitudes</h1>
            <h2 className="text-xl mb-5 text-center dark:text-white">Aquí puedes ver tus solicitudes de trabajo</h2>
            <section>
                <div className="flex justify-center gap-3 flex-wrap">
                    {trabajos.length !== 0 ?
                        trabajos.some(tra => tra.status === "En espera") ? (
                            trabajos.map((tra) => (
                                tra.status === "En espera" && (
                                    <div key={tra._id} className="w-[330px] h-[285px] radial-gradientTrabajos-bg rounded-lg shadow-lg shadow-blue-500">
                                        <h1 className="text-center text-2xl mt-2 pb-2 border-b-2 font-semibold">{tra.servicio}</h1>
                                        <p className="text-center text-xl mt-1">Cliente: <span className="text-white">{tra.cliente.nombre} {tra.cliente.apellido}</span></p>
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
                                            <button className="px-4 py-2 bg-blue-700 rounded-md text-white hover:bg-blue-900 hover:scale-105 duration-300" onClick={() => { AceptarSolicitud(tra._id, tra.servicio) }}>Aceptar</button>
                                            <button className="px-3 py-2 bg-red-700 rounded-md text-white hover:bg-red-900 hover:scale-105 duration-300" onClick={() => { RechazarSolicitud(tra._id, tra.servicio) }} >Rechazar</button>
                                        </div>
                                    </div>
                                )
                            )
                            )) : (
                            <div className="w-[330px] h-[285px] bg-gray-400 rounded-lg border-2 border-dashed flex justify-center items-center">
                                <p className="text-lg text-gray-700 font-semibold">Todos los trabajos están en espera</p>
                            </div>
                        )
                        : (
                            <div className="w-[300px] lg:w-[330px] h-[285px] bg-gray-400 rounded-lg border-2 border-dashed flex justify-center items-center">
                                <p className="text-lg text-gray-700 font-semibold">No hay solicitudes recientes</p>
                            </div>
                        )}
                </div>
            </section>
        </>
    )
}

export default SolicitudProv