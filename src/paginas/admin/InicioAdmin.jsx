import React from "react";
import logoMenu from '../../assets/category.png'
import logoMenuAbierto from '../../assets/hamburger.png'
import AuthStoreContext from "../../store/AuthStore";

const InicioAdmin = () => {
    const { auth, menu, handleMenu } = AuthStoreContext()

    return (
        <>
            <section>
                <div className="lg:hidden pb-2 mt-5">
                    <img src={logoMenu} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === true ? 'hidden' : ''} cursor-pointer duration-300`} />
                    <img src={logoMenuAbierto} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === false ? 'hidden' : ''} cursor-pointer duration-300`} />
                </div>
                <h1 className="text-3xl text-purple-600 font-semibold text-center">Bienvenido {auth.nombre} {auth.apellido}</h1>
            </section>
        </>
    )
}

export default InicioAdmin