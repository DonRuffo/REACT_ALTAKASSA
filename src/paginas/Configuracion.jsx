import React from "react";
import { Link } from "react-router-dom";
import OpcionConfig from "../componentes/opcionesConfiguracion";
import logoContrasenia from '../assets/CandadoPassword.png'
import logoPerfil from '../assets/Perfil_negro.png'
const Configuracion = () => {
    return (
        <>
            <h1 className="text-3xl font-semibold text-sky-600 text-center pb-5">Configuración</h1>
            <section className="flex justify-center">
                <div className="w-3/6 flex bg-white rounded-xl shadow-xl h-auto border border-gray-100">
                    <ul className="w-full p-2">
                        <OpcionConfig titulo={"Cambiar contraseña"} link={'/login'} logo={logoContrasenia}/>
                        <OpcionConfig titulo={"Actualizar perfil"} link={'/dashboard'} logo={logoPerfil}/>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Configuracion