import React, { useEffect, useState } from "react";
import OfertaStore from "../store/OfertaStore";
import AuthStoreContext from "../store/AuthStore";
import { useNavigate } from "react-router-dom";

const NavInfo = () => {

    const { modalPerfil, setModalPerfil } = OfertaStore()
    const { auth, menu, handleMenu, tipo, setTipo, setOpcionActiva, connectionStatus } = AuthStoreContext()
    const navigate = useNavigate()
    const tipoM = tipo.charAt(0).toUpperCase() + tipo.slice(1)
    const tipoUsuario = tipoM === 'Cliente' ? 'Proveedor' : 'Cliente'

    const cambioDeTipo = () => {
        if (tipo === 'cliente') {
            localStorage.setItem('tipo', 'proveedor')
            setTipo('proveedor')
        } else if (tipo === 'proveedor') {
            localStorage.setItem('tipo', 'cliente')
            setTipo('cliente')
        }
        navigate('/dashboard')
        setOpcionActiva('inicio')
    }

    const [rotar, setRotar] = useState(false)

    return (
        <div className="lg:hidden flex justify-between mb-3 mt-4">
            <div className="w-2/5 text-purple-600 flex justify-between" id="nav">
                <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={() => handleMenu()} className={`${menu === true ? 'hidden' : ''} cursor-pointer duration-300`} >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                </svg>

                <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={() => handleMenu()} className={`${menu === false ? 'hidden' : ''} cursor-pointer duration-300`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <div className="text-cyan-600 flex gap-x-0.5 items-center mr-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                    </svg>
                    <p className="text-black dark:text-white">{auth.monedasTrabajos}</p>
                </div>
            </div>
            <div className="relative w-1/5 flex justify-center text-orange-500 items-center -space-x-1" onClick={() => setRotar(!rotar)}>
                {tipoM === 'Proveedor' ? (
                    <svg width="35" height="35" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                    </svg>
                ) : (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M4 20a8 8 0 0116 0" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                )}

                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={`${rotar ? '-rotate-180' : ''} transition-all duration-300`}>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 9l6 6 6-6"
                    />
                </svg>
                <div className={`${rotar ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'} absolute z-10 top-10 w-max rounded-md bg-gray-100 dark:bg-gray-800 outline transition-all duration-300 ease-in-out`} onClick={() => { cambioDeTipo(); setRotar(!rotar) }}>
                    <h1 className="text-orange-500 font-semibold text-sm px-3 py-1">Cambiar a {tipoUsuario}</h1>
                </div>

            </div>
            <div className="flex items-center justify-end gap-x-1.5 w-2/5">
                
                <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${connectionStatus ? 'bg-emerald-500' : 'bg-red-500'} brightness-125`}>
                    <div className={`w-full h-full md:w-3 md:h-3 rounded-full ${connectionStatus ? 'bg-emerald-500 animate-ping' : 'bg-red-500'} brightness-125`}></div>
                </div>
                <h1 className="font-semibold text-sm dark:text-white text-right">{auth.nombre}</h1>
                <div className="flex justify-center h-[40px] w-[40px] rounded-full overflow-hidden cursor-pointer" onClick={() => { setModalPerfil(!modalPerfil) }}>
                    <img src={auth.f_perfil} alt="imgPerfil" className="w-full h-full object-cover ring-2 ring-white shrink-0" />
                </div>
            </div>
        </div>
    )
}

export default NavInfo