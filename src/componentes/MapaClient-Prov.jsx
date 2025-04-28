import React, { useRef, useEffect } from "react";
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import OfertaStore from "../store/OfertaStore";
import AuthStoreContext from "../store/AuthStore";



const MapaCliProv = ({ form }) => {

    //edicion del marcador para el mapa
    const iconMap = L.icon({
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    })

    const mapRef = useRef(null)
    const containerRef = useRef(null)
    const { mapaCliProv } = OfertaStore()
    const { auth } = AuthStoreContext()
    const creacionMapa = () => {

        const latitudCli = auth.ubicacionActual.latitud
        const longitudCli = auth.ubicacionActual.longitud
        const latitudProv = form.proveedor.ubicacionTrabajo.latitud
        const longitudProv = form.proveedor.ubicacionTrabajo.longitud
        if (mapRef.current) {
            const marcadorCliente = L.marker([latitudCli, longitudCli], { icon: iconMap }).bindPopup('Aquí estas')

            const marcadorProveedor = L.marker([latitudProv, longitudProv], { icon: iconMap }).bindPopup(form.proveedor.nombre)

            marcadorCliente.addTo(mapRef.current).openPopup()
            marcadorProveedor.addTo(mapRef.current).openPopup()

            const bounds = L.latLngBounds([
                [latitudCli, longitudCli],
                [latitudProv, longitudProv]
            ])

            mapRef.current.fitBounds(bounds, { padding: [50, 50] })

        }
    }

    useEffect(() => {
        if (mapaCliProv) {
            if (mapRef.current) {
                mapRef.current.remove()
                mapRef.current = null
            }
            if (!mapRef.current && containerRef.current) {
                mapRef.current = L.map(containerRef.current).setView([0, 0], 2)
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "© OpenStreetMap contributors",
                }).addTo(mapRef.current);
            }
            creacionMapa()
        }
    }, [mapaCliProv])
    return (
        <>
            <h1 className="flex items-center gap-x-1 text-xl text-center font-semibold mt-2 dark:text-white mb-1">
                Ubicación
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:text-white text-red-700 duration-300">
                    <path d="M12 22C12 22 4 14.58 4 9C4 5.13401 7.13401 2 11 2H13C16.866 2 20 5.13401 20 9C20 14.58 12 22 12 22Z"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="9" r="3" strokeWidth="2" stroke="currentColor" />
                </svg>
            </h1>
            <div ref={containerRef} className={`rounded-md h-5/6 w-11/12 border`}></div>
        </>
    )
}
export default MapaCliProv