import React from "react";
import '../../CSS/fondos.css'

const CardBeneficio = ({Beneficio, logo, texto,}) => {
    return (

        <div className={`py-10 w-4/5 md:w-1/3 lg:w-1/4 h-fit rounded-2xl shadow-2xl bg-gray-100 dark:shadow-lg dark:shadow-yellow-600 dark:bg-gray-900 hover:scale-105 duration-300`}>
            <h1 className="text-center text-3xl font-semibold text-slate-600 dark:text-white">{Beneficio}</h1>
            <div className="flex justify-center">
                <img src={logo} alt={Beneficio} width={200} height={200} />
            </div>
            <p className="text-md text-slate-600 dark:text-slate-300 font-semibold text-center pt-3 px-4">{texto}</p>
        </div>

    )
}

export default CardBeneficio