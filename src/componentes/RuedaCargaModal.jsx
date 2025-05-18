import { motion } from "framer-motion";
import React from "react";
import PropTypes from "prop-types";

const SpinnerCargaModal = ({w,h,HH}) => {
  return (
    <div className={`flex items-center justify-center h-${HH} bg-transparent`}>
      <motion.div
        className={`w-${w} h-${h} border-4 border-t-2 border-green-500 border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  )
}
  SpinnerCargaModal.propTypes = {
    w: PropTypes.number.isRequired,
    h: PropTypes.number.isRequired,
    HH: PropTypes.number.isRequired
  }

export default SpinnerCargaModal