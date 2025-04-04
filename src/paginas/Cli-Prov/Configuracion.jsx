import React, { useContext, useState, useEffect, useRef } from "react";
import OpcionConfig from "../../componentes/opcionesConfiguracion";
import ConfigContext from "../../context/ConfigProvider";
import logoMenu from '../../assets/category.png'
import logoMenuAbierto from '../../assets/hamburger.png'
import AuthContext, { useAuth } from "../../context/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import { EyeOff, Eye } from 'lucide-react';
import imgLocation from '../../assets/LOCATION.png'
import axios from "axios";

const Configuracion = () => {
    const [ojoActivo, setOjoActivo] = useState(false)
    const [ojoActivo2, setOjoActivo2] = useState(false)

    const { auth, setAuth } = useContext(AuthContext)
    const { modalContra, setModalContra, modalPerfil,
        setModalPerfil, modalTema, setModalTema, modalUbi, setModalUbi } = useContext(ConfigContext)
    const { ActualizarPerfil, ActualizarContrasenia, setDark, menu, handleMenu } = useContext(AuthContext)
    const accesoContra = () => { setModalContra(!modalContra) }
    const accesoPerfil = () => { setModalPerfil(!modalPerfil) }
    const accesoTema = () => { setModalTema(!modalTema) }
    const accesoUbi = () => { setModalUbi(!modalUbi) }
    const localizacion = useRef(null)
    const [formPerfil, setFormPerfil] = useState({
        nombre: auth.nombre || "",
        apellido: auth.apellido || "",
        direccion: auth.direccion || "",
        telefono: auth.telefono || ""
    })
    useEffect(() => {
        setFormPerfil({
            nombre: auth.nombre || "",
            apellido: auth.apellido || "",
            direccion: auth.direccion || "",
            telefono: auth.telefono || ""
        })
    }, [auth])

    const [formContra, setFormContra] = useState({
        email: auth.email,
        contrasenia: "",
        nuevaContrasenia: ""
    })

    const handleChangePerfil = (e) => {
        setFormPerfil({
            ...formPerfil,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeContrasenia = (e) => {
        setFormContra({
            ...formContra,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitPerfil = async (e) => {
        e.preventDefault()
        try {
            const respuesta = await ActualizarPerfil(formPerfil)
            console.log(respuesta)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitContrasenia = async (e) => {
        e.preventDefault()
        try {
            const respuesta = await ActualizarContrasenia(formContra)
        } catch (error) {
            console.log(error)

        }
    }

    const handleRadioChange = (e) => {
        const valor = e.target.value
        if (valor === "Oscuro") {
            localStorage.setItem('tema', "Oscuro")
            setDark(true)
        } else if (valor === "Claro") {
            localStorage.setItem('tema', "Claro")
            setDark(false)
        }
    }
    useEffect(() => {
        if (modalContra) {
            setModalPerfil(false)
            setModalTema(false)
            setModalUbi(false)
        }
    }, [modalContra]);

    useEffect(() => {
        if (modalPerfil) {
            setModalContra(false)
            setModalTema(false)
            setModalUbi(false)
        }
    }, [modalPerfil]);

    useEffect(() => {
        if (modalTema) {
            setModalContra(false)
            setModalPerfil(false)
            setModalUbi(false)
        }
    }, [modalTema])

    useEffect(() => {
        if (modalUbi) {
            setModalContra(false)
            setModalPerfil(false)
            setModalTema(false)
        }
    }, [modalUbi])

    //funcion para actualizar la ubicación
    const actualizarUbi = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords
                try {
                    let url
                    const token = localStorage.getItem('token')
                    const rol = localStorage.getItem('rol')
                    if (rol === 'cliente') {
                        url = `${import.meta.env.VITE_BACKEND_URL}/guardar-ubicacion-cli`
                    } else if (rol === 'proveedor') {
                        url = `${import.meta.env.VITE_BACKEND_URL}/guardar-ubicacion-prov`
                    }
                    const options = {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }
                    const respuesta = await axios.post(url, { latitude, longitude }, options)
                    const ubi = {
                        ubicacion: {
                            longitud: longitude,
                            latitud: latitude
                        }
                    }
                    toast.success('Ubicación actualizada')
                    setAuth({
                        ...auth,
                        ...ubi
                    })
                } catch (error) {
                    console.error('Error al actualizar la ubicación')
                    toast.error('Error al actualizar')
                }
            })
        }
    }

    return (
        <>
            <div className="lg:hidden pb-2 mt-5">
                <img src={logoMenu} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === true ? 'hidden' : ''} cursor-pointer duration-300`} />
                <img src={logoMenuAbierto} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === false ? 'hidden' : ''} cursor-pointer duration-300`} />
            </div>
            <h1 className="text-3xl font-semibold text-sky-600 pb-5 mt-5">Configuración</h1>
            <ToastContainer />
            <section className="flex flex-col md:flex-row justify-between">
                <div className="w-full md:w-2/5 flex bg-white dark:bg-transparent dark:text-white rounded-xl shadow-lg md:max-h-[210px] border border-gray-100 mb-8 md:mb-0">
                    <ul className="w-full p-2">
                        <OpcionConfig titulo={"Cambiar contraseña"} logo={
                            (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                                <path d="M8 10V7a4 4 0 118 0v3" stroke="currentColor" strokeWidth="2" />
                                <circle cx="12" cy="15" r="1.5" fill="currentColor" />
                            </svg>
                            )
                        } clic={accesoContra} />
                        <OpcionConfig titulo={"Actualizar perfil"} logo={(
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                                <path d="M4 20a8 8 0 0116 0" stroke="currentColor" strokeWidth="2" />
                            </svg>

                        )} clic={accesoPerfil} />
                        <OpcionConfig titulo={"Actualizar Ubicación"} logo={(
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2">
                                <polygon points="3,6 9,2 15,6 21,2 21,18 15,22 9,18 3,22" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        )} clic={accesoUbi} />
                        <OpcionConfig titulo={"Tema"} logo={(
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                                <path d="M12 2a10 10 0 000 20 5 5 0 010-10A5 5 0 0112 2z" fill="currentColor" />
                            </svg>
                        )} clic={accesoTema} />
                    </ul>
                </div>
                <div className={`${modalContra === true ? 'block' : 'hidden'} w-full md:w-1/2 bg-white rounded-xl shadow-xl h-auto border border-purple-400 p-5 dark:bg-transparent`}>
                    <h1 className="text-2xl text-center text-purple-600 font-semibold pb-5">Cambio de contraseña</h1>
                    <div className="border px-3 py-2 mb-3 bg-slate-200 rounded-lg dark:bg-transparent dark:text-white">
                        <h1 className="font-bold">Tener en cuenta:</h1>
                        <ul>
                            <li>La contraseña debe tener al menos 10 caracteres.</li>
                            <li>La contraseña debe contener al menos una letra mayúscula.</li>
                            <li>La contraseña debe contener al menos una letra minúscula.</li>
                            <li>La contraseña debe contener al menos un número.</li>
                        </ul>
                    </div>
                    <div className="w-full">
                        <form onSubmit={handleSubmitContrasenia}>
                            <div className="mb-3">
                                <label htmlFor="contrasenia" className="text-black font-semibold block mb-2 dark:text-white">Contraseña actual:</label>
                                <div className="relative">
                                    <input type={ojoActivo ? "text" : "password"} name="contrasenia" id="contrasenia" onChange={handleChangeContrasenia} value={formContra.contrasenia || ""} className="w-full border border-gray-200 rounded-md focus:ring-1 focus:ring-purple-800 focus:outline-none focus:border-purple-800 p-1 dark:text-white dark:bg-transparent" placeholder="******" />
                                    <button type='button' onClick={() => setOjoActivo(!ojoActivo)} className='absolute right-3 top-1/2 transform -translate-y-1/2 dark:text-white'>{ojoActivo === false ? <Eye size={20} /> : <EyeOff size={20} />}</button>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nuevaContrasenia" className="text-black font-semibold block mb-2 dark:text-white">Nueva contraseña:</label>
                                <div className="relative">
                                    <input type={ojoActivo2 ? "text" : "password"} name="nuevaContrasenia" id="nuevaContrasenia" onChange={handleChangeContrasenia} value={formContra.nuevaContrasenia || ""} className="w-full border border-gray-200 rounded-md focus:ring-1 focus:ring-purple-800 focus:outline-none focus:border-purple-800 p-1 dark:text-white dark:bg-transparent" placeholder="******" />
                                    <button type='button' onClick={() => setOjoActivo2(!ojoActivo2)} className='absolute right-3 top-1/2 transform -translate-y-1/2 dark:text-white'>{ojoActivo2 === false ? <Eye size={20} /> : <EyeOff size={20} />}</button>
                                </div>
                            </div><br />
                            <div className="mb-3 flex justify-around">
                                <button type="submit" className="px-5 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-800 duration-300 font-semibold">Cambiar</button>
                                <button type="button" className="px-6 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-800 duration-300 font-semibold" onClick={() => setModalContra(!modalContra)}>Cerrar</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={`${modalPerfil === true ? 'block' : 'hidden'} w-full md:w-1/2 flex flex-col bg-white rounded-xl shadow-xl h-auto border border-green-400 dark:bg-transparent`}>
                    <div className="w-full p-2 flex flex-col items-center">
                        <h1 className="font-semibold text-green-600 text-2xl pt-3">Actualizar perfil</h1>
                        <span className="font-semibold text-sm text-slate-500 text-center">Cambia los campos que requieras y presiona actualiza</span>
                    </div>
                    <div className="w-full p-6 flex flex-col">
                        <form onSubmit={handleSubmitPerfil}>
                            <div className="mb-4">
                                <label htmlFor="nombre" className="font-semibold dark:text-white">Nombre:</label>
                                <input type="text" name="nombre" id="nombre" value={formPerfil.nombre || ""} onChange={handleChangePerfil} className="w-full md:w-4/5 border rounded-md p-1 md:ml-6 focus:ring-1 focus:outline-none focus:ring-green-700  dark:bg-transparent dark:text-white" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="apellido" className="font-semibold dark:text-white">Apellido:</label>
                                <input type="text" name="apellido" id="apellido" value={formPerfil.apellido || ""} onChange={handleChangePerfil} className="w-full md:w-4/5 border rounded-md p-1 md:ml-6 focus:ring-1 focus:outline-none focus:ring-green-700 dark:bg-transparent dark:text-white" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="direccion" className="font-semibold dark:text-white">Dirección:</label>
                                <input type="text" name="direccion" id="direccion" value={formPerfil.direccion || ""} onChange={handleChangePerfil} className="w-full md:w-4/5 border rounded-md p-1 md:ml-4 focus:ring-1 focus:outline-none focus:ring-green-700 dark:bg-transparent dark:text-white" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="telefono" className="font-semibold dark:text-white">Teléfono:</label>
                                <input type="text" name="telefono" id="telefono" value={formPerfil.telefono || ""} onChange={handleChangePerfil} className="w-full md:w-4/5 border rounded-md p-1 md:ml-5 focus:ring-1 focus:outline-none focus:ring-green-700 dark:bg-transparent dark:text-white" />
                            </div><br />
                            <div className="mb-3 flex justify-around">
                                <button type="submit" className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-800 duration-300 font-semibold">Actualizar</button>
                                <button type="button" className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-800 duration-300 font-semibold" onClick={() => setModalPerfil(!modalPerfil)}>Cerrar</button>
                            </div>
                        </form>

                    </div>
                </div>
                <div className={`${modalTema === true ? 'block' : 'hidden'} w-full md:w-1/2 md:max-h-[100px] flex flex-col bg-white rounded-xl shadow-xl border dark:bg-transparent dark:text-white `}>
                    <label htmlFor="Oscuro" className="cursor-pointer flex justify-between px-4 py-2 mt-2 mx-2 items-center rounded-xl has-[input:checked]:text-purple-700 has-[input:checked]:bg-purple-100 has-[input:checked]:ring-1 has-[input:checked]:ring-purple-800">
                        <div className="flex gap-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 12.79A9 9 0 0111.21 3 7 7 0 1021 12.79z" fill="currentColor" />
                            </svg>
                            Tema Oscuro
                        </div>
                        <input type="radio" name="tema" id="Oscuro" value="Oscuro" onChange={handleRadioChange} className="peer appearance-none w-4 h-4 rounded-full border checked:border-4 checked:border-indigo-800 checked:shadow-md checked:shadow-indigo-400" />
                    </label>
                    <label htmlFor="Claro" className="cursor-pointer flex justify-between px-4 py-2 mx-2 mb-2 items-center rounded-xl has-[input:checked]:text-purple-700 has-[input:checked]:bg-purple-100 has-[input:checked]:ring-1 has-[input:checked]:ring-purple-800">
                        <div className="flex gap-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="5" fill="currentColor" />
                                <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            Tema Claro
                        </div>
                        <input type="radio" name="tema" id="Claro" value="Claro" onChange={handleRadioChange} className="peer appearance-none w-4 h-4 rounded-full border checked:border-4 checked:border-indigo-800 checked:shadow-md checked:shadow-indigo-400" />
                    </label>
                </div>
                <div className={`${modalUbi === true ? 'block' : 'hidden'} w-full md:w-1/2 flex flex-col bg-white rounded-xl shadow-xl border border-red-500 dark:bg-transparent dark:text-white `}>
                    <div className="flex flex-col items-center">
                        <h1 className="font-semibold text-2xl text-red-600 mt-5">Actualizar Ubicación</h1>
                        <span className="font-semibold text-slate-300 text-sm text-center">Si cambiaste tu lugar de trabajo es importante actualizar su ubicación</span>
                        <div className="cursor-pointer flex flex-col justify-center items-center border-dashed border-2 border-gray-400 bg-transparent rounded-lg w-[100px] h-[110px] mt-3 mb-2 lg:mb-0" onClick={actualizarUbi}>
                            <img src={imgLocation} alt="actualizarUbi" width={30} height={30} />
                            <p className="font-semibold text-sm text-slate-300 text-center">¡Clic para actualizar!</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Configuracion