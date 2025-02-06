import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import logoInicioProv from '../assets/Motivacion.svg';
import logoMenu from '../assets/category.png'
import logoMenuAbierto from '../assets/hamburger.png'

const InicioProve = () => {
    const [menu, setMenu] = useState(false)
    const {auth} = useContext(AuthContext)
    const navigate = useNavigate()
    return (
        <>
            <div className="flex justify-between md:justify-end">
                <div className="lg:hidden pb-2">
                    <img src={logoMenu} alt="Menu" width={40} height={40} onClick={() => setMenu(!menu)} className={`${menu === true ? 'hidden' : ''} cursor-pointer duration-300`} />
                    <img src={logoMenuAbierto} alt="Menu" width={40} height={40} onClick={() => setMenu(!menu)} className={`${menu === false ? 'hidden' : ''} cursor-pointer duration-300`} />
                </div>
                <button className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 duration-300"
                    onClick={() => {
                        localStorage.removeItem('token')
                        localStorage.removeItem('rol')
                        navigate('/login')
                    }}>Salir</button>
            </div><br />
            <section className="flex justify-center">
                <div className="rounded-md shadow-lg w-4/5 bg-white border border-gray-100">
                    <h1 className="text-3xl text-center text-purple-800 font-semibold pt-4 px-3 md:px-0">¡Bienvenido de nuevo {auth.nombre}!</h1>
                    <h2 className="text-xl text-center pt-3 pb-5 px-3 md:px-0">Listo para un nuevo trabajo, el sistema te espera</h2>
                    <div className="flex justify-center pb-5">
                        <img src={logoInicioProv} alt="Proveedor" width={150} height={150} className='rounded-full border-2 border-black-600' />
                    </div>
                </div>
            </section><br />
        </>
    )
}


export default InicioProve