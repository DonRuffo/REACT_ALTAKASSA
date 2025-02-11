import React, { Children, createContext, useState } from "react";

const OfertaContext = createContext()

const OfertaProvider = ({children}) =>{

    const[modalOf, setModalOf] = useState(false)
    const[modalEditOf, setModalEditOf] = useState(false)
    const[modalTra, setModalTra] = useState(false)
    const[modalTraActual, setModalTraActual] = useState(false)

    const handleModalOf = () =>{
        setModalOf(!modalOf)
    }
    const handleModalEditOf = () =>{
        setModalEditOf(!modalEditOf)
    }

    const handleModalTra = ()=>{
        setModalTra(!modalTra)
    }

    const handleModalTraActual = () => {
        setModalTraActual(!modalTraActual)
    }

    return(
        <OfertaContext.Provider value={{
            handleModalOf,
            modalOf,
            setModalOf,
            handleModalEditOf,
            modalEditOf,
            setModalEditOf,
            handleModalTra,
            modalTra,
            setModalTra,
            handleModalTraActual,
            modalTraActual,
            setModalTraActual
        }}>
            {children}
        </OfertaContext.Provider>
    )
}


export {OfertaProvider}
export default OfertaContext
