import axios from "axios";
import React, { useState } from "react";
import ModalEditarOferta from "../../componentes/modals/ModalEditarOferta";
import { ToastContainer, toast } from "react-toastify";
import '../../../CSS/fondos.css'
import { Link } from "react-router-dom";
import SvgServicio from "../../componentes/Svgs/SvgLimpieza";
import OfertaStore from "../../store/OfertaStore";
import AuthStoreContext from "../../store/AuthStore";
import EsqueletoOfertas from "../Esqueletos/EsqOfertas";
import { Tooltip } from "react-tooltip";

const ListadoOfertas = () => {
    const { modalEditOf, setModalEditOf, ofertaProvs, pulseMisOfertas } = OfertaStore()

    const { setOpcionActiva, auth } = AuthStoreContext()
    const [ofertaSeleccionada, setOfertaSeleccionada] = useState(null)
    const EliminarOferta = async (id, indx) => {
        try {
            const confirmar = confirm(`¿Estás seguro de eliminar la Oferta N°${indx}?`)
            if (confirmar) {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/eliminarOferta/${id}`
                const options = {
                    headers: {
                        method: 'DELETE',
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                const respuesta = await axios.delete(url, options)
                toast.success(respuesta.data.msg)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg)
        }

    }

    const handleModalEditOf = (id) => {
        setOfertaSeleccionada(id);
    };

    return (
        <>
            <ToastContainer
                toastStyle={{ backgroundColor: '#1c2833 ', color: 'white' }}
                closeOnClick
                position="bottom-center"
            />
            {pulseMisOfertas ? <EsqueletoOfertas />
                : (
                    <div className="relative">
                        <div className="hidden md:block absolute md:top-2 md:right-5">
                            <p className="font-semibold dark:text-white">Ofertas restantes: <span className="text-cyan-500">{auth.cantidadOfertas}</span></p>
                        </div>
                        <h1 className="text-3xl text-center font-CalSans text-cyan-500 mb-3 mt-20 lg:mt-5">Tus ofertas</h1>
                        <h2 className="text-xl text-center md:mb-5 dark:text-white">Aquí puedes ver tus ofertas creadas</h2>
                        <p className="font-semibold md:hidden dark:text-white text-center mb-5">Ofertas restantes: <span className="text-cyan-500">{auth.cantidadOfertas}</span></p>
                        <div className="flex justify-center gap-x-3 flex-wrap">
                            {ofertaProvs.length !== 0 ? ofertaProvs.map((of, index) => (
                                <div key={of._id} className="radial-gradientOfertas-bg h-fit w-fit px-8 py-3  rounded-lg shadow-lg shadow-cyan-400 mb-5">
                                    <h1 className="text-center font-bold text-xl text-white pb-1.5 mb-1.5 border-b">
                                        Oferta N°{index + 1}
                                    </h1>
                                    <h1 className="text-center font-bold text-teal-300 text-xl truncate w-28">
                                        {of.servicio}
                                    </h1>
                                    <p className="text-center flex justify-center">
                                        {<SvgServicio servicio={of.servicio} />}
                                    </p>
                                    <p className="text-center font-semibold text-white">
                                        <b className="text-xl mr-1 text-teal-300">${of.precioPorDia}</b>
                                        <span>el día</span>
                                    </p>
                                    <p className="text-center font-semibold text-white">
                                        <b className="text-xl mr-1 text-teal-300">${of.precioPorHora}</b>
                                        <span>la hora</span>
                                    </p>
                                    <div className="flex justify-between mt-3">

                                        <button data-tooltip-id="editar" data-tooltip-content={'Editar'} className="flex flex-col justify-center items-center bg-transparent rounded-md text-gray-50 font-semibold  hover:scale-110 duration-300  cursor-pointer" onClick={() => { handleModalEditOf(of._id); setModalEditOf(!modalEditOf) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="size-7">
                                                <path d="M12 20h9" />
                                                <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                            </svg>
                                            <p className="text-sm lg:hidden">Editar</p>
                                        </button>
                                        <button data-tooltip-id="eliminar" data-tooltip-content={'Eliminar'} className="flex flex-col justify-center items-center rounded-md bg-transparent text-white hover:scale-110 duration-300 cursor-pointer" onClick={async () => { handleModalEditOf(of._id); await EliminarOferta(of._id, index + 1) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                            <p className="text-sm lg:hidden">Eliminar</p>
                                        </button>
                                    </div>
                                    {ofertaSeleccionada === of._id && modalEditOf && (
                                        <ModalEditarOferta idOferta={of._id} />
                                    )}
                                </div>
                            )) : (
                                <div className="w-[200px] h-[260px] mb-5 bg-gray-100 shadow-lg dark:shadow-slate-800 dark:bg-gray-900 flex flex-col justify-center items-center rounded-lg px-4">
                                    <img src={'https://mqpsbzrziuppiigkbiva.supabase.co/storage/v1/object/sign/altakassa/Pensando.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wODIxMTJiNC1kZDliLTQwZWUtYmUxMy1iNDZiMDI3Y2EzYTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhbHRha2Fzc2EvUGVuc2FuZG8uc3ZnIiwiaWF0IjoxNzUxNjc2ODUwLCJleHAiOjIwNjcwMzY4NTB9.se9s39iB2bSx4Cv-zbNzl6yB_5vOPlUSJ9yjZLR2RRg'} alt="sinOferta" width={125} height={100} />
                                    <h1 className="text-lg text-center dark:text-white font-semibold">Aún no has creado ninguna oferta</h1>
                                    <Link to='/dashboard/proveedor' onClick={() => setOpcionActiva('inicio')} className="group flex justify-center items-center px-3 py-1 rounded-2xl bg-emerald-700 mt-3 font-semibold text-white text-center cursor-pointer hover:bg-emerald-800 hover:brightness-110 transition-all duration-300">
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
                                        Crear
                                    </Link>
                                </div>
                            )}
                        </div>
                        <Tooltip id="eliminar" style={{
                            fontSize: 13
                        }} className="hidden lg:block" />
                        <Tooltip id="editar" style={{
                            fontSize: 13
                        }} className="hidden lg:block" />
                    </div>

                )}
        </>
    );
};

export default ListadoOfertas;
