import React, {useState} from "react";
import logoCohete from '../assets/Rocket2.png'
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import RelojDeArena from "../componentes/RelojArena";

const Restablecer = () => {

    const {token} = useParams()
    
    const [form, setForm] = useState({
        email: "",
        contrasenia: ""
    })
    const [reloj, setReloj] = useState(false)

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
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
        }
    }
    return (
        <>
            <div className="flex flex-col items-center pt-10 md:pt-20 bg-gray-100">
                <ToastContainer />
                <div className="w-4/5 md:w-1/3 flex flex-col items-center justify-center bg-white rounded-xl shadow-xl">
                    <h1 className="text-3xl font-semibold text-slate-600 text-center py-5">Restablecer contraseña</h1>
                    <div className="w-5/6">
                        <form onSubmit={HandleSubmit}>
                            <div className="my-3">
                                <label className="block text-md font-semibold pb-1">Correo</label>
                                <input type="email" placeholder="Ingresa tu correo electrónico" name="email" onChange={HandleChange} value={form.email || ""} className="p-1 w-full text-slate-800 rounded-md border border-slate-400 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700" />
                            </div>
                            <div className="my-3 pb-3">
                                <label className="block text-md font-semibold pb-1">Nueva contraseña</label>
                                <input type="password" placeholder="*******" name="contrasenia" onChange={HandleChange} value={form.contrasenia || ""} className="p-1 w-full text-slate-800 rounded-md border border-slate-400 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700" />
                            </div>
                            <div className="my-3 flex justify-center">
                                <button type="submit" className={`${reloj ? 'hidden' : ''} px-3 py-2 rounded-lg bg-orange-700 text-white hover:bg-orange-900 duration-300 cursor-pointer`} onClick={()=>setReloj(true)}>Enviar</button>
                                {reloj && <RelojDeArena />}
                            </div>
                        </form>
                    </div>
                </div><br />
                <img src={logoCohete} alt="Cohete2" width={200} height={200} />
                <span className="text-orange-500">Altakassa-Multiservicios</span>
            </div>
        </>
    )
}

export default Restablecer