import axios from "axios";
import React, { useEffect, useState } from "react";
import '../../CSS/fondos.css'

const ContratosCliente = () => {

    const [trabajos, setTrabajos] = useState([])
    const [selectedOption, setSelectedOption] = useState('')

    const handleRadioChange = (e) =>{
        const tipo = e.target.value
        setSelectedOption(tipo)
    }
    const ObtenerTrabajos = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = "http://localhost:5000/api/trabajos-cliente"
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setTrabajos(respuesta.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        ObtenerTrabajos()
    }, [])
    return (
        <>
            <section>
                <h1 className="text-center text-purple-800 font-semibold text-2xl my-2">Contratos actuales</h1>
                <p className="text-center font-semibold text-xl mb-5">Aquí podrás ver las solicitudes que han sido aceptadas o rechazadas por los proveedores</p>
                <div className="flex gap-2 mb-5">
                    <label className="has-[input:checked]:border-purple-600 has-[input:checked]:text-purple-800 has-[input:checked]:bg-purple-50  w-36 border-2 rounded-md px-2 py-1 flex justify-between items-center">
                        Todas
                        <input type="radio" name="tipo" value="Todas" onChange={handleRadioChange} className="appearance-none w-4 h-4 border rounded-full checked:border-4 checked:border-purple-800 checked:shadow-md checked:shadow-purple-400" />
                    </label>
                    <label className="has-[input:checked]:border-purple-600 has-[input:checked]:text-purple-800 has-[input:checked]:bg-purple-50  w-36 border-2 rounded-md px-2 py-1 flex justify-between items-center">
                        Aceptadas
                        <input type="radio" name="tipo" value="Aceptadas" onChange={handleRadioChange} className="appearance-none w-4 h-4 border rounded-full checked:border-4 checked:border-purple-800 checked:shadow-md checked:shadow-purple-400" />
                    </label>
                    <label className="has-[input:checked]:border-purple-600 has-[input:checked]:text-purple-800 has-[input:checked]:bg-purple-50  w-36 border-2 rounded-md px-2 py-1 flex justify-between items-center">
                        Rechazadas
                        <input type="radio" name="tipo" value="Rechazadas" onChange={handleRadioChange} className="appearance-none w-4 h-4 border rounded-full checked:border-4 checked:border-purple-800 checked:shadow-md checked:shadow-purple-400" />
                    </label>
                </div>
                <div className="flex justify-center flex-wrap gap-3">
                    {trabajos.length !== 0 ? (
                        trabajos.some(tra => tra.status !== "En espera") ? (
                            trabajos.map((tra, index) =>
                                tra.status === "Agendado" && selectedOption==="Aceptadas" && (
                                    <div key={index} className="w-[330px] h-[285px] radial-gradientTrabajos-bg rounded-lg shadow-lg shadow-blue-500">
                                        <h1 className="text-center text-2xl mt-2 pb-2 border-b-2 font-semibold">{tra.servicio}</h1>
                                        <p className="text-center text-xl mt-1">Proveedor: <span className="text-white">{tra.proveedor.nombre} {tra.proveedor.apellido}</span></p>
                                        <div className="flex justify-around mt-2">
                                            <p className="font-semibold">Tipo: <span className="text-purple-700">{tra.tipo === 'precioPorDia' ? 'Por Día' : 'Por Horas'}</span></p>
                                            <p className="font-semibold">Fecha: <span className="text-purple-700">{tra.fecha.split('T')[0]}</span></p>
                                        </div>
                                        <p className="text-center font-semibold">Horario: <span className="text-white">{tra.desde} - {tra.hasta}</span></p>
                                        <div className="flex justify-center mt-3">
                                            <h1 className="text-5xl font-semibold">${tra.precioTotal}</h1>
                                        </div>
                                        <p className="text-center">Precio Total</p>
                                        <div className="flex justify-around mt-3">
                                            <button className="px-3 py-2 bg-blue-700 rounded-md text-white hover:bg-blue-900 hover:scale-105 duration-300">Actualizar</button>
                                            <button type="button" className="px-3 py-2 bg-red-700 rounded-md text-white hover:bg-red-900 hover:scale-105 duration-300" onClick={() => { EliminarTrabajo(tra._id, tra.servicio) }}>Eliminar</button>
                                        </div>
                                    </div>
                                ),
                                tra.status === "Rechazado" && selectedOption === "Rechazadas" && (
                                    <div key={index} className="w-[330px] h-[285px] radial-gradientTrabajos-bg rounded-lg shadow-lg shadow-blue-500">
                                        <h1 className="text-center text-2xl mt-2 pb-2 border-b-2 font-semibold">{tra.servicio}</h1>
                                        <p className="text-center text-xl mt-1">Proveedor: <span className="text-white">{tra.proveedor.nombre} {tra.proveedor.apellido}</span></p>
                                        <div className="flex justify-around mt-2">
                                            <p className="font-semibold">Tipo: <span className="text-purple-700">{tra.tipo === 'precioPorDia' ? 'Por Día' : 'Por Horas'}</span></p>
                                            <p className="font-semibold">Fecha: <span className="text-purple-700">{tra.fecha.split('T')[0]}</span></p>
                                        </div>
                                        <p className="text-center font-semibold">Horario: <span className="text-white">{tra.desde} - {tra.hasta}</span></p>
                                        <div className="flex justify-center mt-3">
                                            <h1 className="text-5xl font-semibold">${tra.precioTotal}</h1>
                                        </div>
                                        <p className="text-center">Precio Total</p>
                                        <div className="flex justify-around mt-3">
                                            <button className="px-3 py-2 bg-blue-700 rounded-md text-white hover:bg-blue-900 hover:scale-105 duration-300">Actualizar</button>
                                            <button type="button" className="px-3 py-2 bg-red-700 rounded-md text-white hover:bg-red-900 hover:scale-105 duration-300" onClick={() => { EliminarTrabajo(tra._id, tra.servicio) }}>Eliminar</button>
                                        </div>
                                    </div>
                                )
                            )
                        ) : (
                            <div className="w-[330px] h-[285px] bg-gray-400 rounded-lg border-2 border-dashed flex justify-center items-center">
                                <p className="text-lg text-gray-700 font-semibold">Todos los trabajos están en espera</p>
                            </div>
                        )
                    ) : (
                        <div className="w-[330px] h-[285px] bg-gray-400 rounded-lg border-2 border-dashed flex justify-center items-center">
                            <p className="text-lg bg-gray-700 tex-center font-semibold">No existen trabajos solicitados</p>
                        </div>
                    )}

                </div>
            </section>
        </>
    )
}

export default ContratosCliente