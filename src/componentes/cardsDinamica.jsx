import React from "react";

const CardDinamica = ({ logo, texto}) => {
    return (
        <div className={`rounded-lg bg-gray-100 shadow-lg shadow-cyan-400 p-5 flex flex-col items-center dark:shadow-purple-600 dark:bg-gray-900`}>
            <img src={logo} alt="Grabteia" width={100} height={100} />
            <p className="text-center font-semibold text-slate-600 dark:text-slate-400 pt-4">{texto}</p>
        </div>
    )
}

export default CardDinamica