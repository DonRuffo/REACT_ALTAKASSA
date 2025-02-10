import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Auth = () =>{
    const autenticado = localStorage.getItem('token')
    return (
        <main className="w-full h-screen">
            {autenticado ? <Navigate to="/dashboard" /> : <Outlet />}
        </main>
    ) 
}

export default Auth