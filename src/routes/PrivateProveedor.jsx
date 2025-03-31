import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import Inicio from "../paginas/Inicio";
import InicioAdmin from "../paginas/InicioAdmin";


const PrivateProveedor = ({ children }) => {
    const {auth} = useContext(AuthContext)
    if(auth.rol === 'proveedor'){
        return children
    }else if(auth.rol ==='cliente'){
        return (<Inicio />)
    }else if(auth.rol === 'administrador'){
        return (<InicioAdmin />)
    }
};

export default PrivateProveedor