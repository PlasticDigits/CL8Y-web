import SectionHeading from "../../components/ui/SectionHeading";
import GuardianBridgeScene from "../../components/visuals/GuardianBridgeScene";
import { Card, CardContent, CardHeader } from "../../components/ui/Card";

export default function Security() {
  return (
    <section className="py-6">
      <SectionHeading title="CL8Y Bridge" subtitle="Cross-chain infrastructure with Canceler Network security" />
      <div className="mt-4">
        <GuardianBridgeScene height={460} autoRotateSpeed={0.6} showLegend />
      </div>
      <div className="mt-6">
        <Card premium>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex items-center rounded-full border border-charcoal bg-midnight/60 px-2.5 py-0.5 text-[11px] tracking-wide uppercase text-text/70">Canceler Network</span>
                <h3 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight bg-gradient-to-r from-amber-300 to-cyan-300 bg-clip-text text-transparent">
                  Accountable Speed Design
                </h3>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="group w-full md:w-1/2">
                <div className="rounded-md p-[2px] bg-gradient-to-br from-cyan-400/20 via-amber-300/20 to-pink-500/20">
                  <div className="rounded-md border border-charcoal bg-midnight/60 p-3 transition-transform group-hover:scale-[1.01] [box-shadow:inset_0_0_56px_rgba(212,175,55,0.06)]">
                    <img
                      src="/images/BRIDGE_SECURITY.png"
                      alt="CL8Y Bridge Security"
                      loading="lazy"
                      className="mx-auto h-64 w-auto object-contain"
                    />
                    <p className="mt-2 text-center text-xs text-text/60">Security Diagram: CL8Y Bridge</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 text-sm leading-relaxed text-text/80">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full border border-charcoal bg-midnight/60 px-2.5 py-1 text-[11px] text-text/70">single operator speed</span>
                  <span className="inline-flex items-center rounded-full border border-charcoal bg-midnight/60 px-2.5 py-1 text-[11px] text-text/70">opBNB cancelers</span>
                  <span className="inline-flex items-center rounded-full border border-charcoal bg-midnight/60 px-2.5 py-1 text-[11px] text-text/70">5-min delay window</span>
                  <span className="inline-flex items-center rounded-full border border-charcoal bg-midnight/60 px-2.5 py-1 text-[11px] text-text/70">Raspberry Pi nodes</span>
                  <span className="inline-flex items-center rounded-full border border-charcoal bg-midnight/60 px-2.5 py-1 text-[11px] text-text/70">permissionless monitoring</span>
                </div>
                <p>
                  CL8Y Bridge uses an unconventional hybrid design: a
                  {" "}
                  <span className="text-aqua font-medium">single centralized operator</span>
                  {" "}
                  for fast transaction approval, secured by a
                  {" "}
                  <span className="text-aqua font-medium">decentralized network of cancelers</span>
                  {" "}
                  on opBNB. Approvals enter a mandatory
                  {" "}
                  <span className="text-aqua font-medium">5-minute delay window</span>
                  {" "}
                  during which independent canceler nodes verify each approval against the source chain. Valid transfers execute after the delay; fraudulent ones are cancelled. Running on
                  {" "}
                  <span className="text-aqua font-medium">opBNB</span>
                  {" "}
                  means gas costs are fractions of a cent, and a
                  {" "}
                  <span className="text-aqua font-medium">Raspberry Pi</span>
                  {" "}
                  is sufficient to run a canceler node — only one honest canceler needs to catch a bad approval.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
