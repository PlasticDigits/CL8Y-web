import { PropsWithChildren } from "react";

type AIImagePlaceholderProps = PropsWithChildren<{
  prompt: string;
  aspect?: "square" | "landscape" | "portrait";
}>;

/**
 * Black box with white prompt text for AI image generation placeholders.
 */
export function AIImagePlaceholder({ prompt, aspect = "landscape" }: AIImagePlaceholderProps) {
  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "portrait"
        ? "aspect-[3/4]"
        : "aspect-[16/9]";
  return (
    <div
      className={`w-full ${aspectClass} grid place-items-center rounded-md border border-charcoal bg-black transition-transform duration-200 hover:scale-[1.01] hover:shadow-glowGold`}
      aria-label="AI image placeholder"
      role="img"
    >
      <div className="select-text px-4 text-center">
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-100">{prompt}</p>
      </div>
    </div>
  );
}

export default AIImagePlaceholder;
