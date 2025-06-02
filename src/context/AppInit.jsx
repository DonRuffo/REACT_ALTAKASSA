import React, { useEffect } from "react";
import AuthStoreContext from "../store/AuthStore";
import OfertaStore from "../store/OfertaStore";
import SocketStatus from "./SocketHook";
import PropTypes from "prop-types";

const AppInit = ({ children }) => {
    const { Perfil, ubiCliente, verificarFoto, verificarUbicacionActual, verificarUbicacionTrabajo, setDark, setDarkMode, setTipo, traerUsuarios, obtenerPlanes, obtenerCategorias } = AuthStoreContext()
    const { ListarOfertas, ObtenerTrabajos, oferta, trabajos, MisOfertas, ofertaProvs } = OfertaStore()

    SocketStatus()

    useEffect(() => {
        const token = localStorage.getItem('token')
        const rol = localStorage.getItem('rol')
        const tipoUsuario = localStorage.getItem('tipo')
        if (!rol || !token) return
        if (rol === 'administrador') {
            Promise.all([
                traerUsuarios(token, rol),
                Perfil(token, rol),
                obtenerPlanes(token),
                obtenerCategorias(token)
            ])
        }
        Promise.all([
            Perfil(token, rol),
            verificarFoto(token, rol),
            verificarUbicacionActual(token, rol, 'cliente'),
            verificarUbicacionTrabajo(token, rol, 'proveedor'),
            ubiCliente(token, rol),
            obtenerPlanes(token),
            obtenerCategorias(token)
        ])
        setTipo(tipoUsuario)
    }, [])

    useEffect(() => {
        const tema = localStorage.getItem('tema')
        if (tema === "Oscuro") {
            setDark(true)
        } else if (tema === "Claro" || !tema) {
            setDark(false)
        }
    }, [])

    useEffect(() => {
        const temaPage = localStorage.getItem('ldPag')
        if (temaPage === "Claro") {
            setDarkMode(true)
        } else if (temaPage === "Oscuro" || !temaPage) {
            setDarkMode(false)
        }
    }, [])

    useEffect(() => {
        const rol = localStorage.getItem('rol')
        const token = localStorage.getItem('token')

        if (rol && token) {
            if (oferta.length === 0) {
                ListarOfertas(token, rol);
            }
            if (trabajos.length === 0) {
                ObtenerTrabajos(token, rol);
            }
            if (ofertaProvs.length === 0) {
                MisOfertas(token, rol)
            }
        }
    }, [])
    return (
        <>
            {children}
        </>
    )
}

AppInit.propTypes = {
    children: PropTypes.node.isRequired
}

export default AppInit