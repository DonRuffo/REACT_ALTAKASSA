import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { create } from 'zustand'

const AuthStoreContext = create((set, get) => ({
    //inicializaciones de vairables
    auth: {},
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

    //status para sockets


    //pulsos para cargas previas
    pulseUbiActual: true,
    pulseUbiTra: true,
    pulseFoto: true,

    //modales
    modalContra: false,
    modalPerfil: false,
    modalUbi: false,
    modalTema: false,

    //seteadores para actualizaciones
    setAuth: (authData) => set((state) => ({ ...state.auth, ...authData })),
    setConnectionStatus: (conec) => set({connectionStatus:conec}),
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
    setModalTema: (modal) => set({ modalTema: modal }),
    setsideBar: (ref) => set({ sideBar: ref }),

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
        } catch (error) {
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
        } catch (error) {
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
        } catch (error) {
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
        } catch (error) {
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
                        const repuesta = await axios.post(url, { latitude, longitude }, options)
                        set({ ubiActual: true })
                        
                        resolve()
                    } catch (error) {
                        console.log('Error al obtener la ubicacion actual', error.message)
                        reject()
                    }
                },
                    (error) => {
                        set({ ubiActual: false })
                        reject()
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
            error.response.data.msg.forEach((mensaje) => {
                toast.error(mensaje)
            })
        }
    },

    handleClickOutside: (event) => {
        const { sideBar } = get()
        if (sideBar && !sideBar.contains(event.target)) {
            set({ menu: false })
        }
    }

}))

export default AuthStoreContext