import React from "react";
import logoOscuro from '../../assets/AK NEGRA.png'
import logoClaro from '../../assets/AK BLANCA.png'
import coliseo from '../../assets/Coliseo.svg'
import AuthStoreContext from "../../store/AuthStore";

const InicioSuperAdmin = () => {
    const { dark } = AuthStoreContext()
    return (
        <>
            <div className={dark ? 'dark' : ''}>
                <div className="flex flex-col justify-between min-h-screen py-5">
                    <div>
                        <div className="flex justify-between">
                            <img src={dark ? logoClaro : logoOscuro} alt="AltaKassa" width={100} height={100} />
                            <div>
                                <h1 className="text-4xl text-center font-semibold dark:text-white">Bienvenido Dennis Díaz</h1>
                                <div className="flex justify-center">
                                    <span className="text-lg text-center font-semibold dark:text-white mt-2">¿Qúe deseas hacer hoy?</span>
                                </div>
                            </div>
                            <div className="w-[100px]"></div>
                        </div>
                        <div className="flex justify-center">
                            <img src={coliseo} alt="Coliseo" width={150} height={100} />
                        </div>
                        <div className="flex justify-around mt-5">
                            <div className="w-44 h-36 border rounded-lg flex items-center justify-center cursor-pointer bg-green-600 hover:bg-green-800 hover:scale-110 duration-300">
                                <h1 className="text-2xl font-semibold dark:text-white text-center">Registrar Admin</h1>
                            </div>
                            <div className="w-44 h-36 border rounded-lg flex items-center justify-center cursor-pointer bg-green-600 hover:bg-green-800 hover:scale-110 duration-300">
                                <h1 className="text-2xl font-semibold dark:text-white text-center">Ver Admins</h1>

                            </div>
                            <div className="w-44 h-36 border rounded-lg flex items-center justify-center cursor-pointer bg-green-600 hover:bg-green-800 hover:scale-110 duration-300">
                                <h1 className="text-2xl font-semibold dark:text-white text-center">Configuración</h1>

                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="px-3 py-1 font-semibold text-lg dark:text-white rounded-lg bg-sky-400 ">Cerrar Sesión</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default InicioSuperAdmin