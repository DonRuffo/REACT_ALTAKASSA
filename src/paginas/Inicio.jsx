import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoInicio from '../assets/SVG_Construccion.svg'
import logoMenu from '../assets/category.png'
import logoMenuAbierto from '../assets/hamburger.png'
import AuthContext from "../context/AuthProvider";
const Inicio = () => {
    const [menu, setMenu] = useState(false)
    const {auth} = useContext(AuthContext)
    const navigate = useNavigate()
    return (//#BA05FF COLOR DEL SISTEMA
        <>
            <div className="flex justify-between md:justify-end">
                <div className="lg:hidden pb-2">
                    <img src={logoMenu} alt="Menu" width={40} height={40} onClick={() => setMenu(!menu)} className={`${menu === true ? 'hidden' : ''} cursor-pointer duration-300`} />
                    <img src={logoMenuAbierto} alt="Menu" width={40} height={40} onClick={() => setMenu(!menu)} className={`${menu === false ? 'hidden' : ''} cursor-pointer duration-300`} />
                </div>
                <button className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 duration-300" 
                onClick={()=>{
                    localStorage.removeItem('token')
                    localStorage.removeItem('rol')
                    navigate('/login')
                }}>Salir</button>
            </div><br />
            <section className="flex justify-center">
                <div className="rounded-md shadow-lg w-4/5 bg-white border border-gray-100">
                    <h1 className="text-3xl text-center text-purple-800 font-semibold pt-4 px-3 md:px-0">¡Bienvenido de nuevo {auth.nombre}, agenda tu cita!</h1>
                    <h2 className="text-xl text-center pt-3 pb-5 px-3 md:px-0">¡Contamos con más de 100 profesionales a tu servicio!</h2>
                    <div className="flex justify-center pb-5">
                        <img src={logoInicio} alt="Constructor" width={150} height={150} className='rounded-full border-2 border-black-600' />
                    </div>
                </div>
            </section><br />
            <section className="flex justify-center">
                <div className="w-5/6 ">
                    <h1 className="font-semibold text-2xl mb-3">Categorías</h1>
                    <div className="flex flex-wrap justify-around mb-2">
                        <Link className="px-4 py-2 mb-2 md:my-0 border-2 border-purple-800 rounded-md text-purple-800 font-semibold hover:bg-purple-800 hover:text-white duration-300">Plomería</Link>
                        <Link className="px-4 py-2 mb-2 md:my-0 border-2 border-purple-800 rounded-md text-purple-800 font-semibold hover:bg-purple-800 hover:text-white duration-300">Limpieza</Link>
                        <Link className="px-4 py-2 mb-2 md:my-0 border-2 border-purple-800 rounded-md text-purple-800 font-semibold hover:bg-purple-800 hover:text-white duration-300">Carpintería</Link>
                        <Link className="px-4 py-2 mb-2 md:my-0 border-2 border-purple-800 rounded-md text-purple-800 font-semibold hover:bg-purple-800 hover:text-white duration-300">Pintor</Link>
                        <Link className="px-4 py-2 mb-2 md:my-0 border-2 border-purple-800 rounded-md text-purple-800 font-semibold hover:bg-purple-800 hover:text-white duration-300">Albañilería</Link>
                        <Link className="px-4 py-2 mb-2 md:my-0 border-2 border-purple-800 rounded-md text-purple-800 font-semibold hover:bg-purple-800 hover:text-white duration-300">Técnico-Electrodomésticos</Link>
                    </div><hr className="border-2" />
                </div>
            </section>
        </>
    )
}


export default Inicio