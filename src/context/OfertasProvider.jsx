import React, { Children, createContext, useState } from "react";

const OfertaContext = createContext()

const OfertaProvider = ({children}) =>{

    const[modalOf, setModalOf] = useState(false)
    const[modalEditOf, setModalEditOf] = useState(false)

    const handleModalOf = () =>{
        setModalOf(!modalOf)
    }
    const handleModalEditOf = () =>{
        setModalEditOf(!modalEditOf)
    }

    return(
        <OfertaContext.Provider value={{
            handleModalOf,
            modalOf,
            setModalOf,
            handleModalEditOf,
            modalEditOf,
            setModalEditOf
        }}>
            {children}
        </OfertaContext.Provider>
    )
}


export {OfertaProvider}
export default OfertaContext
