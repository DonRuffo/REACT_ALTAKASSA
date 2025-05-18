import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const RutasCliente = ({ children }) => {
    const auth = localStorage.getItem('tipo') 
    return (auth === 'cliente') ? children :  <Navigate to='/dashboard/no-encontrado'/>
};

RutasCliente.propTypes = {
    children:PropTypes.node.isRequired
}

export default RutasCliente