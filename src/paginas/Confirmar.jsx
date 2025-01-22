import React, { useEffect } from "react";
import logoConfirm from '../assets/ROCKET.png'
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Confirmar = () => {

    const { token } = useParams()

    const verifyToken = async () => {
        try {
            const url = `http://localhost:5000/api/confirmarProveedor/${token}`
            const respuesta = await axios.get(url)
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
                        <img src={logoConfirm} alt="Rocket" width={250} height={250} />
                    </div>
                    <h1 className="text-3xl text-sky-600 pt-5 font-semibold">Gracias por Confirmar</h1>
                    <p className="text-slate-600 text-xl pb-5">Ya puedes iniciar sesión</p>
                    <Link className="p-2 bg-sky-600 text-white rounded-lg hover:bg-sky-800 duration-300" to='/login'>Iniciar Sesión</Link>
                </div>
            </div>
        </>
    )
}

export default Confirmar