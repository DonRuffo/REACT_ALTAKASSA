import React from "react";


const ModalComentarios = ({idUser}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-800 bg-opacity-75 w-full h-full absolute"></div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 relative z-10 max-w-md w-full">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Comentarios</h2>
                
            </div>
        </div>
    );
}

export default ModalComentarios