import axios from "axios";
import React, { useEffect, useState } from "react";
import '../../../CSS/fondos.css'

import imgSinTrabajo from '../../assets/Tiempo.svg'
import { Link } from "react-router-dom";
import OfertaStore from "../../store/OfertaStore";
import AuthStoreContext from "../../store/AuthStore";
import socket from "../../context/SocketConexion";
import { toast } from "react-toastify";

const ContratosCliente = () => {

    const { trabajos, ObtenerTrabajos, setTrabajos, setTrabajosProvs } = OfertaStore()
    const {auth} = AuthStoreContext()
    const [selectedOption, setSelectedOption] = useState('Todas')

    const handleRadioChange = (e) => {
        const tipo = e.target.value
        setSelectedOption(tipo)
    }

    const EliminarTrabajo = async (id, indx) => {
        const confirmar = confirm(`¿Estás seguro del eliminar el trabajo de ${indx}?`)
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
                await ObtenerTrabajos(token, rol)
            } catch (error) {
                console.log("Error al cancelar el trabajo", error);
                toast.error(error.response.data.msg)
            }
        }
    }

    useEffect(()=>{
        socket.on('Trabajo-cancelado',({id, trabajoActualizado})=>{
            if(auth._id === trabajoActualizado.cliente._id){
                setTrabajos(prev => [...prev.filter((tra) => tra._id !== id), trabajoActualizado])
            }
            if(auth._id === trabajoActualizado.proveedor._id){
                setTrabajosProvs(prev => [...prev.filter((tra) => tra._id !== id), trabajoActualizado])
            }
        })

        return () => socket.off('Trabajo-cancelado')
    }, [])
    return (
        <>
            <section>
                <h1 className="text-center text-cyan-600 font-CalSans text-3xl mt-20 lg:mt-5">Trabajos actuales</h1>
                <p className="text-center font-semibold text-xl mb-5 dark:text-white">Aquí podrás ver las solicitudes que han sido aceptadas o rechazadas por los proveedores</p>
                <div className="flex flex-wrap gap-2 mb-5 px-5">
                    <label className="dark:text-white  font-semibold has-[input:checked]:border-purple-600 has-[input:checked]:text-purple-500 has-[input:checked]:bg-purple-50 dark:has-[input:checked]:bg-transparent  w-32 border-2 border-gray-500 dark:border-white rounded-md px-2 py-1 flex justify-between items-center">
                        Todas
                        <input type="radio" name="tipo" value="Todas" onChange={handleRadioChange} className="appearance-none w-4 h-4 border rounded-full checked:border-4 checked:border-purple-600" />
                    </label>
                    <label className="dark:text-white font-semibold has-[input:checked]:border-cyan-600 has-[input:checked]:text-cyan-500 has-[input:checked]:bg-cyan-50 dark:has-[input:checked]:bg-transparent w-32 border-2 border-gray-500 dark:border-white rounded-md px-2 py-1 flex justify-between items-center">
                        Aceptadas
                        <input type="radio" name="tipo" value="Aceptadas" onChange={handleRadioChange} className="appearance-none w-4 h-4 border rounded-full checked:border-4 checked:border-cyan-600" />
                    </label>
                    <label className="dark:text-white font-semibold has-[input:checked]:border-red-600 has-[input:checked]:text-red-500 has-[input:checked]:bg-red-50 dark:has-[input:checked]:bg-transparent w-32 border-2 border-gray-500 dark:border-white rounded-md px-2 py-1 flex justify-between items-center">
                        Rechazadas
                        <input type="radio" name="tipo" value="Rechazadas" onChange={handleRadioChange} className="appearance-none w-4 h-4 border rounded-full checked:border-4 checked:border-red-600" />
                    </label>
                </div>
                <div className="flex justify-center flex-wrap gap-x-5">
                    {trabajos.length !== 0 ? (
                        trabajos.some(tra => tra.status !== "En espera" && tra.status !== "Cancelado" && tra.status !== "Completado") ? (
                            trabajos.map((tra) => (
                                (tra.status === "Rechazado" && (selectedOption === "Rechazadas" || selectedOption === "Todas") && (
                                    <div key={tra._id} className="w-fit h-fit py-4 px-5 radial-gradientRechazados-bg rounded-lg shadow-lg shadow-fuchsia-300 mb-5">
                                        <h1 className="text-center text-2xl pb-1.5 border-b-2 font-semibold text-white">{tra.servicio}</h1>
                                        <div className="flex justify-center items-center gap-x-3 mt-1.5">
                                            <div className="w-[65px] h-[65px] rounded-full overflow-hidden shrink-0">
                                                <img src={tra.proveedor.f_perfil} alt="fotoPERFILprov" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="-space-y-0.5">
                                                <p className="text-xl font-semibold text-white truncate w-28">{tra.proveedor.nombre}</p>
                                                <p className="font-semibold text-emerald-900">{tra.fecha.split('T')[0]}</p>
                                                <p className="font-semibold">{tra.desde} - {tra.hasta}</p>
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
                                        <div className="flex justify-around mt-2">
                                            <button type="button" className="px-3 py-2 bg-red-200 rounded-md text-red-800 font-semibold hover:scale-105 duration-300 cursor-pointer" onClick={async() => {await EliminarTrabajo(tra._id, tra.servicio) }}>Eliminar</button>
                                        </div>
                                    </div>
                                ))
                                || (tra.status === "Agendado" && (selectedOption === "Aceptadas" || selectedOption === "Todas") && (
                                    <div key={tra._id} className="w-fit h-fit py-4 px-5 radial-gradientAceptados-bg rounded-lg shadow-lg shadow-cyan-300 mb-5">
                                        <h1 className="text-center text-2xl pb-1.5 border-b-2 font-semibold text-white">{tra.servicio}</h1>
                                        <div className="flex justify-center items-center gap-x-3 mt-1.5">
                                            <div className="w-[65px] h-[65px] rounded-full overflow-hidden shrink-0">
                                                <img src={tra.proveedor.f_perfil} alt="fotoPERFILprov" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="-space-y-0.5">
                                                <p className="text-xl font-semibold text-white truncate w-28">{tra.proveedor.nombre}</p>
                                                <p className="font-semibold text-cyan-800">{tra.fecha.split('T')[0]}</p>
                                                <p className="font-semibold">{tra.desde.split('T')[1].split('.')[0].split(':')[0]+':00'} - {tra.hasta.split('T')[1].split('.')[0].split(':')[0]+':00'}</p>
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
                                        <div className="flex justify-around mt-2">
                                            <button type="button" className="px-3 py-2 bg-red-200 rounded-md text-red-800 font-semibold hover:scale-105 duration-300 cursor-pointer" onClick={
                                                async () =>{{
                                                    await cancelarTrabajo(tra._id, tra.servicio, tra.proveedor._id)
                                                }}
                                            }>Cancelar</button>
                                        </div>
                                    </div>
                                ))
                            )
                            )
                        ) : (
                            <div className="w-[250px] h-[265px] px-5 bg-gray-400 rounded-lg border-2 border-dashed flex justify-center items-center">
                                <p className="text-lg text-gray-700 font-semibold">Todos los trabajos están en espera</p>
                            </div>
                        )
                    ) : (
                        <div className="w-[250px] h-[265px] px-5 mb-5 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-slate-700 flex flex-col justify-center items-center">
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
            </section>
        </>
    )
}

export default ContratosCliente