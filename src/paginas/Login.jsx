import React, { useEffect, useState, } from 'react'
import logoNegroAK from '../assets/AK NEGRA.png'
import { ToastContainer, toast } from "react-toastify";
import '../../CSS/fondos.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EyeOff, Eye } from 'lucide-react';
import RelojDeArena from '../componentes/RelojArena';
import AuthStoreContext from '../store/AuthStore';
import OfertaStore from '../store/OfertaStore';

const Login = () => {
    const { Perfil, darkMode, verificarUbicacionActual, verificarUbicacionTrabajo, ubiCliente, verificarFoto, setTipo } = AuthStoreContext()
    const { ObtenerTrabajos, ListarOfertas, MisOfertas } = OfertaStore()
    const [ojoActivo, setOjoActivo] = useState(false)
    const [carga, setCarga] = useState(false)
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: "",
        contrasenia: ""
    })

    const HandleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const HandleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/loginUser`

            const respuesta = await axios.post(url, form)
            localStorage.setItem('token', respuesta.data.token)
            localStorage.setItem('rol', respuesta.data.rol)
            localStorage.setItem('tipo', 'cliente')
            localStorage.removeItem('usuario')

            setTipo('cliente')
            await Promise.all([
                ListarOfertas(respuesta.data.token, respuesta.data.rol),
                MisOfertas(respuesta.data.token, respuesta.data.rol),
                Perfil(respuesta.data.token, respuesta.data.rol),
                ObtenerTrabajos(respuesta.data.token, respuesta.data.rol),
                ubiCliente(respuesta.data.token, respuesta.data.rol),
                verificarFoto(respuesta.data.token, respuesta.data.rol),
                verificarUbicacionActual(respuesta.data.token, respuesta.data.rol, 'cliente'),
                verificarUbicacionTrabajo(respuesta.data.token, respuesta.data.rol, 'proveedor')
            ])
            navigate('/dashboard')
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
            setCarga(false)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            const tiempo = document.getElementById('Formulario')
            if (tiempo) {
                tiempo.scrollIntoView({ behavior: "smooth" })
            }
        }, 1000)
    }, [])

    return (
        <>
            <ToastContainer />
            <div className={darkMode ? "dark" : ""}>
                <div className="grid grid-cols-1 md:grid-cols-2 font-Cabin">

                    <div className="radial-gradientLogin-bg md:w-full h-screen flex items-center justify-center">
                        <img src={logoNegroAK} alt='Altakassa' />
                    </div>
                    <div id='Formulario' className="bg-white dark:bg-black flex items-center justify-center h-screen">
                        <div className='w-5/6 md:w-4/6'>
                            <h1 className='text-xl text-blue-500 font-CalSans text-center pb-3' id="iniciarSesion">INICIAR SESIÓN</h1>
                            <hr className='dark:border dark:border-gray-900' />
                            <form onSubmit={HandleSubmit}>
                                <div className="my-3">
                                    <label className="mb-2 block text-md font-semibold text-blue-500">Correo electrónico</label>
                                    <input type="email" name='email' onChange={HandleChange} value={form.email || ""} placeholder="Ingresa tu correo" className="block w-full dark:bg-transparent dark:text-white rounded-md border border-gray-300 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 py-1 px-2 text-gray-500" />
                                </div>

                                <div className="mb-3">
                                    <label className="mb-2 block text-md font-semibold text-blue-500">Contraseña</label>
                                    <div className='flex gap-2 relative'>
                                        <input type={ojoActivo ? "text" : "password"} name='contrasenia' onChange={HandleChange} value={form.contrasenia || ""} placeholder="********************" className="block w-full dark:bg-transparent dark:text-white rounded-md border border-gray-300 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 py-1 px-2 text-gray-500" />
                                        <button type='button' onClick={() => setOjoActivo(!ojoActivo)} className='absolute right-3 top-1/2 transform -translate-y-1/2 dark:text-white cursor-pointer'>{ojoActivo === false ? <Eye size={20} /> : <EyeOff size={20} />}</button>
                                    </div>
                                </div>


                                <div className="my-7 flex justify-center">
                                    <button type='submit' onClick={() => setCarga(true)} className={`${carga === false ? "" : "hidden"} py-2  w-1/3 md:w-1/4 block text-center bg-blue-700 text-white rounded-md duration-300 hover:bg-blue-900 hover:text-white cursor-pointer font-CalSans`}>Ingresar</button>
                                    {carga && (<RelojDeArena />)}
                                </div>
                                <hr className='dark:border dark:border-gray-900' />
                                <div className='mt-1 md:mt-3 md:mb-1'>
                                    <p className='text-sm text-slate-500 dark:text-slate-300 mb-1 font-semibold'>Olvidaste tu contraseña: <Link className='text-emerald-500 dark:text-emerald-300  hover:underline duration-300' to='/recuperar'>Click Aquí</Link></p>
                                    <p className='text-sm text-slate-500 dark:text-slate-300 font-semibold'>No tienes una cuenta: <Link className='text-emerald-500 dark:text-emerald-300  hover:underline duration-300' to='/registro'>Regístrate Aquí</Link></p>
                                </div>
                            </form><br />
                            <div>
                                <button type='button' className='group/inicio flex justify-around items-center px-3 py-1 rounded-lg bg-purple-700 text-white text-sm font-semibold hover:bg-purple-900 duration-300 cursor-pointer' onClick={() => { navigate("/") }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24" className='group-hover/inicio:-translate-x-0.5 transition-all duration-300'>
                                        <path d="M14 19l-7-7 7-7v14z" />
                                    </svg>
                                    Volver al Inicio</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Login