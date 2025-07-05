import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import RelojDeArena from "../../componentes/RelojArena";
import AuthStoreContext from "../../store/AuthStore";

const Sugerencias = () => {
    const { auth } = AuthStoreContext()
    const [carga, setCarga] = useState(false)
    const [formSug, setFormSug] = useState({
        email: "",
        nombre: "",
        experiencia: "",
        comentarios: {
            fecha: '',
            comentario: ''
        }
    })


    const handleChange = (e) => {
        const fechaHoy = new Date()
        let msg


        if (e.target.name === 'comentarios') {
            msg = e.target.value
        }
        setFormSug({
            email: auth.email,
            nombre: auth.nombre + '' + auth.apellido,
            experiencia: e.target.name === 'experiencia' ? e.target.value : formSug.experiencia,
            comentarios: {
                fecha: fechaHoy,
                comentario: e.target.name === 'comentarios' ? e.target.value : formSug.comentarios.comentario
            }

        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/sugerencias`
            const token = localStorage.getItem('token')
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`

                }
            }
            const respuesta = await axios.post(url, formSug, options)
            toast.success(respuesta.data.msg)
            setCarga(false)
            setFormSug({
                ...formSug,
                comentarios: {
                    fecha: '',
                    comentario: ''
                }
            })
        } catch (error) {
            console.log('Error al enviar la sugerencia', error.message)
            setCarga(false)
            toast.error(error.response.data.msg)
        }
    }
    return (
        <>
            <ToastContainer
                toastStyle={{ backgroundColor: '#1c2833 ', color: 'white' }}
                closeOnClick
                position="bottom-center"
            />
            <section className="flex justify-center lg:mt-5 mt-20 px-8">
                <div className="w-full lg:w-4/5 mb-5 rounded-lg bg-gray-100 dark:bg-gray-900 shadow-lg dark:shadow-slate-700">
                    <h1 className="text-center text-3xl font-CalSans text-cyan-500 mt-5">Sugerencias y comentarios</h1>
                    <div className="flex justify-around flex-wrap lg:mx-5 xl:mx-8 mt-5">
                        <div className="px-3 lg:w-[500px]">
                            <p className="dark:text-white font-semibold text-xl text-center lg:text-left">¡Cuéntanos cómo ha sido tu experiencia en el sistema y comparte tus sugerencias!</p>
                            <form className="mt-4 dark:text-white" onSubmit={handleSubmit}>
                                <h1 className="font-semibold dark:text-slate-300 mb-1">Experiencia:</h1>
                                <div className="flex flex-wrap">
                                    <div className="mb-3 mr-2">
                                        <label htmlFor="buena" className="border border-gray-500 rounded-md px-3 py-1 flex items-center has-[input:checked]:border-green-600 has-[input:checked]:text-green-600 duration-300">
                                            Buena
                                            <input type="radio" name="experiencia" id="buena" value='buena' onChange={handleChange} className="ml-1 appearance-none border-4 border-gray-500 rounded-full w-4 h-4 checked:border-4 checked:border-green-600 duration-300" />
                                        </label>
                                    </div>
                                    <div className="mb-3 mr-2">
                                        <label htmlFor="regular" className="border border-gray-500 rounded-md px-3 py-1 flex items-center has-[input:checked]:border-yellow-600 has-[input:checked]:text-yellow-600 duration-300">
                                            Regular
                                            <input type="radio" name="experiencia" id="regular" value='regular' onChange={handleChange} className="ml-1 appearance-none border-4 border-gray-500 rounded-full w-4 h-4 checked:border-4 checked:border-yellow-600 duration-300" />
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
                                    <label htmlFor="comentarios" className="font-semibold mb-1">Comentario:</label>
                                    <textarea name="comentarios" id="comentarios" value={formSug.comentarios.comentario || ""} onChange={handleChange} className="px-2 border-2 min-h-10 max-h-24 dark:border-white dark:focus:border-cyan-500 dark:bg-transparent rounded-md focus:outline-none focus:border-cyan-500"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSubmit(e);
                                            }
                                        }}>

                                    </textarea>
                                </div>
                                <div className="mb-5 flex justify-center lg:justify-start">
                                    <button type="submit" className={`${carga ? 'hidden' : ''} px-4 py-2 text-cyan-700 font-semibold rounded-md bg-cyan-200 hover:bg-cyan-300 duration-300 cursor-pointer`} onClick={() => setCarga(true)}>
                                        Enviar
                                    </button>
                                    {carga && <RelojDeArena />}
                                </div>
                            </form>
                        </div>
                        <div className="mb-2">
                            <img src={'https://mqpsbzrziuppiigkbiva.supabase.co/storage/v1/object/sign/altakassa/Suggestions.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wODIxMTJiNC1kZDliLTQwZWUtYmUxMy1iNDZiMDI3Y2EzYTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhbHRha2Fzc2EvU3VnZ2VzdGlvbnMuc3ZnIiwiaWF0IjoxNzUxNjc3MDA4LCJleHAiOjIwNjcwMzcwMDh9.VJVhrTm63TaXY6_W-BU10OAdrxsnUVpoDSbo-TQsbWI'} alt="Sugerencias" className="size-84" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Sugerencias