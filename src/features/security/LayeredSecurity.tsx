import SectionHeading from "../../components/ui/SectionHeading";
import { Card, CardContent, CardHeader } from "../../components/ui/Card";

export default function LayeredSecurity() {
  return (
    <section className="py-6">
      <SectionHeading title="Progressive Decentralization" subtitle="Multi-layer security with DAO governance roadmap" />

      <div className="mt-6">
        <Card premium>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex items-center rounded-full border border-charcoal bg-midnight/60 px-2.5 py-0.5 text-[11px] tracking-wide uppercase text-text/70">24/7 Monitoring</span>
                <h3 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight bg-gradient-to-r from-amber-300 to-cyan-300 bg-clip-text text-transparent">
                  Multi-Layer Protection System
                </h3>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <p className="text-sm leading-relaxed text-text/85">
                CL8Y's Guardian Protocol now features a comprehensive{" "}
                <span className="text-aqua font-medium">layered security system</span> with{" "}
                <span className="text-aqua font-medium">24/7 monitoring</span>, using{" "}
                <span className="text-aqua font-medium">periodic snapshots to blacklist bad actors</span> such as OFAC-sanctioned wallets, malicious bots, and illicit activities. This system provides{" "}
                <span className="text-aqua font-medium">law enforcement assistance</span> with asset recovery capabilities.
              </p>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Guardian Monitoring */}
                <div className="rounded-md border border-charcoal bg-midnight/60 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full p-[2px] bg-gradient-to-br from-cyan-400/30 via-amber-300/20 to-cyan-400/30">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-charcoal bg-[radial-gradient(120%_140%_at_50%_0%,rgba(16,21,33,0.96),rgba(2,4,8,0.98))] [box-shadow:inset_0_0_36px_rgba(34,211,238,0.15)]">
                        <img src="/images/clipart/GUARDIAN_PROTOCOL.png" alt="Guardian Monitoring" loading="lazy" className="h-7 w-7 object-contain" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-text">24/7 Monitoring</h4>
                      <p className="mt-1 text-xs text-text/70">Continuous surveillance of network activity</p>
                    </div>
                  </div>
                </div>

                {/* Blacklist System */}
                <div className="rounded-md border border-charcoal bg-midnight/60 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full p-[2px] bg-gradient-to-br from-magenta/30 via-amber-300/20 to-magenta/30">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-charcoal bg-[radial-gradient(120%_140%_at_50%_0%,rgba(16,21,33,0.96),rgba(2,4,8,0.98))] [box-shadow:inset_0_0_36px_rgba(225,29,116,0.15)]">
                        <img src="/images/clipart/SECURITY.png" alt="Blacklist Protection" loading="lazy" className="h-7 w-7 object-contain" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-text">Snapshot Blacklisting</h4>
                      <p className="mt-1 text-xs text-text/70">Backwards-looking using periodic snapshots</p>
                    </div>
                  </div>
                </div>

                {/* Law Enforcement */}
                <div className="rounded-md border border-charcoal bg-midnight/60 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full p-[2px] bg-gradient-to-br from-amber-300/30 via-amber-200/20 to-amber-400/30">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-charcoal bg-[radial-gradient(120%_140%_at_50%_0%,rgba(16,21,33,0.96),rgba(2,4,8,0.98))] [box-shadow:inset_0_0_36px_rgba(212,175,55,0.15)]">
                        <img src="/images/clipart/BRIDGE.png" alt="Asset Recovery" loading="lazy" className="h-7 w-7 object-contain" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-text">Asset Recovery</h4>
                      <p className="mt-1 text-xs text-text/70">Law enforcement cooperation enabled</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-cyan-400/20 via-amber-300/20 to-pink-500/20" />

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 text-sm font-semibold tracking-wide text-text/90">Current Protection</h4>
                  <p className="text-sm leading-relaxed text-text/75">
                    Our snapshot-based system identifies known bad actors through{" "}
                    <span className="text-aqua font-medium">periodic monitoring</span>, helping protect the community from accidentally interacting with sanctioned individuals and preventing{" "}
                    <span className="text-aqua font-medium">costly investigations</span>. Note: this backwards-looking approach does not currently stop new hackers using clean wallets.
                  </p>
                </div>

                <div>
                  <h4 className="mb-3 text-sm font-semibold tracking-wide text-text/90">Future: Risk Engine</h4>
                  <p className="text-sm leading-relaxed text-text/75">
                    The upcoming{" "}
                    <span className="text-aqua font-medium">Risk Engine update</span> will enable{" "}
                    <span className="text-aqua font-medium">categorizing and restricting newly created wallets</span>, providing proactive protection against emerging threats. This technology demonstrates the future of blockchain in making the world more safe and peaceful.
                  </p>
                </div>
              </div>

              <div className="rounded-md border border-charcoal bg-midnight/60 p-4">
                <div className="mb-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full border border-charcoal bg-black/40 px-2.5 py-1 text-[11px] text-text/70">OFAC compliance</span>
                  <span className="inline-flex items-center rounded-full border border-charcoal bg-black/40 px-2.5 py-1 text-[11px] text-text/70">periodic snapshots</span>
                  <span className="inline-flex items-center rounded-full border border-charcoal bg-black/40 px-2.5 py-1 text-[11px] text-text/70">known actor detection</span>
                  <span className="inline-flex items-center rounded-full border border-charcoal bg-black/40 px-2.5 py-1 text-[11px] text-text/70">Guardian oversight</span>
                  <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] text-emerald-300">Risk Engine (coming soon)</span>
                </div>
                <p className="text-xs leading-relaxed text-text/60">
                  The current system provides backwards-looking protection through periodic snapshots, with the upcoming Risk Engine enabling proactive detection of newly created suspicious wallets. This infrastructure powers the CL8Y Bridge and enables cooperation with legitimate law enforcement efforts.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
