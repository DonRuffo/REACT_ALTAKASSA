import { motion } from "framer-motion";
import React from "react";

const SpinnerCarga = () => {
  return (
    <div className="flex items-center justify-center h-32 bg-transparent">
      <motion.div
        className="w-14 h-14 border-4 border-t-4 border-purple-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  )
}

export default SpinnerCarga