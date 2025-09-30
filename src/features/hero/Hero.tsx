import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SmartBurnedNumber from "../../components/visuals/SmartBurnedNumber";
import { linksByCategory } from "../../data/links";
import { Button } from "../../components/ui/Button";
import AnimatedNumber from "../../components/visuals/AnimatedNumber";
import { useCl8yPrice } from "../../hooks/useCl8yPrice";
import { useSupplyCirculating } from "../../hooks/useSupplyCirculating";
import BuyTicker from "../../components/visuals/BuyTicker";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const { priceUsd, direction } = useCl8yPrice(15_000);
  const { data: supply } = useSupplyCirculating();
  const circulatingSupply = supply?.circulatingSupply ?? 3_000_000;
  const totalBurned = supply?.burned ?? 0;
  const marketCap = useMemo(() =>
    priceUsd != null ? Math.max(0, priceUsd * circulatingSupply) : null,
  [priceUsd, circulatingSupply]);

  const tradingLinks = linksByCategory.trading.filter((l) =>
    ["tidaldex-bsc", "ascendex-cex", "pancakeswap-dex", "uniswap-dex", "gdex-coming-soon"].includes(l.id),
  );
  const socialLinks = linksByCategory.social.filter((l) => ["twitter", "telegram"].includes(l.id));
  const primaryTrading =
    tradingLinks.find((l) => l.id === "tidaldex-bsc") ?? tradingLinks[0] ?? null;
  const secondaryTrading = tradingLinks.filter((l) => l.id !== primaryTrading?.id);
  const [showMoreExchanges, setShowMoreExchanges] = useState(false);

  const ctaContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  } as const;
  const ctaItem = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.22 } },
  } as const;
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {/* Floating buy ticker along the top */}
      <BuyTicker />
      {/* Aurora background */}
      <div className="hero-aurora absolute inset-0 -z-10" aria-hidden />
      {/* Soft vignette */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-[radial-gradient(60%_80%_at_50%_100%,rgba(0,0,0,0.6),transparent)]"
        aria-hidden
      />
      {/* Logo lockup */}
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
      <motion.h1
        className="bg-gradient-to-r from-[#FFD700] via-gold to-[#A9812F] bg-clip-text font-display text-6xl font-bold text-transparent"
        animate={prefersReducedMotion ? undefined : { backgroundPositionX: ["0%", "100%", "0%"] }}
        transition={
          prefersReducedMotion ? undefined : { duration: 6, repeat: Infinity, ease: "linear" }
        }
        style={{ backgroundSize: "200% 100%" }}
      >
        CL8Y. The Expensive Memecoin.
      </motion.h1>
      <p className="mt-6 max-w-3xl text-lg text-neutral-300">
        3M cap • Zero tax • Automated burns • Guardian-secured bridge
      </p>
      <div className="mt-10 grid grid-cols-1 gap-8 font-mono text-neutral-100">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Price */}
          <div className="grain rounded-lg border border-charcoal bg-[rgba(26,31,43,0.5)] p-4 shadow-[inset_0_0_30px_rgba(212,175,55,0.05)] transition-all hover:shadow-[inset_0_0_30px_rgba(212,175,55,0.08),0_0_20px_rgba(212,175,55,0.1)]">
            <div className="flex items-center justify-center gap-2 text-sm text-neutral-400">
              <span>Price</span>
              {direction ? (
                <span
                  aria-live="polite"
                  className={direction === "up" ? "text-aqua" : "text-magenta"}
                  title={direction === "up" ? "Price up" : "Price down"}
                >
                  {direction === "up" ? "▲" : "▼"}
                </span>
              ) : null}
            </div>
            <div className="mt-1 text-3xl">
              <AnimatedNumber
                value={priceUsd ?? 0}
                maximumFractionDigits={6}
                minimumFractionDigits={6}
                prefix="$"
                title="CL8Y price in USD"
                durationMs={1500}
              />
            </div>
          </div>

          {/* Market Cap */}
          <div className="grain rounded-lg border border-charcoal bg-[rgba(26,31,43,0.5)] p-4 shadow-[inset_0_0_30px_rgba(212,175,55,0.05)] transition-all hover:shadow-[inset_0_0_30px_rgba(212,175,55,0.08),0_0_20px_rgba(212,175,55,0.1)]">
            <div className="text-sm text-neutral-400">Market Cap</div>
            <div className="mt-1 text-3xl">
              <AnimatedNumber
                value={marketCap ?? 0}
                maximumFractionDigits={0}
                prefix="$"
                title="CL8Y market capitalization"
              />
            </div>
          </div>

          {/* Circulating Supply */}
          <div className="grain rounded-lg border border-charcoal bg-[rgba(26,31,43,0.5)] p-4 shadow-[inset_0_0_30px_rgba(212,175,55,0.05)] transition-all hover:shadow-[inset_0_0_30px_rgba(212,175,55,0.08),0_0_20px_rgba(212,175,55,0.1)]">
            <div className="text-sm text-neutral-400">Circulating Supply</div>
            <div className="mt-1 text-3xl">
              <AnimatedNumber
                value={circulatingSupply}
                maximumFractionDigits={0}
                suffix=" CL8Y"
                title="Circulating supply"
              />
            </div>
          </div>
        </div>

        <div className="grain rounded-lg border border-charcoal bg-[rgba(26,31,43,0.5)] p-4 shadow-[inset_0_0_30px_rgba(34,211,238,0.05)] transition-all hover:shadow-[inset_0_0_30px_rgba(34,211,238,0.08),0_0_30px_rgba(34,211,238,0.15)]">
          <div className="text-sm text-neutral-400">CL8Y Burned</div>
          <div className="text-3xl text-aqua">
            <SmartBurnedNumber
              targetValue={totalBurned}
              decimals={5}
              fastPhaseRatio={0.99}
              fastPhaseDurationMs={800}
              slowPhaseDurationMs={8 * 60 * 60 * 1000}
              title="Total CL8Y burned"
            />
          </div>
        </div>
        {/* CTA hierarchy */}
        <motion.div
          className="mt-3 flex flex-wrap items-center justify-center gap-3"
          variants={ctaContainer}
          initial="hidden"
          animate="show"
        >
          {primaryTrading ? (
            <motion.a
              key={primaryTrading.id}
              href={primaryTrading.href}
              target="_blank"
              rel="noreferrer"
              variants={ctaItem}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="gap-2">
                {primaryTrading.icon?.kind === "logo" ? (
                  <img src={primaryTrading.icon.src} alt={primaryTrading.icon.alt} className="h-5 w-5" />
                ) : null}
                Buy CL8Y
              </Button>
            </motion.a>
          ) : null}
          <motion.button
            key="more-exchanges"
            variants={ctaItem}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowMoreExchanges((s) => !s)}
          >
            <Button variant="secondary" className="gap-2" asChild>
              <span aria-expanded={showMoreExchanges} aria-controls="exchanges-list">More exchanges</span>
            </Button>
          </motion.button>
        </motion.div>
        <AnimatePresence initial={false}>
          {showMoreExchanges ? (
            <motion.div
              id="exchanges-list"
              className="mt-2 flex flex-wrap items-center justify-center gap-3"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              {secondaryTrading.map((l) => (
                <a key={l.id} href={l.href} target="_blank" rel="noreferrer">
                  <Button variant="secondary" className="gap-2">
                    {l.icon?.kind === "logo" ? (
                      <img src={l.icon.src} alt={l.icon.alt} className="h-5 w-5" />
                    ) : null}
                    {l.label}
                  </Button>
                </a>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
        <motion.div
          className="mt-2 flex flex-wrap items-center justify-center gap-3"
          variants={ctaContainer}
          initial="hidden"
          animate="show"
        >
          {socialLinks.map((l) => (
            <motion.a
              key={l.id}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              variants={ctaItem}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="secondary" className="gap-2">
                {/* lightweight glyphs for social */}
                {l.id === "twitter" ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                    <path
                      d="M23 3c-.8.5-1.7.8-2.6 1 1-1 1.7-2.2 2-3.6-.9.6-2 .9-3.1 1.2C18.5.6 17.3 0 16 0c-2.6 0-4.6 2.2-4.1 4.7-3.6-.2-6.7-1.9-8.9-4.5C2.1 2.1 2.7 4 4.2 5c-.7 0-1.4-.2-2-.5 0 2.2 1.6 4 3.7 4.5-.6.2-1.2.2-1.9.1.5 1.8 2.2 3.1 4.1 3.1-1.8 1.4-4 2.1-6.3 1.9 1.9 1.2 4.2 1.9 6.6 1.9 8 0 12.6-6.9 12.4-13.1.9-.6 1.7-1.4 2.3-2.3z"
                      fill="currentColor"
                    />
                  </svg>
                ) : null}
                {l.id === "telegram" ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                    <path
                      d="M9.04 15.28 8.9 18.6c.45 0 .65-.19.9-.41l2.16-2.05 4.48 3.28c.82.45 1.4.21 1.62-.76l2.94-13.8h.01c.26-1.2-.43-1.67-1.24-1.38L2.27 9.05c-1.17.45-1.16 1.1-.2 1.39l4.38 1.37 10.18-6.45c.48-.3.91-.14.55.16"
                      fill="currentColor"
                    />
                  </svg>
                ) : null}
                {l.label}
              </Button>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
