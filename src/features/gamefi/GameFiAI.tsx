import SectionHeading from "../../components/ui/SectionHeading";
import { Card, CardContent } from "../../components/ui/Card";
import { Sparkles, Cpu, Orbit } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

function SparkleOverlay({ count = 16 }: { count?: number }) {
  const prefersReducedMotion = useReducedMotion();

  // Bias twinkles: cyan cluster in the upper-right sky, warm embers near the fire (lower-right)
  const cyanCount = Math.ceil(count * 0.6);
  const emberCount = count - cyanCount;

  const prng = (seed: number, min: number, max: number) => min + (((seed * 37) % 100) / 100) * (max - min);

  const descriptors = [
    // Cyan stars — upper-right
    ...Array.from({ length: cyanCount }).map((_, i) => {
      const left = prng(i + 1, 62, 95);
      const top = prng(i + 11, 6, 38);
      const size = i % 5 === 0 ? 5 : prng(i + 3, 2, 4);
      return { kind: "cyan" as const, left: `${left}%`, top: `${top}%`, size, index: i };
    }),
    // Warm embers — lower-right near the bowl fire
    ...Array.from({ length: emberCount }).map((_, j) => {
      const idx = cyanCount + j;
      const left = prng(idx + 5, 68, 92);
      const top = prng(idx + 17, 68, 88);
      const size = prng(idx + 7, 2, 3.2);
      return { kind: "ember" as const, left: `${left}%`, top: `${top}%`, size, index: idx };
    }),
  ];

  if (prefersReducedMotion) {
    return (
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {descriptors.slice(0, 8).map((s) => (
          <span
            key={s.index}
            className="absolute rounded-full"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              mixBlendMode: "screen",
              background:
                s.kind === "ember" ? "rgba(255,140,66,0.75)" : "rgba(34,211,238,0.8)",
              boxShadow:
                s.kind === "ember"
                  ? "0 0 14px rgba(255,140,66,0.45)"
                  : "0 0 16px rgba(34,211,238,0.45)",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {descriptors.map((s, i) => (
        <motion.span
          key={s.index}
          className="absolute rounded-full"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            mixBlendMode: "screen",
            background:
              s.kind === "ember" ? "rgba(255,140,66,0.9)" : "rgba(34,211,238,0.9)",
            boxShadow:
              s.kind === "ember"
                ? "0 0 18px rgba(255,140,66,0.55)"
                : "0 0 18px rgba(34,211,238,0.5)",
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.6, s.kind === "ember" ? 0.95 : 1.05, 0.6],
            y: s.kind === "ember" ? [0, -3, 0] : [0, -6, 0],
          }}
          transition={{ duration: 2 + i * 0.1, delay: i * 0.16, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function GameFiAI() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section className="p-6">
      <SectionHeading title="GameFi + AI" subtitle="Karnyx — Solar Tigers onchain" />
      <div className="relative mt-2 h-[2px] overflow-hidden rounded-full bg-[linear-gradient(to_right,transparent,rgba(212,175,55,0.25),transparent)]">
        {!prefersReducedMotion && (
          <motion.span
            className="absolute -top-1 h-4 w-20 -skew-x-12 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent blur-sm"
            initial={{ left: "-10%" }}
            animate={{ left: "110%" }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
          />
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-200">
          <Sparkles className="h-3.5 w-3.5" aria-hidden /> Neon Lore
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cyan-200">
          <Cpu className="h-3.5 w-3.5" aria-hidden /> AI Narratives
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-pink-200">
          <Orbit className="h-3.5 w-3.5" aria-hidden /> Onchain World
        </span>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card premium className="h-full group relative overflow-hidden">
          <CardContent className="p-0">
            <div className="relative overflow-hidden rounded-md">
              <img
                src="/images/TIGERHUNT_V2.jpg"
                alt="TigerHuntV2 key art — Solar Tiger in neon jungle of Karnyx"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_300px_at_20%_90%,rgba(212,175,55,0.22),transparent),radial-gradient(500px_260px_at_85%_15%,rgba(34,211,238,0.18),transparent)] mix-blend-screen" aria-hidden />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-amber-300/10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]" aria-hidden />
              <SparkleOverlay />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card premium>
            <CardContent>
              <h3 className="text-base md:text-lg font-semibold tracking-tight text-text">Karnyx: The Living Ledger</h3>
              <p className="mt-2 text-sm leading-relaxed text-text/85">
                The world of <span className="font-semibold text-text">Karnyx</span> is vast, dangerous, and decentralized. Players become
                <span className="font-semibold text-text"> Solar Tigers</span>—cybernetic hunters forging empires across hostile biomes and
                sentient villages guarding ancient assets. Explore, hunt, negotiate, or conquer to expand influence; every action is
                <span className="font-semibold text-text"> permanently recorded onchain</span>. From jungle ambushes to war councils, real-time choices
                shape persistent politics and evolving lore.
              </p>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-cyan-400/20 via-amber-300/25 to-pink-500/20 shadow-[0_0_24px_rgba(212,175,55,0.25)_inset]" />
              <ul className="mt-4 grid gap-2 text-sm text-text/85">
                <li className="flex items-start gap-2">
                  <span className="mt-[6px] inline-block h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(212,175,55,0.7)]" aria-hidden />
                  Neon jungles, relic shrines, and aqua-lit outposts — a mythic futurism frontier.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[6px] inline-block h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.7)]" aria-hidden />
                  Actions are immutable entries on the ledger; strategy ripples through clans and markets.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card premium>
            <CardContent className="flex items-center gap-4">
              <div className="rounded-md border border-charcoal bg-midnight/60 p-3 [box-shadow:inset_0_0_56px_rgba(212,175,55,0.08)]">
                <img
                  src="/images/clipart/TIGERHUNT.png"
                  alt="TigerHunt clipart"
                  loading="lazy"
                  className="h-16 w-16 object-contain drop-shadow-[0_0_14px_rgba(34,211,238,0.45)]"
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold tracking-wide text-text/90">Temples, Power, Prestige</h4>
                <p className="mt-1 text-sm leading-relaxed text-text/85">
                  In <span className="font-semibold">TigerHuntV2</span>, Tigers commission monumental temples forged from rare materials. Funders,
                  gatherers, and ritualists each play a role. The economy honors two paths — <span className="font-semibold">Power</span> and
                  <span className="font-semibold"> Prestige</span> — tracked distinctly to keep play fair while assets grow.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card premium className="h-full">
          <CardContent>
            <h4 className="text-sm font-semibold tracking-wide text-text/90">Triangular Economy</h4>
            <p className="mt-2 text-sm leading-relaxed text-text/85">
              Wealth, effort, and devotion form a dynamic triangle — each leg advancing different axes of Power and Prestige.
              Tigers choose their vector and the world responds in markets, allegiances, and territory control.
            </p>
          </CardContent>
        </Card>
        <Card premium className="h-full">
          <CardContent>
            <h4 className="text-sm font-semibold tracking-wide text-text/90">Onchain Hunt Logs</h4>
            <p className="mt-2 text-sm leading-relaxed text-text/85">
              Each Tiger keeps a daily hunt log stored onchain using <span className="font-semibold">byte packing</span> for ultra-efficient
              storage. Battles, discoveries, deals — compressed into binary and permanently linked to identity.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-text/85">
              Language models read these logs to generate personalized stories and evolving clan chronicles.
            </p>
          </CardContent>
        </Card>
        <Card premium className="h-full">
          <CardContent>
            <h4 className="text-sm font-semibold tracking-wide text-text/90">Relics of the Terraformers</h4>
            <p className="mt-2 text-sm leading-relaxed text-text/85">
              Ancient artifacts pulse beneath violet swamps and jungle roots. Some warp gravity. Others whisper in lost tongues.
              A few are alive. Power tempts — but awakening them draws rivals and older forces.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card premium className="h-full">
          <CardContent>
            <h4 className="text-sm font-semibold tracking-wide text-text/90">Lore Fragments</h4>
            <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-text/85">
              <li>
                The <span className="font-semibold">Glass Spine</span> valley rings at dusk; Tigers claim its resonance for far-sight councils.
              </li>
              <li>
                <span className="font-semibold">Lion’s Gate</span> monoliths bleed amber light when offered bone-keys carved from leviathan ribs.
              </li>
              <li>
                <span className="font-semibold">Astra Looms</span> stitch fate-threads between clans; cut one, and storms remember your name.
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card premium className="h-full">
          <CardContent>
            <h4 className="text-sm font-semibold tracking-wide text-text/90">Neon Accents</h4>
            <p className="mt-2 text-sm leading-relaxed text-text/85">
              Designed per our style guide: black foundations, gold headline glow, selective aqua focus, and subtle inner halos.
              Motion stays tasteful; typographic hierarchy leads. Karnyx breathes like a luxury sci-fantasy atlas.
            </p>
            <div className="mt-4 h-px w-full bg-gradient-to-r from-amber-300/30 via-cyan-300/25 to-pink-500/30" />
            <div className="mt-4 rounded-md border border-charcoal bg-midnight/60 p-3 [box-shadow:inset_0_0_36px_rgba(34,211,238,0.12)]">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-text/70">
                Visual polish: gradient frames, soft glows, and screen-blended halos.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}


