import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "axios";
import logoFoto from '../assets/TomarFoto.svg'
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Cloudinary = () => {
    const { auth, setAuth, setFoto} = useContext(AuthContext)
    let preset_name
    const SubidaImage = async (e) => {
        let url_subida
        const file = e.target.files
        if (!file || file.length === 0) {
            toast.error('No se seleccionó ninguna imagen');
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
            if (auth.rol === 'cliente') {
                preset_name = 'pCliente'
                url_subida = `${import.meta.env.VITE_BACKEND_URL}/fotoCliente`
            } else if (auth.rol === 'proveedor') {
                preset_name = 'pProveedor'
                url_subida = `${import.meta.env.VITE_BACKEND_URL}/fotoProveedor`
            } else if (auth.rol === 'administrador') {
                preset_name = 'pAdministrador'
                url_subida = `${import.meta.env.VITE_BACKEND_URL}/fotoAdmin`
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
                secure_url:respuesta.data.secure_url
            }
            const subida = await axios.post(url_subida, formPerfil, options)
            setAuth({
                ...auth,
                f_perfil: respuesta.data.secure_url
            })
            setFoto(true)
            toast.success('Foto subida con éxito')
        } catch (error) {
            console.error('error', error.message)
        }
    }
    return (
        <motion.div layout className="flex flex-col justify-center items-center outline outline-emerald-700 h-[260px] w-[200px] shadow-lg bg-gray-100 dark:bg-gray-900 rounded-lg">
            <img src={logoFoto} alt="fotoPerfil" width={100} height={100} />
            <p className="text-center font-semibold dark:text-white">Sube una foto de perfil</p>
            <label htmlFor="imagen" className="px-3 py-1 rounded-2xl bg-emerald-700 mt-3 font-semibold text-white text-center cursor-pointer hover:bg-emerald-800 hover:brightness-110 transition-all duration-300">Subir Foto</label>
            <input id="imagen" type='file' accept="image/*" placeholder="Subir" onChange={(e)=>SubidaImage(e)} className="rounded-lg hidden" />
        </motion.div>
    )
}

export default Cloudinary