import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthStoreContext from "../../store/AuthStore";

const ModalPublicaciones = ({ idRev }) => {

    const [user, setUser] = useState({})
    const [ofertas, setOfertas] = useState([])
    const { setModalUsers } = AuthStoreContext()

    const [publicaciones, setPublicaciones] = useState(false)
    const [comentarios, setComentarios] = useState(false)

    const obtenerUsuario = async () => {
        const token = localStorage.getItem('token')
        const url = `${import.meta.env.VITE_BACKEND_URL}/detalleUsers/${idRev}`

        try {
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const respuesta = await axios.get(url, options)
            setUser(respuesta.data.usuario)
            setOfertas(respuesta.data.ofertas)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        obtenerUsuario()
    }, [])
    return (
        <>
            <div className="fixed z-50 inset-0 bg-black/80">
                <div className="max-h-[500px] overflow-y-auto fixed dark:border-none outline-2 outline-emerald-700 dark:outline-emerald-500 top-1/5 md:top-1/4 left-[40px] md:left-[150px] lg:left-[425px] xl:left-[550px] right-[40px] md:right-[150px] lg:right-[200px] xl:right-[370px] min-w-64 lg:min-w-lg bg-gradient-to-t from-white via-emerald-50 to-emerald-100 dark:from-black dark:via-emerald-950 dark:to-emerald-900 rounded-lg shadow-2xl">
                    <h1 className="border-b-2 border-emerald-700 dark:border-emerald-500 rounded-lg pb-5 text-2xl font-CalSans text-center pt-4 text-emerald-700 dark:text-emerald-500">Revisión</h1>
                    <div className={`flex justify-center mt-3 ${publicaciones || comentarios ? 'hidden' : ''}`}>
                        <div className="w-fit rounded-xl bg-gray-200 text-black dark:text-white dark:bg-gray-900 ">
                            <div className="mx-5 py-3">
                                <div className="flex flex-col md:flex-row justify-center gap-x-3">
                                    <div id="fotoDelPerfil" className="w-14 h-14 md:w-16 md:h-16 xl:w-20 xl:h-20 rounded-full overflow-hidden shrink-0">
                                        <img src={user.f_perfil} alt="imgPerfil" className="w-full h-full object-cover" />
                                    </div>
                                    <div id="contenido">
                                        <h1 className="text-lg font-semibold">{user.nombre} {user.apellido}</h1>
                                        <div className="flex items-center gap-x-2">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                </svg>
                                                {user.calificacionCliente}
                                            </div>
                                            <span className="text-amber-600"> Cliente</span>
                                        </div>
                                        <div className="flex items-center gap-x-2 mb-3 md:mb-0">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                </svg>
                                                {user.calificacionProveedor}
                                            </div>
                                            <span className="text-amber-600"> Proveedor</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3 flex flex-col justify-center">
                                        <button type="button" className="text-sm px-3 py-1 rounded-lg bg-transparent outline-2 outline-emerald-600 cursor-pointer hover:scale-105 duration-300 ease-in-out" onClick={() => { setPublicaciones(true) }}>Ver publicaciones</button>
                                        <button type="button" className="text-sm px-3 py-1 rounded-lg bg-transparent outline-2 outline-emerald-600 cursor-pointer hover:scale-105 duration-300 ease-in-out" onClick={() => { setComentarios(true) }}>Ver comentarios</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div id="comentarios" className={`${comentarios ? '' : 'hidden'}`}>
                        <h1 className="text-xl ml-8 mt-4 mb-2">Comentarios</h1>
                        <div className="flex justify-center">
                            <button data-testid="regresar-comentarios" type="button" className="px-3 py-1 rounded-lg bg-red-200 text-red-700 dark:bg-red-900 dark:text-red-200 cursor-pointer hover:scale-105 duration-300 ease-in-out" onClick={() => { setComentarios(false) }}>Regresar</button>
                        </div>
                    </div>
                    <div id="publicaciones" data-testid="publicaciones-div" className={`${publicaciones ? '' : 'hidden'}`}>
                        <h1 className="ml-8 mt-4 mb-2 text-xl">Publicaciones</h1>
                        <div className="mx-5 flex justify-center gap-3 flex-wrap">
                            {ofertas.length > 0 ? (
                                ofertas.map(of => (
                                    <div key={of._id} className="bg-gray-200 dark:bg-gray-900 text-black dark:text-white rounded-lg outline-2 outline-emerald-600 p-3 w-[180px]">
                                        <h1 className="text-lg text-amber-600 font-semibold">{of.servicio}</h1>
                                        <p className="mb-2"><span>$/Día: {of.precioPorDia}</span> - <span>$/Hora: {of.precioPorHora}</span></p>
                                        <div className="-space-y-0.5">
                                            <p className="text-cyan-600">Descripción:</p>
                                            <p>{of.descripcion}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex justify-center items-center">
                                    <h1 className="text-sm md:text-lg text-black dark:text-white font-semibold">Este usuario no ha publicado niguna oferta</h1>
                                </div>
                            )}
                        </div><br />
                        <div className="flex justify-center">
                            <button data-testid="regresar-publicaciones" type="button" className="px-3 py-1 rounded-lg bg-red-200 text-red-700 dark:bg-red-900 dark:text-red-200 cursor-pointer hover:scale-105 duration-300 ease-in-out" onClick={() => { setPublicaciones(false) }}>Regresar</button>
                        </div>
                    </div><br />
                    <div className={`flex justify-center mb-3 ${publicaciones || comentarios ? 'hidden' : ''}`}>
                        <button className="px-4 py-1 rounded-lg dark:bg-red-900 dark:text-red-200 text-red-700 bg-red-200 hover:brightness-110 duration-300 ease-in-out cursor-pointer" onClick={() => { setModalUsers(false) }}>Cerrar</button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ModalPublicaciones