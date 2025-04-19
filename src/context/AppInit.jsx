import React, { useEffect } from "react";
import AuthStoreContext from "../store/AuthStore";
import OfertaStore from "../store/OfertaStore";
import { shallow } from 'zustand/shallow'

const AppInit = ({ children }) => {
    const { Perfil, ubiCliente, verificarFoto, verificarUbicacionActual, verificarUbicacionTrabajo, dark, setDark, setDarkMode, auth, tipo, setTipo } = AuthStoreContext()
    const { ListarOfertas, ObtenerTrabajos, oferta, trabajos } = OfertaStore()
    useEffect(() => {
        const token = localStorage.getItem('token')
        const rol = localStorage.getItem('rol')
        const tipoUsuario = localStorage.getItem('tipo')
        if (!rol || !token) return
        Perfil(token, rol)
        ubiCliente(token, rol)
        verificarFoto(token, rol)
        verificarUbicacionActual(token, rol, tipoUsuario)
        verificarUbicacionTrabajo(token, rol, tipoUsuario)
        setTipo(tipoUsuario)
    }, [auth, tipo])

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
        const tipo = localStorage.getItem('tipo')

        if (rol && token) {
            if (oferta.length === 0) {
                ListarOfertas(token, rol, tipo);
            }
            if (trabajos.length === 0) {
                ObtenerTrabajos(token, rol, tipo);
            }
        }
    }, [])
    return (
        <>
            {children}
        </>
    )
}

export default AppInit