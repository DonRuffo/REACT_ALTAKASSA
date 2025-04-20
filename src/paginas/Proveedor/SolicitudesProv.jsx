import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import '../../../CSS/fondos.css'
import imgSoli from '../../assets/Descansando.svg'
import AuthStoreContext from "../../store/AuthStore";
import OfertaStore from "../../store/OfertaStore";

const SolicitudProv = () => {
    const { trabajos, ObtenerTrabajos } = OfertaStore()
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
                ObtenerTrabajos(rol, token)
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
                ObtenerTrabajos(rol, token)
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.msg)
            }
        }
    }

    return (
        <>
            <ToastContainer />
            <h1 className="text-center font-semibold text-3xl text-purple-600 mb-3 mt-5">Solicitudes</h1>
            <h2 className="text-xl mb-5 text-center dark:text-white">Aquí puedes ver tus solicitudes de trabajo</h2>
            <section>
                <div className="flex justify-center gap-3 flex-wrap">
                    {trabajos.length !== 0 &&
                        trabajos.some(tra => tra.status === "En espera") ? (
                        trabajos.map((tra) => (
                            tra.status === "En espera" && (
                                <div key={tra._id} className="w-[330px] h-[285px] radial-gradientTrabajos-bg rounded-lg shadow-lg shadow-blue-500 mb-5">
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
                        <div className="w-[300px] lg:w-[330px] h-[285px] mb-5 shadow-lg dark:shadow-slate-800 bg-gray-100 rounded-lg dark:bg-gray-900 flex flex-col justify-center items-center">
                            <img src={imgSoli} alt="SinSolicitudes" width={150} height={150}/>
                            <p className="text-lg dark:text-white font-semibold text-center">Aún no tienes solicitudes de servicio</p>
                            <p className="text-lg dark:text-white font-semibold text-center">¡Pronto las tendrás!</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default SolicitudProv