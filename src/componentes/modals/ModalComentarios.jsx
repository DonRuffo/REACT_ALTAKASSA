import React from "react";
import OfertaStore from "../../store/OfertaStore";
import { DateTime } from "luxon";
import '../../../CSS/fondos.css'


const ModalComentarios = ({ idSug }) => {

    const { setModalSugerencias, sugerencias } = OfertaStore();

    return (
        <div className="fixed inset-0 bg-black/60 z-50">
            <div className="fixed top-1/6 md:top-1/5 left-5 right-5 md:left-[175px] md:right-[175px] lg:left-[275px] lg:right-[275px] xl:left-[500px] xl:right-[500px]  w-auto h-92">
                <div className="absolute top-4 right-4 dark:text-white cursor-pointer" onClick={() => setModalSugerencias(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
                <div className="bg-gray-900 custom-bar-sugg py-5 px-8 rounded-2xl max-h-[500px] overflow-y-auto">
                    {sugerencias.filter(of => of._id === idSug).flatMap((sugerencia) => {

                        return (
                            <>
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Comentarios de {sugerencia.nombre}</h2>
                                {
                                    sugerencia.comentarios.map((com, index) => (
                                        <div key={index} className="mb-2 px-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                            <p className="text-sm text-gray-500 dark:text-white">{DateTime.fromISO(com.fecha, { zone: 'utc' }).setZone('America/Guayaquil').toFormat('yyyy LLL dd')}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{com.comentario}</p>
                                        </div>
                                    ))}
                            </>
                        )
                    })}
                </div>
            </div>

        </div>
    );
}

export default ModalComentarios