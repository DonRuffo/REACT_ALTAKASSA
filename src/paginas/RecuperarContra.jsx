import React, { useEffect, useState } from "react";
import logoNegroAK from '../assets/AK_NEGRA500.avif'
import logoNegroAK300 from '../assets/AK_NEGRA300.avif'
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import RelojDeArena from "../componentes/RelojArena";
import AuthStoreContext from "../store/AuthStore";
const Recuperar = () => {
    const [mail, setMail] = useState({})
    const [reloj, setReloj] = useState(false)
    const { darkMode } = AuthStoreContext()

    const HandleSubmit = async (e) => {
        e.preventDefault()

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/recuperarPassUser`
            const respuesta = await axios.post(url, mail)
            toast.success(respuesta.data.msg)
            setReloj(false)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            const tiempo = document.getElementById('Formulario')
            if (tiempo) {
                tiempo.scrollIntoView({ behavior: "smooth" })
            }
        }, 1000)
    }, [])



    return (
        <>
            <ToastContainer
                toastStyle={{ backgroundColor: '#1c2833 ', color: 'white' }}
                closeOnClick
                position="bottom-center"
            />
            <div className={darkMode ? "dark" : ""}>
                <div className="grid grid-cols-1 md:grid-cols-2 font-Cabin">
                    <div id="Formulario" className="bg-white dark:bg-black h-screen flex items-center justify-center">
                        <div className="w-5/6 md:w-4/6">
                            <h1 className="mb-3 font-CalSans text-center text-transparent text-2xl bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text">RECUPERAR CONTRASEÑA</h1>
                            <hr className="dark:border dark:border-gray-900" />
                            <form onSubmit={HandleSubmit}>
                                <div className="my-3">
                                    <label className="block mb-2 text-md text-orange-500 font-semibold">Correo electrónico</label>
                                    <input type="email" name="email" onChange={(e) => { setMail({ email: e.target.value }) }} className="block w-full  dark:bg-transparent dark:text-white rounded-md border border-gray-300 focus:border-orange-700 focus:outline-none focus:ring-1 focus:ring-orange-700 py-1 px-2 text-gray-500" placeholder="Ingresa tu correo" />
                                </div>
                                <div className="my-7 flex justify-center">
                                    <button type="submit" className={`px-6 py-2 ${reloj ? 'hidden' : ''} rounded-lg bg-gradient-to-r from-orange-600 to-yellow-600 text-white hover:bg-orange-700 duration-300 cursor-pointer font-CalSans`} onClick={() => setReloj(true)}> Enviar</button>
                                    {reloj && <RelojDeArena />}
                                </div>
                            </form>
                            <hr className="dark:border dark:border-gray-900" />
                            <div className="my-3 flex justify-end">
                                <p className="text-base text-slate-500 dark:text-slate-300 font-semibold">¿No tienes una cuenta? {'-->'} <Link className="text-emerald-500 dark:text-emerald-300 hover:underline hover:text-orange-500 duration-300" to='/registro'>Registrate aquí</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="radial-gradientRecuperar-bg flex items-center justify-center h-screen">
                        <img src={logoNegroAK} srcSet={`${logoNegroAK300} 300w, ${logoNegroAK} 500w`} sizes="(max-width: 768px) 300px, 500px" alt='Altakassa'/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Recuperar