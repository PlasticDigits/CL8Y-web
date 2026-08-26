import { useId, useState } from "react";
import SectionHeading from "../../components/ui/SectionHeading";
import { Card, CardContent } from "../../components/ui/Card";
import { ExternalLink } from "../../components/ui/ExternalLink";
import { siteCopy } from "../../data/copy";
import { TOKEN_ADDRESSES, TOKEN_LISTINGS, TRADE_VENUES, type TokenAddress } from "../../data/tokenDirectory";
import { copyText } from "../../lib/copyText";

function AddressRow({ row }: { row: TokenAddress }) {
  const addressId = useId();
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function handleCopy() {
    const result = await copyText(row.address);
    setStatus(result.ok ? "copied" : "failed");
  }

  return (
    <li className="rounded-md border border-charcoal/80 bg-black/30 px-4 py-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-semibold text-text">
          {row.chain}{" "}
          <span className="font-normal text-text/70">({row.standard})</span>
        </p>
        <ExternalLink
          href={row.explorerUrl}
          className="text-sm font-semibold text-gold hover:text-gold/80"
        >
          {siteCopy.token.explorer} ({row.explorerLabel})
        </ExternalLink>
      </div>
      <code
        id={addressId}
        className="mt-3 block break-all font-mono text-xs leading-relaxed text-neutral-100 sm:text-sm"
      >
        {row.address}
      </code>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleCopy}
          aria-describedby={addressId}
          className="rounded-md border border-charcoal bg-midnight px-3 py-2 text-sm font-semibold text-neutral-100 hover:border-aqua hover:shadow-focusAqua focus-visible:outline-none focus-visible:shadow-focusAqua"
        >
          {status === "copied" ? siteCopy.token.copied : siteCopy.token.copy}
        </button>
        <span className="sr-only" aria-live="polite">
          {status === "copied"
            ? `${siteCopy.token.copied} ${row.chain}`
            : status === "failed"
              ? siteCopy.token.copyFailed
              : ""}
        </span>
        {status === "failed" ? (
          <span className="text-xs text-ember" role="status">
            {siteCopy.token.copyFailed}
          </span>
        ) : null}
      </div>
    </li>
  );
}

export default function TokenDirectory() {
  return (
    <section className="py-6">
      <SectionHeading title={siteCopy.token.title} subtitle={siteCopy.token.body} />
      <p className="mt-3 max-w-[68ch] text-sm text-ember/90">{siteCopy.token.warning}</p>

      <div className="mt-8 grid gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold tracking-tight text-text">{siteCopy.token.addressesTitle}</h3>
            <ul className="mt-4 grid gap-4">
              {TOKEN_ADDRESSES.map((row) => (
                <AddressRow key={row.id} row={row} />
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold tracking-tight text-text">{siteCopy.token.tradeTitle}</h3>
            <p className="mt-2 text-sm text-text/75">{siteCopy.token.tradeHint}</p>
            <ul className="mt-4 grid gap-2">
              {TRADE_VENUES.map((venue) => (
                <li
                  key={venue.id}
                  className="flex flex-wrap items-center justify-between gap-2 border-b border-charcoal/60 py-3 last:border-b-0"
                >
                  <span className="text-sm text-neutral-200">
                    <span className="font-semibold text-text">{venue.label}</span>
                    <span className="text-text/70"> · {venue.chain}</span>
                  </span>
                  <ExternalLink
                    href={venue.href}
                    className="text-sm font-semibold text-gold hover:text-gold/80"
                  >
                    {venue.primary ? siteCopy.token.openDex : siteCopy.token.openVenue}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold tracking-tight text-text">{siteCopy.token.listingsTitle}</h3>
            <p className="mt-2 text-sm text-text/75">{siteCopy.token.listingsHint}</p>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {TOKEN_LISTINGS.map((listing) => (
                <li key={listing.id}>
                  <ExternalLink
                    href={listing.href}
                    className="text-sm font-semibold text-neutral-200 hover:text-gold"
                  >
                    {listing.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
