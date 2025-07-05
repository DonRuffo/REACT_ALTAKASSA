import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const CardServicios = ({ Servicio1, logo1, texto1, texto2 }) => {
    const [abrir, setAbrir] = useState(false)
    const [valorTra, setValorTra] = useState('')

    const changeCaracteristicas = (e) => {
        setValorTra(e.target.value)
    }
    return (
        <div className="flex flex-col justify-between items-center py-4 md:py-5 relative rounded-xl bg-gray-100 dark:border-none dark:bg-gray-900 drop-shadow-xl drop-shadow-cyan-600 dark:drop-shadow-emerald-400/95 hover:scale-105 duration-300 ease-in-out">
            <div>
                <h1 className="text-3xl text-slate-600 text-left px-5 font-CalSans dark:text-white">{Servicio1}</h1>
                <div className="my-2">
                    <img src={logo1} alt={Servicio1} className="w-[125px] h-[125px] float-left mx-1.5" />
                    <p className="text-md text-slate-600 font-semibold dark:text-slate-300 px-4 text-left">{texto1}</p><br />
                </div>
            </div>
            <div className="flex justify-center gap-x-2 lg:gap-x-3">
                <Link to="/login" className="px-4 py-3 rounded-xl border-2 border-cyan-600 text-cyan-600 font-semibold hover:bg-cyan-400 hover:text-white duration-300 dark:border-emerald-600 dark:text-emerald-600 hover:dark:bg-emerald-600 hover:dark:text-black cursor-pointer">Contratar</Link>
                <button type="button" className="px-4 py-3 rounded-xl border-2 border-cyan-600 text-cyan-600 font-semibold hover:bg-cyan-400 hover:text-white duration-300 dark:border-emerald-600 dark:text-emerald-600 hover:dark:bg-emerald-600 hover:dark:text-black cursor-pointer" onClick={() => setAbrir(!abrir)}>Trabajos</button>
            </div>
            {abrir && (
                <div className="absolute top-0 left-0 w-full h-full rounded-xl bg-gray-300 dark:bg-gray-950/90 flex justify-center items-center">
                    <div className="flex flex-col justify-between max-h-96 w-[300px] max-w-[300px] bg-white dark:bg-gray-950 rounded-md shadow-md shadow-cyan-300 dark:shadow-emerald-500">
                        <div className="px-3 overflow-y-auto">
                            <h1 className="text-2xl font-bold pt-2 text-center dark:text-white">{Servicio1}</h1>
                            <div className="text-justify dark:text-white">
                                <div className="flex flex-col items-center gap-4 justify-center">
                                    <span className="text-sm text-slate-400 font-semibold">Selecciona un área</span>
                                    <select name="selec" id="selec" className="mb-1 ring-1 rounded-md ring-cyan-400 dark:ring-emerald-600 dark:bg-transparent max-w-[275px]" onChange={changeCaracteristicas}>
                                        {texto2.map((title) => (
                                            <option key={title.titulo} value={title.titulo} className="bg-white dark:bg-gray-950">{title.titulo}</option>
                                        ))}
                                    </select>
                                    {texto2.map((tra) => (
                                        <div key={tra.titulo} className={`${valorTra === tra.titulo ? '' : 'hidden'} w-64 max-h-[120px]`}>
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
                        <div className="flex justify-center py-3">
                            <button className="px-2 py-1 rounded-xl border-2 border-cyan-400 text-cyan-400 font-semibold hover:bg-cyan-400 hover:text-white duration-300 dark:border-emerald-800 dark:text-emerald-600 hover:dark:bg-emerald-600 hover:dark:text-black cursor-pointer" onClick={() => { setAbrir(false); setValorTra('') }}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

CardServicios.propTypes = {
    Servicio1: PropTypes.string.isRequired,
    logo1: PropTypes.string.isRequired,
    texto1: PropTypes.string.isRequired,
    texto2: PropTypes.array.isRequired
}

export default CardServicios