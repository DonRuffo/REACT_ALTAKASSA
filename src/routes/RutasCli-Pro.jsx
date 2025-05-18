import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const RutasCliProv = ({children}) =>{
    const rol = localStorage.getItem<('rol')
    return (rol === 'administrador') ? <Navigate to='dashboard/no-encontrado'/> : children
}

RutasCliProv.propTypes = {
    children:PropTypes.node.isRequired
}

export default RutasCliProv