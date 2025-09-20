### CL8Y Style Guide — “Memetic Elegance”

This guide defines the visual language and interaction rules for CL8Y across product, web, and brand surfaces. It balances meme-native energy with institutional credibility.

Tagline: The Expensive Memecoin.

## 1) Brand Pillars

- **Scarcity-as-a-Feature**: 3M hard cap, automated burns, visible deflation.
- **Luxury + Viral**: Sovereign gold elegance with kinetic, memetic spark.
- **Credible-by-Design**: Clean typography, clear data, transparent mechanics.

## 2) Color System

Use dark surfaces for contrast and glow accents for focus. Keep UIs legible first; add neon sparingly as highlights.

- **Primary**
  - `gold.sovereign`: `#D4AF37`
  - `obsidian.black`: `#0C0C0C`

- **Secondary**
  - `midnight.blue`: `#1A1F2B`
  - `charcoal.slate`: `#2E323C`

- **Accents**
  - `cyber.aqua`: `#22D3EE`
  - `magma.magenta`: `#E11D74`
  - `neon.ember`: `#FFB347`

- **Neutrals**
  - `neutral.0`: `#FFFFFF`
  - `neutral.50`: `#F6F7F9`
  - `neutral.100`: `#EDEDED`
  - `neutral.300`: `#BCBCC2`
  - `neutral.600`: `#6D6F76`
  - `neutral.900`: `#0E0F12`

- **Status Mapping**
  - Success: `cyber.aqua`
  - Warning: `neon.ember`
  - Danger: `magma.magenta`

- **Gradient Recipes**
  - Gold Lux: `linear-gradient(135deg, #FFD700 0%, #D4AF37 45%, #A9812F 100%)`
  - Aqua Pulse (focus): `linear-gradient(135deg, #22D3EE 0%, #67E8F9 100%)`
  - Ember Glow (highlight): `linear-gradient(135deg, #FFB347 0%, #FF8C42 100%)`

Usage notes:

- Prefer dark `obsidian.black` backgrounds with `midnight.blue` panels.
- Use `gold.sovereign` for brand moments and primary CTAs (paired with high contrast text).
- Apply `cyber.aqua` as a focus ring, data-positive, or interactive glow.
- Reserve `magma.magenta` for alerts, down-trends, or hype accents.

## 3) Typography

Balance kinetic headlines with institutional body text. Use a mono for numbers and live counters.

- **Display / Headlines**
  - Primary: Space Grotesk — `700`/`800`
  - Alternate: Clash Display — `700`

- **Body / UI**
  - Primary: Inter — `400`/`500`/`600`
  - Alternate: IBM Plex Sans

- **Numeric / Code**
  - Primary: Roboto Mono — `400`/`700`
  - Alternate: Space Mono

- **Font Stacks**
  - Display: `"Space Grotesk", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"`
  - Body: `Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"`
  - Mono: `"Roboto Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`

- **Type Scale (rem)**
  - `h1`: 3.5
  - `h2`: 2.75
  - `h3`: 2.0
  - `h4`: 1.5
  - `body.lg`: 1.125
  - `body.md`: 1.0
  - `body.sm`: 0.875
  - `caption`: 0.75

Usage notes:

- Headline tracking: slightly tight on display (-1% to -2%).
- Body tracking: normal to +1% for legibility.
- Numeric counters use mono for alignment.
- Headlines and big numerals: set `font-display` for headings and hero callouts.
- General body copy: default to `font-body`.
- Data, prices, supply, code, or tabular numbers: use `font-mono` + `tabular-nums`.

## 4) Layout, Spacing, Radius, Elevation

- **Spacing scale (px)**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80
- **Radii (px)**: 8 (cards), 12 (modals), 24 (hero buttons), 999 (pills)
- **Borders**: 1px `charcoal.slate` on dark, 2px `gold.sovereign` for premium frames
- **Shadows / Glows**
  - Depth: `0 8px 30px rgba(0,0,0,0.4)`
  - Gold Glow: `0 0 0 2px #D4AF37 inset, 0 8px 30px rgba(212,175,55,0.22)`
  - Aqua Focus: `0 0 0 3px rgba(34,211,238,0.45)`

## 5) Motion (Framer Motion guidelines)

- **Durations (ms)**: `fast` 120, `base` 220, `slow` 360, `epic` 600+
- **Easing**: `cubic-bezier(0.2, 0.8, 0.2, 1)` for UI; `linear` for counters
- **Patterns**:
  - Burn counter: tick at 30–60fps, subtle glow pulse every +N steps
  - Scarcity loop: continuous orbit path, 220–360ms transitions per state
  - Button hover: scale 1.02, glow intensify, `base` duration
  - Section reveal: 12–24px y-translate + fade, staggered children 60–90ms
- **Respect** `prefers-reduced-motion`: disable non-essential movement, keep state changes legible via color/opacity.

## 6) Accessibility & Contrast

- Maintain WCAG AA contrast:
  - Body text on dark ≥ 4.5:1 (use `neutral.100`–`neutral.0` on `obsidian.black`).
  - Gold on dark: add dark text shadow for crisp edges.
- Focus visible: 3px `cyber.aqua` ring on interactive elements.
- Keyboard order: left-to-right, top-to-bottom.
- Color semantics: aqua=positive/info, magenta=negative/risk, ember=warning.

## 7) Component Patterns

### Buttons

- Primary: Gold gradient background, dark text; hover increases glow and slight scale.
- Secondary: `midnight.blue` fill, aqua focus ring; hover: border aqua + text aqua.
- Tertiary: Text-only with aqua underline on hover.

Example anatomy:

- Height 48–56px, radius 24px, 16–20px horizontal padding, semi-bold text.

### Cards / Panels

- Background: `midnight.blue` with subtle noise/grain.
- Border: 1px `charcoal.slate`; optional inner gold hairline for premium sections.
- Shadow: depth + optional glow on hover.

### Stats & Counters

- Use mono font; align decimals.
- Up-trend: aqua; down-trend: magenta.
- Apply periodic glow pulse in accent color.

### Charts

- Up series: aqua/gold; down series: magenta/ember.
- Gridlines: `charcoal.slate` at 20–30% opacity.
- Tooltips: dark panel, mono numbers, high contrast.

### Tagline Lockup

- "The Expensive Memecoin." set in Space Grotesk Bold, gold on black, with subtle aqua or ember highlight.

## 8) Imagery Direction

- Mood: mythic futurism — crowns, flowing energy, bridges, tigers.
- Blend: luxury brand polish + memetic irreverence.
- Effects: subtle gold shimmer; controlled neon halos; avoid heavy noise.

## 9) Token Map (JSON, machine-readable)

Use this as a base for theming systems or design tooling.

```json
{
  "colors": {
    "brand": { "gold": "#D4AF37", "black": "#0C0C0C" },
    "secondary": { "midnight": "#1A1F2B", "charcoal": "#2E323C" },
    "accent": { "aqua": "#22D3EE", "magenta": "#E11D74", "ember": "#FFB347" },
    "neutral": {
      "0": "#FFFFFF",
      "50": "#F6F7F9",
      "100": "#EDEDED",
      "300": "#BCBCC2",
      "600": "#6D6F76",
      "900": "#0E0F12"
    }
  },
  "typography": {
    "display": { "family": "Space Grotesk", "weights": [700, 800] },
    "body": { "family": "Inter", "weights": [400, 500, 600] },
    "mono": { "family": "Roboto Mono", "weights": [400, 700] },
    "scale": {
      "h1": 3.5,
      "h2": 2.75,
      "h3": 2.0,
      "h4": 1.5,
      "bodyLg": 1.125,
      "bodyMd": 1.0,
      "bodySm": 0.875,
      "caption": 0.75
    }
  },
  "space": [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80],
  "radius": { "sm": 8, "md": 12, "lg": 24, "pill": 999 },
  "shadow": {
    "depth": "0 8px 30px rgba(0,0,0,0.4)",
    "glowGold": "0 0 0 2px #D4AF37 inset, 0 8px 30px rgba(212,175,55,0.22)",
    "focusAqua": "0 0 0 3px rgba(34,211,238,0.45)"
  },
  "motion": {
    "duration": { "fast": 120, "base": 220, "slow": 360, "epic": 600 },
    "easing": {
      "standard": "cubic-bezier(0.2, 0.8, 0.2, 1)",
      "linear": "linear"
    }
  }
}
```

## 10) CSS Variables (reference)

Expose tokens as CSS variables for frameworks like Tailwind or component libraries.

```css
:root {
  --color-gold: #d4af37;
  --color-black: #0c0c0c;
  --color-midnight: #1a1f2b;
  --color-charcoal: #2e323c;
  --color-aqua: #22d3ee;
  --color-magenta: #e11d74;
  --color-ember: #ffb347;
  --color-text: #ededed;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 24px;

  --shadow-depth: 0 8px 30px rgba(0, 0, 0, 0.4);
  --shadow-glow-gold: 0 0 0 2px #d4af37 inset, 0 8px 30px rgba(212, 175, 55, 0.22);
  --focus-aqua: 0 0 0 3px rgba(34, 211, 238, 0.45);
}

.btn-primary {
  background: linear-gradient(135deg, #ffd700 0%, #d4af37 45%, #a9812f 100%);
  color: #0c0c0c;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-depth);
}

.btn-primary:focus-visible {
  outline: none;
  box-shadow: var(--focus-aqua);
}
```

## 11) Voice & Copy

- **Degen path**: punchy, kinetic, meme-native. Short lines. Hype first.
- **Institutional path**: clear, declarative, verifiable. Link proofs.
- **Bridge both**: headline heat + footnoted facts.

Examples:

- Headline: "The Expensive Memecoin."
- Subhead: "Scarcity on autopilot. 3M cap. Zero tax. Automated burns. Guardian-secured bridge."

## 12) Section Cues (for designers/devs)

- Hero: gold headline on black, live metrics in mono, aqua focus accents.
- Engine: animated loop (trade → buyback → burn → shrink), progressive glow.
- Security: operator/canceller/guardian diagram with steady motion; no gimmicks.
- Tokenomics: deflation timeline; aqua for up, magenta for down.
- Community: embeds on dark panels; keep borders subtle.
- Institutional: dense grid + links (audits, APIs, whitepaper). Minimal motion.
