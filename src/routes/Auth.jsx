import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Auth = () =>{
    const autenticado = localStorage.getItem('token')
    const tipo = localStorage.getItem('tipo')
    return (
        <main className="w-full h-screen">
            {autenticado && tipo === 'cliente' ? <Navigate to="/dashboard/cliente" /> : autenticado && tipo === 'proveedor' ?
             <Navigate to="/dashboard/proveedor" /> : autenticado && tipo === 'admin' ? <Navigate to="/dashboard/admin" /> : <Outlet />}
        </main>
    ) 
}

export default Auth