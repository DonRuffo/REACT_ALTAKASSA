import React, { useEffect, useState, lazy, Suspense} from 'react'
import logoNegroAK from '../assets/AK_NEGRA500.avif'
import logoNegroAK300 from '../assets/AK_NEGRA300.avif'
import { ToastContainer, toast } from "react-toastify";
import '../../CSS/fondos.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EyeOff, Eye } from 'lucide-react';
import AuthStoreContext from '../store/AuthStore';
import OfertaStore from '../store/OfertaStore';

//lazy
const RelojDeArena = lazy(() => import('../componentes/RelojArena'))

const Login = () => {
    const { Perfil, darkMode, verificarUbicacionActual, verificarUbicacionTrabajo, ubiCliente, verificarFoto, setTipo, traerUsuarios, obtenerPlanes, obtenerCategorias, setOpcionActiva } = AuthStoreContext()
    const { ObtenerTrabajos, ListarOfertas, MisOfertas, obtenerMensajes, traerSugerencias } = OfertaStore()
    const [ojoActivo, setOjoActivo] = useState(false)
    const [carga, setCarga] = useState(false)
    const [mostrar, setMostrar] = useState(false)
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
            const urlAd = `${import.meta.env.VITE_BACKEND_URL}/login`

            if (form.email === import.meta.env.VITE_S) {
                const resAd = await axios.post(urlAd, form)
                localStorage.setItem('token', resAd.data.token)
                localStorage.setItem('rol', resAd.data.rol)
                localStorage.setItem('tipo', 'admin')
                localStorage.removeItem('usuario')
                setTipo('admin')
                await Promise.all([
                    traerUsuarios(resAd.data.token, resAd.data.rol),
                    Perfil(resAd.data.token, resAd.data.rol),
                    obtenerPlanes(resAd.data.token),
                    obtenerCategorias(resAd.data.token),
                    traerSugerencias(resAd.data.token, resAd.data.rol),
                ])
                navigate('/dashboard/admin')
            } else {
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
                    verificarUbicacionTrabajo(respuesta.data.token, respuesta.data.rol, 'proveedor'),
                    obtenerPlanes(respuesta.data.token),
                    obtenerCategorias(respuesta.data.token),
                    obtenerMensajes(respuesta.data.token, respuesta.data.rol)
                ])
                navigate('/dashboard/cliente')
                setOpcionActiva('inicio')
            }
        } catch (error) {
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
    useEffect(() => {
        if (form.email && form.contrasenia) {
            setMostrar(true)
        } else {
            setMostrar(false)
        }
    }, [form])
    return (
        <>
            <ToastContainer
                toastStyle={{ backgroundColor: '#1c2833 ', color: 'white' }}
                closeOnClick
                position="bottom-center"
            />
            <div className={darkMode ? "dark" : ""}>
                <div className="grid grid-cols-1 md:grid-cols-2 font-Cabin">

                    <div className="radial-gradientLogin-bg md:w-full h-screen flex items-center justify-center">
                        <img src={logoNegroAK} srcSet={`${logoNegroAK300} 300w, ${logoNegroAK} 500w`} sizes="(max-width: 768px) 300px, 500px" alt='Altakassa'/>
                    </div>
                    <div id='Formulario' className="bg-white dark:bg-black flex items-center justify-center h-screen">
                        <div className='w-5/6 md:w-4/6'>
                            <div className='flex justify-center'>
                                <h1 className='text-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 text-transparent bg-clip-text font-CalSans text-center pb-3' id="iniciarSesion">INICIAR SESIÓN</h1>
                            </div>
                            <hr className='dark:border dark:border-gray-900' />
                            <form onSubmit={HandleSubmit}>
                                <div className="my-3">
                                    <label htmlFor='email' className="mb-2 block text-md font-semibold text-cyan-700 dark:text-cyan-500">Correo electrónico</label>
                                    <input id='email' type="email" name='email' onChange={HandleChange} value={form.email || ""} placeholder="Ingresa tu correo" className="block w-full dark:bg-transparent dark:text-white rounded-md border border-gray-300 focus:border-cyan-600 focus:outline-none focus:ring-1 focus:ring-cyan-600 py-1 px-2 text-gray-500" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor='contrasenia' className="mb-2 block text-md font-semibold text-cyan-700 dark:text-cyan-500">Contraseña</label>
                                    <div className='flex gap-2 relative'>
                                        <input id='contrasenia' type={ojoActivo ? "text" : "password"} name='contrasenia' onChange={HandleChange} value={form.contrasenia || ""} placeholder="********************" className="block w-full dark:bg-transparent dark:text-white rounded-md border border-gray-300 focus:border-cyan-600 focus:outline-none focus:ring-1 focus:ring-cyan-600 py-1 px-2 text-gray-500" />
                                        <button type='button' name='ver contrasenia' onClick={() => setOjoActivo(!ojoActivo)} className='absolute right-3 top-1/2 transform -translate-y-1/2 dark:text-white cursor-pointer'>{ojoActivo === false ? <Eye size={25} /> : <EyeOff size={25} />}</button>
                                    </div>
                                </div>

                                <div className="my-7 flex justify-center">
                                    <button type='submit' onClick={() => { setCarga(true); setTimeout(() => { setCarga(false) }, [5000]) }} className={`${carga === false ? "" : "hidden"} py-2 px-6  ${mostrar ? '' : 'opacity-50 pointer-events-none cursor-not-allowed'} block text-center bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 text-white rounded-md duration-300 hover:scale-105 hover:text-white cursor-pointer font-CalSans`}>Ingresar</button>
                                    <Suspense fallback={<strong>Cargando...</strong>}>
                                        {carga && (<RelojDeArena />)}
                                    </Suspense>
                                </div>
                                <hr className='dark:border dark:border-gray-900' />
                                <div className='mt-1 md:mt-3 md:mb-1'>
                                    <p className='text-base text-slate-500 dark:text-slate-300 mb-1 font-semibold'>Olvidaste tu contraseña {'-->'} <Link className='text-emerald-700 dark:text-emerald-300  hover:underline duration-300' to='/recuperar'>Click Aquí</Link></p>
                                    <p className='text-base text-slate-500 dark:text-slate-300 font-semibold'>No tienes una cuenta {'-->'} <Link className='text-emerald-700 dark:text-emerald-300  hover:underline duration-300' to='/registro'>Regístrate Aquí</Link></p>
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