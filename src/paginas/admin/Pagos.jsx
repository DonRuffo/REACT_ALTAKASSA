import React, { useState } from "react";
import logoPLAN from '../../assets/question.svg'
import AuthStoreContext from "../../store/AuthStore";
import ModalCrearPlan from "../../componentes/modals/ModalPagos";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import ModalEditarPlan from "../../componentes/modals/ModalEditarPagos";

const PlanesdePago = () => {

    const { modalPagos, setModalPagos, planes,setModalEditPagos, modalEditPagos } = AuthStoreContext()

    const [planSelec, setPlanSelec] = useState(null)

    const planSeleccionado = (id) => {
        setPlanSelec(id)
    }

    const EliminarPlan = async (id, nombre) => {
        const confirmar = confirm(`¿Estás seguro de eliminar el plan ${nombre}?`)
        if (confirmar) {
            const url = `${import.meta.env.VITE_BACKEND_URL}/eliminarPlan/${id}`
            const token = localStorage.getItem('token')
            try {
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.delete(url, options)
                toast.success(respuesta.data.msg)
            } catch (error) {
                console.error(error);
                toast.error(error.response.data.msg)
            }
        }
    }

    return (
        <div className="relative">
            <ToastContainer
                toastStyle={{backgroundColor:'#1c2833 ', color:'white'}}
                closeOnClick
                position="bottom-center"
            />
            <div className="flex flex-col justify-center items-center mt-20 md:mt-5">
                <h1 className="text-purple-600 text-2xl md:text-3xl font-CalSans">
                    Planes de pago
                </h1>
                <p className="dark:text-white text-xl mt-1">Visualiza, crea o edita tus planes de pago</p>
            </div><br /><br />
            <div className="flex justify-center gap-x-5 flex-wrap gap-y-3">
                {planes.length > 0 ? planes.map(pl => (
                    <div key={pl._id} className="w-[275px] h-[310px] md:h-[375px] outline-2 outline-cyan-500 rounded-xl bg-gray-100 dark:bg-gray-950 flex flex-col px-5">
                        <h1 className="text-cyan-500 text-2xl md:text-3xl mt-5 font-semibold">Plan {pl.nombre}</h1>
                        <p className="text-cyan-500 text-5xl md:text-6xl mt-2 md:mt-5 mb-3 font-semibold md_mb-5">${pl.precio}</p>
                        <div>
                            <div className="text-cyan-600 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 md:size-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                                </svg>
                                <p className="text-black dark:text-white text-4xl md:text-5xl">{pl.creditos}</p>

                            </div>
                            <p className="font-semibold text-lg dark:text-white text-center mb-3 md:mb-5">Créditos</p>
                            <p className="dark:text-white text-center">{pl.descripcion}</p>
                        </div>
                        <div className="flex justify-around mt-3">
                            <button type="button" className="text-cyan-500 cursor-pointer" onClick={()=>{setModalEditPagos(true); planSeleccionado(pl._id)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                            </button>
                            <button type="button" className="text-red-500 cursor-pointer" onClick={() => { EliminarPlan(pl._id, pl.nombre) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </div>
                        {modalEditPagos && planSelec === pl._id && <ModalEditarPlan idPlan={pl._id}/>}
                    </div>
                )) : (
                    <div className="w-[275px] h-[375px] outline-2 outline-amber-600 rounded-xl bg-gray-100 dark:bg-gray-950 flex flex-col justify-center items-center">
                        <div className="mb-20 flex flex-col justify-center items-center">
                            <p className="dark:text-slate-300 text-xl">Aún no tienes planes</p>
                            <img src={logoPLAN} alt="logoplan" width={130} />
                        </div>
                        <div className="w-12 h-12 rounded-full bg-emerald-300 flex justify-center cursor-pointer" onClick={() => { setModalPagos(true) }}>
                            <p className="font-semibold text-4xl text-center">+</p>
                        </div>
                        <p className="dark:text-white">Crea uno</p>
                    </div>
                )}
            </div><br /><br />
            {planes.length > 0 && (
               <div className="flex justify-center">
                <button type="button" className="group px-4 py-1 bg-gradient-to-r from-amber-700 to-yellow-500 rounded-lg font-semibold hover:brightness-110 hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer mb-3" onClick={()=>{setModalPagos(true)}}>
                    Crear plan
                </button>
            </div>
            )}
            {modalPagos && <ModalCrearPlan />}
        </div>
    )
}

export default PlanesdePago