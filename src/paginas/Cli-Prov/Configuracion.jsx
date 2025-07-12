import React, { useState, useEffect } from "react";
import OpcionConfig from "../../componentes/opcionesConfiguracion";
import { ToastContainer, toast } from "react-toastify";
import { EyeOff, Eye } from 'lucide-react';
import axios from "axios";
import AuthStoreContext from "../../store/AuthStore";
import OfertaStore from "../../store/OfertaStore";
import SpinnerCargaModal from "../../componentes/RuedaCargaModal";
import SpinnerCarga from "../../componentes/RuedaCarga";

const Configuracion = () => {
    const [ojoActivo, setOjoActivo] = useState(false)
    const [ojoActivo2, setOjoActivo2] = useState(false)
    const [veryContra, setVeryContra] = useState(false)
    const [carga, setCarga] = useState(false)
    const [carga2, setCarga2] = useState(false)


    const { auth, setAuth, ActualizarPerfil, ActualizarContrasenia, modalContra, setModalContra, modalPerfil,
        setModalPerfil, modalUbi, setModalUbi, selectorM, setFoto} = AuthStoreContext()

    const { setModalPerfilFoto } = OfertaStore()

    const accesoContra = () => { setModalContra(!modalContra) }
    const accesoPerfil = () => { setModalPerfil(!modalPerfil) }
    const accesoUbi = () => { setModalUbi(!modalUbi) }
    const [formPerfil, setFormPerfil] = useState({
        nombre: auth.nombre || "",
        apellido: auth.apellido || "",
        direccion: auth.direccion || ""
    })

    //actualizar la foto del perfil
    const SubidaImage = async (e) => {
        const urlPublic = `${import.meta.env.VITE_BACKEND_URL}/publicIdUser/${auth._id}`
        let eliminarFoto
        const url_subida = `${import.meta.env.VITE_BACKEND_URL}/fotoUser`
        const preset_name = 'pUsuario'
        const file = e.target.files
        if (!file || file.length === 0) {
            toast.error('No se seleccionó ninguna foto');
            return;
        }
        //obtener el public ID
        try {
            const token = localStorage.getItem('token')
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const resPublic = await axios.get(urlPublic, options)
            eliminarFoto = `${import.meta.env.VITE_BACKEND_URL}/eliminarFotoA?public=${resPublic.data.publicId}`
        } catch (error) {
            console.error(error)
        }

        //eliminar la foto actual
        try {
            const token = localStorage.getItem('token')
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.delete(eliminarFoto, options)
        } catch (error) {
            console.error(error)
        }

        //subir la nueva foto
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
            setCarga(false)
            setFoto(true)
            toast.success('Foto actualizada')
        } catch (error) {
            console.error('error', error.message)
            setCarga(false)
        }
    }



    useEffect(() => {
        setFormPerfil({
            nombre: auth.nombre || "",
            apellido: auth.apellido || "",
            direccion: auth.direccion || ""
        })
    }, [auth])

    const [formContra, setFormContra] = useState({
        email: auth.email,
        contrasenia: "",
        nuevaContrasenia: ""
    })

    const handleChangePerfil = (e) => {
        let {name, value} = e.target

        if (name === 'direccion' || name === 'nombre' || name === 'apellido'){
            value = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        }

        setFormPerfil({
            ...formPerfil,
            [name]: value
        })
    }

    const handleChangeContrasenia = (e) => {
        setFormContra({
            ...formContra,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitPerfil = async (e) => {
        e.preventDefault()
        try {
            await ActualizarPerfil(formPerfil)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitContrasenia = async (e) => {
        e.preventDefault()
        try {
            await ActualizarContrasenia(formContra)
        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        if (modalContra) {
            setModalPerfil(false)
            setModalUbi(false)
        }
    }, [modalContra]);

    useEffect(() => {
        if (modalPerfil) {
            setModalContra(false)
            setModalUbi(false)
        }
    }, [modalPerfil]);

    useEffect(() => {
        if (modalUbi) {
            setModalContra(false)
            setModalPerfil(false)
        }
    }, [modalUbi])

    useEffect(()=> {
        if(formContra.contrasenia && formContra.nuevaContrasenia){
            setVeryContra(true)
        }else{
            setVeryContra(false)
        }
    }, [formContra])

    //funcion para actualizar la ubicación
    const actualizarUbi = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords
                    try {
                        const url = `${import.meta.env.VITE_BACKEND_URL}/guardar-ubicacion-trabajo`
                        const token = localStorage.getItem('token')
                        const options = {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`
                            }
                        }
                        await axios.post(url, { latitude, longitude }, options)
                        const ubiNueva = {
                            ubicacionTrabajo: {
                                longitud: longitude,
                                latitud: latitude
                            }
                        }
                        toast.success('Ubicación actualizada')
                        setCarga2(false)
                        setAuth(ubiNueva)
                        resolve()
                    } catch (error) {
                        console.log(error)
                        toast.error(error.response?.data?.msg || "Error al actualizar la ubicación")
                        setCarga2(false)
                        reject()
                    }
                },
                    () => {
                        reject()
                    }
                );
            } else {
                console.log('La geolocalización no está soportada por este navegador.')
                resolve()
            }
        })
    }

    useEffect(()=>{
        const elemento = document.getElementById(selectorM)
        if(elemento){
            elemento.scrollIntoView({behavior:'smooth'})
        }else return
    }, [selectorM])

    return (
        <>
            <ToastContainer
                toastStyle={{backgroundColor:'#1c2833 ', color:'white'}}
                closeOnClick
                position="bottom-center"
            />
            <section className="flex flex-col md:flex-row justify-between px-5 mb-3">
                <div className="w-full md:w-2/5 flex flex-col items-center">
                    <h1 className="text-3xl font-CalSans dark:text-white pb-1 mt-20 lg:mt-5 px-8">{auth.nombre} {auth.apellido}</h1>
                    <div className={`w-[125px] h-[125px] outline outline-gray-100 dark:outline-gray-900 rounded-full shrink-0 overflow-hidden cursor-pointer mb-3 ${auth.f_perfil === "" || auth.f_perfil === null ? 'bg-gray-500' : ''}`} onClick={() => { setModalPerfilFoto(true) }}>
                        {auth.f_perfil === "" || auth.f_perfil === null ? (
                            <div className="flex items-center justify-center w-full h-full">
                                <h1 className="text-7xl text-center text-white">US</h1>
                            </div>
                        ): ''}
                        <img src={auth.f_perfil} alt="FotoPerfil" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex w-full lg:w-4/5 bg-gray-100 dark:bg-black dark:text-white outline outline-emerald-100 dark:outline-gray-800 rounded-xl shadow-lg lg:max-h-[245px] mb-8 md:mb-5">
                        <ul className="w-full p-2">
                            <OpcionConfig titulo={"Cambiar contraseña"} logo={
                                (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                                    <path d="M8 10V7a4 4 0 118 0v3" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="12" cy="15" r="1.5" fill="currentColor" />
                                </svg>
                                )
                            } clic={accesoContra} />
                            <OpcionConfig titulo={"Actualizar perfil"} logo={(
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                                    <path d="M4 20a8 8 0 0116 0" stroke="currentColor" strokeWidth="2" />
                                </svg>

                            )} clic={accesoPerfil} />
                            {auth.rol !== 'administrador' && <OpcionConfig titulo={"Actualizar Ubicación"} logo={(
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2">
                                    <polygon points="3,6 9,2 15,6 21,2 21,18 15,22 9,18 3,22" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )} clic={accesoUbi} />}
                        </ul>
                    </div>
                </div>
                <div id="Cambiar contraseña" className={`${modalContra === true ? 'block' : 'hidden'} w-full md:w-1/2 bg-gray-100 rounded-xl shadow-lg h-auto outline dark:outline-gray-800 p-5 dark:bg-black mt-20 lg:mt-5 `}>
                    <h1 className="text-2xl text-center text-purple-500 font-CalSans pb-5">Cambio de contraseña</h1>
                    <div className="border px-3 py-2 mb-3 bg-slate-200 rounded-lg dark:bg-transparent dark:text-white">
                        <h1 className="font-bold">Tener en cuenta:</h1>
                        <ul>
                            <li>La contraseña debe tener al menos 10 caracteres.</li>
                            <li>La contraseña debe contener al menos una letra mayúscula.</li>
                            <li>La contraseña debe contener al menos una letra minúscula.</li>
                            <li>La contraseña debe contener al menos un número.</li>
                        </ul>
                    </div>
                    <div className="w-full">
                        <form onSubmit={handleSubmitContrasenia}>
                            <div className="mb-3">
                                <label htmlFor="contrasenia" className="text-black font-semibold block mb-2 dark:text-white">Contraseña actual:</label>
                                <div className="relative">
                                    <input type={ojoActivo ? "text" : "password"} name="contrasenia" id="contrasenia" onChange={handleChangeContrasenia} value={formContra.contrasenia || ""} className="w-full border border-gray-200 rounded-md focus:ring-1 focus:ring-purple-600 focus:outline-none focus:border-purple-600 p-1 dark:text-white dark:bg-transparent" placeholder="******" />
                                    <button type='button' onClick={() => setOjoActivo(!ojoActivo)} className='absolute right-3 top-1/2 transform -translate-y-1/2 dark:text-white cursor-pointer'>{ojoActivo === false ? <Eye size={20} /> : <EyeOff size={20} />}</button>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nuevaContrasenia" className="text-black font-semibold block mb-2 dark:text-white">Nueva contraseña:</label>
                                <div className="relative">
                                    <input type={ojoActivo2 ? "text" : "password"} name="nuevaContrasenia" id="nuevaContrasenia" onChange={handleChangeContrasenia} value={formContra.nuevaContrasenia || ""} className="w-full border border-gray-200 rounded-md focus:ring-1 focus:ring-purple-600 focus:outline-none focus:border-purple-600 p-1 dark:text-white dark:bg-transparent" placeholder="******" />
                                    <button type='button' onClick={() => setOjoActivo2(!ojoActivo2)} className='absolute right-3 top-1/2 transform -translate-y-1/2 dark:text-white cursor-pointer'>{ojoActivo2 === false ? <Eye size={20} /> : <EyeOff size={20} />}</button>
                                </div>
                            </div><br />
                            <div className="mb-3 flex justify-around">
                                <button data-testid="btn-actualizar-contrasenia" type="submit" className={`${veryContra ? 'cursor-pointer' : 'pointer-events-none cursor-not-allowed opacity-50'} px-5 py-2 bg-purple-200 rounded-lg text-purple-800 hover:brightness-110 transition-all duration-300 font-semibold`}>Actualizar</button>
                                <button type="button" className="px-6 py-2 bg-purple-200 rounded-lg text-purple-800  hover:brightness-110 transition-all duration-300 font-semibold cursor-pointer" onClick={() => setModalContra(!modalContra)}>Cerrar</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="Actualizar perfil" className={`${modalPerfil === true ? 'block' : 'hidden'} w-full lg:max-h-[400px] md:w-1/2 flex flex-col bg-gray-100 rounded-xl shadow-lg h-auto outline dark:outline-gray-800 dark:bg-black mt-20 lg:mt-5`}>
                    <div className="w-full p-2 flex flex-col items-center">
                        <h1 className="font-CalSans text-green-600 text-2xl pt-3">Actualizar perfil</h1>
                        <span className="font-semibold text-sm text-slate-500 dark:text-slate-300 text-center">Cambia los campos que requieras y presiona actualiza</span>
                    </div>
                    <div className="w-full p-6 flex flex-col">
                        <form onSubmit={handleSubmitPerfil}>
                            <div className="mb-4">
                                <label htmlFor="nombre" className="font-semibold dark:text-white">Nombre:</label>
                                <input type="text" name="nombre" id="nombre" value={formPerfil.nombre || ""} onChange={handleChangePerfil} className="w-full md:w-4/5 border focus:border-green-700 rounded-md p-1 md:ml-6 focus:ring-1 focus:outline-none focus:ring-green-700  dark:bg-transparent dark:text-white" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="apellido" className="font-semibold dark:text-white">Apellido:</label>
                                <input type="text" name="apellido" id="apellido" value={formPerfil.apellido || ""} onChange={handleChangePerfil} className="w-full md:w-4/5 border focus:border-green-700 rounded-md p-1 md:ml-6 focus:ring-1 focus:outline-none focus:ring-green-700 dark:bg-transparent dark:text-white" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="direccion" className="font-semibold dark:text-white">Provincia:</label>
                                <select name="direccion" id="direccion" onChange={handleChangePerfil} className="w-full md:w-4/5 dark:bg-black border focus:border-green-700 rounded-md p-1 md:ml-4 focus:ring-1 focus:outline-none focus:ring-green-700 dark:text-white">
                                        <option value="Pichincha">Pichincha</option>
                                        <option value="Guayas">Guayas</option>
                                        <option value="Azuay">Azuay</option>
                                        <option value="Tungurahua">Tungurahua</option>
                                        <option value="Cañar">Cañar</option>
                                        <option value="Cotopaxi">Cotopaxi</option>
                                        <option value="Carchi">Carchi</option>
                                        <option value="Imbabura">Imbabura</option>
                                        <option value="Santo Domingo">Santo Domingo</option>
                                        <option value="Esmeraldas">Esmeraldas</option>
                                        <option value="Manabí">Manabí</option>
                                        <option value="Los Ríos">Los Ríos</option>
                                        <option value="Loja">Loja</option>
                                        <option value="Bolívar">Bolívar</option>
                                        <option value="Santa Elena">Santa Elena</option>
                                        <option value="El Oro">El Oro</option>
                                        <option value="Chimborazo">Chimborazo</option>
                                        <option value="Sucumbíos">Sucumbíos</option>
                                        <option value="Napo">Napo</option>
                                        <option value="Orellana">Orellana</option>
                                        <option value="Pastaza">Pastaza</option>
                                        <option value="Morona Santiago">Morona Santiago</option>
                                        <option value="Zamora Chinchipe">Zamora Chinchipe</option>
                                        <option value="Galápagos">Galápagos</option>
                                    </select>
                            </div>
                            <div className="mb-4 flex items-center gap-x-5">
                                <label className="font-semibold dark:text-white">Foto de perfil:</label>
                                <label htmlFor="fotoP" className="group flex gap-x-1.5 items-center px-4 py-1 rounded-lg bg-green-200 text-green-800 font-semibold hover:brightness-110 duration-300 ease-in-out cursor-pointer" onClick={()=>{setCarga(true)}}>
                                    Actualizar foto
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 group-hover:scale-110 transition-all duration-300 ease-in-out">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                    </svg>
                                </label>
                                <input type="file" id="fotoP" className="hidden" onChange={async (e) => SubidaImage(e)}/>
                                {carga && <SpinnerCargaModal h={5} w={5} HH={6}/>}
                            </div><br />
                            <div className="mb-3 flex justify-around">
                                <button type="submit" className="px-4 py-2 rounded-lg bg-green-200 text-green-800 hover:brightness-110 transition-all duration-300 font-semibold cursor-pointer">Actualizar</button>
                                <button type="button" className="px-6 py-2 rounded-lg bg-green-200 text-green-800 hover:brightness-110 transition-all duration-300 font-semibold cursor-pointer" onClick={() => setModalPerfil(!modalPerfil)}>Cerrar</button>
                            </div>
                        </form>

                    </div>
                </div>
                <div id="Actualizar Ubicación" className={`${modalUbi === true ? 'block' : 'hidden'} w-full md:w-1/2 md:max-h-[225px] flex flex-col bg-gray-100 rounded-xl shadow-lg outline dark:outline-gray-800 dark:bg-black dark:text-white mt-20 lg:mt-5`}>
                    <div className="flex flex-col items-center">
                        <h1 className="font-CalSans text-2xl text-red-600 mt-5">Actualizar Ubicación</h1>
                        <span className="font-semibold text-slate-500 dark:text-slate-300 text-sm text-center">Si cambiaste tu lugar de trabajo es importante actualizar su ubicación</span>
                        <div className="cursor-pointer flex flex-col justify-center items-center border-dashed border-2 border-gray-400 bg-transparent rounded-lg w-[130px] h-[130px] mt-3 mb-2 lg:mb-0 hover:bg-gray-300 dark:hover:bg-gray-800 transition-all duration-300" onClick={async () => {setCarga2(true); await actualizarUbi()}}>
                            {carga2 ? <SpinnerCarga /> : (<img src={'https://mqpsbzrziuppiigkbiva.supabase.co/storage/v1/object/sign/altakassa/Mapa.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wODIxMTJiNC1kZDliLTQwZWUtYmUxMy1iNDZiMDI3Y2EzYTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhbHRha2Fzc2EvTWFwYS5zdmciLCJpYXQiOjE3NTE2NzYwMTIsImV4cCI6MjA2NzAzNjAxMn0.xy9s5w07VmO7gE5VKQYH5pOcycu3qRwKIAquOgqbTbk'} alt="actualizarUbi" width={65} height={65} />)}
                            <p className="font-semibold px-2 text-sm text-slate-500 dark:text-slate-300 text-center">¡Clic para actualizar!</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex flex-col md:flex-row justify-between px-5">

            </section>
        </>
    )
}

export default Configuracion