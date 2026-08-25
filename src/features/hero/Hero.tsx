import { motion, useReducedMotion } from "framer-motion";
import { Button } from "../../components/ui/Button";
import { ExternalLink } from "../../components/ui/ExternalLink";
import { ANCHORS, PRODUCT_URLS } from "../../data/products";
import { siteCopy } from "../../data/copy";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative flex min-h-[calc(100svh-4.5rem)] flex-col items-center justify-center px-6 py-16 text-center">
      <div className="hero-aurora absolute inset-0 -z-10" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-[radial-gradient(60%_80%_at_50%_100%,rgba(0,0,0,0.6),transparent)]"
        aria-hidden
      />
      <div className="relative mb-6">
        <div
          className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(255,215,0,0.22),transparent_70%)] blur-2xl"
          aria-hidden
        />
        <img
          src="/images/logo/CLAY-VECTOR-LARGE.svg"
          alt="CL8Y logo"
          className="mx-auto h-20 w-20 drop-shadow-[0_0_24px_rgba(255,215,0,0.35)]"
        />
      </div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">{siteCopy.brand.name}</p>
      <h1 className="mt-3 max-w-3xl bg-gradient-to-r from-[#FFD700] via-gold to-[#A9812F] bg-clip-text font-display text-4xl font-bold text-transparent md:text-6xl">
        {siteCopy.hero.headline}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-neutral-200 md:text-xl">{siteCopy.hero.subhead}</p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <motion.div whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }} whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}>
          <Button asChild>
            <ExternalLink href={PRODUCT_URLS.bridge}>{siteCopy.hero.ctaBridge}</ExternalLink>
          </Button>
        </motion.div>
        <motion.div whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }} whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}>
          <Button asChild>
            <ExternalLink href={PRODUCT_URLS.dex}>{siteCopy.hero.ctaDex}</ExternalLink>
          </Button>
        </motion.div>
      </div>
      <a
        href={`#${ANCHORS.token}`}
        className="mt-5 text-sm font-semibold text-neutral-300 underline-offset-4 hover:text-gold hover:underline"
      >
        {siteCopy.hero.ctaToken}
      </a>
    </div>
  );
}
