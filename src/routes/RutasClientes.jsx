import React, { useContext, } from "react";
import { Navigate } from "react-router-dom";

const RutasCliente = ({ children }) => {
    const auth = localStorage.getItem('rol') 
    return (auth === 'cliente') ? children :  <Navigate to='/dashboard/no-encontrado'/>
};

export default RutasCliente