import { Suspense, lazy } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import HeroImageCard from "../components/visuals/HeroImageCard";
import { Button } from "../components/ui/Button";
import { linksByCategory } from "../data/links";
import GeckoTerminalChart from "../components/visuals/GeckoTerminalChart";

const Hero = lazy(() => import("../features/hero/Hero"));
const Engine = lazy(() => import("../features/engine/Engine"));
const Security = lazy(() => import("../features/security/Security"));
const Tokenomics = lazy(() => import("../features/tokenomics/Tokenomics"));
const Community = lazy(() => import("../features/community/Community"));
const GameFiAI = lazy(() => import("../features/gamefi/GameFiAI"));
const Institutional = lazy(() => import("../features/institutional/Institutional"));

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const parallaxSpeedRatio = prefersReducedMotion ? 0 : 0.4;
  const bgY = useTransform(scrollY, (v) => v * parallaxSpeedRatio);
  const tidaldex = linksByCategory.trading.find((l) => l.id === "tidaldex-bsc");
  const telegram = linksByCategory.social.find((l) => l.id === "telegram");
  const twitter = linksByCategory.social.find((l) => l.id === "twitter");
  const bscContract = linksByCategory.contracts.find((l) => l.id === "bsc-contract");
  const luncscan = linksByCategory.listings.find((l) => l.id === "luncscan-terraclassic");
  const whitepaperV2Href = "/cl8y_whitepaper";
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 } },
  } as const;
  const item = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.22 } },
  } as const;
  return (
    <div
      id="main"
      role="main"
      className="relative flex flex-col gap-24 bg-[radial-gradient(800px_400px_at_50%_-10%,rgba(212,175,55,0.08),transparent),radial-gradient(600px_300px_at_80%_20%,rgba(34,211,238,0.06),transparent)] overflow-hidden"
      tabIndex={-1}
    >
      {/* Subtle CL8Y logo background with parallax */}
      <motion.img
        src="/images/logo/CLAY-VECTOR-LARGE.svg"
        alt=""
        aria-hidden
        className="pointer-events-none select-none absolute -left-[10vw] top-[-12vh] md:top-[-18vh] w-[1000px] md:w-[1600px] max-w-none opacity-[0.025]"
        style={{ y: bgY }}
      />
      <Suspense fallback={<div className="p-6 text-text">Loading…</div>}>
        <section id="hero">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <Hero />
            </motion.div>
            <div className="container mx-auto mt-10 max-w-5xl px-6">
              <motion.div variants={item}>
                <HeroImageCard />
              </motion.div>
              <motion.div variants={item} className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <a href={tidaldex?.href ?? "#"} target="_blank" rel="noreferrer">
                  <Button>Buy CL8Y</Button>
                </a>
                <a href={whitepaperV2Href} target="_blank" rel="noreferrer">
                  <Button variant="secondary">Read Whitepaper</Button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section id="engine" className="container mx-auto max-w-5xl px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={item}>
              <Engine />
            </motion.div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <motion.div variants={item}>
                <Card premium className="h-full">
                  <CardHeader>
                    <h3 className="text-lg md:text-xl font-semibold tracking-tight text-text">Autopilot Scarcity Loop</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="max-w-[68ch] text-sm leading-relaxed text-text/85">
                      Trading activity continuously funds automated buybacks, and purchased tokens are burned. This
                      tight feedback loop <span className="font-semibold text-text">shrinks circulating supply</span> over time,
                      reinforcing scarcity pressure on price while requiring no manual intervention.
                    </p>
                    <div className="mt-5 h-px w-full bg-gradient-to-r from-cyan-400/20 via-amber-300/20 to-pink-500/20" />
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center justify-start">
                        <div className="rounded-full p-[2px] bg-gradient-to-br from-cyan-400/20 via-amber-300/20 to-pink-500/20">
                          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-charcoal bg-[radial-gradient(120%_120%_at_50%_0%,rgba(16,21,33,0.98),rgba(6,8,14,0.98))] transition-transform [box-shadow:inset_0_0_56px_rgba(212,175,55,0.10)] hover:scale-[1.02]">
                            <img
                              src="/images/clipart/CHART.png"
                              alt="Supply trend and price pressure"
                              loading="lazy"
                              className="h-20 w-20 object-contain drop-shadow-md"
                            />
                          </div>
                        </div>
                        <span className="mt-2 text-center text-xs text-text/70">Demand pressure</span>
                      </div>
                      <div className="flex flex-col items-center justify-start">
                        <div className="rounded-full p-[2px] bg-gradient-to-br from-cyan-400/20 via-amber-300/20 to-pink-500/20">
                          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-charcoal bg-[radial-gradient(120%_120%_at_50%_0%,rgba(16,21,33,0.98),rgba(6,8,14,0.98))] transition-transform [box-shadow:inset_0_0_56px_rgba(225,29,116,0.10)] hover:scale-[1.02]">
                            <img
                              src="/images/clipart/FIRE.png"
                              alt="Burn mechanism illustration"
                              loading="lazy"
                              className="h-20 w-20 object-contain drop-shadow-md"
                            />
                          </div>
                        </div>
                        <span className="mt-2 text-center text-xs text-text/70">Burns</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={item}>
                <Card premium className="h-full group">
                  <CardHeader>
                    <h3 className="text-lg md:text-xl font-semibold tracking-tight text-text">Autoscarcity Loop Diagram</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="mx-auto w-fit rounded p-[2px] bg-gradient-to-br from-cyan-400/20 via-amber-300/20 to-pink-500/20">
                      <div className="rounded border border-charcoal bg-midnight/60 p-3 transition-transform group-hover:scale-[1.01] [box-shadow:inset_0_0_56px_rgba(212,175,55,0.06)]">
                        <img
                          src="/images/AUTOSCARCITY_LOOP.png"
                          alt="CL8Y Autopilot Scarcity Loop diagram"
                          loading="lazy"
                          className="mx-auto h-64 w-auto object-contain"
                        />
                      </div>
                    </div>
                    <p className="mt-3 text-center text-xs text-text/70">Trade → Buyback → Burn → Supply Shrink</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section id="security" className="container mx-auto max-w-5xl px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={item}>
              <Security />
            </motion.div>
          </motion.div>
        </section>

        <section id="tokenomics" className="container mx-auto max-w-5xl px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={item}>
              <Tokenomics />
            </motion.div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <motion.div variants={item}>
                <GeckoTerminalChart />
              </motion.div>
              <motion.div variants={item}>
                <Card premium className="h-full">
                  <CardHeader>
                    <h3 className="text-lg md:text-xl font-semibold tracking-tight text-text">Addresses & Locks</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-5">
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="rounded-full p-[2px] bg-gradient-to-br from-amber-300/30 via-amber-200/20 to-amber-400/30">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-charcoal bg-[radial-gradient(120%_120%_at_50%_0%,rgba(16,21,33,0.98),rgba(6,8,14,0.98))] [box-shadow:inset_0_0_36px_rgba(212,175,55,0.15)]">
                            <img src="/images/clipart/SECURITY.png" alt="Security" loading="lazy" className="h-9 w-9 object-contain" />
                          </div>
                        </div>
                        <div className="rounded-full p-[2px] bg-gradient-to-br from-amber-300/30 via-amber-200/20 to-amber-400/30">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-charcoal bg-[radial-gradient(120%_120%_at_50%_0%,rgba(16,21,33,0.98),rgba(6,8,14,0.98))] [box-shadow:inset_0_0_36px_rgba(212,175,55,0.15)]">
                            <img src="/images/clipart/BRIDGE.png" alt="Bridge" loading="lazy" className="h-9 w-9 object-contain" />
                          </div>
                        </div>
                        <div className="rounded-full p-[2px] bg-gradient-to-br from-amber-300/30 via-amber-200/20 to-amber-400/30">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-charcoal bg-[radial-gradient(120%_120%_at_50%_0%,rgba(16,21,33,0.98),rgba(6,8,14,0.98))] [box-shadow:inset_0_0_36px_rgba(212,175,55,0.15)]">
                            <img src="/images/clipart/LOGO_HALO_VARIANT.png" alt="Brand" loading="lazy" className="h-9 w-9 object-contain" />
                          </div>
                        </div>
                      </div>

                      <div className="h-px w-full bg-gradient-to-r from-amber-300/30 via-amber-200/15 to-amber-400/30" />

                      <div>
                        <h4 className="mb-2 text-sm font-semibold tracking-wide text-text/90">Contract Addresses</h4>
                        <ul className="divide-y divide-charcoal/80 rounded-md border border-charcoal">
                          {linksByCategory.contracts.map((link) => {
                            const raw = link.tags?.[0] ?? link.href.split("/").pop() ?? link.href;
                            const addrShort = raw.length > 18 ? `${raw.slice(0, 10)}…${raw.slice(-8)}` : raw;
                            return (
                              <li key={link.id} className="flex items-center justify-between gap-3 px-4 py-3 bg-midnight/60">
                                <div className="min-w-0">
                                  <p className="text-xs font-medium text-text/90">{link.label}</p>
                                  <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-0.5 block truncate font-mono text-[11px] text-neutral-300 hover:text-amber-200/90"
                                    title={raw}
                                  >
                                    {addrShort}
                                  </a>
                                </div>
                                <a
                                  href={link.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[11px] font-semibold uppercase tracking-wide text-amber-200/90 hover:text-amber-100"
                                >
                                  View
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="rounded-md border border-charcoal bg-midnight/60 p-4">
                          <p className="text-xs font-semibold text-text/90">Liquidity</p>
                          <a
                            href={tidaldex?.href ?? "#"}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-emerald-300 hover:bg-emerald-500/15"
                          >
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                            Locked on TidalDex
                          </a>
                        </div>
                        <div className="rounded-md border border-charcoal bg-midnight/60 p-4">
                          <p className="text-xs font-semibold text-text/90">Audit</p>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {linksByCategory.audit.map((a) => (
                              <a
                                key={a.id}
                                href={a.href}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-amber-200 hover:bg-amber-300/15"
                              >
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
                                {a.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section id="community" className="container mx-auto max-w-5xl px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={item}>
              <Community />
            </motion.div>
          </motion.div>
        </section>

        <section id="gamefi-ai" className="container mx-auto max-w-5xl px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={item}>
              <GameFiAI />
            </motion.div>
          </motion.div>
        </section>

        <section id="institutional" className="container mx-auto max-w-5xl px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={item}>
              <Institutional />
            </motion.div>
            <motion.div variants={item} className="mt-8">
              <footer className="rounded-md border border-charcoal bg-midnight/60 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <a
                    href="mailto:contact@ceramicliberty.com"
                    className="text-sm font-semibold text-amber-200 hover:text-amber-100"
                  >
                    contact@ceramicliberty.com
                  </a>
                  <div className="flex flex-wrap items-center gap-2">
                    {telegram && (
                      <a
                        href={telegram.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-md border border-charcoal bg-black/40 px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-amber-100 hover:bg-black/50"
                      >
                        Telegram
                      </a>
                    )}
                    {twitter && (
                      <a
                        href={twitter.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-md border border-charcoal bg-black/40 px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-amber-100 hover:bg-black/50"
                      >
                        X
                      </a>
                    )}
                    {bscContract && (
                      <a
                        href={bscContract.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-md border border-charcoal bg-black/40 px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-amber-100 hover:bg-black/50"
                      >
                        BSC Contract
                      </a>
                    )}
                    {luncscan && (
                      <a
                        href={luncscan.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-md border border-charcoal bg-black/40 px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-amber-100 hover:bg-black/50"
                      >
                        TerraClassic Contract
                      </a>
                    )}
                    {tidaldex && (
                      <a
                        href={tidaldex.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/15"
                      >
                        Buy CL8Y
                      </a>
                    )}
                  </div>
                </div>
                <div className="mt-3 h-px w-full bg-gradient-to-r from-amber-300/30 via-amber-200/15 to-amber-400/30" />
                <p className="mt-3 text-[11px] leading-relaxed text-neutral-300">
                  CL8Y is a memecoin and a purely speculative digital asset.
                  It is not registered with or approved by any financial regulator and
                  offers no legal, regulatory, or government protections. Participation
                  involves significant risk, including the possible loss of all value.
                  Always conduct your own research and never invest more than you can afford
                  to lose. Information on this website is for entertainment purposes only
                  and does not constitute financial advice. It may contain inaccuracies
                  or example data not representative of the current state of the token.
                  The CL8Y team and community does not guarantee the accuracy or completeness of the
                  information on this website. Nothing on this website should be taken to imply
                  the CL8Y team or community will perform any work for you or any CL8Y holders,
                  traders, or investors. CL8Y is an expensive memecoin, similar to buying a fun expensive
                  Pokemon card.
                </p>
              </footer>
            </motion.div>
          </motion.div>
        </section>
      </Suspense>
    </div>
  );
}
