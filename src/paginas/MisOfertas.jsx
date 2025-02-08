import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ModalEditarOferta from "../componentes/modals/ModalEditarOferta";
import OfertaContext from "../context/OfertasProvider";

const ListadoOfertas = () => {
    const {modalEditOf, setModalEditOf} = useContext(OfertaContext)
    const [oferta, setOferta] = useState([]);
    const [ofertaSeleccionada, setOfertaSeleccionada] = useState(null); 

    const listarOfertas = async () => {
        try {
            const token = localStorage.getItem("token");
            const url = "http://localhost:5000/api/misOfertas";
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.get(url, options);
            setOferta(respuesta.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listarOfertas();
    }, []);

    const handleModalEditOf = (id) => {
        setOfertaSeleccionada(id);
    };

    return (
        <>
            <div className="flex justify-center mb-5">
                <h1 className="text-3xl font-semibold text-purple-800">Tus ofertas</h1>
            </div>
            <div className="flex justify-center gap-3 flex-wrap">
                {oferta.map((of, index) => (
                    <div key={of._id} className="border bg-green-700 h-[250px] w-[200px] rounded-lg shadow-lg shadow-green-300">
                        <h1 className="text-center pt-2 font-bold text-xl text-white pb-2 mb-2 border-b">
                            Oferta N°{index + 1}
                        </h1>
                        <h1 className="text-center font-semibold text-yellow-400 text-lg mb-2">
                            {of.servicio}
                        </h1>
                        <p className="text-center font-semibold text-white">
                            Precio/Día:{" "}
                            <b className="text-xl ml-5 text-yellow-400">${of.precioPorDia}</b>
                        </p>
                        <p className="text-center font-semibold text-white">
                            Precio/Hora:{" "}
                            <b className="text-xl ml-5 text-yellow-400">${of.precioPorHora}</b>
                        </p>
                        <div className="flex justify-center mt-10">
                            <button
                                className="px-3 py-1 bg-red-600 rounded-md text-white font-semibold hover:bg-red-800 duration-300 hover:scale-110"
                                onClick={() => {handleModalEditOf(of._id); setModalEditOf(!modalEditOf)}} 
                            >
                                Editar
                            </button>
                        </div>
                        {ofertaSeleccionada === of._id && modalEditOf && (
                            <ModalEditarOferta idOferta={of._id} />
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default ListadoOfertas;
