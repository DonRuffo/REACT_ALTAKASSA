import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoutes = ({children}) =>{
    const auth =localStorage.getItem('token')
    return (auth) ? children : <Navigate to='/login'/>
}

PrivateRoutes.propTypes = {
    children:PropTypes.node.isRequired
}
export default PrivateRoutes