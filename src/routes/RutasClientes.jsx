import React, { useContext, } from "react";
import AuthContext from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

const RutasCliente = ({ children }) => {
    const {auth} = useContext(AuthContext)
    return (auth.rol === 'cliente') ? children :  <Navigate to='/dashboard/no-encontrado'/>
};

export default RutasCliente