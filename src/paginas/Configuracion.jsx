import React, { useContext, useState, useEffect } from "react";
import OpcionConfig from "../componentes/opcionesConfiguracion";
import logoContrasenia from '../assets/CandadoPassword.png'
import logoPerfil from '../assets/Perfil_negro.png'
import ConfigContext from "../context/ConfigProvider";
import logoMenu from '../assets/category.png'
import logoMenuAbierto from '../assets/hamburger.png'
import AuthContext, { useAuth } from "../context/AuthProvider";
import { ToastContainer, toast } from "react-toastify";


const Configuracion = () => {
    const [menu, setMenu] = useState(false)
    const {auth} = useContext(AuthContext)
    const { modalContra, setModalContra, modalPerfil, setModalPerfil } = useContext(ConfigContext)
    const {ActualizarPerfil, ActualizarContrasenia} = useContext(AuthContext)
    const accesoContra = () => { setModalContra(!modalContra)}
    const accesoPerfil = () => { setModalPerfil(!modalPerfil)}
    const [formPerfil, setFormPerfil] = useState({
        nombre: auth.nombre || "",
        apellido: auth.apellido || "",
        direccion: auth.direccion || "",
        telefono: auth.telefono || ""
    })

    const [formContra, setFormContra] =useState({
        email: auth.email,
        contrasenia: "",
        nuevaContrasenia:""
    })

    const handleChangePerfil = (e) => {
        setFormPerfil({
            ...formPerfil,
            [e.target.name]:e.target.value
        })
    }

    const handleChangeContrasenia = (e) => {
        setFormContra({
            ...formContra,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmitPerfil = async (e) =>{
        e.preventDefault()
        try{
            const respuesta = await ActualizarPerfil(formPerfil)
            console.log(respuesta)
        }catch(error){
            console.log(error)
        }
    }

    const handleSubmitContrasenia = async (e) =>{
        e.preventDefault()
        try{
            const respuesta = await ActualizarContrasenia(formContra)
            console.log(respuesta)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(() => {
        if (modalContra) {
            setModalPerfil(false);
        }
    }, [modalContra]);
    
    useEffect(() => {
        if (modalPerfil) {
            setModalContra(false);
        }
    }, [modalPerfil]);
    
    return (
        <>
        {useEffect(()=>{
            console.log(formPerfil.nombre)
        }, [])}
        
            <div className="lg:hidden pb-2">
                <img src={logoMenu} alt="Menu" width={40} height={40} onClick={() => setMenu(!menu)} className={`${menu === true ? 'hidden' : ''} cursor-pointer duration-300`} />
                <img src={logoMenuAbierto} alt="Menu" width={40} height={40} onClick={() => setMenu(!menu)} className={`${menu === false ? 'hidden' : ''} cursor-pointer duration-300`} />
            </div>
            <h1 className="text-3xl font-semibold text-sky-600 pb-5">Configuración</h1>

            <section className="flex flex-col md:flex-row justify-between">
                <div className="w-full md:w-2/5 flex bg-white rounded-xl shadow-lg md:max-h-[115px] border border-gray-100 mb-8 md:mb-0">
                    <ul className="w-full p-2">
                        <OpcionConfig titulo={"Cambiar contraseña"} logo={logoContrasenia} clic={accesoContra} />
                        <OpcionConfig titulo={"Actualizar perfil"} logo={logoPerfil} clic={accesoPerfil} />
                    </ul>
                </div>
                <div className={`${modalContra === true ? 'block' : 'hidden'} w-full md:w-1/2 bg-white rounded-xl shadow-xl h-auto border border-gray-100 p-5`}>
                    <h1 className="text-2xl text-center text-purple-800 font-semibold pb-5">Cambio de contraseña</h1>
                    <div className="w-full">
                        <form onSubmit={handleSubmitContrasenia}>
                            <div className="mb-3">
                                <label className="text-black font-semibold block mb-2">Contraseña actual:</label>
                                <input type="password" name="contrasenia" onChange={handleChangeContrasenia} value={formContra.contrasenia || ""} className="w-full border border-gray-200 rounded-md focus:ring-1 focus:ring-purple-800 focus:outline-none p-1" placeholder="******" />
                            </div>
                            <div className="mb-3">
                                <label className="text-black font-semibold block mb-2">Nueva contraseña:</label>
                                <input type="password" name="nuevaContrasenia" onChange={handleChangeContrasenia} value={formContra.nuevaContrasenia || ""}  className="w-full border border-gray-200 rounded-md focus:ring-1 focus:ring-purple-800 focus:outline-none p-1" placeholder="******" />
                            </div><br />
                            <div className="mb-3 flex justify-around">
                                <button className="px-5 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-800 duration-300">Cambiar</button>
                                <button className="px-6 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-800 duration-300" onClick={() => setModalContra(!modalContra)}>Cerrar</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={`${modalPerfil === true ? 'block' : 'hidden'} w-full md:w-1/2 flex flex-col bg-white rounded-xl shadow-xl h-auto border border-gray-100`}>
                    <div className="w-full p-2 flex flex-col items-center">
                        <h1 className="font-semibold text-green-700 text-2xl pt-3">Actualizar perfil</h1>
                        <span className="font-semibold text-sm text-slate-500 text-center">Cambia los campos que requieras y presiona actualiza</span>
                    </div>
                    <div className="w-full p-6 flex flex-col">
                        <form onSubmit={handleSubmitPerfil}>
                            <div className="mb-4">
                                <label htmlFor="nombre" className="font-semibold ">Nombre:</label>
                                <input type="text" name="nombre" value={auth.nombre || ""} onChange={handleChangePerfil} className="w-full md:w-4/5 border rounded-md p-1 md:ml-6 focus:ring-1 focus:outline-none focus:ring-green-700" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="apellido" className="font-semibold ">Apellido:</label>
                                <input type="text" name="apellido" value={auth.apellido || ""} onChange={handleChangePerfil} className="w-full md:w-4/5 border rounded-md p-1 md:ml-6 focus:ring-1 focus:outline-none focus:ring-green-700" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="direccion" className="font-semibold ">Dirección:</label>
                                <input type="text" name="direccion" value={auth.direccion || ""} onChange={handleChangePerfil} className="w-full md:w-4/5 border rounded-md p-1 md:ml-4 focus:ring-1 focus:outline-none focus:ring-green-700" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="telefono" className="font-semibold ">Teléfono:</label>
                                <input type="text" name="telefono" value={auth.telefono || ""} onChange={handleChangePerfil} className="w-full md:w-4/5 border rounded-md p-1 md:ml-5 focus:ring-1 focus:outline-none focus:ring-green-700" />
                            </div><br />
                            <div className="mb-3 flex justify-around">
                                <button className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-800 duration-300 ">Actualizar</button>
                                <button className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-800 duration-300" onClick={() => setModalPerfil(!modalPerfil)}>Cerrar</button>
                            </div>
                        </form>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Configuracion