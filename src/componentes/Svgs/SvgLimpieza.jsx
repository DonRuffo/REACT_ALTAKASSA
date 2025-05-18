import PropTypes from "prop-types";
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
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${servicio === 'Plomería' ? '' : 'hidden'}`}>
                <rect x="10" y="26" width="44" height="12" rx="3" fill="#10B981" stroke="#065F46" strokeWidth="2" />

                <circle cx="10" cy="32" r="6" fill="#047857" stroke="#064E3B" strokeWidth="2" />

                <circle cx="54" cy="32" r="6" fill="#047857" stroke="#064E3B" strokeWidth="2" />

                <rect x="14" y="28" width="8" height="2" fill="#A7F3D0" />
                <rect x="22" y="32" width="6" height="2" fill="#6EE7B7" />

                <path d="M32 44 C30 40, 34 40, 32 44 C31.5 45, 32.5 45, 32 44" fill="#3B82F6" />
            </svg>
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${servicio === 'Pintor' ? '' : 'hidden'}`}>
                <rect x="28" y="2" width="8" height="20" rx="4" fill="#374151" />

                <rect x="24" y="22" width="16" height="6" rx="2" fill="#9CA3AF" />

                <path d="M20 28 C24 38, 40 38, 44 28 L44 34 C44 38, 20 38, 20 34 Z" fill="#F59E0B" />

                <line x1="24" y1="28" x2="24" y2="34" stroke="#B45309" strokeWidth="1" />
                <line x1="28" y1="28" x2="28" y2="34" stroke="#B45309" strokeWidth="1" />
                <line x1="32" y1="28" x2="32" y2="34" stroke="#B45309" strokeWidth="1" />
                <line x1="36" y1="28" x2="36" y2="34" stroke="#B45309" strokeWidth="1" />
                <line x1="40" y1="28" x2="40" y2="34" stroke="#B45309" strokeWidth="1" />
            </svg>
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${servicio === 'Niñera' ? '' : 'hidden'}`}>
                <circle cx="32" cy="32" r="20" fill="#FBBF24" />

                <circle cx="18" cy="20" r="6" fill="#FBBF24" />
                <circle cx="46" cy="20" r="6" fill="#FBBF24" />

                <circle cx="18" cy="20" r="3" fill="#FDE68A" />
                <circle cx="46" cy="20" r="3" fill="#FDE68A" />

                <circle cx="26" cy="30" r="2" fill="#1F2937" />
                <circle cx="38" cy="30" r="2" fill="#1F2937" />

                <circle cx="32" cy="36" r="2" fill="#1F2937" />

                <path d="M28 40 Q32 44 36 40" stroke="#1F2937" strokeWidth="2" fill="none" />

                <circle cx="32" cy="44" r="6" fill="#FDE68A" />
            </svg>
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${servicio === 'Téc.Electrodomésticos' ? '' : 'hidden'}`}>
                <rect x="12" y="8" width="40" height="48" rx="4" fill="#E5E7EB" stroke="#6B7280" strokeWidth="2" />

                <rect x="14" y="10" width="36" height="10" fill="#D1D5DB" />

                <circle cx="18" cy="15" r="2" fill="#6B7280" />
                <circle cx="24" cy="15" r="2" fill="#6B7280" />
                <rect x="30" y="13" width="16" height="4" rx="1" fill="#9CA3AF" />

                <circle cx="32" cy="38" r="14" fill="#F3F4F6" stroke="#4B5563" strokeWidth="2" />

                <circle cx="32" cy="38" r="9" fill="#60A5FA" />

                <path d="M23 38 Q26 35, 29 38 T35 38 T41 38" stroke="#3B82F6" strokeWidth="1.5" fill="none" />
            </svg>
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${servicio === 'Electricista' ? '' : 'hidden'}`}>
                <path d="M28 2 L10 36 H28 L20 62 L54 26 H34 L44 2 Z" fill="#FACC15" stroke="#FBBF24" strokeWidth="2" />

                <path d="M30 4 L14 36 H30 L22 58 L50 28 H34 L42 4 Z" fill="none" stroke="#FDE68A" strokeWidth="1" />
            </svg>
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${servicio === 'Chofer' ? '' : 'hidden'}`}>
                <rect x="28" y="10" width="8" height="24" rx="2" fill="#4B5563" />

                <circle cx="32" cy="8" r="6" fill="#1F2937" stroke="#9CA3AF" strokeWidth="2" />

                <path d="M28 34 L26 36 L28 38 L26 40 L28 42" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />

                <rect x="40" y="20" width="14" height="8" rx="2" fill="#374151" />
                <circle cx="44" cy="24" r="1.5" fill="#D1D5DB" />
                <circle cx="48" cy="24" r="1.5" fill="#D1D5DB" />
            </svg>
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${servicio === 'Carpintería' ? '' : 'hidden'}`}>
                <rect x="8" y="40" width="48" height="8" rx="1" fill="#A16207" stroke="#854D0E" strokeWidth="1.5" />
                <line x1="12" y1="40" x2="12" y2="48" stroke="#713F12" strokeWidth="1" />
                <line x1="28" y1="40" x2="28" y2="48" stroke="#713F12" strokeWidth="1" />
                <line x1="44" y1="40" x2="44" y2="48" stroke="#713F12" strokeWidth="1" />

                <rect x="10" y="30" width="48" height="8" rx="1" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
                <line x1="14" y1="30" x2="14" y2="38" stroke="#92400E" strokeWidth="1" />
                <line x1="30" y1="30" x2="30" y2="38" stroke="#92400E" strokeWidth="1" />
                <line x1="46" y1="30" x2="46" y2="38" stroke="#92400E" strokeWidth="1" />
            </svg>
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${servicio === 'Cerrajería' ? '' : 'hidden'}`}>
                <rect x="16" y="24" width="32" height="36" rx="4" fill="#D1D5DB" stroke="#374151" strokeWidth="2" />

                <path d="M22 24V18C22 13.58 25.58 10 30 10C34.42 10 38 13.58 38 18V24" stroke="#374151" strokeWidth="4" fill="none" />

                <circle cx="32" cy="42" r="4" fill="#6B7280" />
                <rect x="31" y="42" width="2" height="6" rx="1" fill="#374151" />
            </svg>
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${servicio === 'Albañilería' ? '' : 'hidden'}`}>
                <rect x="8" y="32" width="16" height="12" fill="#9CA3AF" stroke="#4B5563" strokeWidth="1.5" />
                <rect x="10" y="35" width="4" height="4" fill="#6B7280" />
                <rect x="16" y="35" width="4" height="4" fill="#6B7280" />

                <rect x="24" y="32" width="16" height="12" fill="#9CA3AF" stroke="#4B5563" strokeWidth="1.5" />
                <rect x="26" y="35" width="4" height="4" fill="#6B7280" />
                <rect x="32" y="35" width="4" height="4" fill="#6B7280" />

                <rect x="16" y="20" width="16" height="12" fill="#9CA3AF" stroke="#4B5563" strokeWidth="1.5" />
                <rect x="18" y="23" width="4" height="4" fill="#6B7280" />
                <rect x="24" y="23" width="4" height="4" fill="#6B7280" />
            </svg>

        </>
    )
}

SvgServicio.propTypes = {
    servicio: PropTypes.string.isRequired
}

export default SvgServicio