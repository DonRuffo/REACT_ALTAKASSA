import React from "react";
import { Link } from "react-router-dom";

const CardServicios = ({ Servicio1, logo1, texto1}) => {
    return (
        <div className="w-4/5 md:w-1/3 h-[550px] md:h-[500px] rounded-xl border border-gray-200 dark:border-none shadow-xl shadow-sky-300 dark:shadow-purple-800">
            <h1 className="pt-8 text-3xl text-slate-600 text-center font-semibold dark:text-white">{Servicio1}</h1>
            <div className="flex justify-center py-4">
                <img src={logo1} alt={Servicio1} width={200} height={200} />
            </div>
            <p className="text-md dark:text-slate-400 px-5 md:px-10 text-center">{texto1}</p><br />
            <div className="flex justify-center">
                <Link to="/login" className="px-4 py-3 rounded-xl border-2 border-sky-400 text-sky-400 font-semibold hover:bg-sky-400 hover:text-white duration-300 dark:border-purple-800 dark:text-purple-800 hover:dark:bg-purple-800 hover:dark:text-black">Contratar</Link>
            </div>
        </div>
    )
}

export default CardServicios