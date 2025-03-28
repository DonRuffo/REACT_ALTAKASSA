import { motion } from "framer-motion";

const SpinnerCargaModal = () => {
  return (
    <div className="flex items-center justify-center h-4 bg-transparent">
      <motion.div
        className="w-4 h-4 border-2 border-t-2 border-green-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  )
}

export default SpinnerCargaModal