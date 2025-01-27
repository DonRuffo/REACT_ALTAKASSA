import React, { useContext } from "react";
import { Link } from "react-router-dom";
import OpcionConfig from "../componentes/opcionesConfiguracion";
import logoContrasenia from '../assets/CandadoPassword.png'
import logoPerfil from '../assets/Perfil_negro.png'
import ConfigContext from "../context/ConfigProvider";

const Configuracion = () => {
    const { modalContra, setModalContra, modalPerfil, setModalPerfil } = useContext(ConfigContext)
    const accesoContra = () => { setModalContra(!modalContra) }
    const accesoPerfil = () => { setModalPerfil(!modalPerfil) }
    return (
        <>
            <h1 className="text-3xl font-semibold text-sky-600 pb-5">Configuración</h1>
            <section className="flex justify-between">
                <div className="w-2/5 flex bg-white rounded-xl shadow-xl max-h-[115px] border border-gray-100">
                    <ul className="w-full p-2">
                        <OpcionConfig titulo={"Cambiar contraseña"} logo={logoContrasenia} clic={accesoContra} />
                        <OpcionConfig titulo={"Actualizar perfil"} logo={logoPerfil} clic={accesoPerfil} />
                        
                    </ul>
                </div>
                <div className={`${modalContra === true ? setModalPerfil(!modalContra) : ''} ${modalContra === true ? 'block' : 'hidden'} w-1/2 bg-white rounded-xl shadow-xl h-auto border border-gray-100 p-5`}>
                    <h1 className="text-xl text-center text-purple-800 font-semibold pb-5">Cambio de contraseña</h1>
                    <div className="w-full">
                        <form>
                            <div className="mb-3">
                                <label className="text-black font-semibold block mb-2">Contraseña actual:</label>
                                <input type="password" name="contrasenia" className="w-full border border-gray-200 rounded-md focus:ring-1 focus:ring-purple-800 focus:outline-none focus:border-purple-800 p-1" placeholder="******" />
                            </div>
                            <div className="mb-3">
                                <label className="text-black font-semibold block mb-2">Nueva contraseña:</label>
                                <input type="password" name="NuevaContrasenia" className="w-full border border-gray-200 rounded-md focus:ring-1 focus:ring-purple-800 focus:outline-none focus:border-purple-800 p-1" placeholder="******" />
                            </div><br />
                            <div className="mb-3 flex justify-around">
                                <button className="px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-800 duration-300">Cambiar</button>
                                <button className="px-5 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-800 duration-300" onClick={()=>setModalContra(!modalContra)}>Cerrar</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={`${modalPerfil === true ? setModalContra(!modalPerfil) : ''} ${modalPerfil === true ? 'block' : 'hidden'} w-1/2 flex bg-white rounded-xl shadow-xl h-auto border border-gray-100`}>
                    <ul className="w-full p-2">
                        <OpcionConfig titulo={"Ya"} logo={logoContrasenia} />
                        <OpcionConfig titulo={"Valio"} logo={logoPerfil} />
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Configuracion