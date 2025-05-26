import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logoAlta from '../assets/AK BLANCA.png'
import ModalFotoPerfil from "../componentes/modals/ModalFotoPerfil";
import AuthStoreContext from "../store/AuthStore";
import OfertaStore from "../store/OfertaStore";
import NavInfo from "../componentes/NavParaSmMd";
const Dashboard = () => {
    const sideBar = useRef(null)
    const navigate = useNavigate()
    const { auth, dark, menu, setsideBar, handleClickOutside, handleMenu, opcionActiva, setOpcionActiva, tipo, setTipo, connectionStatus } = AuthStoreContext()
    const { modalPerfil, setModalPerfil } = OfertaStore()

    const [rotar, setRotar] = useState(false)

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

    const asignarValor = (e) => {
        const id = e.currentTarget.id
        setOpcionActiva(id)
    }

    useEffect(() => {
        setsideBar(sideBar.current)
    }, [])
    useEffect(() => {
        if (menu) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [menu])

    return (
        <>
            <div className={`${dark ? "dark bg-emerald-950" : "bg-emerald-900"}`}>
                <div className="flex h-screen font-Cabin">
                    <div ref={sideBar} className={`flex flex-col justify-between fixed z-50 inset-y-0 left-0 w-52 bg-emerald-900 dark:bg-emerald-950 rounded-r-xl text-white p-4 transform ${menu === true ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out lg:static`}>
                        <div id="nav">
                            <h1 className="text-2xl text-white text-center font-CalSans">Alta-Kassa</h1>
                            <div className="flex justify-center">
                                <img src={logoAlta} alt="AltaKassa Logo" width={165} height={165} />
                            </div><hr />
                            <nav className="py-2 min-h-[300px] max-h-[310px] ">
                                <Link to='/dashboard' id="inicio" onClick={(e) => { handleMenu(); asignarValor(e) }} className={`py-2 px-3 rounded hover:bg-emerald-800 duration-100 flex gap-1 ${opcionActiva === 'inicio' ? 'bg-emerald-800' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                                    </svg>

                                    <p className=" px-2">Inicio</p>
                                </Link>

                                <Link to='/dashboard/ofertas' id="ofertas" onClick={(e) => { handleMenu(); asignarValor(e) }} className={`${tipo === 'proveedor' ? 'block' : 'hidden'}  py-2 px-3 rounded hover:bg-emerald-800 duration-100 flex gap-1 ${opcionActiva === 'ofertas' ? 'bg-emerald-800' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                                    </svg>

                                    <p className=" px-2">Tus Ofertas</p>
                                </Link>

                                <Link to='/dashboard/solicitudes/proveedor' id="SoliProv" onClick={(e) => { handleMenu(); asignarValor(e) }} className={`${tipo === 'proveedor' ? 'block' : 'hidden'}  py-2 px-3 rounded hover:bg-emerald-800 duration-100 flex gap-1 ${opcionActiva === 'SoliProv' ? 'bg-emerald-800' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                                    </svg>

                                    <p className=" px-2">Solicitudes</p>
                                </Link>

                                <Link to='/dashboard/solicitudes/cliente' id="SoliCli" onClick={(e) => { handleMenu(); asignarValor(e) }} className={`${tipo === 'cliente' ? 'block' : 'hidden'}  py-2 px-3 rounded hover:bg-emerald-800 duration-100 flex gap-1 ${opcionActiva === 'SoliCli' ? 'bg-emerald-800' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                                    </svg>

                                    <p className=" px-2">Solicitudes</p>
                                </Link>

                                <Link to='/dashboard/contratos/cliente' id="ContraCli" onClick={(e) => { handleMenu(); asignarValor(e) }} className={`${tipo === 'cliente' ? 'block' : 'hidden'}  py-2 px-3 rounded hover:bg-emerald-800 duration-100 flex gap-1 ${opcionActiva === 'ContraCli' ? 'bg-emerald-800' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
                                    </svg>

                                    <p className=" px-2">Trabajos</p>
                                </Link>

                                <Link to='/dashboard/contratos/proveedor' id="ContraProv" onClick={(e) => { handleMenu(); asignarValor(e) }} className={`${tipo === 'proveedor' ? 'block' : 'hidden'}  py-2 px-3 rounded hover:bg-emerald-800 duration-100 flex gap-1 ${opcionActiva === 'ContraProv' ? 'bg-emerald-800' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
                                    </svg>

                                    <p className=" px-2">Trabajos</p>
                                </Link>

                                <Link to='/dashboard/historialCliente' id="Historial" onClick={(e) => { handleMenu(); asignarValor(e) }} className={`${tipo === 'cliente' ? 'block' : 'hidden'}  py-2 px-3 rounded hover:bg-emerald-800 duration-100 flex gap-1 ${opcionActiva === 'Historial' ? 'bg-emerald-800' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <p className=" px-2">Historial</p>
                                </Link>

                                <Link to='/dashboard/historialProveedor' id="Historial" onClick={(e) => { handleMenu(); asignarValor(e) }} className={`${tipo === 'proveedor' ? 'block' : 'hidden'}  py-2 px-3 rounded hover:bg-emerald-800 duration-100 flex gap-1 ${opcionActiva === 'Historial' ? 'bg-emerald-800' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                    <p className=" px-2">Historial</p>
                                </Link>

                                <Link to='/dashboard/novedades' id="" onClick={(e) => { handleMenu(); asignarValor(e) }} className="hidden py-2 px-3 rounded hover:bg-gray-800 duration-100 gap-1 focus:bg-emerald-800">
                                    <img src='' alt="Ayuda" width={26} height={26} /><p className=" px-2">Ayuda</p>
                                </Link>

                                <Link to='/dashboard/sugerencias' id="Sugerencias" onClick={(e) => { handleMenu(); asignarValor(e) }} className={`${auth.rol === 'administrador' ? 'hidden' : ''}  py-2 px-3 rounded hover:bg-emerald-800 duration-100 flex  gap-1 ${opcionActiva === 'Sugerencias' ? 'bg-emerald-800' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                    </svg>

                                    <p className="px-2">Sugerencias</p>
                                </Link>

                                <Link to='/dashboard/ver-clientes' id="VerClientes" onClick={(e) => { handleMenu(); asignarValor(e) }} className={`${auth.rol === 'administrador' ? 'block' : 'hidden'} py-2 px-3 rounded hover:bg-emerald-800 duration-100 flex  gap-1 ${opcionActiva === 'VerClientes' ? 'bg-emerald-800' : ''}`}>

                                    <svg
                                        width="24" height="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5.121 17.804A9 9 0 0112 15c2.25 0 4.29.83 5.879 2.204M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <p className="px-2">Clientes</p>
                                </Link>

                                <Link to='/dashboard/ver-proveedores' id="VerProvs" onClick={(e) => { handleMenu(); asignarValor(e) }} className={`${auth.rol === 'administrador' ? 'block' : 'hidden'} py-2 px-3 rounded hover:bg-emerald-800 duration-100 flex  gap-1 ${opcionActiva === 'VerProvs' ? 'bg-emerald-800' : ''}`}>
                                    <svg
                                        width="24" height="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M12 2C10.343 2 9 3.343 9 5v1H6a1 1 0 00-1 1v2h14V7a1 1 0 00-1-1h-3V5c0-1.657-1.343-3-3-3zM4 11v3a8 8 0 0016 0v-3H4z" />
                                    </svg>
                                    <p className="px-2">Proveedores</p>

                                </Link>

                                <Link to='/dashboard/ver-sugerencias' id="VerSugerencias" onClick={(e) => { handleMenu(); asignarValor(e) }} className={`${auth.rol === 'administrador' ? 'block' : 'hidden'} py-2 px-3 rounded hover:bg-emerald-800 duration-100 flex  gap-1 ${opcionActiva === 'VerSugerencias' ? 'bg-emerald-800' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                    </svg>

                                    <p className="px-2">Ver sugerencias</p>
                                </Link>

                                <Link to='/dashboard/configuracion' id="Config" onClick={(e) => { handleMenu(); asignarValor(e) }} className={`py-2 px-3 rounded hover:bg-emerald-800 duration-100 flex gap-1 ${opcionActiva === 'Config' ? 'bg-emerald-800' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                    <p className="px-2">Configuración</p>
                                </Link>
                            </nav><hr />
                        </div>
                        <div className="flex justify-center">
                            <button className="px-5 py-2 mb-5 bg-gray-950 dark:bg-emerald-700 text-white rounded-md hover:bg-gray-700 dark:hover:bg-emerald-800 duration-300 cursor-pointer"
                                onClick={() => {
                                    localStorage.removeItem('token')
                                    localStorage.removeItem('rol')
                                    localStorage.removeItem('tipo')
                                    navigate('/login')
                                }}>Cerrar Sesión</button>
                        </div>
                    </div>
                    {modalPerfil && <ModalFotoPerfil url={auth.f_perfil} />}
                    <div className="flex-1 h-screen overflow-y-auto bg-gradient-to-tr from-white from-55% dark:from-10% dark:from-black to-emerald-100 dark:to-emerald-950 to-80%">
                        <div className="border-b border-gray-200 dark:border-gray-700 h-16 hidden lg:flex justify-between items-center px-5">
                            <div className="flex gap-x-2">
                                <button className="flex items-center gap-x-1 font-semibold bg-gray-100 rounded-md py-2 px-3 text-orange-500 dark:bg-gray-700 hover:bg-gray-200 hover:dark:bg-gray-600 transition-all duration-300 linear cursor-pointer" onClick={() => setRotar(!rotar)}>
                                    {tipoM}
                                    {tipoM === 'Proveedor' ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                                        </svg>
                                    ) : (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                                            <path d="M4 20a8 8 0 0116 0" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                    )}

                                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={`${rotar ? '-rotate-90' : ''} transition-all duration-300`}>
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 9l6 6 6-6"
                                        />
                                    </svg>
                                </button>
                                <button className={`${rotar ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'} flex items-center font-semibold bg-gray-100 rounded-md py-2 px-3 mr-8 text-orange-500 dark:bg-gray-700 hover:bg-gray-200 hover:dark:bg-gray-600 transition-all duration-300 linear cursor-pointer`} onClick={() => { cambioDeTipo(); setRotar(!rotar) }}>
                                    Cambiar a {tipoUsuario}
                                </button>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <div className="text-cyan-500 flex gap-x-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                                    </svg>
                                    <p className="text-black dark:text-white">{auth.monedasTrabajos}</p>
                                </div>
                                <div className={`w-2.5 h-2.5 rounded-full ${connectionStatus ? 'bg-emerald-500' : 'bg-red-500'} brightness-125`}>
                                    <div className={`w-full h-full rounded-full ${connectionStatus ? 'bg-emerald-500 animate-ping' : 'bg-red-500'} brightness-125`}></div>
                                </div>
                                <h1 className="font-semibold dark:text-white">{auth.nombre} {auth.apellido}</h1>
                                <div className="flex justify-center h-[44px] w-[44px] rounded-full overflow-hidden cursor-pointer" onClick={() => { setModalPerfil(!modalPerfil) }}>
                                    <img src={auth.f_perfil} alt="imgPerfil" className="w-full h-full object-cover ring-2 ring-white" />
                                </div>
                            </div>
                        </div>
                        <NavInfo />
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )


}
export default Dashboard