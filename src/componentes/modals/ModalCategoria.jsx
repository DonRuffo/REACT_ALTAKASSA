import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import AuthStoreContext from "../../store/AuthStore";

const ModalCategoria = () => {

    const { setModalCategorias } = AuthStoreContext()
    const [form, setForm] = useState({
        nombre: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/nuevaCategoria`
            const token = localStorage.getItem('token')
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.post(url, form, options)
            toast.success(respuesta.data.msg)
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    return (
        <>
            <ToastContainer
                toastStyle={{ backgroundColor: '#1c2833 ', color: 'white' }}
                closeOnClick
                position="bottom-center"
            />
            <div className="fixed inset-0 bg-black/80">
                <div className="fixed dark:border-none outline-2 outline-emerald-700 dark:outline-emerald-500 top-1/5 md:top-1/4 left-[40px] md:left-[150px] lg:left-[425px] xl:left-[690px] right-[40px] md:right-[150px] lg:right-[200px] xl:right-[440px] min-w-64 lg:min-w-lg bg-gradient-to-t from-white via-emerald-50 to-emerald-100 dark:from-black dark:via-emerald-950 dark:to-emerald-900 rounded-lg shadow-2xl">
                    <h1 className="border-b-2 border-emerald-700 dark:border-emerald-500 rounded-lg pb-5 text-2xl font-CalSans text-center pt-4 text-emerald-700 dark:text-emerald-500">Nueva Categoría</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-3 mb-5 flex gap-x-2 items-baseline dark:text-white px-5">
                            <label htmlFor="nombre">Nombre:</label>
                            <input type="text" placeholder="Nombre de la categoría" name="nombre" id="nombre" value={form.nombre || ''} onChange={handleChange} className="dark:bg-gray-900 bg-gray-200 w-full rounded-lg px-2 py-1.5 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-800" />
                        </div>
                        <div className="flex justify-around mb-3">
                            <button type="submit" className={`px-4 py-1 font-semibold text-emerald-700 bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-200 rounded-lg cursor-pointer hover:brightness-110 duration-200`}>Crear</button>
                            <button type="button" className={`px-4 py-1 font-semibold text-red-700 bg-red-200 dark:bg-red-900 dark:text-red-200 rounded-lg cursor-pointer hover:brightness-110 duration-200`} onClick={() => { setModalCategorias(false) }}>Cerrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ModalCategoria