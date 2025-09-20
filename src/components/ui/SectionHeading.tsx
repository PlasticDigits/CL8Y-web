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
        <h2 className="inline-block font-display text-3xl">
          {title}
          <span className="mt-2 block h-[3px] w-16 rounded-full bg-[linear-gradient(90deg,rgba(212,175,55,0.9),rgba(34,211,238,0.7))]" />
        </h2>
      ) : (
        <h3 className="inline-block font-display text-2xl">
          {title}
          <span className="mt-2 block h-[3px] w-12 rounded-full bg-[linear-gradient(90deg,rgba(212,175,55,0.9),rgba(34,211,238,0.7))]" />
        </h3>
      )}
      {subtitle ? <p className="mt-2 text-neutral-300">{subtitle}</p> : null}
    </div>
  );
}
