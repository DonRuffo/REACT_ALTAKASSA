import React from "react";
import Inicio from "../paginas/Cliente/Inicio";
import InicioAdmin from "../paginas/admin/InicioAdmin";
import AuthStoreContext from "../store/AuthStore";


const PrivateProveedor = ({ children }) => {
    const tipo = localStorage.getItem('tipo')
    const {auth} = AuthStoreContext()
    if(tipo === 'proveedor'){
        return children
    }else if(tipo ==='cliente'){
        return (<Inicio />)
    }else if(auth.rol === 'administrador'){
        return (<InicioAdmin />)
    }
};

export default PrivateProveedor