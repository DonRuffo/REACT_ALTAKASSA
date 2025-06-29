import React from "react";
import AuthStoreContext from "../../store/AuthStore";

const PlanesPagoProv = () => {

    const { planes } = AuthStoreContext()

    return (
        <>
            <div className="mt-20 lg:mt-5">
                <h1 className="text-cyan-500 font-CalSans text-2xl md:text-3xl text-center">Dale un impulso a tus ingresos con más créditos</h1>
                <p className="text-center dark:text-white text-lg">con los planes que tenemos para tí</p><br />
                <div className="flex justify-center gap-x-4 mb-3">
                    {planes.map(pl => (
                        <div key={pl._id} className="w-[275px] h-[310px] md:h-[375px] outline-2 outline-cyan-500 rounded-xl bg-gray-200 dark:bg-gray-950 flex flex-col px-5">
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
        </>
    )
}

export default PlanesPagoProv