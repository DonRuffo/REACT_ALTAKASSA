import React, { useState } from "react";

import AuthStoreContext from "../../store/AuthStore";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import ModalPublicaciones from "../../componentes/modals/ModalPublicaciones";

const InicioAdmin = () => {
    const { auth, modalUsers, setModalUsers, users } = AuthStoreContext()
    const [ofertaSeleccionada, setOfertaSeleccionada] = useState(null)

    const handleModalPubli = (id) => {
        setOfertaSeleccionada(id);
    };

    const eliminarUser = async (id, nombre) => {
        const token = localStorage.getItem('token')
        if (!token) return
        const confirmar = confirm(`¿Desea elminar al usuario ${nombre}?`)
        if (confirmar) {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/eliminarUser/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const respuesta = await axios.delete(url, options)
                toast.success(respuesta.data.msg)
            } catch (error) {
                console.error("No valio", error)
                toast.error(error.response.data.msg)
            }
        }
    }

    

    return (
        <>
            <ToastContainer
                toastStyle={{backgroundColor:'#1c2833 ', color:'white'}}
                closeOnClick
                position="bottom-center"
            />
            <section className="mt-20 lg:mt-5 px-4">
                <h1 className="text-2xl lg:text-3xl text-purple-600 font-CalSans text-center">Bienvenido {auth.nombre} {auth.apellido}</h1>
                <p className="text-lg lg:text-xl dark:text-white text-center">Te presento la lista de usuarios del sistema, puedes revisarlos</p><br />
                <div className="flex justify-center">
                    <table className="w-full lg:w-3/5 text-white  rounded-lg shadow-lg dark:shadow-cyan-900 overflow-hidden">
                        <thead className="bg-cyan-700 text-xs md:text-lg">
                            <tr>
                                <th className="py-2 pl-2.5">N°</th>
                                <th className="w-20 md:w-auto">Nombre</th>
                                <th>Provincia</th>
                                <th>C. Cliente</th>
                                <th>C. Proveedor</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-cyan-950 text-xs md:text-base divide-y divide-gray-700">
                            {users.map(((us, index) => (
                                <React.Fragment key={us._id}>
                                    <tr key={us._id}>
                                        <td className="py-1.5 text-center">{index + 1}</td>
                                        <td className="text-center">{us.nombre} {us.apellido}</td>
                                        <td className="text-center">{us.direccion}</td>
                                        <td className="text-center">{Number(us.promedioCliente).toFixed(1)}</td>
                                        <td className="text-center">{Number(us.promedioProveedor).toFixed(1)}</td>
                                        <td className="flex gap-x-1 md:gap-x-2 lg:gap-x-3 justify-center py-1.5">
                                            <svg xmlns="http://www.w3.org/2000/svg" role="button" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6 cursor-pointer hover:text-green-500 transition-all ease-in-out duration-200" onClick={() => { handleModalPubli(us._id); setModalUsers(true) }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>

                                            <svg xmlns="http://www.w3.org/2000/svg" role="button" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-label="eliminar" className="size-6 cursor-pointer hover:text-red-500 transition-all ease-in-out duration-200" onClick={async () => { await eliminarUser(us._id, us.nombre) }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                            </svg>
                                        </td>

                                    </tr>
                                    {ofertaSeleccionada === us._id && modalUsers && (
                                        <tr>
                                            <td colSpan={6}>
                                                <ModalPublicaciones idRev={us._id} />
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>

                            )))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

export default InicioAdmin