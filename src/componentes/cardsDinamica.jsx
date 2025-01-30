import React from "react";

const CardDinamica = ({ logo, texto}) => {
    return (
        <div className={`outline outline-black/5 rounded-lg shadow-md shadow-sky-400 p-5 flex flex-col items-center dark:shadow-purple-600`}>
            <img src={logo} alt="Grabteia" width={100} height={100} />
            <p className="text-center font-semibold text-slate-500 pt-4">{texto}</p>
        </div>
    )
}

export default CardDinamica