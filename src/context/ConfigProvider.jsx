import React, {createContext, useState } from "react";
const ConfigContext = createContext()

const ConfigAuth = ({children})=>{
    const [modalContra, setModalContra] = useState(false)
    const [modalPerfil, setModalPerfil] = useState(false)
    return(
        <ConfigContext.Provider value={
            {modalContra, setModalContra, modalPerfil, setModalPerfil}
            }>
            {children}
        </ConfigContext.Provider>
    )
}
export {ConfigAuth}
export default ConfigContext