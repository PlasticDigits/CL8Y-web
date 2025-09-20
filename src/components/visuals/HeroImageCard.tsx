import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type HeroImageCardProps = {
  src?: string;
  alt?: string;
  caption?: string;
};

export default function HeroImageCard({
  src = "/images/HERO.png",
  alt = "CL8Y — The Expensive Memecoin",
  caption = "The Expensive Memecoin.",
}: HeroImageCardProps) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-charcoal/60 bg-black shadow-[var(--shadow-depth)]">
      <motion.div
        initial={prefersReducedMotion ? undefined : { scale: 1.04, opacity: 0 }}
        whileInView={prefersReducedMotion ? undefined : { scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative"
      >
        <img
          src={src}
          alt={alt}
          className="block h-auto w-full select-none"
          loading="eager"
          decoding="async"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_70%_50%,rgba(34,211,238,0.12),transparent_70%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_40%_at_30%_30%,rgba(212,175,55,0.18),transparent_70%)] mix-blend-screen"
          aria-hidden
        />
      </motion.div>
      <div className="p-4 md:p-5">
        <div className="mx-auto max-w-5xl">
          <h3 className="bg-gradient-to-r from-[#FFD700] via-gold to-[#A9812F] bg-clip-text font-display text-2xl font-bold tracking-tight text-transparent drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
            {caption}
          </h3>
          <p className="mt-1 text-base text-neutral-100">
            Scarcity on autopilot — 3M cap • Zero tax • Automated burns
          </p>
          <p className="mt-1 text-sm leading-snug text-neutral-300/95">
            Unlike many burning memecoins, CL8Y takes no trading tax. We route DeFi flows and
            GameFi rewards through a guardian‑bridged treasury to lock LP and burn supply. This
            deepens liquidity over time and reinforces price stability.
          </p>
          <motion.div
            className="mt-3"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.22 }}
          >
            <a
              href="https://tidaldex.com/swap?outputCurrency=0x8F452a1fdd388A45e1080992eFF051b4dd9048d2"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-3xl bg-[var(--gradient-gold)] px-5 py-2 font-semibold text-black shadow-[var(--shadow-depth)] outline-none transition-transform duration-200 hover:scale-[1.02] focus-visible:ring-4 focus-visible:ring-cyan-300/40"
            >
              Buy CL8Y
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


