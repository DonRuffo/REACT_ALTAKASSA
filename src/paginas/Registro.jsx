import React from "react";
import '../../CSS/fondos.css'
import logoNegroAK from '../assets/AK NEGRA.png';
import { Link } from "react-router-dom";

const Registro = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-white flex items-center justify-center h-screen">
                    <div className="w-4/5 md:4/6">
                        <h1 className="mb-3 font-bold text-purple-700 text-center">REGISTRO</h1>
                        <hr />
                        <form>
                            <div className="my-3 mx-1">
                                <label className='mb-2 block text-sm font-semibold text-purple-600'>Perfil</label>
                                <select name="perfil" id="perfil" className='block py-1 px-1 w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 text-gray-500'>
                                    <option className='hover:bg-green-700' value="Proveedor">Proveedor</option>
                                    <option value="CLiente" className='hover:bg-green-700'>Cliente</option>
                                </select>
                            </div>
                            <div className="my-3 grid grid-cols-2">
                                <div className="mx-1">
                                    <label className="mb-2 block text-sm font-semibold text-purple-600">Nombre</label>
                                    <input type="text" name='nombre' placeholder="Ingresa tu nombre" className=" block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                                </div>
                                <div className="mx-1">
                                    <label className="mb-2 block text-sm font-semibold text-purple-600">Apellido</label>
                                    <input type="text" name='apellido' placeholder="Ingresa tu apellido" className=" block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-3 mx-1">
                                <label className="mb-2 block text-sm font-semibold text-purple-600">Direccion</label>
                                <input type="text" name='direccion' placeholder="Ingresa tu direccion" className=" block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                            </div>
                            <div className="mb-3 grid grid-cols-2">
                                <div className="mx-1">
                                    <label className="mb-2 block text-sm font-semibold text-purple-600">Teléfono</label>
                                    <input type="text" name='telefono' placeholder="Ingresa tu nombre" className=" block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                                </div>
                                <div className="mx-1">
                                    <label className="mb-2 block text-sm font-semibold text-purple-600">Correo electrónico</label>
                                    <input type="email" name='email' placeholder="Ingresa tu apellido" className=" block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-3 mx-1">
                                <label className="mb-2 block text-sm font-semibold text-purple-600">Contraseña</label>
                                <input type="password" name='password' placeholder="*****" className=" block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
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