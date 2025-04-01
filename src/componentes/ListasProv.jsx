import React, { useState } from "react";
import { motion } from "framer-motion";

const ListasAnimadasProv = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = [
    {
      title: "Tarifas para clientes",
      content: "Las tarifas para los clientes varían según el servicio requerido y su conveniencia, ajuste su tarifa adecuadamente para competir con otros proveedores.",
    },
    {
      title: "Inactividad",
      content: "Si permanece en inactividad durante un mes, su perfil y registro será eliminado de la base de datos.",
    },
    {
      title: "Cumplimiento y penalizaciones",
      content:
        "Si no cumple con una cita o no actualiza debidamente su estado de disponibilidad, tendrá una penalización: desactivación temporal de su cuenta o tarifa monetaria.",
    },
    {
      title: "Información",
      content: "Para conocer el monto que gana o genera, inicie sesión.",
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

export default ListasAnimadasProv;
