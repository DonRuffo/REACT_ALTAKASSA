// DotPulseLoader.jsx
import { motion } from "framer-motion";

const DotPulseLoader = () => {
  const bounceTransition = {
    y: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  return (
    <div className="flex items-center justify-center gap-2 h-10">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-full bg-blue-500"
          transition={bounceTransition}
          animate={{ y: ["0%", "-60%"] }}
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
};

export default DotPulseLoader;
