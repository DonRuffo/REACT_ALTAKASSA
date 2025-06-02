import React from "react";
import AuthStoreContext from "../../store/AuthStore";

const ModalCreditos = () => {

    const { auth, setModalCreditos, setModalPlanes } = AuthStoreContext()

    return (
        <>
            <div className="fixed z-40 inset-0 bg-black/70">
                <div className="fixed dark:border-none  top-1/5 left-[40px] md:left-[150px] lg:left-[425px] xl:left-[625px] right-[40px] md:right-[150px] lg:right-[200px] xl:right-[625px] min-w-64 lg:min-w-lg bg-gray-100 dark:bg-gray-900 rounded-lg shadow-2xl">
                    <button type="button" className="absolute top-3 right-3 dark:text-white hover:text-red-500 duration-150 cursor-pointer" onClick={() => { setModalCreditos(false) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                    <p className="text-lg text-center mt-4 dark:text-white">Tu saldo es de</p>
                    <div className="flex justify-center gap-x-1.5 text-cyan-600 my-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                        </svg>
                        <h1 className="text-3xl text-black dark:text-white">{auth.monedasTrabajos} créditos</h1>
                    </div>
                    <div className="px-8">
                        <p className="dark:text-slate-300 text-base mb-3">Los créditos te permiten realizar trabajos para otros usuarios y así generar tus ingresos. Cada trabajo realizado te restará
                            <span className="text-cyan-600"> 1</span> crédito. Si te quedas sin créditos, no podrás realizar trabajos y tus ofertas no serán <span>visibles </span>
                            para los demás usuarios.</p>
                    </div>
                    <div className="flex justify-center mb-3">
                        <div className="w-5/6 flex justify-between outline-2 outline-cyan-600 px-4 py-3 rounded-2xl">
                            <div className="w-3/5">
                                <h1 className="text-xl dark:text-white mb-2.5">Consigue más créditos</h1>
                                <p className="text-base dark:text-white">Actualiza tu plan para obtener más créditos y así elevar tus ingresos y el alcance de tus servicios</p>
                            </div>
                            <div className="text-white flex items-center">
                                <button className="text-lg px-4 py-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:brightness-110 transition-all duration-300 ease-in-out cursor-pointer" onClick={()=>{setModalPlanes(true); setModalCreditos(false)}}>Actualizar plan</button>
                            </div>
                        </div>
                    </div><br />
                </div>
            </div>
        </>
    )
}

export default ModalCreditos