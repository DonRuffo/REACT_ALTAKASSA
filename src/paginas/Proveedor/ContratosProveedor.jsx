import axios from "axios";
import React, { useContext } from "react";
import '../../../CSS/fondos.css'
import OfertaContext from "../../context/OfertasProvider";
import logoMenu from '../../assets/category.png'
import logoMenuAbierto from '../../assets/hamburger.png'
import AuthContext from "../../context/AuthProvider";
import imgSinTrabajo from '../../assets/Tiempo.svg'

const ContratosProv = () => {
    const { trabajos } = useContext(OfertaContext)
    const { menu, handleMenu } = useContext(AuthContext)
    return (
        <>
            <div className="lg:hidden pb-2 mt-5">
                <img src={logoMenu} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === true ? 'hidden' : ''} cursor-pointer duration-300`} />
                <img src={logoMenuAbierto} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === false ? 'hidden' : ''} cursor-pointer duration-300`} />
            </div>
            <section>
                <h1 className="text-center text-purple-600 font-semibold text-3xl mb-3 mt-5">Trabajos actuales</h1>
                <h2 className="text-xl mb-5 text-center dark:text-white">Aquí podrás ver tus trabajos agendados</h2>
                <div className="flex justify-center flex-wrap gap-3">
                    {trabajos.length !== 0 && trabajos.some((tra) => tra.status === "Agendado") ? trabajos.map((tra) => (
                        tra.status === "Agendado" && (
                            <div key={tra._id} className="w-[300px] lg:w-[330px] h-[285px] radial-gradientAceptados-bg rounded-lg shadow-lg shadow-purple-400">
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
                        )
                    )) : (
                        <div className="w-[300px] lg:w-[330px] h-[285px] mb-5 shadow-lg dark:shadow-slate-800 bg-gray-100 dark:bg-gray-900 rounded-lg flex flex-col justify-center items-center">
                            <img src={imgSinTrabajo} alt="SinTrabajos" width={150} height={150} />
                            <p className="text-lg dark:text-white font-semibold text-center">No se han agendado trabajos todavía</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default ContratosProv