import React from "react";
import { Navigate } from "react-router-dom";

const RutasProveedor = ({ children }) => {
    const auth = localStorage.getItem('tipo')
    return (auth === 'proveedor') ? children :  <Navigate to='/dashboard/no-encontrado'/>
};

export default RutasProveedor