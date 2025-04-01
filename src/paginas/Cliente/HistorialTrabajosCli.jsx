import React, { useContext } from "react";
import logoMenu from '../../assets/category.png'
import logoMenuAbierto from '../../assets/hamburger.png'
import AuthContext from "../../context/AuthProvider";

const HistorialTrabajoCli = () => {
    const {menu, handleMenu} = useContext(AuthContext)
    return (
        <>
            <div className="lg:hidden pb-2 mt-5">
                <img src={logoMenu} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === true ? 'hidden' : ''} cursor-pointer duration-300`} />
                <img src={logoMenuAbierto} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === false ? 'hidden' : ''} cursor-pointer duration-300`} />
            </div>
            <div className="flex justify-center mt-5">
                <h1 className="font-semibold text-purple-800 text-xl">Aqui podrás ver el historial de trabajos</h1>
            </div>
        </>
    )
}

export default HistorialTrabajoCli