import React from "react";
import { Navigate } from "react-router-dom";

const RutasCliente = ({ children }) => {
    const auth = localStorage.getItem('tipo') 
    return (auth === 'cliente') ? children :  <Navigate to='/dashboard/no-encontrado'/>
};

export default RutasCliente