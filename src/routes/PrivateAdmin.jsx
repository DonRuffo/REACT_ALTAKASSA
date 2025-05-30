import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const RutasAdmin = ({ children }) => {
    const auth = localStorage.getItem('rol') 
    return (auth === 'administrador') ? children :  <Navigate to='/dashboard/no-encontrado'/>
};

RutasAdmin.propTypes = {
    children:PropTypes.node.isRequired
}

export default RutasAdmin