import React from "react";
import OfertaStore from "../../store/OfertaStore";
import { motion, AnimatePresence } from "framer-motion";

const ModalFotoPerfil = ({ url }) => {
    const { setModalPerfil, modalPerfil } = OfertaStore()
    console.log(modalPerfil)
    const variantsModal = {
        hidden: { opacity: 0, scale: 0.95, y: 50 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: 50 }
    }
    return (
        <>
            <div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center overflow-auto">
                <button type="button" className="absolute top-4 right-4 text-white hover:text-red-500 duration-150 cursor-pointer" onClick={() => setModalPerfil(!modalPerfil)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
                <div className="w-auto h-auto">
                    <img src={url} alt="vistaPerfil" className="rounded-lg max-h-[700px] object-cover" />
                </div>
            </div>
        </>
    )
}

export default ModalFotoPerfil