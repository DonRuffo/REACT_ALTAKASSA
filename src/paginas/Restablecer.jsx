import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import RelojDeArena from "../componentes/RelojArena";
import { Eye, EyeOff } from "lucide-react";

const Restablecer = () => {

    const { token } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        contrasenia: ""
    })

    const [ojoActivo, setOjoActivo] = useState(false)

    const [reloj, setReloj] = useState(false)
    const [indicaciones, setIndicaciones] = useState(false)

    const HandleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const HandleSubmit = async (e) => {
        e.preventDefault()

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/restablecerPassUser/${token}`
            const respuesta = await axios.post(url, form)
            toast.success(respuesta.data.msg)
            setReloj(false)
            setTimeout(() => {
                navigate('/login')
            }, [2000])
        } catch (error) {
            console.log(error)
            setReloj(false)
            toast.error(error.response.data.msg[0])
        }
    }

    useEffect(() => {
        if (form.contrasenia === ''){
            setIndicaciones(false)
        } else {
            setIndicaciones(true)
        }
    }, [form])
    return (
        <>
            <div className="flex flex-col items-center pt-10 md:pt-20 bg-gray-100 font-Cabin h-screen">
                <ToastContainer
                    toastStyle={{ backgroundColor: '#1c2833 ', color: 'white' }}
                    closeOnClick
                    position="bottom-center"
                />
                <div className="w-4/5 md:w-2/5 lg:w-1/3 flex flex-col items-center justify-center bg-white rounded-xl shadow-xl">
                    <h1 className="text-3xl font-CalSans text-slate-600 text-center py-5">Restablecer contraseña</h1>
                    <div className="border px-3 py-2 mb-3 mx-2 bg-slate-200 rounded-lg dark:bg-transparent">
                        <h1 className="font-bold">Tener en cuenta:</h1>
                        <ul>
                            <li>La contraseña debe tener al menos 10 caracteres.</li>
                            <li>La contraseña debe contener al menos una letra mayúscula.</li>
                            <li>La contraseña debe contener al menos una letra minúscula.</li>
                            <li>La contraseña debe contener al menos un número.</li>
                        </ul>
                    </div>
                    <div className="w-5/6">
                        <form onSubmit={HandleSubmit}>
                            <div className="my-3 pb-3">
                                <label htmlFor="contrasenia" className="block text-md font-semibold pb-1">Nueva contraseña</label>
                                <div className="relative">
                                    <input id="contrasenia" type={`${ojoActivo ? 'text' : 'password'}`} placeholder="*******" name="contrasenia" onChange={HandleChange} value={form.contrasenia || ""} className="p-1 w-full text-slate-800 rounded-md border border-slate-400 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700" />
                                    <button type="button" onClick={() => { setOjoActivo(!ojoActivo) }} className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">{ojoActivo === false ? <Eye size={20} /> : <EyeOff size={20} />}</button>
                                </div>
                            </div>
                            <div className="my-3 flex justify-center">
                                <button type="submit" className={`${reloj ? 'hidden' : ''} px-3 py-2 rounded-lg bg-cyan-700 text-white hover:bg-cyan-900 ${indicaciones ? 'opacity-100 cursor-pointer' : 'pointer-events-none opacity-50 cursor-not-allowed'} duration-300`} onClick={() => setReloj(true)}>Enviar</button>
                                {reloj && <RelojDeArena />}
                            </div>
                        </form>
                    </div>
                </div><br />
                <img src={'https://mqpsbzrziuppiigkbiva.supabase.co/storage/v1/object/public/altakassa//Ballon.svg'} alt="Cohete2" width={200} height={200} />
                <span className="text-cyan-500">Altakassa-Multiservicios</span>
            </div>
        </>
    )
}

export default Restablecer