import React from "react";
import { Navigate } from "react-router-dom";

const RutasCliProv = ({children}) =>{
    const rol = localStorage.getItem<('rol')
    return (rol === 'administrador') ? <Navigate to='dashboard/no-encontrado'/> : children
}

export default RutasCliProv