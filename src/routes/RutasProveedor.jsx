import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
const RutasProveedor = ({ children }) => {
    const auth = localStorage.getItem('tipo')
    return (auth === 'proveedor') ? children :  <Navigate to='/dashboard/no-encontrado'/>
};

RutasProveedor.propTypes = {
    children:PropTypes.node.isRequired
}

export default RutasProveedor