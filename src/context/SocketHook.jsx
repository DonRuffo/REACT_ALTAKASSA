import { useEffect } from "react";
import socket from "./SocketConexion";
import AuthStoreContext from "../store/AuthStore";

const SocketStatus = () => {

    const {setConnectionStatus} = AuthStoreContext()

    useEffect(() => {
        socket.on('connect', () => {
            setConnectionStatus(true)
          })
      
          socket.on('disconnect', (reason) => {
            console.warn('Socket desconectado:', reason)
            setConnectionStatus(false)
          })
      
          socket.on('reconnect_attempt', () => {
            console.log('Intentando reconectar...')
          })
      
          socket.on('reconnect', (attemptNumber) => {
            console.log(`Reconectado en intento ${attemptNumber}`)
            setConnectionStatus(true)
            // Aquí puedes volver a pedir datos al backend si hace falta
          })
      
          socket.on('reconnect_error', (err) => {
            console.error('Error al reconectar:', err)
          })
      
          socket.on('reconnect_failed', () => {
            console.warn('Falló reconexión')
          })


        return () =>{
            socket.off('connect')
            socket.off('disconnect')
            socket.off('reconnect_attempt')
            socket.off('reconnect')
            socket.off('reconnect_error')
            socket.off('reconnect_failed')
        }
    }, [])

    return null
}


export default SocketStatus