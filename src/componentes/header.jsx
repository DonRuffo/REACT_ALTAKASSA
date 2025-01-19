import React from "react";
import { Link } from "react-router-dom";
import logoDarkMode from '../assets/moon.png';
import { useState } from "react";
const Header = () => {

    const [darkMode, setDarkMode] = useState(false)
    return (
        <>
            
                <nav className="p-10 mb-12 flex justify-between dark:bg-gray-900">
                    <select className="w-1/3 mr-1 md:mr-0  border border-purple-600 rounded-xl py-2 md:w-40 text-center text-white  bg-purple-600 focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 dark:shadow-md dark:shadow-gray-400 hover:bg-purple-800 duration-300">
                        <option value="Menu" className="text-base text-sm">Menu</option>
                        <option value="QuienesSomos" className="text-base text-sm">Quienes Somos</option>
                        <option value="Especialidades" className="text-base text-sm">Especialidades</option>
                        <option value="Contacto" className="text-base text-sm">Contacto</option>
                    </select>
                    <img src={logoDarkMode} alt="CambioTema" onClick={()=>setDarkMode(!darkMode)} width={40} height={40} className="cursor-pointer"/>
                    <ul className="flex items-center">
                        <li><Link to='/login' className="w-1/4 px-6 py-2 my-4 mx-1 md:ml-14 bg-purple-600 text-white rounded-xl hover:bg-purple-800 duration-300 text-center dark:shadow-md dark:shadow-gray-400">Login</Link></li>
                    </ul>
                </nav>
            
        </>
    )
}

export default Header
export {darkMode}