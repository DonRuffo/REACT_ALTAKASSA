import React, { useEffect } from "react";
import AuthStoreContext from "../store/AuthStore";
import OfertaStore from "../store/OfertaStore";
import SocketStatus from "./SocketHook";
import PropTypes from "prop-types";
import socket from "./SocketConexion";

const AppInit = ({ children }) => {
    const { auth, setAuth, setPlanes, Perfil, ubiCliente, verificarFoto, verificarUbicacionActual, verificarUbicacionTrabajo, setDark,
        setDarkMode, setTipo, traerUsuarios, obtenerPlanes, obtenerCategorias, setUsers, setCategorias } = AuthStoreContext()
    const { ListarOfertas, ObtenerTrabajos, oferta, trabajos, MisOfertas, ofertaProvs, obtenerMensajes, setTrabajos, setOferta, setTrabajosProvs, setOfertaProvs } = OfertaStore()

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
            obtenerCategorias(token),
            obtenerMensajes(token, rol)
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

    //sockets
    useEffect(() => {

        if (!auth._id ) return

        //funciones admin
        const eliminarUsuario = ({ id }) => {
            setUsers(prev => prev.filter(us => us._id !== id))
        }
        const planActual = ({ id, planActualizado }) => {
            setPlanes(prev => [...prev.filter(pl => pl._id !== id), planActualizado])
        }
        const planElim = ({ id }) => {
            setPlanes(prev => prev.filter(pl => pl._id !== id))
        }
        const nuevoPl = ({ nuevoPlan }) => {
            setPlanes(prev => [...prev, nuevoPlan])
        }
        const categorias = ({ cat }) => {
            setCategorias(prev => [...prev, cat])
        }
        const eliminarCat = ({ id }) => {
            setCategorias(prev => prev.filter(of => of._id !== id))
        }

        //funciones cliente
        const traAgendado = ({ id, trabajoActualizado }) => {
            if (auth._id === trabajoActualizado.cliente._id) {
                setTrabajos(prev => [...prev.filter(tra => tra._id !== id), trabajoActualizado])
            }
            if (auth._id === trabajoActualizado.proveedor._id) {
                setTrabajosProvs(prev => [...prev.filter(tra => tra._id !== id), trabajoActualizado])
                const objetoN2 = {
                    monedasTrabajos: auth.monedasTrabajos - 1
                }
                console.log(objetoN2)
                setAuth(objetoN2)
            }
        }
        const trabajoEliminado = ({ id, trabajo }) => {
            if (auth._id === trabajo.cliente._id) {
                setTrabajos(prev => prev.filter(of => of._id !== id))
            }
            if (auth._id === trabajo.proveedor._id) {
                setTrabajosProvs(prev => prev.filter(of => of._id !== id))
            }
        }
        const traRechazado = ({ id, trabajoActualizado }) => {
            if (auth._id === trabajoActualizado.cliente._id) {
                setTrabajos(prev => [...prev.filter(tra => tra._id !== id), trabajoActualizado])
            }
            if (auth._id === trabajoActualizado.proveedor._id) {
                setTrabajosProvs(prev => [...prev.filter(tra => tra._id !== id), trabajoActualizado])
            }
        }
        const traCancel = ({ id, trabajoActualizado }) => {
            if (auth._id === trabajoActualizado.cliente._id) {
                setTrabajos(prev => [...prev.filter((tra) => tra._id !== id), trabajoActualizado])
            }
            if (auth._id === trabajoActualizado.proveedor._id) {
                setTrabajosProvs(prev => [...prev.filter((tra) => tra._id !== id), trabajoActualizado])
                const objetoN1 = {
                    monedasTrabajos: auth.monedasTrabajos + 1
                }
                setAuth(objetoN1)
            }
        }
        const nuevaOf = ({ ofertaPop }) => {
            if (ofertaPop.proveedor.monedasTrabajos !== 0) {
                setOferta(prev => [...prev, ofertaPop])
            }
            if (auth._id === ofertaPop.proveedor._id) {
                setOfertaProvs(prev => [...prev, ofertaPop])
                const cOferta = {
                    cantidadOfertas: auth.cantidadOfertas - 1
                }
                setAuth(cOferta)
            }
        }
        const eliminacion = ({ id }) => {
            setOferta(prev => prev.filter(of => of._id !== id))
        }
        const actualizacion = ({ id, ofertaActual }) => {
            if (ofertaActual.proveedor.monedasTrabajos !== 0) {
                setOferta(prev => [...prev.filter(of => of._id !== id), ofertaActual])
            }
        }
        const traCancelInicio = ({ ofertaResp }) => {
            if (ofertaResp.proveedor.monedasTrabajos !== 0) {
                setOferta(prev => [...prev, ofertaResp])
            }
        }
        const remover = ({ ofertaResp }) => {
            if (ofertaResp.proveedor.monedasTrabajos === 0) {
                setOferta(prev => prev.filter(of => of._id !== ofertaResp._id))
            }
        }

        //funciones proveedor
        const eliminarOf = ({ id, oferta }) => {
            setOferta(prev => prev.filter(of => of._id !== id))
            if (auth._id === oferta.proveedor._id) {
                setOfertaProvs(prev => prev.filter(of => of._id !== id))
                const cOfertas = {
                    cantidadOfertas: auth.cantidadOfertas + 1 
                }
                setAuth(cOfertas)
            }
        }
        const nuevaSoli = ({ trabajoActual }) => {
            if (auth._id === trabajoActual.proveedor._id) {
                setTrabajosProvs(prev => [...prev, trabajoActual])
            }
            if (auth._id === trabajoActual.cliente._id) {
                setTrabajos(prev => [...prev, trabajoActual])
            }
        }
        const trabajoActualizadoProv = ({ id, trabajoActualizado }) => {
            if (auth._id === trabajoActualizado.cliente._id) {
                setTrabajos(prev => [...prev.filter((tra) => tra._id !== id), trabajoActualizado])
            }
            if (auth._id === trabajoActualizado.proveedor._id) {
                setTrabajosProvs(prev => [...prev.filter((tra) => tra._id !== id), trabajoActualizado])
            }
        }
        const actualizarOf = ({ id, ofertaActual }) => {
            if (auth.monedasTrabajos !== 0) {
                setOferta(prev => [...prev.filter(of => of._id !== id), ofertaActual])
            }
            if (auth._id === ofertaActual.proveedor._id) {
                setOfertaProvs(prev => [...prev.filter(of => of._id !== id), ofertaActual])
            }
        }

        //sockets admin
        socket.on('Usuario eliminado', eliminarUsuario)
        socket.on('Plan actualizado', planActual)
        socket.on('Plan eliminado', planElim)
        socket.on('Nuevo Plan', nuevoPl)
        socket.on('nuevaCategoria', categorias)
        socket.on('Categoria eliminada', eliminarCat)

        //sockets cliente
        socket.on('Trabajo-agendado', traAgendado)
        socket.on('Trabajo-rechazado', traRechazado)
        socket.on('Trabajo-cancelado', traCancel)
        socket.on('Nueva-Oferta', nuevaOf)
        socket.on('Eliminacion', eliminacion)
        socket.on('Actualizacion', actualizacion)
        socket.on('Restablecer-oferta', traCancelInicio)
        socket.on('Remover-oferta', remover)
        socket.on('Trabajo-eliminado', trabajoEliminado)

        //sockets proveedor
        socket.on('Oferta-eliminada', eliminarOf)
        socket.on('Nueva-solicitud', nuevaSoli)
        socket.on('Trabajo-actualizado', trabajoActualizadoProv)
        socket.on('Actualizar-oferta', actualizarOf)


        //apagado de sockets
        return () => {
            //admin
            socket.off('Usuario eliminado', eliminarUsuario)
            socket.off('Plan actualizado', planActual)
            socket.off('Plan eliminado', planElim)
            socket.off('Nuevo Plan', nuevoPl)
            socket.off('nuevaCategoria', categorias)
            socket.off('Categoria eliminada', eliminarCat)

            //cliente
            socket.off('Trabajo-cancelado', traCancel)
            socket.off('Trabajo-agendado', traAgendado)
            socket.off('Trabajo-rechazado', traRechazado)
            socket.off('Nueva-Oferta', nuevaOf)
            socket.off('Eliminacion', eliminacion)
            socket.off('Actualizacion', actualizacion)
            socket.off('Restablecer-oferta', traCancelInicio)
            socket.off('Remover-oferta', remover)
            socket.off('Trabajo-eliminado', trabajoEliminado)

            //proveedor
            socket.off('Oferta-eliminada', eliminarOf)
            socket.off('Nueva-solicitud', nuevaSoli)
            socket.off('Trabajo-actualizado', trabajoActualizadoProv)
            socket.off('Actualizar-oferta', actualizarOf)
        }
    }, [auth._id, auth.monedasTrabajos, auth.cantidadOfertas])
    return (
        <>
            <SocketStatus />
            {children}
        </>
    )
}

AppInit.propTypes = {
    children: PropTypes.node.isRequired
}

export default AppInit