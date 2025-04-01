import React, { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const InicioAdmin = () =>{
    const { auth } = useContext(AuthContext)

    return (
        <>
            <section>
                <h1 className="text-3xl text-purple-600 font-semibold text-center">Bienvenido {auth.nombre} {auth.apellido}</h1>
            </section>
        </>
    )
}

export default InicioAdmin