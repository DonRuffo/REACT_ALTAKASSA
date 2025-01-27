import React, { useState } from "react";
import { motion } from "framer-motion";

const ListasAnimadas = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = [
    {
      title: "Disponibilidad del proveedor",
      content: "Si el proveedor no está disponible para el tiempo requerido, escoja otro.",
    },
    {
      title: "Cercanía de los proveedores",
      content: "Solo se ofertan proveedores en un radio de 12 km de su domicilio.",
    },
    {
      title: "Sistema para agendar citas",
      content:
        "Disponible 24/7, pero los servicios solo pueden ser realizados entre las 06:00am y las 20:00pm, excepto en emergencias.",
    },
    {
      title: "Llamadas emergentes",
      content: "La oferta de proveedores para emergencias es mínima debido a la baja demanda.",
    },
  ];

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 shadow cursor-pointer dark:text-white"
          onClick={() => toggleItem(index)}
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <span>{openIndex === index ? "-" : "+"}</span>
          </div>
          {openIndex === index && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-2"
            >
              <p className="text-gray-600 dark:text-gray-400">{item.content}</p>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListasAnimadas;
