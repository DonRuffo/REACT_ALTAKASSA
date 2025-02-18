import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const AuthContext = createContext()
const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error('useAuth debe estar dentro del proveedor AuthProvider')
    }
    return context
}

const AuthProvider = ({children}) => {

    const [menu, setMenu] = useState(false)
    const [auth, setAuth] = useState({})
    const [dark, setDark] = useState(false)

    const handleMenu = () =>{
        setMenu(!menu)
    }

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


    const Perfil = async (token, rol)=>{
        let url
        try{
            if(rol === "proveedor"){
                url = `${import.meta.env.VITE_BACKEND_URL}/perfil-proveedor`    
            }else if(rol === "cliente"){
                url = `${import.meta.env.VITE_BACKEND_URL}/perfilCliente`
            }else if(rol === "administrador"){
                url = `${import.meta.env.VITE_BACKEND_URL}/perfil-admin`
            }
            const options={
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`
                }
            }
            
            const respuesta = await axios.get(url, options)
            setAuth(respuesta.data)
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem('token')
        const rol = localStorage.getItem('rol')
        if(token && rol){
            Perfil(token, rol)
        }
    }, [])

    useEffect(()=>{
        const tema = localStorage.getItem('tema')
        if(tema==="Oscuro"){
            setDark(true)
        }else if(tema === "Claro" || !tema ){
            setDark(false)
        }
    }, [dark])

    

    const ActualizarPerfil = async (datos) =>{
        let url
        const token = localStorage.getItem('token')
        const rol = localStorage.getItem('rol')
        if(rol === "proveedor"){
            url = `${import.meta.env.VITE_BACKEND_URL}/actualizar-perfilProveedor`
        }else if(rol === "cliente"){
            url = `${import.meta.env.VITE_BACKEND_URL}/actualizarPerfilCliente`
        }else if(rol === "administrador"){
            url = `${import.meta.env.VITE_BACKEND_URL}/api/actualizar-perfil`
        }
        try{
            const options ={
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url,datos, options)
            setAuth({
                ...auth,
                ...datos
            })
            toast.success(respuesta.data.msg)
        }catch(error){
            console.log(error)
            toast.error(error.response.data.msg)
            error.response.data.msg.forEach((mensaje)=>{
                toast.error(mensaje)
            })
        }
    }

    const ActualizarContrasenia = async (datos) =>{
        let url
        const token = localStorage.getItem('token')
        const rol = localStorage.getItem('rol')
        if(rol === "proveedor"){
            url = `${import.meta.env.VITE_BACKEND_URL}/actualizar-contraseniaProveedor`
        }else if(rol === "cliente"){
            url = `${import.meta.env.VITE_BACKEND_URL}/actualizarPasswordCliente`
        }else if(rol === "administrador"){
            url = `${import.meta.env.VITE_BACKEND_URL}/actualizar-contrasenia`
        }   
        try{
            const options ={
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url,datos, options)
            setAuth({
                ...auth,
                ...datos
            })
            toast.success(respuesta.data.msg)
        }catch(error){
            console.log(error)

            error.response.data.msg.forEach((mensaje)=>{
                toast.error(mensaje)
            })
        }
    }
    


    return(
        <AuthContext.Provider value ={
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
            sideBar
           }
        }>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider, useAuth}
export default AuthContext