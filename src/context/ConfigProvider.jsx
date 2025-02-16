import React, {createContext, useState } from "react";
const ConfigContext = createContext()

const ConfigAuth = ({children})=>{
    const [modalContra, setModalContra] = useState(false)
    const [modalPerfil, setModalPerfil] = useState(false)
    const [modalTema, setModalTema] = useState(false)
    return(
        <ConfigContext.Provider value={
            {modalContra, setModalContra, modalPerfil, setModalPerfil, modalTema, setModalTema}
            }>
            {children}
        </ConfigContext.Provider>
    )
}
export {ConfigAuth}
export default ConfigContext