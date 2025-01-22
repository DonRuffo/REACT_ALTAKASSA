import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { urlLogin } from "../paginas/Login";
const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})

    const Perfil = async (token)=>{
        let url
        if(urlLogin === "Proveedor"){
            url = "http://localhost:5000/api/perfil-proveedor"
        }else if(urlLogin === "Cliente"){
            url = "http://localhost:5000/api/perfil-cliente"
        }else if(urlLogin === "Administrador"){
            url = "http://localhost:5000/api/perfil-admin"
        }
        try{
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
        if(token){
            Perfil(token)
        }
    },[])


    return(
        <AuthContext.Provider value ={
           { //contenido del mensaje
            auth,
            setAuth
           }
        }>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider}
export default AuthContext