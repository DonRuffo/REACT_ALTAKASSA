import axios from "axios";
import React, { useEffect, useState } from "react";
import '../../CSS/fondos.css'

const SolicitudProv = () => {
    const [trabajos, setTrabajos] = useState([])

    const ObtenerTrabajos = async() =>{
        try{
            const token = localStorage.getItem('token')
            const url = "http://localhost:5000/api/verTrabajos"
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setTrabajos(respuesta.data)
            console.log(trabajos)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        ObtenerTrabajos()
    }, [])

    return (
        <>
            <h1 className="text-center font-semibold text-3xl text-purple-800 mb-5">Solicitudes</h1>
            <h2 className="text-xl mb-5 text-center">Aquí puedes ver tus solicitudes de trabajo</h2>
            <section>
                <div className="flex justify-center gap-3 flex-wrap">
                    {trabajos.length!=0 ? trabajos.map((tra, index)=>(
                        <div key={index} className="w-[325px] h-[255px] radial-gradientTrabajos-bg rounded-lg shadow-lg shadow-blue-500">
                            <h1 className="text-center text-2xl mt-2 pb-2 border-b-2 font-semibold">{tra.servicio}</h1>
                            <div className="flex justify-around mt-2">
                                <p className="font-semibold">Tipo: <span className="text-purple-700">{tra.tipo === 'precioPorDia' ? 'Por Día' : 'Por Horas'}</span></p>
                                <p className="font-semibold">Fecha: <span className="text-purple-700">{tra.fecha.split('T')[0]}</span></p>
                            </div>
                            <p className="text-center font-semibold">Horario: <span className="text-white">{tra.desde} - {tra.hasta}</span></p>
                            <div className="flex justify-center mt-3">
                                <h1 className="text-5xl font-semibold">
                                    ${tra.precioTotal}
                                </h1>
                            </div>
                            <p className="text-center">Precio Total</p>
                            <div className="flex justify-around mt-3">
                                <button className="px-4 py-2 bg-blue-700 rounded-md text-white hover:bg-blue-900 hover:scale-105 duration-300">Aceptar</button>
                                <button className="px-3 py-2 bg-red-700 rounded-md text-white hover:bg-red-900 hover:scale-105 duration-300">Rechazar</button>
                            </div>
                        </div>
                    )) : (
                        <div className="w-[325px] h-[235px] border-2 border-dashed  bg-gray-400 border-gray-600 rounded-lg shadow-lg flex justify-center items-center">
                            <p className="font-semibold text-xl text-slate-800 text-center">No existen solicitudes por el momento</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default SolicitudProv