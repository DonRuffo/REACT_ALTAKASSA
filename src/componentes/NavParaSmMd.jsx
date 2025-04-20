import React from "react";
import OfertaStore from "../store/OfertaStore";
import AuthStoreContext from "../store/AuthStore";
import logoMenu from '../assets/category.png'
import logoMenuAbierto from '../assets/hamburger.png'

const NavInfo = () => {

    const { modalPerfil, setModalPerfil } = OfertaStore()
    const { auth, menu, handleMenu } = AuthStoreContext()

    return (
        <div className="lg:hidden flex justify-between mb-3 mt-4 px-4">
            <div className="w-2/5">
                <img src={logoMenu} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === true ? 'hidden' : ''} cursor-pointer duration-300`} />
                <img src={logoMenuAbierto} alt="Menu" width={40} height={40} onClick={() => handleMenu()} className={`${menu === false ? 'hidden' : ''} cursor-pointer duration-300`} />
            </div>
            <div className="w-1/5 flex justify-center text-orange-500 items-center -space-x-2 ">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                        <path d="M4 20a8 8 0 0116 0" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={`transition-all duration-300`}>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 9l6 6 6-6"
                        />
                    </svg>
                </div>
            <div className="flex items-center justify-end gap-x-1.5 w-2/5">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-emerald-500 brightness-125"></div>
                <h1 className="font-semibold text-sm dark:text-white text-right">{auth.nombre}</h1>
                <div className="flex justify-center h-[40px] w-[40px] rounded-full overflow-hidden cursor-pointer" onClick={() => { setModalPerfil(!modalPerfil) }}>
                    <img src={auth.f_perfil} alt="imgPerfil" className="w-full h-full object-cover ring-2 ring-white" />
                </div>
            </div>
        </div>
    )
}

export default NavInfo