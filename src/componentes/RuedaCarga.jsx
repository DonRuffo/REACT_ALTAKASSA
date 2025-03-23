import { motion } from "framer-motion";

const SpinnerCarga = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        className="w-16 h-16 border-4 border-t-4 border-purple-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  )
}

export default SpinnerCarga