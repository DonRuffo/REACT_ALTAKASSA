import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import OfertaStore from "../../store/OfertaStore";


const CalificacionCli = ({ id, nombre, apellido, foto }) => {
    const [hovered, setHovered] = useState(0);
    const [calificacion, setCalificacion] = useState(0);

    const [form, setForm] = useState({
        calificacionCliente: 0,
    })

    const { setModalCalifCli } = OfertaStore()
    const stars = [1, 2, 3, 4, 5];

    const handleSubmitStars = async () => {

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/calificarCliente/${id}`;
            const token = localStorage.getItem("token");
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }
            const respuesta = await axios.post(url, form, options);

            toast.success(respuesta.data.msg);
            setHovered(0);
            setTimeout(() => setModalCalifCli(false), 2500)
        } catch (error) {
            console.error("Error al enviar la calificación:", error);
            toast.error(error.response.data.msg);
        }
    }

    return (
        <>
            <ToastContainer
                toastStyle={{ backgroundColor: '#1c2833 ', color: 'white' }}
                closeOnClick
                position="bottom-center"
            />
            <div className="fixed z-50 inset-0 bg-black/70 transition-opacity">
                <div className="fixed outline-2 outline-emerald-500 left-[30px] right-[30px] md:left-[200px] md:right-[200px] lg:inset-x-5/12 inset-y-1/3 w-auto h-80 md:w-auto lg:w-88 md:h-88 items-center justify-center rounded-3xl dark:bg-gradient-to-b dark:from-emerald-600 dark:via-emerald-900 dark:to-black bg-white px-4 py-2 md:py-7">
                    <h1 className="dark:text-white text-2xl font-CalSans text-center mt-3">Califica la conducta de:</h1>
                    <div className="flex justify-center items-center mt-3 mb-2">
                        <div className="w-20 h-20 rounded-full overflow-hidden">
                            <img src={foto} alt="prov" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <h1 className="text-center text-2xl dark:text-white">{nombre} {apellido}</h1>
                    <div className="flex items-center justify-center py-2">
                        {stars.map((star) => (
                            <svg
                                key={star}
                                data-testid="star"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className={`size-10 cursor-pointer transition-colors ${(hovered || calificacion) >= star ? "text-amber-500" : "text-gray-400"
                                    }`}
                                onMouseEnter={() => setHovered(star)}
                                onMouseLeave={() => setHovered(0)}
                                onClick={() => {
                                    setCalificacion(star);
                                    setForm({ ...form, calificacionCliente: star });
                                }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>
                        ))}
                    </div><br />
                    <div className="flex justify-center items-center">
                        <button
                            type="button"
                            className={`w-1/3 ${calificacion ? 'cursor-pointer hover:scale-105' : 'pointer-events-none cursor-not-allowed opacity-50'} bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-2 rounded-lg transition-transform duration-300 ease-in-out`}
                            onClick={() => { handleSubmitStars() }}
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CalificacionCli;