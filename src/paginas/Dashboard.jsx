import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logoConfig from '../assets/config.png'
import logoInicio from '../assets/InicioAltern-icon.png'
import logoHistorial from '../assets/Historial-icon.png'
import logoNovedades from '../assets/Novedades-icon.png'
import logoAyuda from '../assets/Ayuda-icon.png'
import logoAlta from '../assets/AK BLANCA.png'
import logoTrabajos from '../assets/icono-Trabajos.png'
import logoOfertas from '../assets/icono-Ofertas.png'
import AuthContext, { useAuth } from "../context/AuthProvider";
const Dashboard = () => {
    const navigate = useNavigate()
    const { auth } = useAuth()
    const {dark, menu, sideBar} = useContext(AuthContext)
    return (
        <>
            <div className={dark ? "dark" : ""}>
                <div className="flex h-screen">
                    <div ref={sideBar} className={`fixed inset-y-0 left-0 w-64 bg-sky-900 text-white p-4 transform ${menu === true ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out lg:static lg:block`}>
                        <h1 className="text-2xl text-white text-center font-bold">AltaKassa</h1>
                        <div className="flex justify-center">
                            <img src={logoAlta} alt="AltaKassa Logo" width={160} height={160} />
                        </div><hr />
                        <nav className="py-5 h-[350px] border-b">
                            <Link to='/dashboard' className="block py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1 focus:bg-gray-800">
                                <img src={logoInicio} alt="Inicio" width={26} height={26} /><p className=" px-2">Inicio</p>
                            </Link>
                            <Link to='/dashboard/ofertas' className={`${auth.rol === 'proveedor' ? 'block' : 'hidden'} py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1 focus:bg-gray-800`}>
                                <img src={logoOfertas} alt="Historial" width={26} height={26} /><p className=" px-2">Tus Ofertas</p>
                            </Link>
                            <Link to='/dashboard/solicitudes/proveedor' className={`${auth.rol === 'proveedor' ? 'block' : 'hidden'} py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1 focus:bg-gray-800`}>
                                <img src={logoHistorial} alt="Historial" width={26} height={26} /><p className=" px-2">Solicitudes</p>
                            </Link>
                            <Link to='/dashboard/solicitudes/cliente' className={`${auth.rol === 'cliente' ? 'block' : 'hidden'} py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1 focus:bg-gray-800`}>
                                <img src={logoHistorial} alt="Historial" width={26} height={26} /><p className=" px-2">Solicitudes</p>
                            </Link>
                            <Link to='/dashboard/contratos/cliente' className={`${auth.rol === 'cliente' ? 'block' : 'hidden'} py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1 focus:bg-gray-800`}>
                                <img src={logoTrabajos} alt="Historial" width={26} height={26} /><p className=" px-2">Trabajos</p>
                            </Link>
                            <Link to='/dashboard/contratos/proveedor' className={`${auth.rol === 'proveedor' ? 'block' : 'hidden'} py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1 focus:bg-gray-800`}>
                                <img src={logoTrabajos} alt="Historial" width={26} height={26} /><p className=" px-2">Trabajos</p>
                            </Link>
                            <Link to='/dashboard/historial' className={`${auth.rol === 'cliente' ? 'block' : 'hidden'} py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1 focus:bg-gray-800`}>
                                <img src={logoHistorial} alt="Historial" width={26} height={26} /><p className=" px-2">Historial</p>
                            </Link>
                            <Link to='/dashboard/novedades' className="hidden py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1 focus:bg-gray-800">
                                <img src={logoNovedades} alt="Novedades" width={26} height={26} /><p className=" px-2">Novedades</p>
                            </Link>
                            <Link to='/dashboard/novedades' className="hidden py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1 focus:bg-gray-800">
                                <img src={logoAyuda} alt="Ayuda" width={26} height={26} /><p className=" px-2">Ayuda</p>
                            </Link>
                            <Link to='/dashboard/configuracion' className="block py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1 focus:bg-gray-800">
                                <img src={logoConfig} alt="Configuracion" width={26} height={26} /><p className="px-2">Configuración</p>
                            </Link>
                            <button className="px-5 py-2 mt-12 ml-11 bg-sky-950 text-white rounded-md hover:bg-black duration-300"
                                onClick={() => {
                                    localStorage.removeItem('token')
                                    localStorage.removeItem('rol')
                                    navigate('/login')
                                }}>Cerrar Sesión</button>
                        </nav>
                        <div className="flex justify-around items-center pt-5">

                            <h1 className="font-semibold text-center text-md">Usuario - {auth.nombre} {auth.apellido}</h1>
                            <div className="bg-green-600 w-3 h-3 rounded-full"></div>
                        </div>
                        <div className="flex justify-center">
                            <span className="text-sm text-center font-semibold text-orange-500">{auth.rol}</span>
                        </div>

                    </div>
                    <div className="flex-1 flex flex-col h-screen bg-white dark:bg-black">
                        <div className='overflow-y-auto p-8'>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}
export default Dashboard