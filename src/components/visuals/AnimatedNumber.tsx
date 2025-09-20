import React, { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView, useIsomorphicLayoutEffect, useMotionValue, useReducedMotion } from "framer-motion";

type AnimatedNumberProps = {
  value: number;
  durationMs?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  locale?: string;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
  title?: string;
};

export default function AnimatedNumber({
  value,
  durationMs = 1200,
  className = "",
  prefix = "",
  suffix = "",
  locale,
  maximumFractionDigits = 0,
  minimumFractionDigits,
  title,
}: AnimatedNumberProps) {
  const prefersReducedMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const displayValue = useMotionValue(0);
  const [renderValue, setRenderValue] = useState(0);
  const inViewRef = useRef<HTMLSpanElement | null>(null);
  useInView(inViewRef, { margin: "-80px", once: true });

  const numberFormat = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        maximumFractionDigits,
        minimumFractionDigits: minimumFractionDigits ?? Math.min(2, maximumFractionDigits),
      }),
    [locale, maximumFractionDigits, minimumFractionDigits]
  );

  useIsomorphicLayoutEffect(() => {
    // Sync display value to motion, preserving decimals by clamping to the requested precision
    const unsub = motionValue.on("change", (v) => {
      const fractionDigits = maximumFractionDigits ?? 0;
      const factor = Math.pow(10, fractionDigits);
      const clamped = Math.round(v * factor) / factor;
      displayValue.set(clamped);
      setRenderValue(clamped);
    });
    return unsub;
  }, [motionValue, displayValue, maximumFractionDigits]);

  useEffect(() => {
    if (prefersReducedMotion) {
      motionValue.set(value);
      setRenderValue(value);
      return;
    }
    const controls = animate(motionValue, value, { duration: durationMs / 1000 });
    return controls.stop;
  }, [value, durationMs, motionValue, prefersReducedMotion]);

  return (
    <span
      ref={inViewRef}
      className={["font-mono tabular-nums", className].filter(Boolean).join(" ")}
      aria-label={title ?? `${prefix}${numberFormat.format(renderValue)}${suffix}`}
      title={title}
    >
      {prefix}
      {numberFormat.format(renderValue)}
      {suffix}
    </span>
  );
}


