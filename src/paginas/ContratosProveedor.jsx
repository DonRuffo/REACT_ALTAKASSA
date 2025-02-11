import axios from "axios";
import React, { useEffect, useState } from "react";
import '../../CSS/fondos.css'

const ContratosProv = () => {
    const [trabajos, setTrabajos] = useState([])
    const ObtenerTrabajos = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/trabajos-proveedor`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setTrabajos(respuesta.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        ObtenerTrabajos()
    }, [])
    return (
        <>
            <section>
                <h1 className="text-center text-purple-800 font-semibold text-3xl mb-3">Trabajos actuales</h1>
                <h2 className="text-xl mb-5 text-center">Aquí podrás ver tus trabajos agendados</h2>
                <div className="flex justify-center flex-wrap gap-3">
                    {trabajos.length!==0 ? trabajos.map((tra, index) => (
                        tra.status === "Agendado" && (
                            <div key={index} className="w-[330px] h-[285px] radial-gradientAceptados-bg rounded-lg shadow-lg shadow-purple-400">
                                <h1 className="text-center text-2xl mt-2 pb-2 border-b-2 font-semibold text-white">{tra.servicio}</h1>
                                <p className="text-center text-xl mt-1 font-semibold">Proveedor: <span className="text-white">{tra.proveedor.nombre} {tra.proveedor.apellido}</span></p>
                                <div className="flex justify-around mt-2">
                                    <p className="font-semibold">Tipo: <span className="text-white">{tra.tipo === 'precioPorDia' ? 'Por Día' : 'Por Horas'}</span></p>
                                    <p className="font-semibold">Fecha: <span className="text-red-700">{tra.fecha.split('T')[0]}</span></p>
                                </div>
                                <p className="text-center font-semibold">Horario: <span className="text-red-700">{tra.desde} - {tra.hasta}</span></p>
                                <div className="flex justify-around items-center mt-3">
                                    <h1 className="text-5xl font-semibold">${tra.precioTotal = Math.round(tra.precioTotal * 100)/100}</h1>
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
                    )):(
                        <div className="w-[330px] h-[285px] bg-gray-400 rounded-lg border-2 border-dashed flex justify-center items-center">
                                <p className="text-lg text-gray-700 font-semibold">No hay trabajos agendados</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default ContratosProv