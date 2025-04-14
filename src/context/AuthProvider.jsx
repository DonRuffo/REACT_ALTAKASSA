import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const AuthContext = createContext()
const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth debe estar dentro del proveedor AuthProvider')
    }
    return context
}

const AuthProvider = ({ children }) => {

    const [menu, setMenu] = useState(false)
    const [auth, setAuth] = useState({})
    const [dark, setDark] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [ubi, setUbi] = useState(false)
    const [imgPerfil, setImgPerfil] = useState('')
    const [foto, setFoto] = useState(false)


    //Funcion para mostrar y ocultar la barra lateral
    const handleMenu = () => {
        setMenu(!menu)
    }

    const handleDarkPage = () => {
        setDarkMode(!darkMode)
        if (darkMode === true) {
            localStorage.setItem('ldPag', "Claro")
        } else if (darkMode === false) {
            localStorage.setItem('ldPag', "Oscuro")
        }
    }

    //Funcion para mostrar y ocultar la barra lateral
    const sideBar = useRef(null)
    useEffect(() => {
        function handleClickOutside(event) {
            if (sideBar.current && !sideBar.current.contains(event.target)) {
                setMenu(false)
            }
        }
        if (menu) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menu]);

    //Funcion para obtener los datos del perfil de un usuario
    const Perfil = async (token, rol) => {
        let url
        try {
            if (rol === "proveedor") {
                url = `${import.meta.env.VITE_BACKEND_URL}/perfil-proveedor`
            } else if (rol === "cliente") {
                url = `${import.meta.env.VITE_BACKEND_URL}/perfilCliente`
            } else if (rol === "administrador") {
                url = `${import.meta.env.VITE_BACKEND_URL}/perfil-admin`
            }
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const respuesta = await axios.get(url, options)
            setAuth(respuesta.data)
        } catch (error) {
            console.log(error);
        }
    }

    //Función para verificar existencia de la foto de perfil
    const verificarFoto = () => {
        const fotitoOk = auth.f_perfil
        if (fotitoOk === null) {
            setFoto(false)
        } else {
            setFoto(true)
        }
    }

    //funcion para verificar si el usuario ya guardo su ubicación
    const verificarUbicacion = () =>{
        const ubiLatitud = auth.ubicacion.latitud
        const ubiLongitud = auth.ubicacion.longitud
        if(ubiLatitud === null || ubiLongitud === null){
            setUbi(false)
        } else {
            setUbi(true)
        }
    }

    // funcion para guardar la ubicacion del usuario cliente
    const ubiCliente = async (token, rol) => {
        if (rol !== "cliente") return

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords
                try {
                    const url = `${import.meta.env.VITE_BACKEND_URL}/guardar-ubicacion-cli`
                    const options = {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }
                    const repuesta = await axios.post(url, { latitude, longitude }, options)
                    const nuevaUbi = {
                        ubicacion:{
                            longitud:longitude,
                            latitud:latitude
                        }
                    }
                    setUbi(true)
                    setAuth(
                        ...auth,
                        ...nuevaUbi
                    )
                } catch (error) {
                    console.log(error)
                }
            },
                (error) => {
                    setUbi(false)
                }
            )
        } else {
            console.log('La geolocalización no está soportada por este navegador.')
            setUbi(false)
        }
    }

    //ejecución de funciones
    useEffect(() => {
        const token = localStorage.getItem('token')
        const rol = localStorage.getItem('rol')

        if (!rol || !token) return

        Perfil(token, rol).then(
            ubiCliente(token, rol)
        )
    }, [])

    useEffect(() => {
        if (auth && auth.f_perfil !== undefined && auth.ubicacion.latitud !== undefined && auth.ubicacion.longitud !== undefined ) {
            verificarFoto()
            verificarUbicacion()
            console.log('Validacion exitosa desde AuthProvider')
        }
    }, [auth])

    useEffect(() => {
        const tema = localStorage.getItem('tema')
        if (tema === "Oscuro") {
            setDark(true)
        } else if (tema === "Claro" || !tema) {
            setDark(false)
        }
    }, [dark])

    useEffect(() => {
        const temaPage = localStorage.getItem('ldPag')
        if (temaPage === "Oscuro") {
            setDarkMode(true)
        } else if (temaPage === "Claro" || !temaPage) {
            setDarkMode(false)
        }
    }, [])


    //funciones para usuarios
    const ActualizarPerfil = async (datos) => {
        let url
        const token = localStorage.getItem('token')
        const rol = localStorage.getItem('rol')
        if (rol === "proveedor") {
            url = `${import.meta.env.VITE_BACKEND_URL}/actualizar-perfilProveedor`
        } else if (rol === "cliente") {
            url = `${import.meta.env.VITE_BACKEND_URL}/actualizarPerfilCliente`
        } else if (rol === "administrador") {
            url = `${import.meta.env.VITE_BACKEND_URL}/api/actualizar-perfil`
        }
        try {
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url, datos, options)
            setAuth({
                ...auth,
                ...datos
            })
            toast.success(respuesta.data.msg)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
            error.response.data.msg.forEach((mensaje) => {
                toast.error(mensaje)
            })
        }
    }

    const ActualizarContrasenia = async (datos) => {
        let url
        const token = localStorage.getItem('token')
        const rol = localStorage.getItem('rol')
        if (rol === "proveedor") {
            url = `${import.meta.env.VITE_BACKEND_URL}/actualizar-contraseniaProveedor`
        } else if (rol === "cliente") {
            url = `${import.meta.env.VITE_BACKEND_URL}/actualizarPasswordCliente`
        } else if (rol === "administrador") {
            url = `${import.meta.env.VITE_BACKEND_URL}/actualizar-contrasenia`
        }
        try {
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url, datos, options)
            setAuth({
                ...auth,
                ...datos
            })
            toast.success(respuesta.data.msg)
        } catch (error) {
            console.log(error)

            error.response.data.msg.forEach((mensaje) => {
                toast.error(mensaje)
            })
        }
    }



    return (
        <AuthContext.Provider value={
            { //contenido del mensaje
                auth,
                setAuth,
                ActualizarPerfil,
                ActualizarContrasenia,
                Perfil,
                dark,
                setDark,
                menu,
                setMenu,
                handleMenu,
                sideBar,
                darkMode,
                handleDarkPage,
                ubi,
                setUbi,
                verificarUbicacion,
                ubiCliente,
                verificarFoto,
                imgPerfil,
                setImgPerfil,
                foto,
                setFoto
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, useAuth }
export default AuthContext