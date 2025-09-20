import { useEffect, useId, useRef, useState } from "react";
import { Card } from "../ui/Card";
import { env } from "../../lib/env";

type GeckoTerminalChartProps = {
  poolId?: string;
  height?: number;
  title?: string;
};

export default function GeckoTerminalChart({ poolId, height = 400, title = "GeckoTerminal Embed" }: GeckoTerminalChartProps) {
  // Hardcode GeckoTerminal pool per request; ignore env and prop overrides for ID
  const hardcodedPoolId = "0x8F452a1fdd388A45e1080992eFF051b4dd9048d2";
  const id = hardcodedPoolId;
  const isConfigured = true;
  // Match STYLE_GUIDE.md `midnight.blue` (#1A1F2B) for embed background
  const src = `https://www.geckoterminal.com/bsc/pools/${id}?embed=1&info=0&swaps=0&light_chart=0&chart_type=market_cap&resolution=1d&bg_color=1A1F2B`;
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const captionId = useId();
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const onLoad = () => setLoaded(true);
    iframe.addEventListener("load", onLoad);
    return () => iframe.removeEventListener("load", onLoad);
  }, [src]);
  return (
    <Card>
      <figure className="relative" style={{ width: "100%", height }}>
        {!loaded ? (
          <div className="absolute inset-0 rounded-md overflow-hidden">
            <div className="w-full h-full bg-midnight animate-pulse" />
          </div>
        ) : null}
        {
          <iframe
          ref={iframeRef}
          id="geckoterminal-embed"
          title={title}
          src={src}
          frameBorder={0}
          allow="clipboard-write"
          allowFullScreen
          loading="lazy"
          aria-describedby={captionId}
          style={{ width: "100%", height: "100%" }}
        />
        }
        {
          <figcaption id={captionId} className="sr-only">
            {title}. Market cap chart embedded from GeckoTerminal for pool {id}.
          </figcaption>
        }
      </figure>
    </Card>
  );
}


