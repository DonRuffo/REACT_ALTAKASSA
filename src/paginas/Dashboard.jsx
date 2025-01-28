import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logoConfig from '../assets/config.png'
import logoInicio from '../assets/InicioAltern-icon.png'
import logoHistorial from '../assets/Historial-icon.png'
import logoNovedades from '../assets/Novedades-icon.png'
import logoAyuda from '../assets/Ayuda-icon.png'
import logoAlta from '../assets/AK BLANCA.png'
const Dashboard = () => {

    const [darkMode, setDarkMode] = useState(false)
    return (
        <>
            <div className={darkMode ? "dark" : ""}>
                <div className="flex h-screen">
                    <div className="fixed inset-y-0 left-0 w-64 bg-sky-900 text-white p-4 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out lg:static lg:block">
                        <h1 className="text-2xl text-white text-center font-bold">AltaKassa</h1>
                        <div className="flex justify-center">
                            <img src={logoAlta} alt="AltaKassa Logo" width={160} height={160} />
                        </div><hr />
                        <nav className="py-5">
                            <Link to='/dashboard' className="block py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1">
                                <img src={logoInicio} alt="Inicio" width={26} height={26} /><p className=" px-2">Inicio</p>
                            </Link>
                            <Link to='/dashboard/acerca' className="block py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1">
                                <img src={logoHistorial} alt="Historial" width={26} height={26} /><p className=" px-2">Historial</p>
                            </Link>

                            <Link to='/dashboard/novedades' className="block py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1">
                                <img src={logoNovedades} alt="Novedades" width={26} height={26} /><p className=" px-2">Novedades</p>
                            </Link>
                            <Link to='/dashboard/novedades' className="block py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1">
                                <img src={logoAyuda} alt="Ayuda" width={26} height={26} /><p className=" px-2">Ayuda</p>

                            </Link>
                            <Link to='/dashboard/configuracion' className="block py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1">
                                <img src={logoConfig} alt="Configuracion" width={26} height={26} /><p className="px-2">Configuración</p>
                            </Link>
                        </nav>
                    </div>
                    <div className="flex-1 flex flex-col h-screen bg-white">
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