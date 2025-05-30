import React from "react";
import Inicio from "../paginas/Cliente/Inicio";
import InicioAdmin from "../paginas/admin/InicioAdmin";
import AuthStoreContext from "../store/AuthStore";
import PropTypes from "prop-types";

const PrivateProveedor = ({ children }) => {
    const tipo = localStorage.getItem('tipo')
    const rol = localStorage.getItem('rol')
    
    if(tipo === 'proveedor'){
        return children
    }else if(tipo ==='cliente'){
        return (<Inicio />)
    }else if(rol === 'administrador'){
        return (<InicioAdmin />)
    }
};

PrivateProveedor.propTypes = {
    children:PropTypes.node.isRequired
}

export default PrivateProveedor