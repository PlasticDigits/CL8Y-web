import { useEffect, useRef } from "react";
import { xTimelineEmbed } from "../../data/embeds";

type XTimelineProps = {
  height?: number;
  theme?: "dark" | "light";
  borderClassName?: string;
};

export default function XTimeline({ height = 520, theme = "dark", borderClassName = "rounded-md border border-charcoal bg-midnight/60" }: XTimelineProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function renderTimeline() {
      // @ts-expect-error twttr is injected by widgets.js
      const twttr = window.twttr;
      if (!twttr?.widgets || !timelineRef.current) return;
      // Clear previous renders (if any)
      timelineRef.current.innerHTML = "";
      // Use imperative API to avoid relying on auto-parsing anchors
      twttr.widgets.createTimeline(
        {
          sourceType: "profile",
          screenName: "CeramicToken",
        },
        timelineRef.current,
        {
          theme,
          chrome: "noheader nofooter noborders transparent",
          tweetLimit: 5,
          height,
        },
      );
    }

    // Load X (Twitter) widgets.js once
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://platform.twitter.com/widgets.js"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = xTimelineEmbed.widgetScriptSrc;
      script.async = true;
      script.charset = "utf-8";
      script.addEventListener("load", () => {
        // @ts-expect-error twttr is injected by widgets.js
        if (window.twttr?.ready) {
          // @ts-expect-error twttr types not available
          window.twttr.ready(renderTimeline);
        } else {
          renderTimeline();
        }
      });
      document.body.appendChild(script);
    } else {
      // @ts-expect-error twttr is injected by widgets.js
      if (window.twttr?.ready) {
        // @ts-expect-error twttr types not available
        window.twttr.ready(renderTimeline);
      } else {
        renderTimeline();
      }
    }
  }, [height, theme]);

  return (
    <div ref={containerRef} className={borderClassName} style={{ overflow: "hidden" }}>
      <div className="p-4">
        <div ref={timelineRef} aria-label={xTimelineEmbed.anchorText} />
      </div>
    </div>
  );
}


