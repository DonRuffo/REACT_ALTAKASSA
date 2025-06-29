import axios from "axios";
import React, { useState } from "react";
import OfertaStore from "../../store/OfertaStore";
import ModalComentarios from "../../componentes/modals/ModalComentarios";

const VerSugerencias = () => {

    const { sugerencias, modalSugerencias, setModalSugerencias } = OfertaStore()

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState([])

    return (
        <>
            <div className='mt-20 lg:mt-5 px-4'>
                <h1 className="text-cyan-500 text-center font-CalSans text-3xl">
                    Sugerencias de usuarios
                </h1><br />
                <div className="flex justify-center">
                    <table className="w-full lg:w-3/5 text-white  rounded-lg shadow-lg dark:shadow-cyan-900 overflow-hidden">
                        <thead>
                            <tr className="bg-cyan-700 text-white text-xs md:text-lg">
                                <th className="py-2 pl-2.5">N°</th>
                                <th>Nombre</th>
                                <th>Experiencia</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                            {sugerencias.length > 0 ? sugerencias.map((sugerencia, index) => (
                                <React.Fragment key={sugerencia._id}>
                                    <tr key={sugerencia._id} className="text-center text-sm md:text-base">
                                        <td className="py-1.5">{index + 1}</td>
                                        <td>{sugerencia.nombre}</td>
                                        <td>{sugerencia.experiencia}</td>
                                        <td className="flex justify-center py-1.5">
                                            <button
                                                className="px-2 py-1 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors duration-300 cursor-pointer"
                                                onClick={() => { setUsuarioSeleccionado(sugerencia._id); setModalSugerencias(true) }}
                                            >
                                                Ver Sugerencias
                                            </button>
                                        </td>
                                    </tr>
                                    {modalSugerencias && usuarioSeleccionado === sugerencia._id && <ModalComentarios idSug={sugerencia._id} />}
                                </React.Fragment>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">No hay sugerencias disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default VerSugerencias