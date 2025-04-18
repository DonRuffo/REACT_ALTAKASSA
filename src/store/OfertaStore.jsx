import React from 'react';
import { create } from 'zustand';
import axios from 'axios';

const OfertaStore = create((set, get) => ({
    //modales
    modalOf: false,
    modalEditOf: false,
    modalTra: false,
    modalTraActual: false,
    modalPerfil: false,
    modalProvs: false,
    mapaCliProv: false,

    //arrays
    trabajos: [],
    oferta: [],
    traProveedor: [],
    fechas: [],

    //string
    idProveedor: '',

    //seteadores de arrays y string
    setTrabajos: (tra) => set({ trabajos: tra }),
    setOferta: (of) => set({ oferta: of }),
    setTraProveedor: (traProv) => set({ traProveedor: traProv }),
    setFechas: (fec) => set({ fechas: fec }),
    setIdProveedor: (id) => set({ idProveedor: id }),

    //seteadores de modales
    setModalOf: (modal) => set({ modalOf: modal }),
    setModalEditOf: (modal) => set({ modalEditOf: modal }),
    setModalTra: (modal) => set({ modalTra: modal }),
    setModalTraActual: (modal) => set({ modalTraActual: modal }),
    setModalPerfil: (modal) => set({ modalPerfil: modal }),
    setModalProvs: (modal) => set({ modalProvs: modal }),
    setMapaCliProv: (mapa) => set({ mapaCliProv: mapa }),

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

    //funciones
    ListarOfertas: async(token, rol, tipo) => {
        if (rol === 'administrador' || tipo === 'proveedor') return
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/listarOfertas`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            set({oferta:respuesta.data})
        } catch (error) {
            console.log('Error al intentar obtener las ofertas', error.message)
        }
    },
    ObtenerTrabajos:async (token, rol, tipo)=>{
        if (rol === 'administrador') return
        try {
            let url
            if (tipo === "cliente") url = `${import.meta.env.VITE_BACKEND_URL}/trabajos-cliente`
            else if (tipo === "proveedor") url = `${import.meta.env.VITE_BACKEND_URL}/trabajos-proveedor`
            
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            set({trabajos:respuesta.data})
        } catch (error) {
            console.log('Error al obtener los trabajos',error);
        }
    }



}))

export default OfertaStore