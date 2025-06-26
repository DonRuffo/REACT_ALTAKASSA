import React from "react";
import AuthStoreContext from "../../store/AuthStore";

const ModalPlanes = () => {

    const { setModalPlanes, planes } = AuthStoreContext()

    return (
        <>
            <div className="fixed z-40 inset-0 bg-black/70">
                <div className="fixed dark:border-none top-7 md:top-1/6 left-[30px] md:left-[50px] lg:left-[100px] xl:left-[200px] right-[30px] md:right-[50px] lg:right-[100px] xl:right-[200px] min-w-64 max-h-[575px] md:max-h-none lg:min-w-lg overflow-y-auto bg-gray-100 dark:bg-gray-900 rounded-lg shadow-2xl">
                    <button type="button" className="absolute top-3 right-3 dark:text-white hover:text-red-500 duration-150 cursor-pointer" onClick={() => { setModalPlanes(false) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                    <h1 className="text-3xl text-center text-cyan-600 font-CalSans mt-7 md:mt-4">Dale un impulso a tus ingresos con más créditos</h1>
                    <p className="text-center dark:text-white text-lg">con los planes que tenemos para tí</p><br />
                    <div className="flex flex-col md:flex-row justify-center overflow-x-auto overflow-y-auto gap-x-4 px-8">
                        {planes.map(pl => (
                            <div key={pl._id} className="w-full md:w-[250px] h-[310px] md:h-[375px] outline-2 outline-cyan-500 rounded-xl bg-gray-200 dark:bg-gray-950 flex flex-col my-2 px-5">
                                <h1 className="text-cyan-500 text-2xl md:text-3xl mt-5 font-semibold">Plan {pl.nombre}</h1>
                                <p className="text-cyan-500 text-5xl md:text-6xl mt-2 md:mt-5 mb-3 font-semibold md_mb-5">${pl.precio}</p>
                                <div className="mb-3.5">
                                    <div className="text-cyan-600 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 md:size-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                                        </svg>
                                        <p className="text-black dark:text-white text-4xl md:text-5xl">{pl.creditos}</p>

                                    </div>
                                    <p className="font-semibold text-lg dark:text-white text-center mb-3 md:mb-5">Créditos</p>
                                    <p className="dark:text-white text-center">{pl.descripcion}</p>
                                </div>
                                <button className="text-white dark:text-black font-semibold px-4 py-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 cursor-pointer hover:brightness-110 duration-300 ease-in-out">Actualizar a {pl.nombre}</button>
                            </div>
                        ))}

                    </div><br />
                </div>
            </div>
        </>
    )
}


export default ModalPlanes