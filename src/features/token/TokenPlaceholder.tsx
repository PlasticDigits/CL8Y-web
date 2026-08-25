import SectionHeading from "../../components/ui/SectionHeading";
import { Card, CardContent } from "../../components/ui/Card";
import { siteCopy } from "../../data/copy";

/** Placeholder for GitLab #2 (token directory). Do not invent addresses or venues here. */
export default function TokenPlaceholder() {
  return (
    <section className="py-6">
      <SectionHeading title={siteCopy.token.title} />
      <Card className="mt-8">
        <CardContent className="pt-6">
          <p className="max-w-[68ch] text-sm leading-relaxed text-text/85">{siteCopy.token.body}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gold/90">
            {siteCopy.token.status}
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
