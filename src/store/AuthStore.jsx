import axios from "axios";
import { toast } from "react-toastify";
import { create } from 'zustand'

const AuthStoreContext = create((set, get) => ({
    //inicializaciones de vairables
    auth: {},
    ubicacionActual: {},
    ubicacionTrabajo: {},
    ubicacionTraProvs: {},
    ivActual: '',
    menu: false,
    tipo: '',
    dark: false,
    darkMode: false,
    ubiActual: false,
    ubiTrabajo: false,
    imgPerfil: '',
    foto: false,
    opcionActiva: 'inicio',
    sideBar: null,
    connectionStatus: false,
    planes: [],
    users: [],
    categorias: [],
    selectorM:null,
    nuevoMensaje: [],


    //pulsos para cargas previas
    pulseUbiActual: true,
    pulseUbiTra: true,
    pulseFoto: true,

    //modales
    modalContra: false,
    modalPerfil: false,
    modalUbi: false,
    modalPagos: false,
    modalEditPagos: false,
    modalUsers: false,
    modalCategorias: false,
    modalCreditos: false,
    modalPlanes: false,

    //seteadores para actualizaciones
    setAuth: (authData) => set((state) => ({ auth:{...state.auth, ...authData} })),
    setCategorias: (cat) => set((state) => ({
        categorias: typeof cat === 'function' ? cat(state.categorias) : cat
    })),
    setPlanes: (plan) => set((state) => ({
        planes: typeof plan === 'function' ? plan(state.planes) : plan
    })),
    setUsers: (us) => set((state) => ({
        users: typeof us === 'function' ? us(state.users) : us
    })) ,
    setUbicacionActual: (ubi) => set({ ubicacionActual: ubi }),
    setUbicacionTrabajo: (ubi) => set({ ubicacionTrabajo: ubi }),
    setUbicacionTraProvs: (ubi) => set({ ubicacionTraProvs: ubi }),
    setConnectionStatus: (conec) => set({ connectionStatus: conec }),
    setMenu: (menuData) => set({ menu: menuData }),
    setTipo: (tipoData) => set({ tipo: tipoData }),
    setDark: (darkData) => set({ dark: darkData }),
    setDarkMode: (darkData) => set({ darkMode: darkData }),
    setUbiActual: (ubiData) => set({ ubiActual: ubiData }),
    setUbiTrabajo: (ubiData) => set({ ubiTrabajo: ubiData }),
    setImgPerfil: (imgData) => set({ imgPerfil: imgData }),
    setFoto: (fotoData) => set({ foto: fotoData }),
    setOpcionActiva: (opcionData) => set({ opcionActiva: opcionData }),
    setModalContra: (modal) => set({ modalContra: modal }),
    setModalPerfil: (modal) => set({ modalPerfil: modal }),
    setModalUbi: (modal) => set({ modalUbi: modal }),
    setModalPagos: (modal) => set({ modalPagos: modal }),
    setModalEditPagos: (modal) => set({ modalEditPagos: modal }),
    setModalUsers: (modal) => set({ modalUsers: modal }),
    setModalCategorias: (modal) => set({ modalCategorias: modal }),
    setModalCreditos: (modal) => set({ modalCreditos: modal }),
    setModalPlanes: (modal) => set({ modalPlanes: modal }),
    setsideBar: (ref) => set({ sideBar: ref }),
    setSelectorM:(selec) => set({selectorM:selec}),

    //funciones
    handleMenu: () => set((state) => ({ menu: !state.menu })),
    handleDarkPage: () => {
        const nuevoStateDark = !get().darkMode
        localStorage.setItem('ldPag', nuevoStateDark ? 'Claro' : 'Oscuro')
        set({ darkMode: nuevoStateDark })
    },


    Perfil: async (token, rol) => {
        try {
            let url = ''
            if (rol === 'usuario') url = `${import.meta.env.VITE_BACKEND_URL}/perfilUser`
            if (rol === "administrador") url = `${import.meta.env.VITE_BACKEND_URL}/perfil-admin`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const respuesta = await axios.get(url, options)
            set({ auth: respuesta.data })
        } catch {
            console.log('Error al conectar con el perfil')
        }
    },


    verificarFoto: async (token, rol) => {
        if (rol === 'administrador') return
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/verFotoUser`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            if (respuesta.data.msg === 'No') set({ foto: false })
            if (respuesta.data.msg === 'Si') set({ foto: true })
            set({ pulseFoto: false })
        } catch {
            console.log('Error al verificar la foto de perfil')
        }
    },

    verificarUbicacionActual: async (token, rol, tipo) => {
        if (rol === 'administrador' || tipo === 'proveedor') return
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/verUbiActualUser`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            if (respuesta.data.msg === 'No') set({ ubiActual: false })
            if (respuesta.data.msg === 'Si') set({ ubiActual: true })
            set({ pulseUbiActual: false })
        } catch {
            console.log('Error al verificar la ubicacion de perfil')
        }
    },

    verificarUbicacionTrabajo: async (token, rol, tipo) => {
        if (rol === 'administrador' || tipo === 'cliente') return
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/verUbiTrabajoUser`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            if (respuesta.data.msg === 'No') set({ ubiTrabajo: false })
            if (respuesta.data.msg === 'Si') set({ ubiTrabajo: true })
            set({ pulseUbiTra: false })
        } catch {
            console.log('Error al verificar la ubicacion de perfil')
        }
    },

    ubiCliente: (token, rol) => {
        return new Promise((resolve, reject) => {
            if (rol === 'administrador') return
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords
                    try {
                        const url = `${import.meta.env.VITE_BACKEND_URL}/guardar-ubicacion-user`
                        const options = {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`
                            }
                        }
                        const respuesta = await axios.post(url, { latitude, longitude }, options)
                        set({ ubiActual: true })
                        set({ ivActual: respuesta.data.iv })
                        resolve()
                    } catch (error) {
                        console.log('Error al obtener la ubicacion actual', error.message)
                        set({ ubiActual: false })
                        reject()
                    }
                },
                    () => {
                        set({ ubiActual: false })
                        resolve()
                        console.log('Sin exito')
                    }
                )
            } else {
                console.log('La geolocalización no está soportada por este navegador.')
                set({ ubiActual: false })
                resolve()
            }
        })

    },

    ActualizarPerfil: async (datos) => {

        try {
            let url
            const token = localStorage.getItem('token')
            const rol = localStorage.getItem('rol')
            if (rol === "usuario") url = `${import.meta.env.VITE_BACKEND_URL}/actualizarPerfilUser`
            if (rol === "administrador") url = `${import.meta.env.VITE_BACKEND_URL}/actualizar-perfil`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url, datos, options)
            set((state) => ({ auth: { ...state.auth, ...datos } }))
            toast.success(respuesta.data.msg)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
            error.response.data.msg.forEach((mensaje) => {
                toast.error(mensaje)
            })
        }
    },

    ActualizarContrasenia: async (datos) => {

        try {
            let url
            const token = localStorage.getItem('token')
            const rol = localStorage.getItem('rol')
            if (rol === "usuario") url = `${import.meta.env.VITE_BACKEND_URL}/actualizarPassUser`
            if (rol === "administrador") url = `${import.meta.env.VITE_BACKEND_URL}/actualizar-contrasenia`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url, datos, options)
            set((state) => ({ auth: { ...state.auth, ...datos } }))
            toast.success(respuesta.data.msg)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg[0])
        }
    },

    handleClickOutside: (event) => {
        const { sideBar } = get()
        if (sideBar && !sideBar.contains(event.target)) {
            set({ menu: false })
        }
    },

    obtenerPlanes: async (token) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/obtenerPlanes`
        try {
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            set({ planes: respuesta.data })
        } catch (error) {
            console.error(error)
        }
    },
    traerUsuarios: async (token, rol) => {
        if (rol !== "administrador") return
        if (!token) return
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/listarUsuarios`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const respuesta = await axios.get(url, options)
            set({ users: respuesta.data })
        } catch (error) {
            console.error("No valio", error)
        }
    },
    obtenerCategorias: async (token) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/listaCategorias`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const respuesta = await axios.get(url, options)
            set({ categorias: respuesta.data })
        } catch (error) {
            console.error(error)
        }
    },
    NuevoMSG: (idUser, nUser, nApellido, nFoto) => {
        set((state) => {
            const yaExiste = state.nuevoMensaje.some((u) => u.id === idUser);
            if (yaExiste) return {}; 

            const user = {
                id: idUser,
                nombre: nUser,
                apellido: nApellido,
                fPerfil: nFoto
            };
            return {
                nuevoMensaje: [...state.nuevoMensaje, user] 
            };
        })
    },

    //funcion para eliminar del array a la conversacion actual. mas no los mensajes
    eliminarChat: (idUser) => {
        set(state => ({
            nuevoMensaje: state.nuevoMensaje.filter(msg => msg.id !== idUser)
        }))
    }

}))

export default AuthStoreContext