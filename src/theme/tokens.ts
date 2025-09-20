export const theme = {
  colors: {
    gold: "#D4AF37",
    black: "#0C0C0C",
    midnight: "#1A1F2B",
    charcoal: "#2E323C",
    aqua: "#22D3EE",
    magenta: "#E11D74",
    ember: "#FFB347",
    text: "#EDEDED",
  },
  radius: { sm: 8, md: 12, lg: 24, pill: 999 },
  motion: {
    duration: { fast: 120, base: 220, slow: 360, epic: 600 },
    easing: { standard: "cubic-bezier(0.2, 0.8, 0.2, 1)", linear: "linear" },
  },
} as const;

export type AppTheme = typeof theme;
