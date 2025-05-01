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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>

            </h1>
            <div ref={containerRef} className={`rounded-md h-5/6 w-11/12 border`}></div>
        </>
    )
}
export default MapaCliProv