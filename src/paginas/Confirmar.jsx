import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import DotPulseLoader from "../componentes/CargaConfirmar";

const Confirmar = () => {

    const { token } = useParams()
    const [carga, setCarga] = useState(true)

    const verifyToken = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/confirmarUser/${token}`
            const respuesta = await axios.get(url)
            setCarga(false)
            toast.success(respuesta.data.msg)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
        }
    }

    useEffect(() => {
        verifyToken()
    }, [])

    return (
        <>
            <div className="bg-slate-100 h-screen flex flex-col justify-center items-center">
                <ToastContainer
                    toastStyle={{ backgroundColor: '#1c2833 ', color: 'white' }}
                    closeOnClick
                    position="bottom-center"
                />
                <div className="flex flex-col items-center justify-center h-screen md:h-auto">
                    <div className="flex justify-center">
                        {carga && <DotPulseLoader />}
                        <img src={'https://mqpsbzrziuppiigkbiva.supabase.co/storage/v1/object/sign/altakassa/ConfirmarLOGO.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wODIxMTJiNC1kZDliLTQwZWUtYmUxMy1iNDZiMDI3Y2EzYTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhbHRha2Fzc2EvQ29uZmlybWFyTE9HTy5zdmciLCJpYXQiOjE3NTE2NzU4NzksImV4cCI6MjA2NzAzNTg3OX0.V5rXneqEEq02-Faq1jl3VC8XkhKB97E6vG68xrdqm1c'} alt="Rocket" width={208} height={208} className={`${carga ? 'hidden' : ''}`} />
                    </div>
                    <h1 className={`${carga ? '' : 'hidden'} text-4xl text-sky-600 pt-5 font-semibold`}>Validando cuenta...</h1>
                    <h1 className={`${carga ? 'hidden' : ''} text-4xl text-sky-600 pt-5 font-CalSans`}>Gracias por Confirmar</h1>
                    <p className={`${carga ? 'hidden' : ''} text-slate-600 text-xl pb-5`}>Ya puedes iniciar sesión</p>
                    <Link className={`${carga ? 'hidden' : ''} p-2 bg-sky-600 text-white rounded-lg hover:bg-sky-800 duration-300`} to='/login' replace>Iniciar Sesión</Link>
                </div>
            </div>
        </>
    )
}

export default Confirmar