import React, { useEffect, useState } from "react";
import OfertaStore from "../../store/OfertaStore";
import imgSinTrabajo from '../../assets/Tiempo.svg'
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import socket from "../../context/SocketConexion";


const HistorialTrabajoCli = () => {
    const { trabajos, setTrabajos } = OfertaStore()
    const [selectedOption, setSelectedOption] = useState('Todos')

    const handleRadioChange = (e) => {
        const tipo = e.target.value
        setSelectedOption(tipo)
    }

    useEffect(()=>{
        socket.on('Trabajo-cancelado',({id, trabajoActualizado})=>{
            if(auth._id === trabajoActualizado.cliente._id){
                setTrabajos(prev => [...prev.filter((tra) => tra._id !== id), trabajoActualizado])
            }
        })

        return () => {
            socket.off('Trabajo-cancelado')
        }
    }, [])
    return (
        <>
            <section>
                <h1 className="text-center text-cyan-600 font-CalSans text-3xl mt-20 lg:mt-5">Historial</h1>
                <p className="text-center font-semibold text-xl mb-5 dark:text-white">Aquí podrás ver tus trabajos completados o cancelados como cliente</p>
                <div className="flex flex-wrap gap-2 mb-5 px-5">
                    <label className="dark:text-white  font-semibold has-[input:checked]:border-purple-600 has-[input:checked]:text-purple-500 has-[input:checked]:bg-purple-50 dark:has-[input:checked]:bg-transparent  w-32 border-2 border-gray-500 dark:border-white rounded-md px-2 py-1 flex justify-between items-center">
                        Todos
                        <input type="radio" name="tipo" value="Todos" onChange={handleRadioChange} className="appearance-none w-4 h-4 border rounded-full checked:border-4 checked:border-purple-600" />
                    </label>
                    <label className="dark:text-white font-semibold has-[input:checked]:border-cyan-600 has-[input:checked]:text-cyan-500 has-[input:checked]:bg-cyan-50 dark:has-[input:checked]:bg-transparent w-32 border-2 border-gray-500 dark:border-white rounded-md px-2 py-1 flex justify-between items-center">
                        Completados
                        <input type="radio" name="tipo" value="Completados" onChange={handleRadioChange} className="appearance-none w-4 h-4 border rounded-full checked:border-4 checked:border-cyan-600" />
                    </label>
                    <label className="dark:text-white font-semibold has-[input:checked]:border-red-600 has-[input:checked]:text-red-500 has-[input:checked]:bg-red-50 dark:has-[input:checked]:bg-transparent w-32 border-2 border-gray-500 dark:border-white rounded-md px-2 py-1 flex justify-between items-center">
                        Cancelados
                        <input type="radio" name="tipo" value="Cancelados" onChange={handleRadioChange} className="appearance-none w-4 h-4 border rounded-full checked:border-4 checked:border-red-600" />
                    </label>
                </div>
                <div className="flex justify-center flex-wrap gap-x-5">
                    {trabajos.length !== 0 ? (
                        trabajos.some(tra => tra.status !== "En espera" && tra.status !== "Agendado" && tra.status !== "Rechazado") ? (
                            trabajos.map((tra) => (
                                (tra.status === "Cancelado" && (selectedOption === "Cancelados" || selectedOption === "Todos") && (
                                    <div key={tra._id} className="w-fit h-fit py-4 px-5 radial-gradientRechazados-bg rounded-lg shadow-lg shadow-fuchsia-300 mb-5">
                                        <h1 className="text-center text-2xl pb-1.5 border-b-2 font-semibold text-white">{tra.servicio}</h1>
                                        <div className="flex justify-center items-center gap-x-3 mt-1.5">
                                            <div className="w-[65px] h-[65px] rounded-full overflow-hidden shrink-0">
                                                <img src={tra.proveedor.f_perfil} alt="fotoPERFILprov" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="-space-y-0.5">
                                                <p className="text-xl font-semibold text-white truncate w-28">{tra.proveedor.nombre}</p>
                                                <p className="font-semibold text-emerald-900">{tra.fecha.split('T')[0]}</p>
                                                <p className="font-semibold">{DateTime.fromISO(tra.desde, {zone:'utc'}).setZone('America/Guayaquil').toFormat('HH:mm')} - {DateTime.fromISO(tra.hasta, {zone:'utc'}).setZone('America/Guayaquil').toFormat('HH:mm')}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-around mt-1.5 gap-x-3">
                                            <div className="flex flex-col justify-end items-center">
                                                <h1 className="text-4xl font-semibold text-red-900">
                                                    ${tra.precioTotal = Math.round(tra.precioTotal * 100) / 100}
                                                </h1>
                                                <p className="text-center">Total {tra.tipo === 'precioPorDia' ? 'por Día' : 'por Horas'}</p>
                                            </div>
                                            <div className="flex flex-col justify-end items-center">
                                                <h1 className="font-semibold text-xl text-red-900">
                                                    {tra.status}
                                                </h1>
                                                <p className="pl-5 text-center" >Estado</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                || (tra.status === "Completado" && (selectedOption === "Completados" || selectedOption === "Todos") && (
                                    <div key={tra._id} className="w-fit h-fit py-4 px-5 radial-gradientAceptados-bg rounded-lg shadow-lg shadow-cyan-300 mb-5">
                                        <h1 className="text-center text-2xl pb-1.5 border-b-2 font-semibold text-white">{tra.servicio}</h1>
                                        <div className="flex justify-center items-center gap-x-3 mt-1.5">
                                            <div className="w-[65px] h-[65px] rounded-full overflow-hidden shrink-0">
                                                <img src={tra.proveedor.f_perfil} alt="fotoPERFILprov" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="-space-y-0.5">
                                                <p className="text-xl font-semibold text-white truncate w-28">{tra.proveedor.nombre}</p>
                                                <p className="font-semibold text-cyan-800">{tra.fecha.split('T')[0]}</p>
                                                <p className="font-semibold">{DateTime.fromISO(tra.desde, {zone:'utc'}).setZone('America/Guayaquil').toFormat('HH:mm')} - {DateTime.fromISO(tra.hasta, {zone:'utc'}).setZone('America/Guayaquil').toFormat('HH:mm')}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-around mt-1.5 gap-x-3">
                                            <div className="flex flex-col justify-end items-center">
                                                <h1 className="text-4xl font-semibold text-amber-900">
                                                    ${tra.precioTotal = Math.round(tra.precioTotal * 100) / 100}
                                                </h1>
                                                <p className="text-center">Total {tra.tipo === 'precioPorDia' ? 'por Día' : 'por Horas'}</p>
                                            </div>
                                            <div className="flex flex-col justify-end items-center">
                                                <h1 className="font-semibold text-xl text-amber-900">
                                                    {tra.status}
                                                </h1>
                                                <p className="pl-5 text-center" >Estado</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                            )
                        ) : (
                            <div className="w-[250px] h-[265px] px-5 mb-5 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-slate-700 flex flex-col justify-center items-center">
                                <img src={imgSinTrabajo} alt="SinTrabajos" width={150} height={150} />
                                <p className="text-lg text-gray-700 dark:text-white font-semibold text-center">Todos los trabajos están en espera</p>
                            </div>
                        )
                    ) : (
                        <div className="w-[250px] h-[265px] px-5 mb-5 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-slate-700 flex flex-col justify-center items-center">
                            <img src={imgSinTrabajo} alt="SinTrabajos" width={150} height={150} />
                            <p className="text-lg text-gray-700 dark:text-white font-semibold text-center">Todavía no has solicitado ningún trabajo</p>
                            <Link to='/dashboard/cliente' className="group flex justify-center items-center px-3 py-1 rounded-2xl bg-emerald-700 mt-3 font-semibold text-white text-center cursor-pointer hover:bg-emerald-800 hover:brightness-110 transition-all duration-300">
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
            </section>
        </>
    )
}

export default HistorialTrabajoCli