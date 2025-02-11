import React, { useState } from "react";
import logoNegroAK from '../assets/AK NEGRA.png';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
const Recuperar = () => {
    const [mail , setMail] =useState({})

    const HandleSubmit = async (e) =>{
        e.preventDefault()
        const perfil = document.getElementById('perfil').value
        console.log(perfil)
        let url
        try {
            if(perfil==='proveedor'){
                url = `${import.meta.env.VITE_BACKEND_URL}/recuperar-contrasenia-prov`
            }else if(perfil === 'cliente'){
                url = `${import.meta.env.VITE_BACKEND_URL}/recuperarPasswordCliente`
            }else if(perfil === ' administrador'){
                url = `${import.meta.env.VITE_BACKEND_URL}/recuperar-contrasenia`
            }
            console.log(url)
            const respuesta = await axios.post(url, mail)
            toast.success(respuesta.data.msg)
            localStorage.setItem('userR', perfil)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
        }
    }

    return(
        <>
            <ToastContainer />
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-white h-screen flex items-center justify-center h-screen">
                    <div className="w-5/6 md:w-4/6">
                        <h1 className="mb-3 font-bold text-orange-600 text-center">RECUPERAR CONTRASEÑA</h1>
                        <hr />
                        <form onSubmit={HandleSubmit}>
                            <div className="my-3">
                            <label className="block mb-2 text-sm text-orange-500 font-semibold">Perfil</label>
                                <select id="perfil" className="w-full border border-gray-300 py-1 px-2 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-700 focus:border-orange-700 ">
                                    <option value="proveedor">Proveedor</option>
                                    <option value="cliente">Cliente</option>
                                    <option value="administrador">Administrador</option>
                                </select>
                            </div>
                            <div className="my-3">
                                <label className="block mb-2 text-sm text-orange-500 font-semibold">Correo electrónico</label>
                                <input type="email" name="email" onChange={(e)=>{setMail({email:e.target.value})}} className="block w-full rounded-md border border-gray-300 focus:border-orange-700 focus:outline-none focus:ring-1 focus:ring-orange-700 py-1 px-2 text-gray-500" placeholder="Ingresa tu correo" />
                            </div>
                            <div className="my-7 flex justify-center">
                                <button className="w-1/4 py-2 border border-orange-400 rounded-lg bg-orange-400 text-white hover:bg-orange-600 duration-300"> Enviar</button>
                            </div>
                        </form>
                        <hr />
                        <div className="my-3 flex justify-end">
                                <p className="text-sm text-slate-500 font-semibold">¿No tienes una cuenta? <Link className="hover:underline hover:text-orange-500 duration-300" to='/registro'>Registrate aquí</Link></p>
                        </div>
                    </div>
                </div>
                <div className="radial-gradientRecuperar-bg flex items-center justify-center h-screen">
                    <img src={logoNegroAK} alt='Altakassa' />
                </div>
            </div>
        </>
    )
}

export default Recuperar