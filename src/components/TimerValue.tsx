import { Unit } from "@/Types/counter";
import { AnimatePresence, motion, Variants } from "framer-motion";

type TimerValueProps = { value: string; unit?: Unit };

const counterVarients: Variants = {
  initial: {
    y: 10,
    filter: "blur(6px)",
    opacity: 0,
  },
  animate: {
    y: 0,
    filter: "blur(0px)",
    opacity: 1,
  },
  exit: {
    y: -10,
    filter: "blur(6px)",
    opacity: 0,
  },
};

export const TimerValue = ({ value, unit }: TimerValueProps) => (
  <AnimatePresence mode="wait">
    <motion.div
      variants={counterVarients}
      transition={{
        ease: "easeInOut",
      }}
      key={`${unit} ${value}`}
      {...counterVarients}
      className="text-[2.5rem] leading-10 md:text-6xl lg:text-7xl flex gap-2 chivo-mono"
    >
      {value}
    </motion.div>
  </AnimatePresence>
);
