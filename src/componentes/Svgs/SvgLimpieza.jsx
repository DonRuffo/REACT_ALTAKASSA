import React from "react";

const SvgServicio = ({ servicio }) => {
    
    return (
        <>
            <svg width='48' height='48' viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${servicio === 'Limpieza' ? '' : 'hidden'}`}>
                <rect x="30" y="4" width="4" height="40" rx="2" fill="#8B5CF6" />

                <rect x="26" y="42" width="12" height="4" rx="1" fill="#4C1D95" />

                <path d="M20 46 C28 58, 36 58, 44 46" fill="#10B981" />
                <path d="M22 46 C28 54, 36 54, 42 46" fill="#059669" />

                <line x1="28" y1="46" x2="28" y2="54" stroke="#047857" strokeWidth="1" />
                <line x1="32" y1="46" x2="32" y2="54" stroke="#047857" strokeWidth="1" />
                <line x1="36" y1="46" x2="36" y2="54" stroke="#047857" strokeWidth="1" />

                <circle cx="50" cy="20" r="2" fill="#D1FAE5" />
                <circle cx="54" cy="24" r="1.5" fill="#A7F3D0" />
                <circle cx="48" cy="26" r="1" fill="#6EE7B7" />
            </svg>
        </>
    )
}

export default SvgServicio