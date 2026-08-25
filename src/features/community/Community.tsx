import SectionHeading from "../../components/ui/SectionHeading";
import { Button } from "../../components/ui/Button";
import { ExternalLink } from "../../components/ui/ExternalLink";
import { linksByCategory } from "../../data/links";
import { siteCopy } from "../../data/copy";
import { MessageCircle, Twitter } from "lucide-react";

export default function Community() {
  const telegram = linksByCategory.social.find((l) => l.id === "telegram");
  const twitter = linksByCategory.social.find((l) => l.id === "twitter");

  return (
    <section className="py-6">
      <SectionHeading title={siteCopy.community.title} subtitle={siteCopy.community.subtitle} />
      <div className="mt-6 flex flex-col items-stretch gap-4 sm:flex-row">
        {twitter ? (
          <Button asChild variant="secondary" className="gap-3">
            <ExternalLink href={twitter.href} aria-label={siteCopy.community.twitter}>
              <Twitter className="h-4 w-4" aria-hidden />
              <span className="text-left leading-tight">
                <span className="block text-sm font-semibold">{siteCopy.community.twitter}</span>
                <span className="block text-[11px] text-text/70">{siteCopy.community.twitterHint}</span>
              </span>
            </ExternalLink>
          </Button>
        ) : null}
        {telegram ? (
          <Button asChild variant="secondary" className="gap-3">
            <ExternalLink href={telegram.href} aria-label={siteCopy.community.telegram}>
              <MessageCircle className="h-4 w-4" aria-hidden />
              <span className="text-left leading-tight">
                <span className="block text-sm font-semibold">{siteCopy.community.telegram}</span>
                <span className="block text-[11px] text-text/70">{siteCopy.community.telegramHint}</span>
              </span>
            </ExternalLink>
          </Button>
        ) : null}
      </div>
    </section>
  );
}
