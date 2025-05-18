import React from "react";

import AuthStoreContext from "../../store/AuthStore";

const InicioAdmin = () => {
    const { auth} = AuthStoreContext()

    return (
        <>
            <section>
                <div className="lg:hidden pb-2 mt-5">
                    
                </div>
                <h1 className="text-3xl text-purple-600 font-semibold text-center">Bienvenido {auth.nombre} {auth.apellido}</h1>
            </section>
        </>
    )
}

export default InicioAdmin