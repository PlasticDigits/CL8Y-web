import { Suspense, lazy } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ANCHORS } from "../data/products";

const Hero = lazy(() => import("../features/hero/Hero"));
const Products = lazy(() => import("../features/products/Products"));
const Utility = lazy(() => import("../features/utility/Utility"));
const Trust = lazy(() => import("../features/trust/Trust"));
const TokenDirectory = lazy(() => import("../features/token/TokenDirectory"));
const Community = lazy(() => import("../features/community/Community"));

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 } },
  } as const;
  const item = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.22 } },
  } as const;

  return (
    <div
      id={ANCHORS.main}
      role="main"
      className="relative flex flex-col gap-20 overflow-hidden bg-[radial-gradient(800px_400px_at_50%_-10%,rgba(212,175,55,0.08),transparent),radial-gradient(600px_300px_at_80%_20%,rgba(34,211,238,0.06),transparent)]"
      tabIndex={-1}
    >
      <Suspense fallback={<div className="p-6 text-text">Loading…</div>}>
        <section id={ANCHORS.hero}>
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <Hero />
            </motion.div>
          </motion.div>
        </section>

        <section id={ANCHORS.products} className="container mx-auto max-w-5xl scroll-mt-24 px-6">
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            <motion.div variants={item}>
              <Products />
            </motion.div>
          </motion.div>
        </section>

        <section id={ANCHORS.utility} className="container mx-auto max-w-5xl scroll-mt-24 px-6">
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            <motion.div variants={item}>
              <Utility />
            </motion.div>
          </motion.div>
        </section>

        <section id={ANCHORS.trust} className="container mx-auto max-w-5xl scroll-mt-24 px-6">
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            <motion.div variants={item}>
              <Trust />
            </motion.div>
          </motion.div>
        </section>

        <section id={ANCHORS.token} className="container mx-auto max-w-5xl scroll-mt-24 px-6">
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            <motion.div variants={item}>
              <TokenDirectory />
            </motion.div>
          </motion.div>
        </section>

        <section id={ANCHORS.community} className="container mx-auto max-w-5xl scroll-mt-24 px-6 pb-8">
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            <motion.div variants={item}>
              <Community />
            </motion.div>
          </motion.div>
        </section>
      </Suspense>
    </div>
  );
}
