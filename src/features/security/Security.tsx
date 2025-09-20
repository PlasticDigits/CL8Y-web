import SectionHeading from "../../components/ui/SectionHeading";
import GuardianBridgeScene from "../../components/visuals/GuardianBridgeScene";
import { Card, CardContent, CardHeader } from "../../components/ui/Card";

export default function Security() {
  return (
    <section className="p-6">
      <SectionHeading title="Security" subtitle="Guardian Protocol + Bridge" />
      <div className="mt-4">
        <GuardianBridgeScene height={460} autoRotateSpeed={0.6} showLegend />
      </div>
      <div className="mt-6">
        <Card premium>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex items-center rounded-full border border-charcoal bg-midnight/60 px-2.5 py-0.5 text-[11px] tracking-wide uppercase text-text/70">Guardian Protocol</span>
                <h3 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight bg-gradient-to-r from-amber-300 to-cyan-300 bg-clip-text text-transparent">
                  Bridge Security
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
                  <span className="inline-flex items-center rounded-full border border-charcoal bg-midnight/60 px-2.5 py-1 text-[11px] text-text/70">keccak256 hashing</span>
                  <span className="inline-flex items-center rounded-full border border-charcoal bg-midnight/60 px-2.5 py-1 text-[11px] text-text/70">operator-only approvals</span>
                  <span className="inline-flex items-center rounded-full border border-charcoal bg-midnight/60 px-2.5 py-1 text-[11px] text-text/70">nonce replay protection</span>
                  <span className="inline-flex items-center rounded-full border border-charcoal bg-midnight/60 px-2.5 py-1 text-[11px] text-text/70">time‑delayed finality</span>
                  <span className="inline-flex items-center rounded-full border border-charcoal bg-midnight/60 px-2.5 py-1 text-[11px] text-text/70">Guardian cancel & vote</span>
                </div>
                <p>
                  CL8Y’s bridge defends withdrawals with a
                  {" "}
                  <span className="text-aqua font-medium">cross‑chain integrity check</span>
                  : deposits on the source chain produce a
                  {" "}
                  <span className="text-aqua font-medium">keccak256‑derived hash</span>
                  {" "}
                  over the transfer parameters, making forged on‑chain hashes infeasible. Withdraw approvals can be submitted only by an
                  {" "}
                  <span className="text-aqua font-medium">approved bridge operator</span>
                  {" "}
                  (initially a controlled wallet, later CL8Y nodes), which deterministically recomputes the same hash; any mismatch is rejected and a
                  {" "}
                  <span className="text-aqua font-medium">per‑transfer nonce</span>
                  {" "}
                  prevents replays. Finalization is
                  {" "}
                  <span className="text-aqua font-medium">time‑delayed</span>
                  {" "}
                  (e.g., a few minutes per chain) so network
                  {" "}
                  <span className="text-aqua font-medium">Guardians</span>
                  {" "}
                  can detect and cancel bad approvals, including from malicious actors or chain reorgs, with cancellations governed by on‑chain voting on opBNB.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
