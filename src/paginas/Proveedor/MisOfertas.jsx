import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ModalEditarOferta from "../../componentes/modals/ModalEditarOferta";
import OfertaContext from "../../context/OfertasProvider";
import iconoDelete from '../../assets/Icono-Delete.png'
import logoMenu from '../../assets/category.png'
import logoMenuAbierto from '../../assets/hamburger.png'
import { ToastContainer, toast } from "react-toastify";
import '../../../CSS/fondos.css'
import AuthContext from "../../context/AuthProvider";
import imgOferta from '../../assets/Pensando.svg'
import { Link } from "react-router-dom";
import SvgServicio from "../../componentes/Svgs/SvgLimpieza";

const ListadoOfertas = () => {
    const { modalEditOf, setModalEditOf, oferta, ListarOfertas } = useContext(OfertaContext)
    const [ofertaSeleccionada, setOfertaSeleccionada] = useState(null)
    const { menu, handleMenu, setOpcionActiva } = useContext(AuthContext)

    const EliminarOferta = async (id, indx) => {
        try {
            const confirmar = confirm(`¿Estás seguro de eliminar la Oferta N°${indx}?`)
            if (confirmar) {
                const token = localStorage.getItem('token')
                const rol = localStorage.getItem('rol')
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
                ListarOfertas(rol, token)
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
            <div className="lg:hidden pb-2 mt-5">
                <img src={logoMenu} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === true ? 'hidden' : ''} cursor-pointer duration-300`} />
                <img src={logoMenuAbierto} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === false ? 'hidden' : ''} cursor-pointer duration-300`} />
            </div>
            <h1 className="text-3xl text-center font-semibold text-purple-600 mb-3 mt-5">Tus ofertas</h1>
            <h2 className="text-xl mb-5 text-center dark:text-white">Aquí puedes ver tus ofertas creadas</h2>
            <div className="flex justify-center gap-3 flex-wrap">
                {oferta.length !== 0 ? oferta.map((of, index) => (
                    <div key={of._id} className="radial-gradientOfertas-bg h-[250px] w-[200px] rounded-lg shadow-lg shadow-purple-400 mb-5">
                        <h1 className="text-center pt-2 font-bold text-xl text-white pb-2 mb-2 border-b">
                            Oferta N°{index + 1}
                        </h1>
                        <h1 className="text-center font-bold text-yellow-400 text-xl">
                            {of.servicio}
                        </h1>
                        <p className="text-center flex justify-center">
                            {<SvgServicio servicio={of.servicio} />}
                        </p>
                        <p className="text-center font-semibold text-white">
                            <b className="text-xl mr-1 text-yellow-500">${of.precioPorDia}</b>
                            <span>el día</span>
                        </p>
                        <p className="text-center font-semibold text-white">
                            <b className="text-xl mr-1 text-yellow-500">${of.precioPorHora}</b>
                            <span>la hora</span>
                        </p>
                        <div className="flex justify-around mt-3">
                            <button className="px-3 py-1 bg-purple-800 rounded-md text-white font-semibold hover:bg-purple-900 duration-300 hover:scale-110" onClick={() => { handleModalEditOf(of._id); setModalEditOf(!modalEditOf) }}>
                                Editar
                            </button>
                            <button className="px-2 py-1 rounded-md bg-gray-800 hover:bg-black hover:scale-110 duration-300" onClick={() => { handleModalEditOf(of._id); EliminarOferta(of._id, index + 1) }}><img src={iconoDelete} alt="iconoDelete" /></button>
                        </div>
                        {ofertaSeleccionada === of._id && modalEditOf && (
                            <ModalEditarOferta idOferta={of._id} listarOfertas={ListarOfertas} />
                        )}
                    </div>
                )) : (
                    <div className="w-[200px] h-[260px] mb-5 bg-gray-100 shadow-lg dark:shadow-slate-800 dark:bg-gray-900 flex flex-col justify-center items-center rounded-lg px-4">
                        <img src={imgOferta} alt="sinOferta" width={125} height={100} />
                        <h1 className="text-lg text-center dark:text-white font-semibold">Aún no has creado ninguna oferta</h1>
                        <Link to='/dashboard' onClick={()=>setOpcionActiva('inicio')} className="group flex justify-center items-center px-3 py-1 rounded-2xl bg-emerald-700 mt-3 font-semibold text-white text-center cursor-pointer hover:bg-emerald-800 hover:brightness-110 transition-all duration-300">
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
        </>
    );
};

export default ListadoOfertas;
