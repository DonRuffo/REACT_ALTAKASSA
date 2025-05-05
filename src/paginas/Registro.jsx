import React, { useEffect, useState } from "react";
import '../../CSS/fondos.css'
import logoNegroAK from '../assets/AK NEGRA.png';
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { EyeOff, Eye } from 'lucide-react';
import RelojDeArena from "../componentes/RelojArena";
import AuthStoreContext from "../store/AuthStore";



const Registro = () => {
    const { darkMode } = AuthStoreContext()
    const [ojoActivo, setOjoActivo] = useState(false)
    const [reloj, setReloj] = useState(false)
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        direccion: "Pichincha",
        email: "",
        telefono: "",
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
            const url = `${import.meta.env.VITE_BACKEND_URL}/registroUser`

            const respuesta = await axios.post(url, form)
            toast.success(respuesta.data.msg)
            localStorage.setItem('usuario', respuesta.data.rol)
            setReloj(false)
        } catch (error) {
            console.log('No se ejecuta el endpoint', error)
            toast.error(error.response.data.msg)

            setReloj(false)
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
                    <div id="Formulario" className="bg-white dark:bg-black flex items-center justify-center h-screen">
                        <div className="w-4/5 md:4/6">
                            <h1 className="mb-3 font-CalSans text-xl text-purple-500 text-center">REGISTRO</h1>
                            <hr className="dark:border dark:border-gray-900" />
                            <form onSubmit={HandleSubmit}>
                                <div className="my-3 grid grid-cols-2">
                                    <div className="mx-1">
                                        <label htmlFor="nombre" className="mb-2 block text-md font-semibold dark: text-purple-500">Nombre</label>
                                        <input type="text" name='nombre' id="nombre" placeholder="Ingresa tu primer nombre" onChange={HandleChange} value={form.nombre || ""} className=" block w-full dark:bg-transparent dark:text-white rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                                    </div>
                                    <div className="mx-1">
                                        <label htmlFor="apellido" className="mb-2 block text-md font-semibold dark: text-purple-500">Apellido</label>
                                        <input type="text" name='apellido' id="apellido" placeholder="Ingresa tu apellido" onChange={HandleChange} value={form.apellido || ""} className=" block w-full dark:bg-transparent dark:text-white rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                                    </div>
                                </div>
                                <div className="mb-3 mx-1">
                                    <label htmlFor="dir" className="mb-2 block text-md font-semibold dark: text-purple-500">Provincia:</label>
                                    <select name="direccion" id="dir" onChange={HandleChange} className="block w-full dark:bg-black dark:text-white rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500">
                                        <option value="Pichincha">Pichincha</option>
                                        <option value="Guayas">Guayas</option>
                                        <option value="Azuay">Azuay</option>
                                        <option value="Tungurahua">Tungurahua</option>
                                        <option value="Cañar">Cañar</option>
                                        <option value="Cotopaxi">Cotopaxi</option>
                                        <option value="Carchi">Carchi</option>
                                        <option value="Imbabura">Imbabura</option>
                                        <option value="Santo Domingo">Santo Domingo</option>
                                        <option value="Esmeraldas">Esmeraldas</option>
                                        <option value="Manabí">Manabí</option>
                                        <option value="Los Ríos">Los Ríos</option>
                                        <option value="Loja">Loja</option>
                                        <option value="Bolívar">Bolívar</option>
                                        <option value="Santa Elena">Santa Elena</option>
                                        <option value="El Oro">El Oro</option>
                                        <option value="Chimborazo">Chimborazo</option>
                                        <option value="Sucumbíos">Sucumbíos</option>
                                        <option value="Napo">Napo</option>
                                        <option value="Orellana">Orellana</option>
                                        <option value="Pastaza">Pastaza</option>
                                        <option value="Morona Santiago">Morona Santiago</option>
                                        <option value="Zamora Chinchipe">Zamora Chinchipe</option>
                                        <option value="Galápagos">Galápagos</option>
                                    </select>
                                </div>
                                <div className="mb-3 grid grid-cols-2">
                                    <div className="mx-1">
                                        <label htmlFor="telefono" className="mb-2 block text-md font-semibold dark: text-purple-500">Teléfono</label>
                                        <input type="text" name='telefono' id="telefono" placeholder="Ingresa tu teléfono" onChange={HandleChange} value={form.telefono || ""} className=" block w-full dark:bg-transparent dark:text-white rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                                    </div>
                                    <div className="mx-1">
                                        <label htmlFor="email" className="mb-2 block text-md font-semibold dark: text-purple-500">Correo electrónico</label>
                                        <input type="email" name='email' id="email" placeholder="Ingresa tu correo" onChange={HandleChange} value={form.email || ""} className=" block w-full dark:bg-transparent dark:text-white rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                                    </div>
                                </div>
                                <div className="mb-3 mx-1">
                                    <label htmlFor="contrasenia" className="mb-2 block text-md font-semibold dark: text-purple-500">Contraseña</label>
                                    <div className="flex gap-2 relative">
                                        <input type={ojoActivo ? "text" : "password"} name='contrasenia' id="contrasenia" placeholder="*****" onChange={HandleChange} value={form.contrasenia || ""} className=" block w-full dark:bg-transparent dark:text-white rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                                        <button type='button' onClick={() => setOjoActivo(!ojoActivo)} className='absolute right-3 top-1/2 transform -translate-y-1/2 dark:text-white cursor-pointer'>{ojoActivo === false ? <Eye size={20} /> : <EyeOff size={20} />}</button>
                                    </div>
                                </div>
                                <div className="text-sm rounded-md bg-red-200 py-1 px-2 dark:bg-gray-950 dark:text-slate-300">
                                    <h1 className="font-semibold text-emerald-500 dark:text-emerald-300">Tomar en cuenta para la contraseña:</h1>
                                    <p>1. Al menos una mayúscula</p>
                                    <p>2. Al menos una minúscula</p>
                                    <p>3. Al menos un número</p>
                                    <p>4. Más de 10 caracteres</p>
                                </div>
                                <div className="my-7 flex justify-center">
                                    <button type="submit" className={`${reloj ? 'hidden' : ''} w-1/3 md:w-1/5 py-2 bg-purple-700 border border-purple-800 rounded-xl text-white text-semibold hover:bg-purple-900 duration-300 cursor-pointer font-CalSans`} onClick={() => setReloj(true)}>Registrar</button>
                                    {reloj && <RelojDeArena />}
                                </div> <hr className="dark:border dark:border-gray-900" />
                                <div className="flex justify-end mt-2">
                                    <p className="text-sm text-slate-500 dark:text-slate-300 font-semibold">¿Ya tienes cuenta? <Link className="text-emerald-500 dark:text-emerald-300 hover:underline duration-300" to="/login">Click Aquí</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="radial-gradientRegistro-bg flex items-center justify-center h-screen">
                        <img src={logoNegroAK} alt='Altakassa' />
                    </div>
                </div>
            </div>

        </>
    )
}
export default Registro