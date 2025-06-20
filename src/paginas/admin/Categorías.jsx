import React from "react";
import AuthStoreContext from "../../store/AuthStore";
import ModalCategoria from "../../componentes/modals/ModalCategoria";

const CategoriasServicios = () => {

    const { categorias, modalCategorias, setModalCategorias } = AuthStoreContext()

    return (
        <>
            <section>
                <h1 className="text-purple-600 font-CalSans text-2xl md:text-3xl text-center mt-5">Categorías de servicios</h1>
                <p className="text-center dark:text-white mt-1 text-lg">Crea las categorías para los usuarios</p><br />
                <div className="flex justify-center mb-3">
                    <button type="button" className="group px-3 py-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-lg flex gap-x-1 cursor-pointer font-semibold text-white hover:brightness-110 transition-all duration-300 ease-in-out" onClick={() => {setModalCategorias(true)}}>
                        Nueva categoría
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="group-hover:scale-110 size-6 transition-all duration-300 ease-in-out">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
                <div className="flex justify-center">
                    <table className="w-full md:w-2/5 rounded-lg overflow-hidden shadow-lg dark:shadow-emerald-900">
                        <thead className="bg-emerald-800">
                            <tr className="text-white">
                                <th className="py-2 pl-2.5">N°</th>
                                <th>Categoría</th>
                                <th>Suscripciones</th>
                                <th className="pr-2.5">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-200 dark:bg-gray-900">
                            {categorias.length > 0 ? categorias.map((cat, index) => (
                                <tr key={index}>
                                    <td className="py-1 dark:text-white text-center">{index + 1}</td>
                                    <td className="text-emerald-700 dark:text-emerald-500 text-center">{cat.nombre}</td>
                                    <td className="dark:text-white text-center">{cat.suscripciones}</td>
                                    <td className="py-1 flex justify-center text-red-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 hover:text-red-700 transition-all duration-300 ease-in-out cursor-pointer">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div><br />
            </section>
            {modalCategorias && <ModalCategoria />}
        </>
    )
}

export default CategoriasServicios