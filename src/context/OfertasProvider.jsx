import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const OfertaContext = createContext()

const OfertaProvider = ({ children }) => {

    const [modalOf, setModalOf] = useState(false)
    const [modalEditOf, setModalEditOf] = useState(false)
    const [modalTra, setModalTra] = useState(false)
    const [modalTraActual, setModalTraActual] = useState(false)
    const [trabajos, setTrabajos] = useState([])
    const [oferta, setOferta] = useState([])
    const [idProveedor, setIdProveedor] = useState('')
    const [traProveedor, setTraProveedor] = useState([])
    const [fechas, setFechas] = useState([])

    const ListarOfertas = async (rol, token) => {
        let url
        try {
            if (rol === "cliente") {
                url = `${import.meta.env.VITE_BACKEND_URL}/listarOfertas`
            } else if (rol === "proveedor") {
                url = `${import.meta.env.VITE_BACKEND_URL}/misOfertas`
            }

            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const respuesta = await axios.get(url, options)
            setOferta(respuesta.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const rol = localStorage.getItem('rol')
        const token = localStorage.getItem('token')

        if (rol && token && oferta.length === 0) {
            ListarOfertas(rol, token)
        }
    }, [])

    const ObtenerTrabajos = async (rol, token) => {
        let url
        try {
            if (rol === "cliente") {
                url = `${import.meta.env.VITE_BACKEND_URL}/trabajos-cliente`
            } else if (rol === "proveedor") {
                url = `${import.meta.env.VITE_BACKEND_URL}/trabajos-proveedor`
            }
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setTrabajos(respuesta.data)

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        const rol = localStorage.getItem('rol')
        const token = localStorage.getItem('token')
        if (rol && token && trabajos.length === 0) {
            ObtenerTrabajos(rol, token)
        }
    }, [])

    const handleModalOf = () => {
        setModalOf(!modalOf)
    }
    const handleModalEditOf = () => {
        setModalEditOf(!modalEditOf)
    }

    const handleModalTra = () => {
        setModalTra(!modalTra)
    }

    const handleModalTraActual = () => {
        setModalTraActual(!modalTraActual)
    }

    return (
        <OfertaContext.Provider value={{
            handleModalOf,
            modalOf,
            setModalOf,
            handleModalEditOf,
            modalEditOf,
            setModalEditOf,
            handleModalTra,
            modalTra,
            setModalTra,
            handleModalTraActual,
            modalTraActual,
            setModalTraActual,
            trabajos,
            setTrabajos,
            ObtenerTrabajos,
            oferta,
            setOferta,
            ListarOfertas,
            idProveedor,
            setIdProveedor,
            fechas,
            setFechas,
            traProveedor,
            setTraProveedor
        }}>
            {children}
        </OfertaContext.Provider>
    )
}


export { OfertaProvider }
export default OfertaContext
