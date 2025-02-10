import React, { useContext, } from "react";
import AuthContext from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

const RutasProveedor = ({ children }) => {
    const {auth} = useContext(AuthContext)
    return (auth.rol === 'proveedor') ? children :  <Navigate to='/dashboard/no-encontrado'/>
};

export default RutasProveedor