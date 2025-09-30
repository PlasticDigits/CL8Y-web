type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  size?: "h2" | "h3";
};

export default function SectionHeading({
  title,
  subtitle,
  eyebrow,
  size = "h2",
}: SectionHeadingProps) {
  return (
    <div>
      {eyebrow ? (
        <span className="text-ember/90 text-xs font-medium uppercase tracking-wider">
          {eyebrow}
        </span>
      ) : null}
      {size === "h2" ? (
        <h2 className="inline-block font-display text-4xl font-bold bg-gradient-to-r from-[#FFD700] via-gold to-[#A9812F] bg-clip-text text-transparent">
          {title}
          <span className="mt-2 block h-1 w-20 rounded-full bg-gradient-to-r from-gold via-gold/60 to-transparent shadow-[0_0_12px_rgba(212,175,55,0.4)]" />
        </h2>
      ) : (
        <h3 className="inline-block font-display text-2xl font-bold bg-gradient-to-r from-[#FFD700] via-gold to-[#A9812F] bg-clip-text text-transparent">
          {title}
          <span className="mt-2 block h-1 w-16 rounded-full bg-gradient-to-r from-gold via-gold/60 to-transparent shadow-[0_0_12px_rgba(212,175,55,0.4)]" />
        </h3>
      )}
      {subtitle ? <p className="mt-3 text-base text-neutral-300">{subtitle}</p> : null}
    </div>
  );
}
