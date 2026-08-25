import SectionHeading from "../../components/ui/SectionHeading";
import { Button } from "../../components/ui/Button";
import { ExternalLink } from "../../components/ui/ExternalLink";
import { PRODUCT_URLS } from "../../data/products";
import { siteCopy } from "../../data/copy";

export default function Utility() {
  return (
    <section className="py-6">
      <SectionHeading title={siteCopy.utility.title} />
      <p className="mt-4 max-w-[68ch] text-sm leading-relaxed text-text/85 md:text-base">
        {siteCopy.utility.body}
      </p>
      <div className="mt-6">
        <Button asChild variant="secondary">
          <ExternalLink href={PRODUCT_URLS.dex}>{siteCopy.utility.cta}</ExternalLink>
        </Button>
      </div>
    </section>
  );
}
