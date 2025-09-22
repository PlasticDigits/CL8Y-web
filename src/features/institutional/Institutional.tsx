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
    <section className="p-6">
      <SectionHeading title="Institutional" subtitle="Whitepaper, audits, APIs, contact" />

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Whitepaper */}
        <Card premium>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full p-[2px] bg-gradient-to-br from-amber-300/30 via-amber-200/20 to-amber-400/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-charcoal bg-midnight/60 [box-shadow:inset_0_0_36px_rgba(212,175,55,0.15)]">
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
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-charcoal bg-midnight/60 [box-shadow:inset_0_0_36px_rgba(212,175,55,0.15)]">
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
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-charcoal bg-midnight/60 [box-shadow:inset_0_0_36px_rgba(212,175,55,0.15)]">
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
        <Card premium>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full p-[2px] bg-gradient-to-br from-amber-300/30 via-amber-200/20 to-amber-400/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-charcoal bg-midnight/60 [box-shadow:inset_0_0_36px_rgba(212,175,55,0.15)]">
                  <img src="/images/clipart/CL8Y_BRIDGE.png" alt="Partners" loading="lazy" className="h-8 w-8 object-contain" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-text">Partners</h3>
                <p className="text-xs text-neutral-300">Trading, listings, and data providers</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {partnerLinks.map((p) => (
                <a
                  key={p.id}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-center rounded-md border border-charcoal bg-midnight/60 p-3 hover:scale-[1.01] hover:border-aqua/60 transition-transform"
                >
                  {p.icon.kind === "logo" ? (
                    <img src={p.icon.src} alt={p.icon.alt} loading="lazy" className="h-8 w-auto object-contain opacity-90 group-hover:opacity-100" />
                  ) : (
                    <span className="text-xs text-text/80">{p.label}</span>
                  )}
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
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-charcoal bg-midnight/60 [box-shadow:inset_0_0_36px_rgba(212,175,55,0.15)]">
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
