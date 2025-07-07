import { io } from 'socket.io-client'

const socket = io(import.meta.env.VITE_BACK_URI, {
    transports: ["websocket"],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 6,
    reconnectionDelay: 1000
})

export default socket