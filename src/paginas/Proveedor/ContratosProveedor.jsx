import React from "react";
import '../../../CSS/fondos.css'
import imgSinTrabajo from '../../assets/Tiempo.svg'
import OfertaStore from "../../store/OfertaStore";
import AuthStoreContext from "../../store/AuthStore";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { DateTime } from "luxon";
import { Tooltip } from "react-tooltip";

const ContratosProv = () => {
    const { trabajosProvs, setTrabajosProvs } = OfertaStore()
    const {  auth, setAuth, NuevoMSG } = AuthStoreContext()

    const cancelarTrabajo = async (idTra, servicio, idProv) => {
        const token = localStorage.getItem('token')
        const rol = localStorage.getItem('rol')
        const confirmar = confirm(`¿Estás seguro de cancelar el trabajo de ${servicio}?`)
        if (confirmar) {
            try {
                const urlCancelar = `${import.meta.env.VITE_BACKEND_URL}/cancelarTrabajo/${idTra}?proveedor=${idProv}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const respuesta = await axios.put(urlCancelar, {}, options)
                toast.success(respuesta.data.msg)
            } catch (error) {
                console.log("Error al cancelar el trabajo", error);
                toast.error(error.response.data.msg)
            }
        }
    }

    return (
        <>
            <ToastContainer
                toastStyle={{ backgroundColor: '#1c2833', color: 'white' }}
                closeOnClick
                position="bottom-center"
            />
            <section>
                <h1 className="text-center text-purple-600 font-CalSans text-3xl mb-3 mt-20 lg:mt-5">Trabajos actuales</h1>
                <h2 className="text-xl mb-5 text-center dark:text-white px-5">Aquí podrás ver tus trabajos agendados como proveedor</h2>
                <div className="flex justify-center flex-wrap gap-x-3">
                    {trabajosProvs.length !== 0 && trabajosProvs.some((tra) => tra.status === "Agendado") ? trabajosProvs.map((tra) => (
                        tra.status === "Agendado" && (
                            <div key={tra._id} className="w-fit h-fit py-3.5 px-5 radial-gradientAceptados-bg rounded-lg shadow-lg shadow-cyan-300 mb-5">
                                <h1 className="text-center text-2xl pb-2 border-b-2 font-semibold text-white">{tra.servicio}</h1>
                                <div className="flex justify-center items-center gap-x-3 mt-1.5">
                                    <div className="w-[65px] h-[65px] rounded-full overflow-hidden shrink-0">
                                        <img src={tra.cliente.f_perfil} alt="fotoPERFILprov" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="-space-y-0.5">
                                        <p className="text-xl font-semibold text-cyan-900 truncate w-28">{tra.cliente.nombre}</p>
                                        <p className="font-semibold">{tra.fecha.split('T')[0]}</p>
                                        <p className="font-semibold">{DateTime.fromISO(tra.desde, { zone: 'utc' }).setZone('America/Guayaquil').toFormat('HH:mm')} - {DateTime.fromISO(tra.hasta, { zone: 'utc' }).setZone('America/Guayaquil').toFormat('HH:mm')}</p>
                                    </div>
                                </div>
                                <div className="flex justify-around my-1.5 gap-x-3">
                                    <h1 className="text-3xl font-semibold text-cyan-900">
                                        ${tra.precioTotal = Math.round(tra.precioTotal * 100) / 100}
                                        <span className="text-base"> total</span>
                                    </h1>
                                    <div className="flex items-center">-</div>
                                    <div className="flex items-center">
                                        <h1 className="font-semibold text-xl text-cyan-900">
                                            {tra.status}
                                        </h1>
                                    </div>
                                </div><hr className="border border-white"/>
                                <div className="flex justify-around mt-2">
                                    <button type="button" data-tooltip-id="mensaje" data-tooltip-content={'Enviar mensaje'} className="flex flex-col justify-center items-center px-3 text-emerald-800 font-semibold hover:scale-105 duration-300 ease-in-out cursor-pointer" onClick={() => NuevoMSG(tra.cliente._id, tra.cliente.nombre, tra.cliente.apellido, tra.cliente.f_perfil)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.6" stroke="currentColor" className="size-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                        </svg>
                                        <p className="text-sm">Mensaje</p>
                                    </button>
                                    <button type="button" data-tooltip-id="cancelar" data-tooltip-content={'Cancelar'} className="flex flex-col justify-center items-center px-3 text-red-800 font-semibold hover:scale-105 duration-300 ease-in-out cursor-pointer" onClick={async () => {
                                        await cancelarTrabajo(tra._id, tra.servicio, tra.proveedor._id);
                                    }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.6" stroke="currentColor" className="size-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <p className="text-sm">Cancelar</p>
                                    </button>
                                </div>
                            </div>
                        )
                    )) : (
                        <div className="w-[250px] h-[265px] px-5 mb-5 shadow-lg dark:shadow-slate-800 bg-gray-100 dark:bg-gray-900 rounded-lg flex flex-col justify-center items-center">
                            <img src={imgSinTrabajo} alt="SinTrabajos" width={150} height={150} />
                            <p className="text-lg dark:text-white font-semibold text-center">No se han agendado trabajos todavía</p>
                        </div>
                    )}
                </div>
            </section>
            <Tooltip id="mensaje" style={{
                fontSize: 13
            }} className="hidden lg:block" />
            <Tooltip id="cancelar" style={{
                fontSize: 13
            }}
                className="hidden lg:block" />
        </>
    )
}

export default ContratosProv