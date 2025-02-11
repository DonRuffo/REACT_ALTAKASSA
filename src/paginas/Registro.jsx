import React, { useState } from "react";
import '../../CSS/fondos.css'
import logoNegroAK from '../assets/AK NEGRA.png';
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


const Registro = () => {
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        direccion: "",
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
        const Perfil = document.getElementById('perfil').value
        let url
        try {
            if (Perfil == 'Proveedor') {
                url = `${import.meta.env.VITE_BACKEND_URL}/registroProveedor`
            } else if (Perfil == 'Cliente') {
                url = `${import.meta.env.VITE_BACKEND_URL}/registroCliente`
            }else if (Perfil == 'Administrador') {
                url = `${import.meta.env.VITE_BACKEND_URL}/registro`
            }
            const respuesta = await axios.post(url, form)
            toast.success(respuesta.data.msg)
            localStorage.setItem('usuario', respuesta.data.rol)            
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
            error.response.data.msg.forEach((mensaje)=>{
                toast.error(mensaje)
            })
        }
    }
    return (
        <>
            <ToastContainer />
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-white flex items-center justify-center h-screen">
                    <div className="w-4/5 md:4/6">
                        <h1 className="mb-3 font-bold text-purple-700 text-center">REGISTRO</h1>
                        <hr />
                        <form onSubmit={HandleSubmit}>
                            <div className="my-3 mx-1">
                                <label className='mb-2 block text-sm font-semibold text-purple-600'>Perfil</label>
                                <select name="perfil" id="perfil" className='block py-1 px-1 w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 text-gray-500'>
                                    <option className='hover:bg-green-700' value="Proveedor">Proveedor</option>
                                    <option value="Cliente" className='hover:bg-green-700'>Cliente</option>
                                    <option value="Administrador" className='hover:bg-green-700'>Administrador</option>
                                </select>
                            </div>
                            <div className="my-3 grid grid-cols-2">
                                <div className="mx-1">
                                    <label className="mb-2 block text-sm font-semibold text-purple-600">Nombre</label>
                                    <input type="text" name='nombre' placeholder="Ingresa tu nombre" onChange={HandleChange} value={form.nombre || ""} className=" block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                                </div>
                                <div className="mx-1">
                                    <label className="mb-2 block text-sm font-semibold text-purple-600">Apellido</label>
                                    <input type="text" name='apellido' placeholder="Ingresa tu apellido" onChange={HandleChange} value={form.apellido || ""} className=" block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-3 mx-1">
                                <label className="mb-2 block text-sm font-semibold text-purple-600">Direccion</label>
                                <input type="text" name='direccion' placeholder="Ingresa tu direccion" onChange={HandleChange} value={form.direccion || ""} className=" block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                            </div>
                            <div className="mb-3 grid grid-cols-2">
                                <div className="mx-1">
                                    <label className="mb-2 block text-sm font-semibold text-purple-600">Teléfono</label>
                                    <input type="text" name='telefono' placeholder="Ingresa tu nombre" onChange={HandleChange} value={form.telefono || ""} className=" block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                                </div>
                                <div className="mx-1">
                                    <label className="mb-2 block text-sm font-semibold text-purple-600">Correo electrónico</label>
                                    <input type="email" name='email' placeholder="Ingresa tu apellido" onChange={HandleChange} value={form.email || ""} className=" block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-3 mx-1">
                                <label className="mb-2 block text-sm font-semibold text-purple-600">Contraseña</label>
                                <input type="password" name='contrasenia' placeholder="*****" onChange={HandleChange} value={form.contrasenia|| ""} className=" block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                            </div>
                            <div className="text-sm rounded-md bg-red-200 py-1 px-2">
                                <h1 className="font-semibold">Tomar en cuenta para contraseña:</h1>
                                <p>1. Al menos una Mayúscula 2. Al menos un número 3. Más de 10 caracteres</p>
                            </div>
                            <div className="my-7">

                                <button className="w-1/3 md:w-1/5 py-2 bg-purple-700 border border-purple-800 rounded-xl text-white text-semibold hover:bg-purple-900 duration-300">Registrar</button>

                            </div> <hr />
                            <div className="flex justify-end mt-2">
                                <p className="text-sm text-slate-500 font-semibold">¿Ya tienes cuenta? <Link className="hover:underline hover:text-purple-800 duration-300" to="/login">Click Aquí</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="radial-gradientRegistro-bg flex items-center justify-center h-screen">
                    <img src={logoNegroAK} alt='Altakassa' />
                </div>
            </div>
        </>
    )
}
export default Registro