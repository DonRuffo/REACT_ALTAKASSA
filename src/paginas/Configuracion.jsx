import React, { useContext, useState, useEffect } from "react";
import OpcionConfig from "../componentes/opcionesConfiguracion";
import logoContrasenia from '../assets/CandadoPassword.png'
import logoPerfil from '../assets/Perfil_negro.png'
import ConfigContext from "../context/ConfigProvider";
import logoMenu from '../assets/category.png'
import logoMenuAbierto from '../assets/hamburger.png'
import logoTema from '../assets/tema_oscuro.png'
import logoOscuro from '../assets/ModoOscuro.png'
import logoClaro from '../assets/ModoClaro.png'
import AuthContext, { useAuth } from "../context/AuthProvider";
import { ToastContainer, toast } from "react-toastify";


const Configuracion = () => {
    const [menu, setMenu] = useState(false)
    const { auth } = useContext(AuthContext)
    const { modalContra, setModalContra, modalPerfil, setModalPerfil, modalTema, setModalTema} = useContext(ConfigContext)
    const { ActualizarPerfil, ActualizarContrasenia, dark, setDark  } = useContext(AuthContext)
    const accesoContra = () => { setModalContra(!modalContra) }
    const accesoPerfil = () => { setModalPerfil(!modalPerfil) }
    const accesoTema = () => { setModalTema(!modalTema) }
    const [formPerfil, setFormPerfil] = useState({
        nombre: auth.nombre || "",
        apellido: auth.apellido || "",
        direccion: auth.direccion || "",
        telefono: auth.telefono || ""
    })
    useEffect(() => {
        setFormPerfil({
            nombre: auth.nombre || "",
            apellido: auth.apellido || "",
            direccion: auth.direccion || "",
            telefono: auth.telefono || ""
        })
    }, [auth])

    const [formContra, setFormContra] = useState({
        email: auth.email,
        contrasenia: "",
        nuevaContrasenia: ""
    })

    const handleChangePerfil = (e) => {
        setFormPerfil({
            ...formPerfil,
            [e.target.name]: e.target.value
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
            const respuesta = await ActualizarPerfil(formPerfil)
            console.log(respuesta)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitContrasenia = async (e) => {
        e.preventDefault()
        try {
            const respuesta = await ActualizarContrasenia(formContra)
        } catch (error) {
            console.log(error)

        }
    }

    const handleRadioChange = (e) =>{
        const valor = e.target.value
        if (valor === "Oscuro"){
            localStorage.setItem('tema', "Oscuro")
            setDark(true)
        }else if(valor === "Claro"){
            localStorage.setItem('tema', "Claro")
            setDark(false)
        }
        console.log(valor)
    } 
    useEffect(() => {
        if (modalContra) {
            setModalPerfil(false)
            setModalTema(false)
        }
    }, [modalContra]);

    useEffect(() => {
        if (modalPerfil) {
            setModalContra(false)
            setModalTema(false)
        }
    }, [modalPerfil]);

    useEffect(() => {
        if (modalTema) {
            setModalContra(false)
            setModalPerfil(false)
        }
    }, [modalTema])

    return (
        <>
            <div className="lg:hidden pb-2">
                <img src={logoMenu} alt="Menu" width={40} height={40} onClick={() => setMenu(!menu)} className={`${menu === true ? 'hidden' : ''} cursor-pointer duration-300`} />
                <img src={logoMenuAbierto} alt="Menu" width={40} height={40} onClick={() => setMenu(!menu)} className={`${menu === false ? 'hidden' : ''} cursor-pointer duration-300`} />
            </div>
            <h1 className="text-3xl font-semibold text-sky-600 pb-5">Configuración</h1>
            <ToastContainer />
            <section className="flex flex-col md:flex-row justify-between">
                <div className="w-full md:w-2/5 flex bg-white dark:bg-transparent dark:text-white rounded-xl shadow-lg md:max-h-[165px] border border-gray-100 mb-8 md:mb-0">
                    <ul className="w-full p-2">
                        <OpcionConfig titulo={"Cambiar contraseña"} logo={logoContrasenia} clic={accesoContra} />
                        <OpcionConfig titulo={"Actualizar perfil"} logo={logoPerfil} clic={accesoPerfil} />
                        <OpcionConfig titulo={"Tema"} logo={logoTema} clic={accesoTema} />
                    </ul>
                </div>
                <div className={`${modalContra === true ? 'block' : 'hidden'} w-full md:w-1/2 bg-white rounded-xl shadow-xl h-auto border border-purple-400 p-5 dark:bg-transparent`}>
                    <h1 className="text-2xl text-center text-purple-800 font-semibold pb-5">Cambio de contraseña</h1>
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
                                <label className="text-black font-semibold block mb-2 dark:text-white">Contraseña actual:</label>
                                <input type="password" name="contrasenia" onChange={handleChangeContrasenia} value={formContra.contrasenia || ""} className="w-full border border-gray-200 rounded-md focus:ring-1 focus:ring-purple-800 focus:outline-none focus:border-purple-800 p-1 dark:text-white dark:bg-transparent" placeholder="******" />
                            </div>
                            <div className="mb-3">
                                <label className="text-black font-semibold block mb-2 dark:text-white">Nueva contraseña:</label>
                                <input type="password" name="nuevaContrasenia" onChange={handleChangeContrasenia} value={formContra.nuevaContrasenia || ""} className="w-full border border-gray-200 rounded-md focus:ring-1 focus:ring-purple-800 focus:outline-none focus:border-purple-800 p-1 dark:text-white dark:bg-transparent" placeholder="******" />
                            </div><br />
                            <div className="mb-3 flex justify-around">
                                <button type="submit" className="px-5 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-800 duration-300 font-semibold">Cambiar</button>
                                <button type="button" className="px-6 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-800 duration-300 font-semibold" onClick={() => setModalContra(!modalContra)}>Cerrar</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={`${modalPerfil === true ? 'block' : 'hidden'} w-full md:w-1/2 flex flex-col bg-white rounded-xl shadow-xl h-auto border border-green-400 dark:bg-transparent`}>
                    <div className="w-full p-2 flex flex-col items-center">
                        <h1 className="font-semibold text-green-700 text-2xl pt-3">Actualizar perfil</h1>
                        <span className="font-semibold text-sm text-slate-500 text-center">Cambia los campos que requieras y presiona actualiza</span>
                    </div>
                    <div className="w-full p-6 flex flex-col">
                        <form onSubmit={handleSubmitPerfil}>
                            <div className="mb-4">
                                <label htmlFor="nombre" className="font-semibold dark:text-white">Nombre:</label>
                                <input type="text" name="nombre" value={formPerfil.nombre || ""} onChange={handleChangePerfil} className="w-full md:w-4/5 border rounded-md p-1 md:ml-6 focus:ring-1 focus:outline-none focus:ring-green-700  dark:bg-transparent dark:text-white" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="apellido" className="font-semibold dark:text-white">Apellido:</label>
                                <input type="text" name="apellido" value={formPerfil.apellido || ""} onChange={handleChangePerfil} className="w-full md:w-4/5 border rounded-md p-1 md:ml-6 focus:ring-1 focus:outline-none focus:ring-green-700 dark:bg-transparent dark:text-white" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="direccion" className="font-semibold dark:text-white">Dirección:</label>
                                <input type="text" name="direccion" value={formPerfil.direccion || ""} onChange={handleChangePerfil} className="w-full md:w-4/5 border rounded-md p-1 md:ml-4 focus:ring-1 focus:outline-none focus:ring-green-700 dark:bg-transparent dark:text-white" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="telefono" className="font-semibold dark:text-white">Teléfono:</label>
                                <input type="text" name="telefono" value={formPerfil.telefono || ""} onChange={handleChangePerfil} className="w-full md:w-4/5 border rounded-md p-1 md:ml-5 focus:ring-1 focus:outline-none focus:ring-green-700 dark:bg-transparent dark:text-white" />
                            </div><br />
                            <div className="mb-3 flex justify-around">
                                <button type="submit" className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-800 duration-300 font-semibold">Actualizar</button>
                                <button type="button" className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-800 duration-300 font-semibold" onClick={() => setModalPerfil(!modalPerfil)}>Cerrar</button>
                            </div>
                        </form>

                    </div>
                </div>
                <div className={`${modalTema === true ? 'block' : 'hidden'} w-full md:w-1/2 md:max-h-[100px] flex flex-col bg-white rounded-xl shadow-xl border dark:bg-transparent dark:text-white `}>
                    <label htmlFor="Oscuro" className="cursor-pointer flex justify-between px-4 py-2 mt-2 mx-2 items-center rounded-xl has-[input:checked]:text-purple-700 has-[input:checked]:bg-purple-100 has-[input:checked]:ring-1 has-[input:checked]:ring-purple-800">
                        <div className="flex gap-2">
                            <img src={logoOscuro} alt="OscuroMood" width={23} height={23}/> Tema Oscuro
                        </div>
                        <input type="radio" name="tema" id="Oscuro" value="Oscuro" onChange={handleRadioChange} className="peer appearance-none w-4 h-4 rounded-full border checked:border-4 checked:border-indigo-800 checked:shadow-md checked:shadow-indigo-400" />
                    </label>
                    <label htmlFor="Claro" className="cursor-pointer flex justify-between px-4 py-3 mx-2 items-center rounded-xl has-[input:checked]:text-purple-700 has-[input:checked]:bg-purple-100 has-[input:checked]:ring-1 has-[input:checked]:ring-purple-800">
                        <div className="flex gap-2">
                            <img src={logoClaro} alt="ClaroMood" width={23} height={23}/> Tema Claro
                        </div>
                        <input type="radio" name="tema" id="Claro" value="Claro" onChange={handleRadioChange} className="peer appearance-none w-4 h-4 rounded-full border checked:border-4 checked:border-indigo-800 checked:shadow-md checked:shadow-indigo-400" />
                    </label>
                </div>
            </section>
        </>
    )
}

export default Configuracion