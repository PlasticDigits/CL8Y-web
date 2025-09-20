import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { create as createBlockie } from "blockies-ts";
import confetti from "canvas-confetti";

type TickerItemData = {
  id: string;
  address: string;
  addressShort: string;
  amount: number;
  side: "buy" | "sell";
  isBig: boolean;
  blockieUrl: string;
  // Movement
  startRightPx: number;
  spawnAtMs: number;
};

const SPEED_PX_PER_SEC = 90; // ensure 3s cadence keeps ~> 250px separation

function generateRandomHexAddress(): string {
  // 20-byte hex address
  let hex = "";
  for (let i = 0; i < 40; i += 1) {
    hex += Math.floor(Math.random() * 16).toString(16);
  }
  return `0x${hex}`;
}

function shortenAddress(addr: string): string {
  // 0xFF...FF format
  const start = addr.slice(0, 4); // 0x + 2 chars
  const end = addr.slice(-2);
  return `${start}...${end}`;
}

function weightedRandomAmount(side: "buy" | "sell"): number {
  if (side === "sell") {
    // Sells are always in the smallest category
    return randomInRange(0.01, 1.0);
  }
  const r = Math.random();
  if (r < 0.8) {
    // 80% between 0.01 and 1.0
    return randomInRange(0.01, 1.0);
  }
  if (r < 0.95) {
    // next 15% between 1.0 and 10.0
    return randomInRange(1.0, 10.0);
  }
  if (r < 0.99) {
    // next 4% between 10.0 and 50.0
    return randomInRange(10.0, 50.0);
  }
  // remainder 1% between 50.0 and 2000.0
  return randomInRange(50.0, 2000.0);
}

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function createBlockieDataUrl(seed: string, size = 8, scale = 3): string {
  const canvas = createBlockie({ seed, size, scale });
  return canvas.toDataURL();
}

function nowMs(): number {
  return typeof performance !== "undefined" ? performance.now() : Date.now();
}

type TickerProps = {
  className?: string;
};

export default function BuyTicker({ className }: TickerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const measureContainer = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setContainerWidth(rect.width);
  }, []);

  useEffect(() => {
    measureContainer();
    const onResize = () => measureContainer();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measureContainer]);

  const [items, setItems] = useState<TickerItemData[]>([]);

  // We start each item near the right edge; smooth motion prevents overlap perception

  const spawnItem = useCallback(() => {
    const address = generateRandomHexAddress();
    const side: "buy" | "sell" = Math.random() < 0.2 ? "sell" : "buy";
    const amount = weightedRandomAmount(side);
    const isBig = side === "buy" && amount > 100;
    const blockieUrl = createBlockieDataUrl(address);
    const addressShort = shortenAddress(address);

    const startRightPx = 12; // enter from the right edge

    const next: TickerItemData = {
      id: `${address}_${Math.random().toString(36).slice(2)}`,
      address,
      addressShort,
      amount,
      side,
      isBig,
      blockieUrl,
      startRightPx,
      spawnAtMs: nowMs(),
    };
    setItems((prev) => {
      const updated = [...prev, next];
      return updated;
    });
  }, []);

  // Spawning cadence: immediate first spawn, then 2.8s–4.2s jitter
  useEffect(() => {
    let timer = 0 as unknown as number;
    let cancelled = false;
    // initial spawn a moment after mount
    const first = window.setTimeout(() => {
      if (!cancelled) spawnItem();
    }, 250) as unknown as number;
    const schedule = () => {
      const MIN_DELAY_MS = 2800;
      const MAX_DELAY_MS = 4200;
      const delay = MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS);
      timer = window.setTimeout(() => {
        if (!cancelled) {
          spawnItem();
          schedule();
        }
      }, delay) as unknown as number;
    };
    schedule();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.clearTimeout(first);
    };
  }, [spawnItem]);

  const handleDone = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  return (
    <div
      ref={containerRef}
      className={
        "pointer-events-none absolute left-0 right-0 top-2 z-40 h-10 overflow-visible" +
        (className ? ` ${className}` : "")
      }
      aria-hidden
    >
      {items.map((item) => (
        <TickerRow
          key={item.id}
          data={item}
          containerWidth={containerWidth}
          onComplete={handleDone}
        />
      ))}
    </div>
  );
}

function TickerRow({
  data,
  containerWidth,
  onComplete,
}: {
  data: TickerItemData;
  containerWidth: number;
  onComplete: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useBigBuyConfetti(data.isBig, ref);
  const [measuredWidth, setMeasuredWidth] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMeasuredWidth(rect.width);
  }, []);

  const endRight = useMemo(() => {
    const w = measuredWidth ?? 180;
    // Move fully off the left side (right value grows as we animate)
    return containerWidth + w + 48;
  }, [containerWidth, measuredWidth]);

  // We'll keep the chip anchored 12px from the right and translate left by this distance
  const travelX = endRight;
  const duration = Math.max(1, travelX / SPEED_PX_PER_SEC);

  const amountText = useMemo(() => data.amount.toFixed(4), [data.amount]);

  return (
    <motion.div
      ref={ref}
      className="pointer-events-auto absolute top-0"
      style={{ right: 12, willChange: "transform" }}
      initial={{ x: 0, y: 10, scale: 1.5, opacity: 0.0 }}
      animate={{ x: -travelX, y: 0, scale: 1, opacity: 1 }}
      transition={{ x: { duration, ease: "linear" }, y: { duration: 0.6 }, scale: { duration: 0.6 } }}
      onAnimationComplete={() => onComplete(data.id)}
    >
      <div
        className={
          "flex items-center gap-2 rounded-full border border-charcoal/60 bg-[rgba(26,31,43,0.72)] px-3 py-1 whitespace-nowrap " +
          "backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
        }
      >
        <img
          src={data.blockieUrl}
          alt="address blockie"
          width={20}
          height={20}
          className="h-5 w-5 rounded"
          draggable={false}
        />
        <span className="text-xs text-neutral-300 font-mono">{data.addressShort}</span>
        {data.side === "buy" ? (
          <span className="text-[11px] font-semibold uppercase tracking-wide text-emerald-400">BUY</span>
        ) : (
          <span className="text-[11px] font-semibold uppercase tracking-wide text-rose-400">SELL</span>
        )}
        <span className="text-xs text-neutral-100 font-mono tabular-nums">
          {amountText} <span className="text-neutral-300">CL8Y</span>
        </span>
        {data.isBig ? (
          <span aria-label="big buy" className="ml-1 select-none">
            🎉🚀
          </span>
        ) : null}
      </div>
    </motion.div>
  );
}

// Confetti after mount for big buys, anchored to the row's viewport position
function useBigBuyConfetti(isBig: boolean, anchorRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!isBig) return;
    const t = window.setTimeout(() => {
      const el = anchorRef.current as HTMLElement | null;
      const vw = window.innerWidth || 1;
      const vh = window.innerHeight || 1;
      let originX = 0.95;
      let originY = 0.1;
      if (el) {
        const r = el.getBoundingClientRect();
        originX = Math.min(0.98, Math.max(0.02, r.right / vw));
        originY = Math.min(0.3, Math.max(0.02, (r.top + r.height * 0.5) / vh));
      }
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { x: originX, y: originY },
        scalar: 0.8,
        ticks: 180,
        startVelocity: 25,
      });
    }, 300);
    return () => window.clearTimeout(t);
  }, [isBig, anchorRef]);
}


