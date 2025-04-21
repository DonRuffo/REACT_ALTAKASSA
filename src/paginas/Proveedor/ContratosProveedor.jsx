import React from "react";
import '../../../CSS/fondos.css'
import imgSinTrabajo from '../../assets/Tiempo.svg'
import OfertaStore from "../../store/OfertaStore";
import AuthStoreContext from "../../store/AuthStore";

const ContratosProv = () => {
    const { trabajosProvs } = OfertaStore()
    return (
        <>
            <section>
                <h1 className="text-center text-purple-600 font-semibold text-3xl mb-3 mt-5">Trabajos actuales</h1>
                <h2 className="text-xl mb-5 text-center dark:text-white">Aquí podrás ver tus trabajos agendados</h2>
                <div className="flex justify-center flex-wrap gap-3">
                    {trabajosProvs.length !== 0 && trabajosProvs.some((tra) => tra.status === "Agendado") ? trabajosProvs.map((tra) => (
                        tra.status === "Agendado" && (
                            <div key={tra._id} className="w-[250px] h-[265px] radial-gradientAceptados-bg rounded-lg shadow-lg dark:shadow-slate-600 mb-5">
                                <h1 className="text-center text-2xl mt-2 pb-2 border-b-2 font-semibold text-white">{tra.servicio}</h1>
                                <div className="flex justify-center items-center gap-x-3 mt-2">
                                    <div className="w-[65px] h-[65px] rounded-full overflow-hidden">
                                        <img src={tra.cliente.f_perfil} alt="fotoPERFILprov" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="-space-y-0.5">
                                        <p className="text-xl font-semibold text-white">{tra.cliente.nombre}</p>
                                        <p className="font-semibold text-cyan-800">{tra.fecha.split('T')[0]}</p>
                                        <p className="font-semibold">{tra.desde} - {tra.hasta}</p>
                                    </div>
                                </div>
                                <div className="flex justify-around mt-1.5">
                                    <div className="flex flex-col justify-end items-center">
                                        <h1 className="text-4xl font-semibold">
                                            ${tra.precioTotal = Math.round(tra.precioTotal * 100) / 100}
                                        </h1>
                                        <p className="text-center">Total {tra.tipo === 'precioPorDia' ? 'por Día' : 'por Horas'}</p>
                                    </div>
                                    <div className="flex flex-col justify-end items-center">
                                        <h1 className="font-semibold text-xl">
                                            {tra.status}
                                        </h1>
                                        <p className="pl-5 text-center" >Estado</p>
                                    </div>
                                </div>
                                <div className="flex justify-around mt-3">
                                    <button type="button" className="px-3 py-2 bg-red-700 rounded-md text-white hover:bg-red-900 hover:scale-105 duration-300">Cancelar</button>
                                </div>
                            </div>
                        )
                    )) : (
                        <div className="w-[250px] h-[265px] mb-5 shadow-lg dark:shadow-slate-800 bg-gray-100 dark:bg-gray-900 rounded-lg flex flex-col justify-center items-center">
                            <img src={imgSinTrabajo} alt="SinTrabajos" width={150} height={150} />
                            <p className="text-lg dark:text-white font-semibold text-center">No se han agendado trabajos todavía</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default ContratosProv