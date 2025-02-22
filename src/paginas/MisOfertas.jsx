import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ModalEditarOferta from "../componentes/modals/ModalEditarOferta";
import OfertaContext from "../context/OfertasProvider";
import iconoDelete from '../assets/Icono-Delete.png'
import logoMenu from '../assets/category.png'
import logoMenuAbierto from '../assets/hamburger.png'
import { ToastContainer, toast } from "react-toastify";
import '../../CSS/fondos.css'
import AuthContext from "../context/AuthProvider";

const ListadoOfertas = () => {
    const { modalEditOf, setModalEditOf, oferta, ListarOfertas} = useContext(OfertaContext)
    const [ofertaSeleccionada, setOfertaSeleccionada] = useState(null)
    const {menu, handleMenu} = useContext(AuthContext)

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
            <div className="lg:hidden pb-2">
                <img src={logoMenu} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === true ? 'hidden' : ''} cursor-pointer duration-300`} />
                <img src={logoMenuAbierto} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === false ? 'hidden' : ''} cursor-pointer duration-300`} />
            </div>
            <h1 className="text-3xl text-center font-semibold text-purple-800 mb-5">Tus ofertas</h1>
            <h2 className="text-xl mb-5 text-center dark:text-white">Aquí puedes ver tus ofertas creadas</h2>
            <div className="flex justify-center gap-3 flex-wrap">
                {oferta.length !== 0 ? oferta.map((of, index) => (
                    <div key={of._id} className="border radial-gradientOfertas-bg h-[250px] w-[200px] rounded-lg shadow-lg shadow-blue-400">
                        <h1 className="text-center pt-2 font-bold text-xl text-white pb-2 mb-2 border-b">
                            Oferta N°{index + 1}
                        </h1>
                        <h1 className="text-center font-semibold text-yellow-400 text-lg mb-2">
                            {of.servicio}
                        </h1>
                        <p className="text-center font-semibold text-white">
                            Precio/Día:{" "}
                            <b className="text-xl ml-5 text-yellow-500">${of.precioPorDia}</b>
                        </p>
                        <p className="text-center font-semibold text-white">
                            Precio/Hora:{" "}
                            <b className="text-xl ml-5 text-yellow-500">${of.precioPorHora}</b>
                        </p>
                        <div className="flex justify-around mt-10">
                            <button className="px-3 py-1 bg-blue-800 rounded-md text-white font-semibold hover:bg-blue-900 duration-300 hover:scale-110" onClick={() => { handleModalEditOf(of._id); setModalEditOf(!modalEditOf) }}>
                                Editar
                            </button>
                            <button className="px-2 py-1 rounded-md bg-red-600 hover:bg-red-800 hover:scale-110 duration-300" onClick={() => { handleModalEditOf(of._id); EliminarOferta(of._id, index + 1) }}><img src={iconoDelete} alt="iconoDelete" /></button>
                        </div>
                        {ofertaSeleccionada === of._id && modalEditOf && (
                            <ModalEditarOferta idOferta={of._id} listarOfertas={ListarOfertas} />
                        )}
                    </div>
                )) : (
                    <div className="w-[300px] h-[225px] bg-gray-300 flex justify-center items-center border-2 border-dashed border-gray-600 rounded-lg px-4">
                        <h1 className="text-2xl text-center text-gray-500">Aún no has creado ninguna oferta</h1>
                    </div>
                )}
            </div>
        </>
    );
};

export default ListadoOfertas;
