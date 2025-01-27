import React from "react";

const CardDinamica = ({ logo, texto, color, colorDark }) => {
    return (
        <div className={`border-4 border-${color}-200 rounded-xl shadow-lg shadow-${color}-400 p-5 flex flex-col items-center dark:border-${colorDark}-400 dark:shadow-${colorDark}-600`}>
            <img src={logo} alt="Grabteia" width={100} height={100} />
            <p className="text-center font-semibold text-slate-500 pt-4">{texto}</p>
        </div>
    )
}

export default CardDinamica