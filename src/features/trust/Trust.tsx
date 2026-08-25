import SectionHeading from "../../components/ui/SectionHeading";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { ExternalLink } from "../../components/ui/ExternalLink";
import { HISTORICAL_DOCS } from "../../data/products";
import { siteCopy } from "../../data/copy";
import { linksByCategory } from "../../data/links";

export default function Trust() {
  const audit = linksByCategory.audit.find((l) => l.id === "spywolf-audit");

  return (
    <section className="py-6">
      <SectionHeading title={siteCopy.trust.title} subtitle={siteCopy.trust.subtitle} />
      <Card premium className="mt-8">
        <CardContent className="pt-6">
          <p className="max-w-[68ch] text-sm leading-relaxed text-text/85">{siteCopy.trust.body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {audit ? (
              <Button asChild variant="secondary">
                <ExternalLink href={audit.href}>{siteCopy.trust.auditCta}</ExternalLink>
              </Button>
            ) : (
              <Button asChild variant="secondary">
                <a href={HISTORICAL_DOCS.auditLocal}>{siteCopy.trust.auditCta}</a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
