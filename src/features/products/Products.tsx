import { Card, CardContent, CardHeader } from "../../components/ui/Card";
import SectionHeading from "../../components/ui/SectionHeading";
import { Button } from "../../components/ui/Button";
import { ExternalLink } from "../../components/ui/ExternalLink";
import { PRODUCT_URLS } from "../../data/products";
import { siteCopy } from "../../data/copy";

export default function Products() {
  return (
    <section className="py-6">
      <SectionHeading title={siteCopy.products.title} subtitle={siteCopy.products.subtitle} />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card premium className="h-full">
          <CardHeader>
            <h3 className="text-xl font-semibold tracking-tight text-text">{siteCopy.products.bridgeTitle}</h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-text/85">{siteCopy.products.bridgeBody}</p>
            <div className="mt-6">
              <Button asChild>
                <ExternalLink href={PRODUCT_URLS.bridge}>{siteCopy.products.openBridge}</ExternalLink>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card premium className="h-full">
          <CardHeader>
            <h3 className="text-xl font-semibold tracking-tight text-text">{siteCopy.products.dexTitle}</h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-text/85">{siteCopy.products.dexBody}</p>
            <div className="mt-6">
              <Button asChild>
                <ExternalLink href={PRODUCT_URLS.dex}>{siteCopy.products.openDex}</ExternalLink>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
