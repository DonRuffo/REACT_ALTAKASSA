import React from "react";
import imgSug from '../assets/Suggestions.svg'

const Sugerencias = () => {
    return (
        <>
            <section className="flex justify-center">
                <div className="w-4/5 border-2 border-gray-300 rounded-lg">
                    <h1 className="text-center text-3xl font-semibold text-purple-600 mt-5">Sugerencias y comentarios</h1>
                    <div className="flex justify-between mx-8 mt-5">
                        <div className="w-[500px]">
                            <p className="dark:text-white font-semibold text-xl">¡Cuéntanos cómo ha sido tu experiencia en el sistema y comparte tus sugerencias!</p>
                            <form className="mt-4 dark:text-white">
                                <h1 className="font-semibold dark:text-slate-300 mb-1">Experiencia:</h1>
                                <div className="flex">
                                    <div className="mb-3 mr-2">
                                        <label htmlFor="buena" className="border border-gray-400 rounded-md px-3 py-1 flex items-center has-[input:checked]:border-green-600 has-[input:checked]:text-green-600 duration-300">
                                            Buena
                                            <input type="radio" name="sug" id="buena" value='buena' className="ml-1 appearance-none border-4 rounded-full w-4 h-4 checked:border-4 checked:border-green-600 duration-300" />
                                        </label>
                                    </div>
                                    <div className="mb-3 mr-2">
                                        <label htmlFor="regular" className="border border-gray-400 rounded-md px-3 py-1 flex items-center has-[input:checked]:border-purple-600 has-[input:checked]:text-purple-600 duration-300">
                                            Regular
                                            <input type="radio" name="sug" id="regular" value='regular' className="ml-1 appearance-none border-4 rounded-full w-4 h-4 checked:border-4 checked:border-purple-600 duration-300" />
                                        </label>
                                    </div>
                                    <div className="mb-3 mr-2">
                                        <label htmlFor="mala" className="border border-gray-400 rounded-md px-3 py-1 flex items-center has-[input:checked]:border-red-600 has-[input:checked]:text-red-600 duration-300">
                                            Mala
                                            <input type="radio" name="sug" id="mala" value='mala' className="ml-1 appearance-none border-4 rounded-full w-4 h-4 checked:border-4 checked:border-red-600 duration-300" />
                                        </label>
                                    </div>
                                </div>
                                <div className="flex flex-col mb-5">
                                    <label htmlFor="comentario" className="font-semibold mb-1">Comentario:</label>
                                    <textarea name="comentario" id="comentario" className="px-2 border-2 dark:border-white dark:focus:border-purple-600 dark:bg-transparent rounded-md focus:outline-none focus:border-purple-600"></textarea>
                                </div>
                                <div className="mb-5">
                                    <button className="px-3 py-2 text-white font-semibold rounded-md bg-purple-600 hover:bg-purple-800 duration-300">
                                        Enviar
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="mb-3 bg-ye">
                            <img src={imgSug} alt="Sugerencias" width={250} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Sugerencias