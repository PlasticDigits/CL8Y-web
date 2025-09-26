import SectionHeading from "../../components/ui/SectionHeading";
import { Button } from "../../components/ui/Button";
import { linksByCategory } from "../../data/links";
import { MessageCircle, Twitter } from "lucide-react";

export default function Community() {
  const telegram = linksByCategory.social.find((l) => l.id === "telegram");
  const twitter = linksByCategory.social.find((l) => l.id === "twitter");
  return (
    <section className="py-6">
      <SectionHeading title="Community" subtitle="Telegram and X" />
      <p className="mt-4 text-sm md:text-base font-semibold tracking-wide text-transparent bg-clip-text bg-[linear-gradient(90deg,rgba(212,175,55,0.95),rgba(34,211,238,0.9))] drop-shadow-[0_0_8px_rgba(212,175,55,0.15)]">
        Stay in the loop.
      </p>
      <div className="mt-6 flex flex-col items-stretch gap-4 sm:flex-row">
        <div className="rounded-[26px] p-[2px] bg-[linear-gradient(135deg,rgba(212,175,55,0.45),rgba(34,211,238,0.45))] [mask-composite:exclude]">
          <Button
            asChild
            variant="secondary"
            className="group relative gap-3 rounded-[24px] border-transparent bg-midnight/60 px-6 py-3 hover:scale-[1.02] active:scale-[0.99] hover:shadow-glowGold focus-visible:ring-2 focus-visible:ring-amber-300/60"
          >
            <a href={twitter?.href} target="_blank" rel="noreferrer" aria-label="Follow on X">
              <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full border border-charcoal bg-midnight/60 text-neutral-200 transition-colors group-hover:text-amber-200">
                <Twitter className="h-4.5 w-4.5" aria-hidden />
              </span>
              <span className="text-left leading-tight">
                <span className="block text-sm font-semibold">Follow on X</span>
                <span className="block text-[11px] text-text/70">News + updates</span>
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.16),transparent)] transition-transform duration-700 group-hover:translate-x-full"
              />
            </a>
          </Button>
        </div>

        <div className="rounded-[26px] p-[2px] bg-[linear-gradient(135deg,rgba(212,175,55,0.45),rgba(34,211,238,0.45))]">
          <Button
            asChild
            variant="secondary"
            className="group relative gap-3 rounded-[24px] border-transparent bg-midnight/60 px-6 py-3 hover:scale-[1.02] active:scale-[0.99] hover:shadow-glowGold focus-visible:ring-2 focus-visible:ring-amber-300/60"
          >
            <a href={telegram?.href} target="_blank" rel="noreferrer" aria-label="Chat on Telegram">
              <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full border border-charcoal bg-midnight/60 text-neutral-200 transition-colors group-hover:text-amber-200">
                <MessageCircle className="h-4.5 w-4.5" aria-hidden />
              </span>
              <span className="text-left leading-tight">
                <span className="block text-sm font-semibold">Join Telegram</span>
                <span className="block text-[11px] text-text/70">Chat with the community</span>
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.16),transparent)] transition-transform duration-700 group-hover:translate-x-full"
              />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
