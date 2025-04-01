import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { EyeOff, Eye } from 'lucide-react';
import RelojDeArena from "../../componentes/RelojArena";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


const RegistroAdmin = () => {
    const { dark } = useContext(AuthContext)
    const [ojo, setOjo] = useState(false)
    const [reloj, setReloj] = useState(false)
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        direccion: "",
        email: "",
        telefono: "",
        contrasenia: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const HandleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/registro`
            const respuesta = await axios.post(url, form)
            toast.success(respuesta.data.msg)
            localStorage.setItem('usuario', respuesta.data.rol)
            setReloj(false)

        } catch (error) {
            console.error('Error al registrar el admin', error)
            error.response.data.msg.forEach((mensaje) => {
                toast.error(mensaje)
            })
            setReloj(false)
        }
    }

    return (
        <>
            <div className={dark ? 'dark' : ''}>
                <ToastContainer />
                <div className={`bg-[url('../../assets/FondoRegistro.jpg')] bg-cover bg-center h-screen flex justify-center items-center`}>
                    <div className="flex justify-center items-center border-2 rounded-lg shadow-md shadow-purple-600 sha w-1/2">
                        <div>
                            <h1 className="font-semibold text-xl text-purple-600 text-center mt-3">REGISTRO</h1>
                            <form className="px-5" onSubmit={HandleSubmit}>
                                <div className="my-3 grid grid-cols-2 gap-2">
                                    <div className="flex justify-center items-center gap-x-2">
                                        <label htmlFor="nombre" className="font-semibold text-sm text-purple-600">Nombre:</label>
                                        <input type="text" id="nombre" name="nombre" onChange={handleChange} placeholder="Ingrese el nombre" className="px-1 py-1 w-4/6 rounded-md border border-gray-300 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:bg-transparent dark:text-white" />
                                    </div>
                                    <div className="flex justify-center items-center gap-x-2">
                                        <label htmlFor="apellido" className="font-semibold text-sm text-purple-600">Apellido:</label>
                                        <input type="text" id="apellido" name="apellido" onChange={handleChange} placeholder="Ingrese el apellido" className="px-1 py-1 w-4/6 rounded-md border border-gray-300 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:bg-transparent dark:text-white" />
                                    </div>
                                </div>
                                <div className="my-4 flex items-center gap-x-2">
                                    <label htmlFor="direccion" className="font-semibold text-sm text-purple-600">Dirección: </label>
                                    <input type="text" id="direccion" name="direccion" onChange={handleChange} placeholder="Ingrese la dirección" className="px-1 py-1 mr-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:bg-transparent dark:text-white" />
                                </div>
                                <div className="mb-3 grid grid-cols-2">
                                    <div className="mx-1">
                                        <label className="mb-2 block text-sm font-semibold dark: text-purple-600">Teléfono: </label>
                                        <input type="text" name='telefono' onChange={handleChange} placeholder="Ingresa tu teléfono" className=" block w-full dark:bg-transparent dark:text-white rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                                    </div>
                                    <div className="mx-1">
                                        <label className="mb-2 block text-sm font-semibold dark: text-purple-600">Correo electrónico: </label>
                                        <input type="email" name='email' onChange={handleChange} placeholder="Ingresa tu correo" className=" block w-full dark:bg-transparent dark:text-white rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                                    </div>
                                </div>
                                <div className="mb-3 mx-1">
                                    <label className="mb-2 block text-sm font-semibold dark: text-purple-600">Contraseña</label>
                                    <div className="flex gap-2 relative">
                                        <input type={ojo ? "text" : "password"} name='contrasenia' onChange={handleChange} placeholder="*****" className=" block w-full dark:bg-transparent dark:text-white rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                                        <button type='button' onClick={() => setOjo(!ojo)} className='absolute right-3 top-1/2 transform -translate-y-1/2 dark:text-white'>{ojo === false ? <Eye size={20} /> : <EyeOff size={20} />}</button>
                                    </div>
                                </div>
                                <div className="text-sm rounded-md bg-red-200 py-1 px-2 dark:bg-gray-950 dark:text-gray-400">
                                    <h1 className="font-semibold">Tomar en cuenta para la contraseña:</h1>
                                    <p>1. Al menos una Mayúscula 2. Al menos un número 3. Más de 10 caracteres</p>
                                </div>
                                <div className="flex justify-center my-3">
                                    <button onClick={() => setReloj(true)} className={`${reloj ? 'hidden' : ''} px-3 py-2 bg-slate-400 rounded-md font-semibold text-white hover:bg-slate-600 duration-300`}>Registrar</button>
                                    {reloj && <RelojDeArena />}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegistroAdmin