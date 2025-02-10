import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Auth = () =>{
    const autenticado = localStorage.getItem('token')
    return (!autenticado) ? <Outlet /> : <Navigate to="/dashboard" replace/>
}

export default Auth