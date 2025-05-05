import axios from "axios";
import React, { useState } from "react";
import '../../../CSS/fondos.css'
import ModalActualizar from "../../componentes/modals/ModalActualizar";
import imgSinTrabajo from '../../assets/Tiempo.svg'
import { Link } from "react-router-dom";
import OfertaStore from "../../store/OfertaStore";
import AuthStoreContext from "../../store/AuthStore";
import EsqueletoSoliCli from "../Esqueletos/EsqSolicitudesCli";

const SolicitudesCli = () => {
    const [trabajoSeleccionado, setTrabajoSeleccioando] = useState(null)
    const [ofertaSeleccionada, setOfertaSeleccionada] = useState(null)
    const { modalTraActual, setModalTraActual, trabajos, pulseTra, ObtenerTrabajos } = OfertaStore()
    const { setOpcionActiva } = AuthStoreContext()

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
                const respuesta = await axios.delete(url, options)
                await ObtenerTrabajos(token, rol, tipo)
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            {pulseTra ? <EsqueletoSoliCli />
                : (
                    <>
                        <section>
                            <h1 className="text-3xl text-center text-cyan-600 font-CalSans mt-5">Solicitudes</h1>
                            <p className="text-xl text-center font-semibold mb-5 dark:text-white">Aquí podrás visualizar tus solicitudes de trabajo como cliente</p>
                            <div className="flex justify-center gap-x-5 flex-wrap">
                                {trabajos.length !== 0 && trabajos.some(tra => tra.status === "En espera") ? (
                                    trabajos.map((tra) => (
                                        tra.status === "En espera" && (
                                            <div key={tra._id} className="w-fit h-fit max-w-64 py-4 px-5 radial-gradientTrabajos-bg rounded-lg shadow-lg shadow-cyan-300 mb-5">
                                                <h1 className="text-center text-2xl pb-1.5 border-b-2 font-semibold text-white">{tra.servicio}</h1>
                                                <div className="flex justify-center items-center text-wrap gap-x-3 mt-1.5">
                                                    <div className="w-[65px] h-[65px] rounded-full overflow-hidden shrink-0">
                                                        <img src={tra.proveedor.f_perfil} alt="fotoPERFILprov" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="-space-y-0.5">
                                                        <p className="text-xl font-semibold text-white truncate w-28">{tra.proveedor.nombre}</p>
                                                        <p className="font-semibold text-cyan-800">{tra.fecha.split('T')[0]}</p>
                                                        <p className="font-semibold">{tra.desde.split('T')[1].split('.')[0].split(':')[0]+':00'} - {tra.hasta.split('T')[1].split('.')[0].split(':')[0]+':00'}</p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-center mt-1.5">
                                                    <h1 className="text-4xl font-semibold text-amber-900">
                                                        ${tra.precioTotal = Math.round(tra.precioTotal * 100) / 100}
                                                    </h1>
                                                </div>
                                                <p className="text-center">Total {tra.tipo === 'precioPorDia' ? 'por Día' : 'por Horas'}</p>
                                                <div className="flex justify-around mt-2 gap-x-4">
                                                    <button className="px-3 py-2 bg-cyan-200 rounded-md text-cyan-700 font-semibold  hover:scale-105 duration-300 cursor-pointer" onClick={() => { seleccionarTrabajo(tra._id); seleccionarOferta(tra.oferta._id); setModalTraActual(!modalTraActual) }}>Actualizar</button>
                                                    <button type="button" className="px-3 py-2 bg-red-200 rounded-md text-red-700 font-semibold  hover:scale-105 duration-300 cursor-pointer" onClick={async () => { await EliminarTrabajo(tra._id, tra.servicio) }}>Eliminar</button>
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
                    </>
                )}
        </>
    )
}


export default SolicitudesCli