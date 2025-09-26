import SectionHeading from "../../components/ui/SectionHeading";
import { Card, CardContent, CardHeader } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { linksByCategory } from "../../data/links";

export default function Institutional() {
  const whitepaperPrimary = "/cl8y_whitepaper";
  const whitepaperLegacy = "/pdfs/CL8Y-Whitepaper.pdf";
  const localAuditPdf = "/pdfs/audit.pdf";
  const apiListingUrl = (import.meta as any).env?.VITE_CL8Y_API_LISTING_URL ?? "https://api-listing.cl8y.com";

  const partnerLinks = [
    ...linksByCategory.trading,
    ...linksByCategory.listings,
  ].filter((l) => l.icon.kind === "logo");

  return (
    <section className="py-6">
      <SectionHeading title="Institutional" subtitle="Whitepaper, audits, APIs, contact" />

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Whitepaper */}
        <Card premium>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full p-[2px] bg-gradient-to-br from-amber-300/30 via-amber-200/20 to-amber-400/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-charcoal bg-[radial-gradient(120%_140%_at_50%_0%,rgba(16,21,33,0.96),rgba(2,4,8,0.98))] [box-shadow:inset_0_0_36px_rgba(212,175,55,0.15)]">
                  <img src="/images/clipart/LOGO_HALO_VARIANT.png" alt="CL8Y Whitepaper" loading="lazy" className="h-8 w-8 object-contain" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-text">Whitepaper</h3>
                <p className="text-xs text-neutral-300">Strategic overview and token mechanics</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <a href={whitepaperPrimary} target="_blank" rel="noreferrer">
                <Button>Read V2</Button>
              </a>
              <a href={whitepaperLegacy} target="_blank" rel="noreferrer">
                <Button variant="secondary">Legacy V1 (PDF)</Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Audits */}
        <Card premium>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full p-[2px] bg-gradient-to-br from-amber-300/30 via-amber-200/20 to-amber-400/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-charcoal bg-[radial-gradient(120%_140%_at_50%_0%,rgba(16,21,33,0.96),rgba(2,4,8,0.98))] [box-shadow:inset_0_0_36px_rgba(212,175,55,0.15)]">
                  <img src="/images/clipart/SECURITY.png" alt="Security Audit" loading="lazy" className="h-8 w-8 object-contain" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-text">Audits</h3>
                <p className="text-xs text-neutral-300">Independent verification resources</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-2">
              {linksByCategory.audit.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3 rounded-md border border-charcoal bg-midnight/60 px-3 py-2">
                  <p className="text-sm text-text/90">{a.label}</p>
                  <a href={a.href} target="_blank" rel="noreferrer" className="text-xs font-semibold uppercase tracking-wide text-amber-200/90 hover:text-amber-100">
                    View
                  </a>
                </li>
              ))}
              <li className="flex items-center justify-between gap-3 rounded-md border border-charcoal bg-midnight/60 px-3 py-2">
                <p className="text-sm text-text/90">Audit (Local PDF)</p>
                <a href={localAuditPdf} target="_blank" rel="noreferrer" className="text-xs font-semibold uppercase tracking-wide text-amber-200/90 hover:text-amber-100">
                  View
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* APIs */}
        <Card premium>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full p-[2px] bg-gradient-to-br from-amber-300/30 via-amber-200/20 to-amber-400/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-charcoal bg-[radial-gradient(120%_140%_at_50%_0%,rgba(16,21,33,0.96),rgba(2,4,8,0.98))] [box-shadow:inset_0_0_36px_rgba(212,175,55,0.15)]">
                  <img src="/images/clipart/BRIDGE.png" alt="APIs" loading="lazy" className="h-8 w-8 object-contain" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-text">APIs</h3>
                <p className="text-xs text-neutral-300">Programmatic access & listings</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <a
                className="flex items-center justify-between gap-3 rounded-md border border-charcoal bg-midnight/60 px-3 py-2 hover:border-aqua/60"
                href={apiListingUrl}
                target="_blank"
                rel="noreferrer"
              >
                <span className="text-sm text-text/90">api-listing.cl8y.com</span>
                <span className="text-xs font-semibold uppercase tracking-wide text-amber-200/90">Open</span>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Partners */}
        <Card premium className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full p-[2px] bg-gradient-to-br from-amber-300/30 via-amber-200/20 to-amber-400/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-charcoal bg-[radial-gradient(120%_140%_at_50%_0%,rgba(16,21,33,0.96),rgba(2,4,8,0.98))] [box-shadow:inset_0_0_36px_rgba(212,175,55,0.15)]">
                  <img src="/images/clipart/CL8Y_BRIDGE.png" alt="Partners" loading="lazy" className="h-8 w-8 object-contain" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-text">Partners</h3>
                <p className="text-xs text-neutral-300">Listings, data providers, and other services</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {partnerLinks.map((p) => (
                <a
                  key={p.id}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(135deg,rgba(123,156,255,0.16),rgba(10,14,24,0.88))] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-md transition-all duration-200 hover:-translate-y-[2px] hover:scale-[1.02] hover:border-aqua/40 hover:shadow-[0_10px_30px_-18px_rgba(82,186,181,0.6)]"
                >
                  <div className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 group-hover:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.12)] transition-opacity duration-200" aria-hidden="true" />
                  <div className="relative flex h-20 w-full items-center justify-center">
                    {p.icon.kind === "logo" ? (
                      <img
                        src={p.icon.src}
                        alt={p.icon.alt}
                        loading="lazy"
                        className="h-16 w-auto object-contain opacity-90 transition-all duration-200 group-hover:translate-y-[-6px] group-hover:opacity-60"
                      />
                    ) : (
                      <span className="text-xs text-text/80">{p.label}</span>
                    )}
                  </div>
                  <div className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-col items-center rounded-lg border border-white/20 bg-[linear-gradient(160deg,rgba(10,16,28,0.95),rgba(23,38,69,0.9))] px-3 py-1.5 text-center opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-hover:[box-shadow:0_12px_32px_-18px_rgba(82,186,181,0.75)] group-hover:[transform:translateY(0)]">
                    <span className="text-[0.7rem] font-semibold tracking-wide text-white">{p.label}</span>
                  </div>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card premium>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full p-[2px] bg-gradient-to-br from-amber-300/30 via-amber-200/20 to-amber-400/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-charcoal bg-[radial-gradient(120%_140%_at_50%_0%,rgba(16,21,33,0.96),rgba(2,4,8,0.98))] [box-shadow:inset_0_0_36px_rgba(212,175,55,0.15)]">
                  <img src="/images/clipart/COMMUNITY.png" alt="Contact" loading="lazy" className="h-8 w-8 object-contain" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-text">Contact</h3>
                <p className="text-xs text-neutral-300">For institutional inquiries</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:contact@ceramicliberty.com">
                <Button variant="secondary">Email</Button>
              </a>
              {linksByCategory.social.map((s) => (
                <a key={s.id} href={s.href} target="_blank" rel="noreferrer">
                  <Button variant="secondary">{s.label}</Button>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
