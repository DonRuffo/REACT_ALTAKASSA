import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import AuthStoreContext from "../../store/AuthStore";

const ModalEditarPlan = ({ idPlan }) => {

    const {setModalEditPagos} = AuthStoreContext()
    const [activo, setActivo] = useState(false)
    
    const [form, setForm] = useState({
        nombre: '',
        precio: 0,
        creditos: 0,
        descripcion: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    //obtiene el plan con sus datos actuales
    const obtenerPlan = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/obtenerPlan/${idPlan}`
        const token = localStorage.getItem('token')
        try {
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setForm(respuesta.data)
        } catch (error) {
            console.error(error)
        }
    }

    //funcion para actualizar el plan
    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = `${import.meta.env.VITE_BACKEND_URL}//actualizarPlan/${idPlan}`
        const token = localStorage.getItem('token')
        try {
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const respuesta = await axios.put(url, form, options)
            toast.success(respuesta.data.msg)
        } catch (error) {
            console.error(error)
            toast.error(error.response.data.msg)
        }
    }

    useEffect(()=>{
        obtenerPlan()
    }, [])

    useEffect(()=>{
            if(form.titulo !== '' && form.precio !== 0 && form.creditos !== 0 && form.descripcion !== ''){
                setActivo(true)
            }else{
                setActivo(false)
            }
        }, [form])
    return (
        <>
            <ToastContainer />
            <div className="fixed inset-0 bg-black/80">
                <div className="fixed dark:border-none outline-2 outline-emerald-700 dark:outline-emerald-500 top-1/5 md:top-1/4 left-[40px] md:left-[150px] lg:left-[425px] xl:left-[690px] right-[40px] md:right-[150px] lg:right-[200px] xl:right-[440px] min-w-64 lg:min-w-lg bg-gradient-to-t from-white via-emerald-50 to-emerald-100 dark:from-black dark:via-emerald-950 dark:to-emerald-900 rounded-lg shadow-2xl">
                    <h1 className="border-b-2 border-emerald-700 dark:border-emerald-500 rounded-lg pb-5 text-2xl font-CalSans text-center pt-4 text-emerald-700 dark:text-emerald-500">Nuevo plan</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="my-3 flex gap-x-3 px-5 lg:px-10 items-baseline ">
                            <label htmlFor="nombre" className="dark:text-white">Nombre:</label>
                            <input type="text" id="nombre" name='nombre' onChange={handleChange} value={form.nombre || ''} placeholder="Ingresa el nombre" className="dark:bg-gray-900 bg-gray-200 w-full rounded-lg px-2 py-1.5 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-800" />
                        </div>
                        <div className="my-3 flex gap-x-3 px-5 lg:px-10 items-baseline ">
                            <label htmlFor="precio" className="dark:text-white">Precio:</label>
                            <input type="number" id="precio" name='precio' onChange={handleChange} value={form.precio || ''} placeholder="Ingresa el precio" className="dark:bg-gray-900 bg-gray-200 w-full rounded-lg px-2 py-1.5 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-800" />
                        </div>
                        <div className="my-3 flex gap-x-3 px-5 lg:px-10 items-baseline ">
                            <label htmlFor="creditos" className="dark:text-white">Créditos</label>
                            <input type="number" id="creditos" name='creditos' onChange={handleChange} value={form.creditos || ''} placeholder="Ingresa los creditos" className="dark:bg-gray-900 bg-gray-200 w-full rounded-lg px-2 py-1.5 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-800" />
                        </div>
                        <div className="my-3 px-5 lg:px-10">
                            <label htmlFor="descripcion" className="dark:text-white">Descripción:</label>
                            <textarea name="descripcion" id="descripcion" onChange={handleChange} value={form.descripcion || ''} placeholder="Ingresa una descripción" className="mt-1 min-h-10 max-h-20 dark:bg-gray-900 bg-gray-200 w-full rounded-lg px-2 py-1.5 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-800"></textarea>
                        </div>
                        <div className="flex justify-around">
                            <button type="submit" className={`${activo ? '' : 'pointer-events-none cursor-not-allowed opacity-50'} px-3.5 py-1 font-semibold text-emerald-700 bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-200 rounded-lg cursor-pointer hover:brightness-110 duration-200`}>Actualizar</button>
                            <button type="button" className="px-4 py-1 font-semibold text-red-700 bg-red-200 dark:bg-red-900 dark:text-red-200 rounded-lg cursor-pointer hover:brightness-110 duration-200" onClick={() => { setModalEditPagos(false) }}>Cerrar</button>
                        </div><br />
                    </form>

                </div>
            </div>
        </>
    )
}


export default ModalEditarPlan