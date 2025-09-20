import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const width = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 1000 : 120,
    damping: prefersReducedMotion ? 200 : 24,
    mass: 0.2,
  });
  return (
    <motion.div
      style={{ scaleX: width, transformOrigin: "0 0" }}
      className="bg-aqua/70 fixed left-0 top-0 z-50 h-1 w-full"
      aria-hidden
    />
  );
}
