import React from "react";
import OfertaStore from "../../store/OfertaStore";

const ModalFotoPerfil = ({url}) => {
    const { setModalPerfil, modalPerfil } = OfertaStore()
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center overflow-auto">
                <button type="button" className="absolute top-4 right-4 text-white hover:text-red-500 duration-150" onClick={()=>setModalPerfil(!modalPerfil)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
                <div className="w-auto h-auto">
                    <img src={url} alt="vistaPerfil" className="rounded-lg max-h-[700px]" />
                </div>
            </div>
        </>
    )
}

export default ModalFotoPerfil