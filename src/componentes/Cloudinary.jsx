import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import AuthStoreContext from "../store/AuthStore";
import SpinnerCarga from "./RuedaCarga";

const Cloudinary = () => {
    const { setAuth, setFoto } = AuthStoreContext()


    const [carga, setCarga] = useState(false)
    const SubidaImage = async (e) => {
        const url_subida = `${import.meta.env.VITE_BACKEND_URL}/fotoUser`
        const preset_name = 'pUsuario'
        const file = e.target.files
        if (!file || file.length === 0) {
            toast.error('No se seleccionó ninguna foto');
            return;
        }
        try {
            const token = localStorage.getItem('token')
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const url = `${import.meta.env.VITE_BACKEND_URL}/firmaAK?preset=${preset_name}`
            const datosFirma = await axios.get(url, options)
            const { timestamp, firmaCAK, apiKey, cloudName } = datosFirma.data
            const formFile = new FormData()
            formFile.append('file', file[0])
            formFile.append('upload_preset', preset_name)
            formFile.append("api_key", apiKey);
            formFile.append("timestamp", timestamp);
            formFile.append("signature", firmaCAK);

            const url_cloud = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
            const respuesta = await axios.post(url_cloud, formFile)
            const formPerfil = {
                secure_url: respuesta.data.secure_url,
                public_id:respuesta.data.public_id
            }
            await axios.post(url_subida, formPerfil, options)
            const fotito = {
                f_perfil: respuesta.data.secure_url
            }
            setAuth(fotito)
            setFoto(true)
            toast.success('Foto subida')
        } catch (error) {
            console.error('error', error.message)
            setCarga(false)
        }
    }
    return (
        <motion.div layout className="relative flex flex-col justify-center items-center outline-2 outline-emerald-700 h-[260px] w-[200px] shadow-lg bg-gray-100 dark:bg-gray-900 rounded-lg">
            <div className="absolute top-3 right-3 flex justify-center items-center rounded-full w-8 h-8 bg-emerald-300">
                <p className="text-emerald-700 text-lg font-semibold">1</p>
            </div>
            <img src={'https://mqpsbzrziuppiigkbiva.supabase.co/storage/v1/object/public/altakassa//TomarFoto.svg'} alt="fotoPerfil" className={`${carga ? 'hidden' : ''}`} width={125} height={125} />
            {carga && <SpinnerCarga />}
            <p className="text-center font-semibold dark:text-white mb-3">Sube una foto de perfil</p>
            <label htmlFor="imagen" className={`px-3 py-1 rounded-2xl bg-emerald-700 font-semibold text-white text-center cursor-pointer hover:bg-emerald-800 hover:brightness-110 transition-all duration-300`}>Subir Foto</label>
            <input id="imagen" type='file' accept="image/*" placeholder="Subir" onChange={async(e) => await SubidaImage(e)} className="hidden" onClick={() => setCarga(true)} />
        </motion.div>
    )
}

export default Cloudinary