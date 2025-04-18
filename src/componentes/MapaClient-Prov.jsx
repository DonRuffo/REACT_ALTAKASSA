import React, { useRef, useEffect } from "react";
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import OfertaStore from "../store/OfertaStore";
import AuthStoreContext from "../store/AuthStore";
import { shallow } from 'zustand/shallow'



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
    const { mapaCliProv } = OfertaStore(
        (state) => ({
            mapaCliProv:state.mapaCliProv
        }),
        shallow
    )   
    const { auth } = AuthStoreContext(
        (state) => ({
            auth:state.auth
        }),
        shallow
    )
    const creacionMapa = () => {

        const latitudCli = auth.ubicacion.latitud
        const longitudCli = auth.ubicacion.longitud
        const latitudProv = form.proveedor.ubicacion.latitud
        const longitudProv = form.proveedor.ubicacion.longitud
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
            <h1 className="text-xl text-center font-semibold mt-2 dark:text-white mb-1">Ubicación</h1>
            <div ref={containerRef} className={`rounded-md h-5/6 w-11/12 border`}></div>
        </>
    )
}
export default MapaCliProv