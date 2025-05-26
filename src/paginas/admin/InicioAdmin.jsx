import React, { useEffect, useState } from "react";

import AuthStoreContext from "../../store/AuthStore";
import axios from "axios";

const InicioAdmin = () => {
    const { auth } = AuthStoreContext()
    const [user, setUsers] = useState([])

    const traerUsuarios = async () => {
        const token = localStorage.getItem('token')
        if (!token) return
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/listarUsuarios`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const respuesta = await axios.get(url, options)
            setUsers(respuesta.data)
        } catch (error) {
            console.error("No valio", error)
        }
    }

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
                setUsers(respuesta.data)
            } catch (error) {
                console.error("No valio", error)
            }
        }
    }

    useEffect(() => {
        traerUsuarios()
    }, [])

    return (
        <>
            <section className="mt-20 lg:mt-5 px-4">
                <h1 className="text-2xl lg:text-3xl text-purple-600 font-CalSans text-center">Bienvenido {auth.nombre} {auth.apellido}</h1>
                <p className="text-lg lg:text-xl dark:text-white text-center">Te presento la lista de usuarios del sistema, puedes revisarlos</p><br />
                <div className="flex justify-center">
                    <table className="w-full lg:w-3/5 dark:text-white outline-2 outline-cyan-600 rounded-xl overflow-hidden">
                        <thead className="bg-cyan-700 text-xs md:text-lg">
                            <tr>
                                <th className="py-2">N°</th>
                                <th className="w-20 md:w-auto">Nombre</th>
                                <th>Provincia</th>
                                <th>C. Cliente</th>
                                <th>C. Proveedor</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-cyan-950 text-xs md:text-base">
                            {user.map(((us, index) => (
                                <tr key={us._id}>
                                    <th className="py-1.5">{index + 1}</th>
                                    <th>{us.nombre} {us.apellido}</th>
                                    <th>{us.direccion}</th>
                                    <th>{us.calificacionCliente}</th>
                                    <th>{us.calificacionProveedor}</th>
                                    <th className="flex gap-x-1 md:gap-x-2 lg:gap-x-3 justify-center py-1.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6 cursor-pointer hover:text-green-500 transition-all ease-in-out duration-200">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6 cursor-pointer hover:text-amber-500 transition-all ease-in-out duration-200">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6 cursor-pointer hover:text-red-500 transition-all ease-in-out duration-200" onClick={async () => { await eliminarUser(us._id, us.nombre) }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                        </svg>
                                    </th>
                                </tr>
                            )))}
                        </tbody>
                    </table>
                </div>

            </section>
        </>
    )
}

export default InicioAdmin