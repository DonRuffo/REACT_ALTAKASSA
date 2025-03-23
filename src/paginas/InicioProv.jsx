import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import logoInicioProv from '../assets/Motivacion.svg';
import logoMenu from '../assets/category.png'
import logoMenuAbierto from '../assets/hamburger.png'
import OfertaContext from "../context/OfertasProvider";
import ModalOferta from "../componentes/modals/ModalOferta";
import LocationImg from '../assets/LOCATION.png'
import SpinnerCarga from "../componentes/RuedaCarga";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const InicioProve = () => {
    const { auth, menu, handleMenu } = useContext(AuthContext)
    const { modalOf, handleModalOf, ListarOfertas } = useContext(OfertaContext)
    const navigate = useNavigate()
    const [carga, setCarga] = useState(false)
    const [ubi, setUbi] = useState(false)

    document.getElementById('localitation').addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const url = `${import.meta.env.VITE_BACKEND_URL}/guardar-ubicacion-prov`
                    const token = localStorage.getItem('token')
                    const options = {
                        headers: { "Content-Type": "application/json" },
                        Authorization: `Bearer ${token}`
                    }
                    const respuesta = await axios.post(url,{ latitude, longitude },options)
                    toast.success(respuesta.data.msg)
                    setUbi(true)
                } catch (error) {
                    console.log(error)
                    toast.error(error.response?.data?.msg || "Error al guardar la ubicación")
                }
            });
        } else {
            alert("Tu navegador no soporta geolocalización.");
        }
    })
    return (
        <>
            <div className="lg:hidden pb-2">
                <img src={logoMenu} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === true ? 'hidden' : ''} cursor-pointer duration-300`} />
                <img src={logoMenuAbierto} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === false ? 'hidden' : ''} cursor-pointer duration-300`} />
            </div>
            <section className="flex justify-center">
                <div className="rounded-md shadow-lg w-4/5 bg-white dark:bg-transparent border border-gray-100">
                    <h1 className="text-3xl text-center text-purple-800 font-semibold pt-4 px-3 md:px-0">¡Bienvenido de nuevo {auth.nombre}!</h1>
                    <h2 className="text-xl text-center pt-3 pb-5 px-3 md:px-0 dark:text-white">Listo para un nuevo trabajo, el sistema te espera</h2>
                    <div className="flex justify-center pb-5">
                        <img src={logoInicioProv} alt="Proveedor" width={110} height={110} className='rounded-full border-2 border-black-600' />
                    </div>
                </div>
            </section><br />
            <section className="flex justify-center">
                <div className="w-4/5 flex justify-center gap-5">
                    <div id="localitation" className={`${ubi ? 'hidden' : ''} flex flex-col border-4 border-gray-600 border-dashed bg-transparent h-[250px] w-[200px] rounded-lg cursor-pointer items-center justify-center shadow-lg`} onClick={() => setCarga(true)}>
                        <img src={LocationImg} alt="localization" width={90} height={90} className={`${carga ? 'hidden' : 'block'}`} />
                        {carga && <SpinnerCarga />}
                        <h1 className="font-semibold text-lg text-center text-slate-500">Ingresa tu ubicación primero</h1>
                    </div>
                    <div className={`${ubi === false ? 'cursor-not-allowed pointer-events-none ' : 'cursor-pointer'} flex border-4 border-gray-600 border-dashed bg-gray-300 h-[250px] w-[200px] rounded-lg items-center justify-center shadow-lg`} onClick={handleModalOf}>
                        <h1 className="font-semibold text-lg text-center text-slate-600">Ingresa una nueva oferta</h1>
                    </div>
                </div>
            </section>
            {modalOf && (<ModalOferta ListarOfertas={ListarOfertas} />)}
        </>
    )
}


export default InicioProve