import { create } from 'zustand';
import axios from 'axios';

const OfertaStore = create((set, get) => ({
    //modales
    modalOf: false,
    modalEditOf: false,
    modalTra: false,
    modalTraActual: false,
    modalPerfilFoto: false,
    modalProvs: false,
    mapaCliProv: false,
    modalInfo: false,
    modalCalifProv: false,
    modalCalifCli: false,
    perfilBar: null,
    modalSugerencias: false,

    //pulsos de esqueletos
    pulseTra: true,
    pulseMisOfertas: true,

    //arrays
    trabajos: [],
    trabajosProvs: [],
    oferta: [],
    ofertaProvs: [],
    traProveedor: [],
    fechas: [],
    sugerencias:[],

    //mensajes
    mensajesUsuario: [],

    //string
    idProveedor: '',

    //seteadores de arrays y string
    setTrabajos: (tra) => set(state => ({
        trabajos: typeof tra === 'function' ? tra(state.trabajos) : tra
    })),
    setTrabajosProvs: (tra) => set(state => ({
        trabajosProvs: typeof tra === 'function' ? tra(state.trabajosProvs) : tra
    })),
    setOferta: (of) => set(state => ({
        oferta: typeof of === 'function' ? of(state.oferta) : of
    })),
    setOfertaProvs: (of) => set(state => ({
        ofertaProvs: typeof of === 'function' ? of(state.ofertaProvs) : of
    })),

    setNuevoMensaje: (msg) => set((state) => ({
        nuevoMensaje: typeof msg === 'function' ? msg(state.nuevoMensaje) : msg
    })),
    setMensajesUsuario: (msg) => set((state) => ({
        mensajesUsuario: typeof msg === 'function' ? msg(state.mensajesUsuario) : msg
    })),

    setTraProveedor: (traProv) => set({ traProveedor: traProv }),
    setFechas: (fec) => set({ fechas: fec }),
    setIdProveedor: (id) => set({ idProveedor: id }),
    setperfilBar: (bar) => set({ perfilBar: bar }),

    //seteadores de modales
    setModalOf: (modal) => set({ modalOf: modal }),
    setModalEditOf: (modal) => set({ modalEditOf: modal }),
    setModalTra: (modal) => set({ modalTra: modal }),
    setModalTraActual: (modal) => set({ modalTraActual: modal }),
    setModalPerfilFoto: (modal) => set({ modalPerfilFoto: modal }),
    setModalProvs: (modal) => set({ modalProvs: modal }),
    setMapaCliProv: (mapa) => set({ mapaCliProv: mapa }),
    setModalInfo: (modal) => set({ modalInfo: modal }),
    setModalCalifProv: (modal) => set({ modalCalifProv: modal }),
    setModalCalifCli: (modal) => set({ modalCalifCli: modal }),
    setModalSugerencias: (modal) => set({ modalSugerencias: modal }),

    //handles
    handleModalOf: () => {
        const nuevoState = !get().modalOf
        set({ modalOf: nuevoState })
    },
    handleModalEditOf: () => {
        const nuevoState = !get().modalEditOf
        set({ modalEditOf: nuevoState })
    },
    handleModalTra: () => {
        const nuevoState = !get().modalTra
        set({ modalTra: nuevoState })
    },
    handleModalTraActual: () => {
        const nuevoState = !get().modalTraActual
        set({ modalTraActual: nuevoState })
    },

    handleInfo: () => set((state) => ({ modalInfo: !state.modalInfo })),

    //funciones
    ListarOfertas: async (token, rol) => {
        if (rol === 'administrador') return
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/listarOfertas`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            set({ oferta: respuesta.data })
        } catch (error) {
            console.log('Error al intentar obtener las ofertas', error.message)
        }
    },

    MisOfertas: async (token, rol) => {
        if (rol === 'administrador') return
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/misOfertas`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            set({ ofertaProvs: respuesta.data })
            set({ pulseMisOfertas: false })
        } catch (error) {
            console.log('Error al intentar obtener las ofertas', error.message)
        }
    },
    ObtenerTrabajos: async (token, rol) => {
        if (rol === 'administrador') return
        try {
            const urlCli = `${import.meta.env.VITE_BACKEND_URL}/trabajos-cliente`
            const urlProvs = `${import.meta.env.VITE_BACKEND_URL}/trabajos-proveedor`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(urlCli, options)
            const respuestaProvs = await axios.get(urlProvs, options)
            set({ trabajos: respuesta.data })
            set({ trabajosProvs: respuestaProvs.data })
            set({ pulseTra: false })
        } catch (error) {
            console.log('Error al obtener los trabajos', error);
        }
    },

    handleClickOutsidePerfil: (event) => {
        const { perfilBar } = get()
        if (perfilBar && !perfilBar.contains(event.target)) {
            set({ modalInfo: false })
        }
    },

    obtenerMensajes: async (token, rol) => {
        if (rol === 'administrador') return
        const url = `${import.meta.env.VITE_BACKEND_URL}/mensajes`
        try {
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const respuesta = await axios.get(url, options)
            set(({ mensajesUsuario: [...respuesta.data.conversacion] }))
        } catch (error) {
            console.error(error)
        }
    },

    traerSugerencias: async (token, rol) => {
        if(rol !== 'administrador') return
        const url = `${import.meta.env.VITE_BACKEND_URL}/verSugerencias`;
        try {
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const respuesta = await axios.get(url, options);
            set({ sugerencias: respuesta.data });
        } catch (error) {
            console.error("Error al traer las sugerencias:", error);
        }
    }

}))

export default OfertaStore