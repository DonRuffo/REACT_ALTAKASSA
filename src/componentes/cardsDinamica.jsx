import PropTypes from "prop-types";
import React from "react";

const CardDinamica = ({ logo, texto}) => {
    return (
        <div className={`rounded-xl bg-gray-100 shadow-lg shadow-cyan-300 p-5 flex flex-col items-center dark:shadow-cyan-600 dark:bg-gray-900`}>
            <img src={logo} alt="Grabteia" width={150} height={150} />
            <p className="text-center font-semibold text-slate-600 dark:text-slate-300 pt-2">{texto}</p>
        </div>
    )
}

CardDinamica.propTypes = {
    logo: PropTypes.string.isRequired,
    texto: PropTypes.string.isRequired
}
export default CardDinamica