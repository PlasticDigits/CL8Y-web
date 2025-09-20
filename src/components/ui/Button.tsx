import React, { ComponentPropsWithoutRef, forwardRef, useRef, useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { useReducedMotion } from "framer-motion";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  isLoading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild,
      className = "",
      variant = "primary",
      onClick,
      isLoading = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const base =
      "relative inline-flex items-center justify-center h-12 px-6 rounded-[24px] font-semibold transition-transform duration-200 active:scale-[0.99] focus-visible:outline-none shadow-depth will-change-transform overflow-hidden";
    const variants = {
      primary:
        "text-black bg-[linear-gradient(135deg,#FFD700_0%,#D4AF37_45%,#A9812F_100%)] hover:scale-[1.02] hover:shadow-glowGold focus-visible:shadow-focusAqua",
      secondary:
        "text-neutral-100 bg-midnight border border-charcoal hover:border-aqua focus-visible:shadow-focusAqua",
      tertiary: "text-aqua hover:underline bg-transparent",
    } as const;
    const rippleIdRef = useRef(0);
    const [ripples, setRipples] = useState<
      Array<{ id: number; x: number; y: number; size: number }>
    >([]);
    const prefersReducedMotion = useReducedMotion();
    function handleClick(e: React.MouseEvent<HTMLElement>) {
      if (isLoading) {
        e.preventDefault();
        return;
      }
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.8;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      if (!prefersReducedMotion) {
        const id = rippleIdRef.current++;
        setRipples((prev) => [...prev, { id, x, y, size }]);
        window.setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
      }
      onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
    const content = props.children;
    return (
      <Comp
        ref={ref}
        className={`${base} ${variants[variant]} ${isLoading ? "cursor-not-allowed opacity-80" : ""} ${className}`}
        onClick={handleClick}
        aria-busy={isLoading || undefined}
        disabled={isLoading || disabled}
        {...props}
      >
        {/* When asChild is true, Slot requires exactly one child. Avoid injecting extra elements. */}
        {asChild ? (
          content
        ) : (
          <>
            {!prefersReducedMotion &&
              ripples.map((r) => (
                <span
                  key={r.id}
                  className="bg-aqua/30 dark:bg-aqua/30 pointer-events-none absolute animate-[ripple_600ms_ease-out] rounded-full"
                  style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
                />
              ))}
            {isLoading ? (
              <span
                className="border-aqua/70 mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-r-transparent"
                aria-hidden
              />
            ) : null}
            {content}
          </>
        )}
      </Comp>
    );
  },
);

Button.displayName = "Button";
