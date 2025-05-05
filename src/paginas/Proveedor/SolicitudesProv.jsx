import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import '../../../CSS/fondos.css'
import imgSoli from '../../assets/Descansando.svg'
import AuthStoreContext from "../../store/AuthStore";
import OfertaStore from "../../store/OfertaStore";
import SpinnerCargaModal from "../../componentes/RuedaCargaModal";
import EsqueletoSoliCli from "../Esqueletos/EsqSolicitudesCli";

const SolicitudProv = () => {
    const { trabajosProvs, ObtenerTrabajos, pulseTra } = OfertaStore()
    const {Perfil} = AuthStoreContext()
    const token = localStorage.getItem('token')
    const rol = localStorage.getItem('rol')

    const [carga, setCarga] = useState(false)

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
                setCarga(false)
                await ObtenerTrabajos(token, rol)
                await Perfil(token, rol)
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.msg)
                setCarga(false)
            }
        }else{
            setTimeout(() => {
                setCarga(false)
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
                await ObtenerTrabajos(token, rol)
                setCarga(false)
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.msg)
                setCarga(false)
            }
        }else{
            setTimeout(() => {
                setCarga(false)
            }, 300)
        }
    }

    return (
        <>
            <ToastContainer />
            {pulseTra ? <EsqueletoSoliCli />
                : (
                    <>
                        <h1 className="text-center font-CalSans text-3xl text-purple-600 mb-3 mt-5">Solicitudes</h1>
                        <h2 className="text-xl mb-5 text-center dark:text-white">Aquí puedes ver tus solicitudes de trabajo como proveedor</h2>
                        <section>
                            <div className="flex justify-center gap-3 flex-wrap">
                                {trabajosProvs.length !== 0 &&
                                    trabajosProvs.some(tra => tra.status === "En espera") ? (
                                    trabajosProvs.map((tra) => (
                                        tra.status === "En espera" && (
                                            <div key={tra._id} className="w-[250px] h-[265px] radial-gradientTrabajos-bg rounded-lg shadow-lg shadow-cyan-300 mb-5">
                                                <h1 className="text-center text-2xl mt-2 pb-2 border-b-2 font-semibold text-white">{tra.servicio}</h1>
                                                <div className="flex justify-center items-center gap-x-3 mt-2">
                                                    <div className="w-[65px] h-[65px] rounded-full overflow-hidden">
                                                        <img src={tra.cliente.f_perfil} alt="fotoPERFILprov" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="-space-y-0.5 ">
                                                        <p className="text-xl font-semibold text-white truncate w-28">{tra.cliente.nombre}</p>
                                                        <p className="font-semibold text-cyan-800">{tra.fecha.split('T')[0]}</p>
                                                        <p className="font-semibold">{tra.desde.split('T')[1].split('.')[0].split(':')[0]+':00'} - {tra.hasta.split('T')[1].split('.')[0].split(':')[0]+':00'}</p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-center mt-1.5">
                                                    <h1 className="text-4xl font-semibold">
                                                        ${tra.precioTotal = Math.round(tra.precioTotal * 100) / 100}
                                                    </h1>
                                                </div>
                                                <p className="text-center">Total {tra.tipo === 'precioPorDia' ? 'por Día' : 'por Horas'}</p>
                                                <div className="flex justify-around mt-3">
                                                    <button className="px-4 py-2 bg-cyan-200 rounded-md text-cyan-700 font-semibold hover:scale-105 duration-300 cursor-pointer" onClick={async () => { await AceptarSolicitud(tra._id, tra.servicio); setCarga(true) }}>{carga ? <SpinnerCargaModal w={4} h={4} HH={4} /> : 'Aceptar'}</button>
                                                    <button className="px-3 py-2 bg-red-200 rounded-md text-red-700 font-semibold hover:scale-105 duration-300 cursor-pointer" onClick={async () => { await RechazarSolicitud(tra._id, tra.servicio); setCarga(true) }} >{carga ? <SpinnerCargaModal w={4} h={4} HH={4} /> : 'Rechazar'}</button>
                                                </div>
                                            </div>
                                        )
                                    )
                                    )) : (
                                    <div className="w-[250px] h-[265px] px-5 mb-5 shadow-lg dark:shadow-slate-800 bg-gray-100 rounded-lg dark:bg-gray-900 flex flex-col justify-center items-center">
                                        <img src={imgSoli} alt="SinSolicitudes" width={150} height={150} />
                                        <p className="text-lg dark:text-white font-semibold text-center">Aún no tienes solicitudes de servicio</p>
                                        <p className="text-lg dark:text-white font-semibold text-center">¡Pronto las tendrás!</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </>
                )}
        </>
    )
}

export default SolicitudProv