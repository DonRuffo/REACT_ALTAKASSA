import React, { useContext, useState } from "react";
import imgSug from '../../assets/Suggestions.svg'
import logoMenu from '../../assets/category.png'
import logoMenuAbierto from '../../assets/hamburger.png'
import AuthContext from "../../context/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import RelojDeArena from "../../componentes/RelojArena";

const Sugerencias = () => {
    const {menu, handleMenu, auth} = useContext(AuthContext)
    const [carga, setCarga] = useState(false)
    const [formSug, setFormSug] = useState({
        email:"",
        rol:"",
        nombre:"",
        experiencia:"",
        comentario:""
    })


    const handleChange = (e) =>{
        setFormSug({
            ...formSug,
            email:auth.email,
            rol:auth.rol,
            nombre:auth.nombre + " " + auth.apellido,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/sugerencias`
            const token = localStorage.getItem('token')
            const options = {
                headers:{
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${token}`
                    
                }
            }
            console.log(formSug)
            const respuesta = await axios.post(url, formSug, options)
            toast.success(respuesta.data.msg)
            setCarga(false)
        } catch (error) {
            console.log('Error al enviar la sugerencia', error.message)
            setCarga(false)
            toast.error(error.response.data.msg)
        }
    }
    return (
        <>
            <ToastContainer />
            <div className="lg:hidden pb-2 mt-5">
                <img src={logoMenu} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === true ? 'hidden' : ''} cursor-pointer duration-300`} />
                <img src={logoMenuAbierto} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === false ? 'hidden' : ''} cursor-pointer duration-300`} />
            </div>
            <section className="flex justify-center mt-5 ">
                <div className="w-full lg:w-4/5 mb-5 rounded-lg bg-gray-100 dark:bg-gray-900 shadow-lg dark:shadow-slate-800">
                    <h1 className="text-center text-3xl font-semibold text-purple-600 mt-5">Sugerencias y comentarios</h1>
                    <div className="flex justify-around flex-wrap lg:mx-8 mt-5">
                        <div className="px-3 lg:w-[500px]">
                            <p className="dark:text-white font-semibold text-xl text-center lg:text-left">¡Cuéntanos cómo ha sido tu experiencia en el sistema y comparte tus sugerencias!</p>
                            <form className="mt-4 dark:text-white" onSubmit={handleSubmit}>
                                <h1 className="font-semibold dark:text-slate-300 mb-1">Experiencia:</h1>
                                <div className="flex flex-wrap">
                                    <div className="mb-3 mr-2">
                                        <label htmlFor="buena" className="border border-gray-500 rounded-md px-3 py-1 flex items-center has-[input:checked]:border-green-600 has-[input:checked]:text-green-600 duration-300">
                                            Buena
                                            <input type="radio" name="experiencia" id="buena" value='buena' onChange={handleChange}  className="ml-1 appearance-none border-4 border-gray-500 rounded-full w-4 h-4 checked:border-4 checked:border-green-600 duration-300" />
                                        </label>
                                    </div>
                                    <div className="mb-3 mr-2">
                                        <label htmlFor="regular" className="border border-gray-500 rounded-md px-3 py-1 flex items-center has-[input:checked]:border-purple-600 has-[input:checked]:text-purple-600 duration-300">
                                            Regular
                                            <input type="radio" name="experiencia" id="regular" value='regular' onChange={handleChange} className="ml-1 appearance-none border-4 border-gray-500 rounded-full w-4 h-4 checked:border-4 checked:border-purple-600 duration-300" />
                                        </label>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="mala" className="border border-gray-500 rounded-md px-3 py-1 flex items-center has-[input:checked]:border-red-600 has-[input:checked]:text-red-600 duration-300">
                                            Mala
                                            <input type="radio" name="experiencia" id="mala" value='mala' onChange={handleChange} className="ml-1 appearance-none border-4 border-gray-500 rounded-full w-4 h-4 checked:border-4 checked:border-red-600 duration-300" />
                                        </label>
                                    </div>
                                </div>
                                <div className="flex flex-col mb-5">
                                    <label htmlFor="comentario" className="font-semibold mb-1">Comentario:</label>
                                    <textarea name="comentario" id="comentario" value={formSug.comentario || ""} onChange={handleChange} className="px-2 border-2 min-h-10 max-h-24 dark:border-white dark:focus:border-purple-600 dark:bg-transparent rounded-md focus:outline-none focus:border-purple-600"></textarea>
                                </div>
                                <div className="mb-5 flex justify-center lg:justify-start">
                                    <button type="submit" className={`${carga ? 'hidden' : ''} px-4 py-2 text-purple-700 font-semibold rounded-md bg-purple-200 hover:bg-purple-300 duration-300`} onClick={()=>setCarga(true)}>
                                        Enviar
                                    </button>
                                    {carga && <RelojDeArena />}
                                </div>
                            </form>
                        </div>
                        <div className="mb-2">
                            <img src={imgSug} alt="Sugerencias" width={325} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Sugerencias