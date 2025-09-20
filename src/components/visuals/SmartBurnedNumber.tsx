import React, { useEffect, useMemo, useRef, useState } from "react";
import { animate, useReducedMotion, useMotionValue } from "framer-motion";

type SmartBurnedNumberProps = {
  targetValue: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  locale?: string;
  decimals?: number;
  fastPhaseRatio?: number; // e.g. 0.99
  fastPhaseDurationMs?: number; // e.g. 800ms
  slowPhaseDurationMs?: number; // e.g. 8 hours
  title?: string;
};

// Staged animation:
// 1) Fast phase to fastPhaseRatio * target
// 2) Continuous slow phase via requestAnimationFrame until reaching target
export default function SmartBurnedNumber({
  targetValue,
  className = "",
  prefix = "",
  suffix = "",
  locale,
  decimals = 5,
  fastPhaseRatio = 0.99,
  fastPhaseDurationMs = 800,
  slowPhaseDurationMs = 8 * 60 * 60 * 1000,
  title,
}: SmartBurnedNumberProps) {
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<number>(0);
  const displayRef = useRef(0);
  const motionValue = useMotionValue(0);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  const rafRef = useRef<number | null>(null);
  const slowStartRef = useRef<number | null>(null);
  const slowFromRef = useRef<number>(0);

  const format = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
      }),
    [locale, decimals]
  );

  // During fast phase, sync display to motion value
  useEffect(() => {
    const unsub = motionValue.on("change", (v) => {
      displayRef.current = v;
      setDisplayValue(v);
    });
    return unsub;
  }, [motionValue]);

  useEffect(() => {
    // Cleanup before starting new cycle
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (!Number.isFinite(targetValue)) return;

    if (prefersReducedMotion) {
      displayRef.current = targetValue;
      setDisplayValue(targetValue);
      return;
    }

    const current = displayRef.current;
    const fastTarget = targetValue * fastPhaseRatio;

    if (current < fastTarget) {
      motionValue.set(current);
      animationRef.current = animate(motionValue, fastTarget, {
        duration: Math.max(0.2, fastPhaseDurationMs / 1000),
        ease: "easeOut",
      });
      animationRef.current.then(() => startSlowPhase(fastTarget, targetValue));
    } else {
      startSlowPhase(current, targetValue);
    }

    function startSlowPhase(fromValue: number, toValue: number) {
      const delta = Math.max(0, toValue - fromValue);
      displayRef.current = fromValue;
      setDisplayValue(fromValue);
      if (delta <= 0) {
        setDisplayValue(toValue);
        return;
      }
      slowFromRef.current = fromValue;
      slowStartRef.current = performance.now();

      const step = () => {
        if (slowStartRef.current === null) return;
        const now = performance.now();
        const elapsed = now - slowStartRef.current;
        const progress = Math.min(1, elapsed / slowPhaseDurationMs);
        const next = fromValue + delta * progress;
        displayRef.current = next;
        setDisplayValue(next);
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          rafRef.current = null;
          setDisplayValue(toValue);
        }
      };
      rafRef.current = requestAnimationFrame(step);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [targetValue, prefersReducedMotion, fastPhaseRatio, fastPhaseDurationMs, slowPhaseDurationMs, motionValue]);

  return (
    <span
      className={[
        "relative inline-flex items-center justify-center rounded-[16px] px-3 py-1",
        "before:content-[''] before:absolute before:inset-[-10px] before:rounded-[20px] before:bg-[radial-gradient(circle,rgba(34,211,238,0.18),transparent_60%)] before:blur-xl before:animate-pulse",
        "font-mono tabular-nums",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={title ?? `${prefix}${format.format(displayValue)}${suffix}`}
      title={title}
    >
      {prefix}
      {format.format(displayValue)}
      {suffix}
    </span>
  );
}


