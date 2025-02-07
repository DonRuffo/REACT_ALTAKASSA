import React, { Children, createContext, useState } from "react";

const OfertaContext = createContext()

const OfertaProvider = ({children}) =>{

    const[modalOf, setModalOf] = useState(false)

    const handleModalOf = () =>{
        setModalOf(!modalOf)
    }

    return(
        <OfertaContext.Provider value={{
            handleModalOf,
            modalOf,
            setModalOf
        }}>
            {children}
        </OfertaContext.Provider>
    )
}


export {OfertaProvider}
export default OfertaContext
