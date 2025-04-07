import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "axios";
import logoFoto from '../assets/TomarFoto.svg'
import { motion } from "framer-motion";

let preset_name
const Cloudinary = () => {
    const { auth, setAuth} = useContext(AuthContext)
    const SubidaImage = async (e) => {
        e.preventDefault()
        const url = `${import.meta.env.VITE_BACKEND_URL}/firmaAK`
        try {
            const token = localStorage.getItem('token')
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const datosFirma = await axios.get(url, options)
            const { timestamp, firmaCAK, apiKey, cloudName } = datosFirma.data
            if (auth.rol === 'cliente') {
                preset_name = 'pCliente'
            } else if (auth.rol === 'proveedor') {
                preset_name = 'pProveedor'
            } else if (auth.rol === 'administrador') {
                preset_name = 'pAdministrador'
            }
            const file = e.target.files
            const formFile = new FormData()
            formFile.append('file', file[0])
            formFile.append('upload_preset', preset_name)
            formFile.append("api_key", apiKey);
            formFile.append("timestamp", timestamp);
            formFile.append("signature", firmaCAK);

            const url_cloud = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
            const respuesta = await axios.post(url_cloud, formFile, options)
            setAuth({
                ...auth,
                f_perfil:respuesta.data.secure_url
            })
        } catch (error) {
            console.error('error', error.message)
        }
    }

    return (

        <motion.div layout className="flex flex-col justify-center items-center outline h-[260px] w-[200px] shadow-md dark:bg-gray-900">
            <img src={logoFoto} alt="fotoPerfil" width={75} height={75} />
            <p className="text-center font-semibold dark:text-white">Sube una foto de perfil</p>
            <input type='file' placeholder="Subir" onChange={(e) => SubidaImage(e)} />
        </motion.div>

    )
}

export default Cloudinary