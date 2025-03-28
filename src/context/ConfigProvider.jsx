import React, {createContext, useState } from "react";
const ConfigContext = createContext()

const ConfigAuth = ({children})=>{
    const [modalContra, setModalContra] = useState(false)
    const [modalPerfil, setModalPerfil] = useState(false)
    const [modalTema, setModalTema] = useState(false)
    const [modalUbi, setModalUbi] = useState(false)
    return(
        <ConfigContext.Provider value={
            {modalContra, setModalContra, modalPerfil, setModalPerfil, modalTema, setModalTema
                , modalUbi, setModalUbi
            }
            }>
            {children}
        </ConfigContext.Provider>
    )
}
export {ConfigAuth}
export default ConfigContext