import React, { useContext, useEffect, useState } from "react";
import logoConfirm from '../assets/ConfirmarLOGO.svg'
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import DotPulseLoader from "../componentes/CargaConfirmar";

const Confirmar = () => {

    const { token } = useParams()
    const [carga, setCarga] =useState(true)

    const verifyToken = async () => {
        let url
        const usuario = localStorage.getItem('usuario')
        try {
            if(usuario === 'proveedor'){
                url = `${import.meta.env.VITE_BACKEND_URL}/confirmarProveedor/${token}`
            }else if(usuario === 'cliente'){
                url = `${import.meta.env.VITE_BACKEND_URL}/confirmarCliente/${token}`
            }else if(usuario === 'administrador'){
                url = `${import.meta.env.VITE_BACKEND_URL}/confirmar/${token}`
            }
            console.log(url)
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
            <div className="bg-slate-100 h-screen">
                <ToastContainer />
                <div className="flex flex-col items-center justify-center pt-20 h-screen md:h-auto">
                    <div className="w-1/3 md:w-1/5 h-1/5">
                        {carga && <DotPulseLoader />}
                        <img src={logoConfirm} alt="Rocket" width={208} height={208} className={`${carga ? 'hidden' : ''}`} />
                    </div>
                    <h1 className={`${carga ? '' :'hidden'} text-4xl text-sky-600 pt-5 font-semibold`}>Validando cuenta...</h1>
                    <h1 className={`${carga ? 'hidden' :''} text-4xl text-sky-600 pt-5 font-semibold`}>Gracias por Confirmar</h1>
                    <p className={`${carga ? 'hidden' : ''} text-slate-600 text-xl pb-5`}>Ya puedes iniciar sesión</p>
                    <Link className={`${carga ? 'hidden' : ''} p-2 bg-sky-600 text-white rounded-lg hover:bg-sky-800 duration-300`} to='/login' replace>Iniciar Sesión</Link>
                </div>
            </div>
        </>
    )
}

export default Confirmar