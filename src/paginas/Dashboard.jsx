import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
const Dashboard = () => {

    const [darkMode, setDarkMode] = useState(false)
    return (
        <>
            <div className={darkMode ? "dark" : ""}>
                <div className="flex h-screen">
                    <div className="fixed inset-y-0 left-0 w-64 bg-purple-700 text-white p-4 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out lg:static lg:block">
                        <h1 className="text-2xl text-white text-center font-bold">AltaKassa</h1><br /><hr />
                        <nav className="py-5">
                            <Link to='/dashboard' className="block py-2 px-3 rounded hover:bg-gray-800">Inicio</Link>
                            <Link to='/dashboard/acerca' className="block py-2 px-3 rounded hover:bg-gray-800">Acerca</Link>
                            <Link to='/dashboard/novedades' className="block py-2 px-3 rounded hover:bg-gray-800">Novedades</Link>
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