import axios from "axios";
import React, { useEffect, useState } from "react";
import '../../CSS/fondos.css'

const SolicitudesCli = () => {
    const [trabajos, setTrabajos] = useState([])
    const [trabajoSeleccionado, setTrabajoSeleccioando] = useState(null)

    const seleccionarTrabajo = (id) => {
        setTrabajoSeleccioando(id)
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

    const EliminarTrabajo = async (id, indx) => {
        const confirmar = confirm(`¿Estás seguro del eliminar el trabajo de ${indx}?`)
        if (confirmar) {
            try {
                const token = localStorage.getItem('token')
                const url = `http://localhost:5000/api/eliminarTrabajo/${id}`
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

    useEffect(() => {
        ObtenerTrabajos()
    }, [])
    return (
        <>
            <section>
                <h1 className="text-3xl text-center text-purple-800 font-semibold my-2">Solicitudes</h1>
                <p className="text-xl text-center font-semibold mb-5">Auí podrás visualizar tus solicitudes de trabajo</p>
                <div className="flex justify-center gap-3 flex-wrap">
                    {trabajos.length != 0 ? trabajos.map((tra, index) => (
                        <div key={index} className="w-[330px] h-[285px] radial-gradientTrabajos-bg rounded-lg shadow-lg shadow-blue-500">
                            <h1 className="text-center text-2xl mt-2 pb-2 border-b-2 font-semibold">{tra.servicio}</h1>
                            <p className="text-center text-xl mt-1">Proveedor: <span className="text-white">{tra.proveedor.nombre} {tra.proveedor.apellido}</span></p>
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
                                <button className="px-3 py-2 bg-blue-700 rounded-md text-white hover:bg-blue-900 hover:scale-105 duration-300">Actualizar</button>
                                <button type="button" className="px-3 py-2 bg-red-700 rounded-md text-white hover:bg-red-900 hover:scale-105 duration-300" onClick={()=>{EliminarTrabajo(tra._id, tra.servicio)}}>Eliminar</button>
                            </div>
                        </div>
                    )) : (
                        <div>

                        </div>
                    )}
                </div>
            </section>
        </>
    )
}


export default SolicitudesCli