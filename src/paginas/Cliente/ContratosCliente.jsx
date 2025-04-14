import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import '../../../CSS/fondos.css'
import OfertaContext from "../../context/OfertasProvider";
import AuthContext from "../../context/AuthProvider";
import logoMenu from '../../assets/category.png'
import logoMenuAbierto from '../../assets/hamburger.png'
import imgSinTrabajo from '../../assets/Tiempo.svg'
import { Link } from "react-router-dom";

const ContratosCliente = () => {

    const { trabajos, setTrabajos } = useContext(OfertaContext)
    const { menu, handleMenu } = useContext(AuthContext)
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
                const url = `${import.meta.env.VITE_BACKEND_URL}/eliminarTrabajo/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.delete(url, options)
                ObtenerTrabajos()
            } catch (error) {
                console.log(error);

            }
        }
    }
    return (
        <>
            <div className="lg:hidden pb-2 mt-5">
                <img src={logoMenu} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === true ? 'hidden' : ''} cursor-pointer duration-300`} />
                <img src={logoMenuAbierto} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === false ? 'hidden' : ''} cursor-pointer duration-300`} />
            </div>
            <section>
                <h1 className="text-center text-purple-600 font-semibold text-3xl mt-5">Trabajos actuales</h1>
                <p className="text-center font-semibold text-xl mb-5 dark:text-white">Aquí podrás ver las solicitudes que han sido aceptadas o rechazadas por los proveedores</p>
                <div className="flex flex-wrap gap-2 mb-5">
                    <label className="dark:text-white  font-semibold has-[input:checked]:border-purple-600 has-[input:checked]:text-purple-500 has-[input:checked]:bg-purple-50 dark:has-[input:checked]:bg-transparent  w-36 border-2 rounded-md px-2 py-1 flex justify-between items-center">
                        Todas
                        <input type="radio" name="tipo" value="Todas" onChange={handleRadioChange} className="appearance-none w-4 h-4 border rounded-full checked:border-4 checked:border-purple-600" />
                    </label>
                    <label className="dark:text-white font-semibold has-[input:checked]:border-purple-600 has-[input:checked]:text-purple-500 has-[input:checked]:bg-purple-50 dark:has-[input:checked]:bg-transparent w-36 border-2 rounded-md px-2 py-1 flex justify-between items-center">
                        Aceptadas
                        <input type="radio" name="tipo" value="Aceptadas" onChange={handleRadioChange} className="appearance-none w-4 h-4 border rounded-full checked:border-4 checked:border-purple-600" />
                    </label>
                    <label className="dark:text-white font-semibold has-[input:checked]:border-purple-600 has-[input:checked]:text-purple-500 has-[input:checked]:bg-purple-50 dark:has-[input:checked]:bg-transparent w-36 border-2 rounded-md px-2 py-1 flex justify-between items-center">
                        Rechazadas
                        <input type="radio" name="tipo" value="Rechazadas" onChange={handleRadioChange} className="appearance-none w-4 h-4 border rounded-full checked:border-4 checked:border-purple-600" />
                    </label>
                </div>
                <div className="flex justify-center flex-wrap gap-3">
                    {trabajos.length !== 0 ? (
                        trabajos.some(tra => tra.status !== "En espera") ? (
                            trabajos.map((tra) => (
                                (tra.status === "Rechazado" && (selectedOption === "Rechazadas" || selectedOption === "Todas") && (
                                    <div key={tra._id} className="w-[300px] lg:w-[330px] h-[285px] radial-gradientRechazados-bg rounded-lg shadow-lg dark:shadow-slate-500 mb">
                                        <h1 className="text-center text-2xl mt-2 pb-2 border-b-2 font-semibold text-white">{tra.servicio}</h1>
                                        <p className="text-center text-xl mt-1 font-semibold">Proveedor: <span className="text-white">{tra.proveedor.nombre} {tra.proveedor.apellido}</span></p>
                                        <div className="flex justify-around mt-2">
                                            <p className="font-semibold">Tipo: <span className="text-white">{tra.tipo === 'precioPorDia' ? 'Por Día' : 'Por Horas'}</span></p>
                                            <p className="font-semibold">Fecha: <span className="text-red-700">{tra.fecha.split('T')[0]}</span></p>
                                        </div>
                                        <p className="text-center font-semibold">Horario: <span className="text-red-700">{tra.desde} - {tra.hasta}</span></p>
                                        <div className="flex justify-around items-center mt-3">
                                            <h1 className="text-5xl font-semibold">${tra.precioTotal = Math.round(tra.precioTotal * 100) / 100}</h1>
                                            <h1 className="text-2xl font-semibold">{tra.status}</h1>
                                        </div>
                                        <div className="flex">
                                            <p className="pl-9 pr-20 text-center">Precio Total</p>
                                            <p className="pl-5 text-center" >Estado</p>
                                        </div>
                                        <div className="flex justify-around mt-3">
                                            <button type="button" className="px-3 py-2 bg-red-700 rounded-md text-white hover:bg-red-900 hover:scale-105 duration-300" onClick={() => { EliminarTrabajo(tra._id, tra.servicio) }}>Eliminar</button>
                                        </div>
                                    </div>
                                ))
                                || (tra.status === "Agendado" && (selectedOption === "Aceptadas" || selectedOption === "Todas") && (
                                    <div key={tra._id} className="w-[300px] lg:w-[330px] h-[285px] radial-gradientAceptados-bg rounded-lg shadow-lg dark:shadow-slate-500 mb-5">
                                        <h1 className="text-center text-2xl mt-2 pb-2 border-b-2 font-semibold text-white">{tra.servicio}</h1>
                                        <p className="text-center text-xl mt-1 font-semibold">Proveedor: <span className="text-white">{tra.proveedor.nombre} {tra.proveedor.apellido}</span></p>
                                        <div className="flex justify-around mt-2">
                                            <p className="font-semibold">Tipo: <span className="text-white">{tra.tipo === 'precioPorDia' ? 'Por Día' : 'Por Horas'}</span></p>
                                            <p className="font-semibold">Fecha: <span className="text-red-700">{tra.fecha.split('T')[0]}</span></p>
                                        </div>
                                        <p className="text-center font-semibold">Horario: <span className="text-red-700">{tra.desde} - {tra.hasta}</span></p>
                                        <div className="flex justify-around items-center mt-3">
                                            <h1 className="text-5xl font-semibold">${tra.precioTotal = Math.round(tra.precioTotal * 100) / 100}</h1>
                                            <h1 className="text-2xl font-semibold">{tra.status}</h1>
                                        </div>
                                        <div className="flex">
                                            <p className="pl-9 pr-20 text-center">Precio Total</p>
                                            <p className="pl-5 text-center" >Estado</p>
                                        </div>
                                        <div className="flex justify-around mt-3">
                                            <button type="button" className="px-3 py-2 bg-red-700 rounded-md text-white hover:bg-red-900 hover:scale-105 duration-300">Cancelar</button>
                                        </div>
                                    </div>
                                ))
                            )
                            )
                        ) : (
                            <div className="w-[300px] lg:w-[330px] h-[285px] bg-gray-400 rounded-lg border-2 border-dashed flex justify-center items-center">
                                <p className="text-lg text-gray-700 font-semibold">Todos los trabajos están en espera</p>
                            </div>
                        )
                    ) : (
                        <div className="w-[300px] lg:w-[330px] h-[285px] mb-5 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg flex flex-col justify-center items-center">
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