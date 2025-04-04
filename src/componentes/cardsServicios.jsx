import React, { useState } from "react";
import { Link } from "react-router-dom";

const CardServicios = ({ Servicio1, logo1, texto1, texto2 }) => {
    const [abrir, setAbrir] = useState(false)
    const [valorTra, setValorTra] = useState('')

    const changeCaracteristicas = (e) => {
        setValorTra(e.target.value)
    }
    return (
        <div className="w-4/5 md:w-1/3 h-[550px] md:h-[500px] rounded-xl border border-gray-200 dark:border-none shadow-xl shadow-sky-300 dark:shadow-purple-800">
            <h1 className="pt-8 text-3xl text-slate-600 text-center font-semibold dark:text-white">{Servicio1}</h1>
            <div className="flex justify-center py-4">
                <img src={logo1} alt={Servicio1} width={200} height={200} />
            </div>
            <p className="text-md dark:text-slate-400 px-5 md:px-10 text-center">{texto1}</p><br />
            <div className="flex justify-center gap-x-2 lg:gap-x-3">
                <Link to="/login" className="px-4 py-3 rounded-xl border-2 border-sky-400 text-sky-400 font-semibold hover:bg-sky-400 hover:text-white duration-300 dark:border-purple-800 dark:text-purple-800 hover:dark:bg-purple-800 hover:dark:text-black">Contratar</Link>
                <button type="button" className="px-4 py-3 rounded-xl border-2 border-sky-400 text-sky-400 font-semibold hover:bg-sky-400 hover:text-white duration-300 dark:border-purple-800 dark:text-purple-800 hover:dark:bg-purple-800 hover:dark:text-black" onClick={() => setAbrir(!abrir)}>Trabajos</button>
                {abrir && (
                    <div className="fixed inset-0 bg-white dark:bg-gray-950 bg-opacity-55 dark:bg-opacity-60 flex justify-center items-center">
                        <div className="fixed flex flex-col justify-between inset-y-32 w-[300px] max-w-[300px] bg-white dark:bg-gray-950 rounded-md shadow-md shadow-sky-300 dark:shadow-purple-500">
                            <div className="px-3 overflow-y-auto">
                                <h1 className="text-2xl font-bold pt-2 text-center dark:text-white">{Servicio1}</h1>
                                <div className="text-justify dark:text-white">
                                    <div className="flex flex-col items-center gap-4 justify-center">
                                        <span className="text-sm text-slate-400 font-semibold">Selecciona un área</span>
                                        <select name="selec" id="selec" className="mb-1 ring-1 rounded-md ring-sky-400 dark:ring-purple-600 dark:bg-transparent max-w-[275px]" onChange={changeCaracteristicas}>
                                            {texto2.map((title) => (
                                                <option value={title.titulo} className="bg-white dark:bg-gray-950">{title.titulo}</option>
                                            ))}
                                        </select>
                                        {texto2.map((tra) => (
                                            <div key={tra.titulo} className={`${valorTra === tra.titulo ? '' : 'hidden'} w-64`}>
                                                <h1 className="texl-xl font-semibold">{tra.titulo}</h1>
                                                {tra.caracteristicas.map((car) => (
                                                    <div key={car} className="flex gap-x-2 text-justify text-sm">
                                                        <div className="min-w-[24px] max-w-[24px] min-h-[24px] max-h-[24px]">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M20 6L9 17l-5-5" />
                                                            </svg>
                                                        </div>
                                                        {car}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center pb-2">
                                <button className="px-2 py-1 rounded-xl border-2 border-sky-400 text-sky-400 font-semibold hover:bg-sky-400 hover:text-white duration-300 dark:border-purple-800 dark:text-purple-800 hover:dark:bg-purple-800 hover:dark:text-black" onClick={() => { setAbrir(false); setValorTra('') }}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CardServicios