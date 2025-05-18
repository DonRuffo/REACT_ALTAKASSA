import { motion } from "framer-motion";
import React from "react";

export default function RelojDeArena() {
  return (
    <div className="flex items-center justify-center h-10 bg-transparent">
      <div className="relative w-16 h-10 flex flex-col items-center">
        {/* Parte superior */}
        <motion.div
          className="w-8 h-8 bg-yellow-400 rounded-b-full"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        {/* Centro */}
        <motion.div
          className="w-4 h-10 bg-yellow-400"
          initial={{ height: "100%" }}
          animate={{ height: ["100%", "0%", "100%"] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        {/* Parte inferior */}
        <motion.div
          className="w-8 h-8 bg-yellow-400 rounded-t-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </div>
    </div>
  );
}
