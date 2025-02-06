import { createContext, useContext, useEffect, useState } from "react";
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

    const [auth, setAuth] = useState({})
    const Perfil = async (token, rol)=>{
        let url
        try{
            if(rol === "proveedor"){
                url = "http://localhost:5000/api/perfil-proveedor"    
            }else if(rol === "cliente"){
                url = "http://localhost:5000/api/perfilCliente"
            }else if(rol === "administrador"){
                url = "http://localhost:5000/api/perfil-admin"
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


    

    const ActualizarPerfil = async (datos) =>{
        let url
        const token = localStorage.getItem('token')
        const rol = localStorage.getItem('rol')
        if(rol === "proveedor"){
            url = "http://localhost:5000/api/actualizar-perfilProveedor"
        }else if(rol === "cliente"){
            url = "http://localhost:5000/api/actualizarPerfilCliente"
        }else if(rol === "administrador"){
            url = "http://localhost:5000/api/actualizar-perfil"
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
            console.log(respuesta.data.msg)
        }catch(error){
            console.log(error)
        }
    }

    const ActualizarContrasenia = async (datos) =>{
        let url
        const token = localStorage.getItem('token')
        const rol = localStorage.getItem('rol')
        if(rol === "proveedor"){
            url = "http://localhost:5000/api/actualizar-contraseniaProveedor"
        }else if(rol === "cliente"){
            url = "http://localhost:5000/api/actualizarPasswordCliente'"
        }else if(rol === "administrador"){
            url = "http://localhost:5000/api/actualizar-contrasenia"
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
        }
    }
    


    return(
        <AuthContext.Provider value ={
           { //contenido del mensaje
            auth,
            setAuth,
            ActualizarPerfil,
            ActualizarContrasenia,
            Perfil
           }
        }>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider, useAuth}
export default AuthContext