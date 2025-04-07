import { motion } from "framer-motion";

const buildings = [
  { height: "h-24", delay: 0 },
  { height: "h-32", delay: 0.2 },
  { height: "h-40", delay: 0.4 },
  { height: "h-28", delay: 0.6 },
  { height: "h-36", delay: 0.8 },
  { height: "h-20", delay: 1 },
];

export default function SkylineLoader() {
  return (
    <div className="flex items-end justify-center h-screen bg-gray-900">
      <div className="flex gap-3">
        {buildings.map((b, i) => (
          <motion.div
            key={i}
            className={`w-10 ${b.height} bg-gray-700 rounded-t-md relative overflow-hidden`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: b.delay, duration: 0.5 }}
          >
            <motion.div
              className="absolute bottom-0 w-full h-0 bg-yellow-400"
              initial={{ height: "0%" }}
              animate={{ height: "100%" }}
              transition={{ delay: b.delay + 0.2, duration: 0.6 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
