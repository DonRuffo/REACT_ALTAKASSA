import React from "react";

const CardBeneficio = ({Beneficio, logo, texto }) => {
    return (

        <div className="w-4/5 md:w-1/3 lg:w-1/4 h-[500px] rounded-2xl shadow-2xl outline outline-black/5 dark:shadow-lg dark:shadow-sky-600">
            <h1 className="text-center text-3xl font-semibold text-slate-600 py-10 dark:text-white">{Beneficio}</h1>
            <div className="flex justify-center">
                <img src={logo} alt={Beneficio} width={200} height={200} />
            </div>
            <p className="text-md dark:text-slate-400 text-center pt-3 px-4">{texto}</p>
        </div>

    )
}

export default CardBeneficio