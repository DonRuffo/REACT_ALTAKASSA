import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logoConfig from '../assets/config.png'
const Dashboard = () => {

    const [darkMode, setDarkMode] = useState(false)
    return (
        <>
            <div className={darkMode ? "dark" : ""}>
                <div className="flex h-screen">
                    <div className="fixed inset-y-0 left-0 w-64 bg-sky-900 text-white p-4 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out lg:static lg:block">
                        <h1 className="text-2xl text-white text-center font-bold">AltaKassa</h1><br /><hr />
                        <nav className="py-5">
                            <Link to='/dashboard' className="block py-2 px-3 rounded hover:bg-gray-800 duration-100">Inicio</Link>
                            <Link to='/dashboard/acerca' className="block py-2 px-3 rounded hover:bg-gray-800 duration-100">Acerca</Link>
                            <Link to='/dashboard/novedades' className="block py-2 px-3 rounded hover:bg-gray-800 duration-100">Novedades</Link>
                            <Link to='/dashboard/configuracion' className="block py-2 px-3 rounded hover:bg-gray-800 duration-100 flex gap-1">
                                <img src={logoConfig} alt="Configuracion" width={25} height={25} /><p className="border-l border-gray-100 px-2">Configuración</p>
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