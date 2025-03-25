import React, { useContext, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logoHistorial from '../assets/Historial-icon.png'
import logoNovedades from '../assets/Novedades-icon.png'
import logoAyuda from '../assets/Ayuda-icon.png'
import logoAlta from '../assets/AK BLANCA.png'
import AuthContext, { useAuth } from "../context/AuthProvider";
const Dashboard = () => {
    const navigate = useNavigate()
    const { auth } = useAuth()
    const { dark, menu, sideBar, handleMenu } = useContext(AuthContext)
    
    return (
        <>
            <div className={dark ? "dark" : ""}>
                <div className="flex h-screen">
                    <div ref={sideBar} className={`fixed inset-y-0 left-0 w-64 bg-sky-900 dark:bg-gray-950 text-white p-4 transform ${menu === true ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out lg:static lg:block`}>
                        <h1 className="text-2xl text-white text-center font-bold">AltaKassa</h1>
                        <div className="flex justify-center">
                            <img src={logoAlta} alt="AltaKassa Logo" width={160} height={160} />
                        </div><hr />
                        <nav className="py-5 h-[350px] border-b">
                            <Link to='/dashboard' onClick={() => { handleMenu() }} className="group/inicio block py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1 focus:bg-gray-800">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-focus/inicio:text-purple-700 group-focus/inicio:drop-shadow-[0_5px_10px_rgba(0,0,255,0.5)] transition duration-300 ease-in-out">
                                    <path d="M3 10L12 3l9 7v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 10h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                <p className=" px-2">Inicio</p>
                            </Link>
                            <Link to='/dashboard/ofertas' onClick={() => { handleMenu() }} className={`${auth.rol === 'proveedor' ? 'block' : 'hidden'} group/Ofertas py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1 focus:bg-gray-800`}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-focus/Ofertas:text-red-700 group-focus/Ofertas:drop-shadow-[0_5px_10px_rgba(255,0,0,0.5)] transition duration-300 ease-in-out">
                                    <path d="M3 9V3h6l9 9-6 6-9-9z" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" />
                                </svg>
                                <p className=" px-2">Tus Ofertas</p>
                            </Link>
                            <Link to='/dashboard/solicitudes/proveedor' onClick={() => { handleMenu() }} className={`${auth.rol === 'proveedor' ? 'block' : 'hidden'} group/SoliProv py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1 focus:bg-gray-800`}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-focus/SoliProv:text-green-700 group-focus/SoliProv:drop-shadow-[0_5px_10px_rgba(0,128,0,0.5)] transition duration-300 ease-in-out" >
                                    <path d="M6 2h8l6 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="currentColor" strokeWidth="2" />
                                    <path d="M14 2v6h6M9 13l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <p className=" px-2">Solicitudes</p>
                            </Link>
                            <Link to='/dashboard/solicitudes/cliente' onClick={() => { handleMenu() }} className={`${auth.rol === 'cliente' ? 'block' : 'hidden'} group/SoliCli py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1 focus:bg-gray-800`}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-focus/SoliCli:text-green-700 group-focus/SoliCli:drop-shadow-[0_5px_10px_rgba(0,128,0,0.5)] transition duration-300 ease-in-out">
                                    <path d="M6 2h8l6 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="currentColor" strokeWidth="2" />
                                    <path d="M14 2v6h6M9 13l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <p className=" px-2">Solicitudes</p>
                            </Link>
                            <Link to='/dashboard/contratos/cliente' onClick={() => { handleMenu() }} className={`${auth.rol === 'cliente' ? 'block' : 'hidden'} group/TraCli py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1 focus:bg-gray-800`}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-focus/TraCli:text-sky-700 group-focus/TraCli:drop-shadow-[0_5px_10px_rgba(135,206,235,0.5)] transition duration-300 ease-in-out">
                                    <path d="M14.85 6.34a4.5 4.5 0 11-5.19 5.19L3 18l3 3 6.47-6.66a4.5 4.5 0 115.19-5.19l2.41-2.41a1 1 0 00-1.41-1.41l-2.41 2.41z" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                <p className=" px-2">Trabajos</p>
                            </Link>
                            <Link to='/dashboard/contratos/proveedor' onClick={() => { handleMenu() }} className={`${auth.rol === 'proveedor' ? 'block' : 'hidden'} group/TraProv py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1 focus:bg-gray-800`}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-focus/TraProv:text-sky-700 group-focus/TraProv:drop-shadow-[0_5px_10px_rgba(135,206,235,0.5)] transition duration-300 ease-in-out">
                                    <path d="M14.85 6.34a4.5 4.5 0 11-5.19 5.19L3 18l3 3 6.47-6.66a4.5 4.5 0 115.19-5.19l2.41-2.41a1 1 0 00-1.41-1.41l-2.41 2.41z" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                <p className=" px-2">Trabajos</p>
                            </Link>
                            <Link to='/dashboard/historial' onClick={() => { handleMenu() }} className={`${auth.rol === 'cliente' ? 'block' : 'hidden'} group/Historial py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1 focus:bg-gray-800`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-focus/Historial:text-orange-700 group-focus/Historial:drop-shadow-[0_5px_10px_rgba(255,165,0,0.5)] transition duration-300 ease-in-out w-6 h-6 text-white">
                                    <path d="M3 12a9 9 0 1 1 9 9" />
                                    <polyline points="3 12 6 15 9 12" />
                                    <path d="M12 6v6l3 3" />
                                </svg>
                                <p className=" px-2">Historial</p>
                            </Link>
                            <Link to='/dashboard/novedades' onClick={() => { handleMenu() }} className="hidden py-2 px-3 rounded hover:bg-gray-800 duration-100 gap-1 focus:bg-gray-800">
                                <img src={logoNovedades} alt="Novedades" width={26} height={26} /><p className=" px-2">Novedades</p>
                            </Link>
                            <Link to='/dashboard/novedades' onClick={() => { handleMenu() }} className="hidden py-2 px-3 rounded hover:bg-gray-800 duration-100 gap-1 focus:bg-gray-800">
                                <img src={logoAyuda} alt="Ayuda" width={26} height={26} /><p className=" px-2">Ayuda</p>
                            </Link>
                            <Link to='/dashboard/configuracion' onClick={() => { handleMenu() }} className=" group/Config py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1 focus:bg-gray-800">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-focus/Config:text-yellow-700 group-focus/Config:drop-shadow-[0_5px_10px_rgba(255,255,0,0.5)] transition duration-300 ease-in-out">
                                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="2" />
                                    <path d="M19.4 12a7.4 7.4 0 00-.1-1l2.1-1.8a1 1 0 00-.3-1.7l-2.6-.9a7.7 7.7 0 00-.9-.9l-.9-2.6a1 1 0 00-1.7-.3L13 4.7a7.4 7.4 0 00-2 0L9.1 2.1a1 1 0 00-1.7.3l-.9 2.6c-.3.3-.6.6-.9.9l-2.6.9a1 1 0 00-.3 1.7l2.1 1.8a7.4 7.4 0 000 2l-2.1 1.8a1 1 0 00.3 1.7l2.6.9c.3.3.6.6.9.9l.9 2.6a1 1 0 001.7.3l1.8-2.1a7.4 7.4 0 002 0l1.8 2.1a1 1 0 001.7-.3l.9-2.6c.3-.3.6-.6.9-.9l2.6-.9a1 1 0 00.3-1.7l-2.1-1.8a7.4 7.4 0 00.1-1z" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                <p className="px-2">Configuración</p>
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