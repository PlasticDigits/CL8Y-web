### CL8Y Web — Project Guide (Static React)

This document outlines how to build the CL8Y website as a static React app: tooling, packages, architecture, and implementation notes for a beautifully animated, accessible UI.

## 0) Key Links

**Products (canonical — `src/data/products.ts`):**

- **CL8Y Bridge**: https://bridge.cl8y.com
- **CL8Y DEX**: https://dex.cl8y.com

**Positioning:** CL8Y is a decentralized utility token for reduced fees on CL8Y DEX trading tiers. Do not invent tier numbers. See [`src/content/invariants.ts`](src/content/invariants.ts) and [`skills/cl8y-site-positioning/SKILL.md`](skills/cl8y-site-positioning/SKILL.md).

**Token directory (GitLab #2):** Official addresses, listings, and DEX venues live in [`src/data/tokenDirectory.ts`](src/data/tokenDirectory.ts). The homepage `#token` section renders them. Social and audit links remain in `src/data/links.ts`. Agent skill: [`skills/cl8y-token-directory/SKILL.md`](skills/cl8y-token-directory/SKILL.md).

- **Addresses**
  - **BNB Smart Chain (ERC-20)**: `0x8F452a1fdd388A45e1080992eFF051b4dd9048d2` — https://bscscan.com/token/0x8F452a1fdd388A45e1080992eFF051b4dd9048d2
  - **Terra Classic (CW20)**: `terra16wtml2q66g82fdkx66tap0qjkahqwp4lwq3ngtygacg5q0kzycgqvhpax3` — https://finder.terra.money/classic/address/terra16wtml2q66g82fdkx66tap0qjkahqwp4lwq3ngtygacg5q0kzycgqvhpax3
  - **MegaETH (ERC-20)**: `0xfBAa45A537cF07dC768c469FfaC4e88208B0098D` — https://mega.etherscan.io/token/0xfBAa45A537cF07dC768c469FfaC4e88208B0098D
- **Trade on DEX** (no CEX): https://dex.cl8y.com first, then TidalDex, PancakeSwap, Uniswap (BNB), GDEX, Kumbaya, SIR
- **Social**
  - **Telegram**: https://t.me/ceramictoken
  - **X (Twitter)**: https://x.com/ceramictoken
- **Audit**
  - **SpyWolf**: https://spywolf.co/audits/CL8Y_0x999311589cc1Ed0065AD9eD9702cB593FFc62ddF.pdf
- **Contact**: contact@ceramicliberty.com

## 1) Principles

- **Static-first**: Pre-render everything. No server-side rendering. Use client fetch for live data.
- **Fast + Animated**: Lean bundle, GPU-accelerated effects, respectful motion.
- **Product-first UX**: Bridge and DEX are the primary exits. Token directory (`#token`) is the official address / listing / DEX-venue list.
- **Tight copy**: One headline, one sentence, two product links. Footer holds the long explainer.

## 2) Tech Stack

- **Framework**: Vite + React 18 (static SPA) or Next.js (SSG-only). Prefer Vite for simplicity.
- **Styling**: Tailwind CSS + shadcn/ui (Radix-based) for accessible components.
- **Animation**: Framer Motion; optional GSAP for specialized sequences.
- **3D / Viz**: React Three Fiber + drei for Guardian Bridge visualization.
- **Charts**: Recharts for tokenomics/burn; lightweight and responsive.
- **Data**: TanStack Query (React Query) + SWR (optional) for live polling.
- **Wallets**: wagmi + viem + WalletConnect.
- **Forms**: React Hook Form + Zod.
- **Icons**: Lucide React.
- **Content**: MDX for long-form Institutional/Docs pages.

Notes:

- SSR is disabled; prefer SSG/SPA. All pages must be static-buildable.
- Ensure theme tokens from `STYLE_GUIDE.md` are exported as CSS variables or a TS theme object.

## 3) Node & Tooling

- **Node**: Use `.nvmrc` and `nvm use` as per project standard.
- **TypeScript**: Strict mode on. Retired homepage modules (see `RETIRED_HOMEPAGE_MODULES` in `src/content/invariants.ts`) are excluded from `tsconfig.json` so they cannot fail current-product typecheck. Do not remount them.
- **Lint/Format**: ESLint (typescript, react-hooks), Prettier (no formatting conflicts with Tailwind plugin).
- **Commit hooks**: lint-staged + husky (optional).

## 4) Dependencies

Install with Yarn (project standard).

```bash
yarn add react react-dom
yarn add -D typescript vite @vitejs/plugin-react eslint prettier

# Styling & UI
yarn add tailwindcss postcss autoprefixer class-variance-authority tailwind-merge
yarn add @radix-ui/react-icons @radix-ui/react-slot
yarn add lucide-react

# shadcn/ui (optional; generate components via CLI)
# npx shadcn@latest init --yes

# Animation & 3D
yarn add framer-motion
yarn add three @react-three/fiber @react-three/drei

# Data
yarn add @tanstack/react-query swr

# Charts
yarn add recharts

# Wallets
yarn add wagmi viem @walletconnect/ethereum-provider @wagmi/connectors

# Forms & Validation
yarn add react-hook-form zod @hookform/resolvers

# MDX (optional content pages)
yarn add -D @mdx-js/rollup
```

Optional:

- `tiny-invariant`, `ts-pattern` for safer logic.
- `globby` for build-time content indexing.

## 5) Project Structure

```
CL8Y-web/
  public/                 # static assets (logo, og images, favicons)
  src/
    app/                  # routing and pages (SPA or file-based with wouter/react-router)
      index.tsx
      routes.tsx
    components/           # reusable UI components (buttons, cards, charts)
      ui/                 # shadcn/ui primitives (generated)
      visuals/            # R3F scenes, canvas wrappers, shaders
      charts/             # Recharts wrappers with theme defaults
    features/
      hero/               # utility + Bridge / DEX CTAs
      products/
      utility/            # fee-tier copy (no invented table)
      trust/              # compressed bridge canceler / delay window
      token/              # official directory (GitLab #2)
      community/
    providers/            # Theme, QueryClient, Wagmi config
    hooks/                # data hooks (useBurnStats, useBridgeStatus)
    lib/                  # utils (theming, formatting, constants)
    theme/                # tokens and CSS variables mapped from STYLE_GUIDE.md
      tokens.ts
      index.css           # Tailwind base + CSS variables
    data/                 # mocked JSON fixtures for local dev
    styles/               # global styles (if not colocated)
    main.tsx
  index.html
  STYLE_GUIDE.md          # brand system
  PROJECT_GUIDE.md        # this file
  AGENTS.md               # entry for third-party agents
  skills/cl8y-site-positioning/  # positioning skill
  skills/cl8y-token-directory/   # address / venue skill (GitLab #2)
  skills/cl8y-host-headers/      # Render clickjacking headers (#3)
  .nvmrc
  package.json
  tsconfig.json
  vite.config.ts
  tailwind.config.ts
  postcss.config.js
```

## 6) Theme Implementation

- Define tokens in `src/theme/tokens.ts` matching the JSON in `STYLE_GUIDE.md`.
- Export CSS variables in `src/theme/index.css` and load in `main.tsx`.
- Configure Tailwind theme extension to reference CSS variables.

Example `tokens.ts`:

```ts
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
```

Tailwind `theme.extend` can mirror these via CSS variables.

## 7) Routing & Pages

- SPA: use `react-router-dom` or `wouter` for lightweight routing.
- Pages: one homepage (`/`) plus chrome. Legacy section routes redirect into `#` anchors.
- Anchors: `#hero`, `#products`, `#utility`, `#trust`, `#token`, `#community`, `#docs`.
- Historical whitepaper vanity path `/cl8y_whitepaper` still opens the v3 PDF.

## 8) Data Layer

- Use `@tanstack/react-query` for polling live feeds (price, burns, bridge status).
- Use environment variables for endpoints; never hardcode URLs.
- Cache policies: favor stale-while-revalidate with short refetch intervals.

Example hook signature:

```ts
function useBurnStats() {
  return useQuery({
    queryKey: ["burn-stats"],
    queryFn: fetchBurnStats, // pulls from env-configured API
    refetchInterval: 60_000,
  });
}
```

## 9) Wallets

- The marketing page must not require wallet connect. Do not add a connect widget here.
- Wagmi remains available for optional live metrics; do not let metrics outrank product CTAs.

## 10) Animations & Performance

- Use Framer Motion for interaction and section reveals.
- Use R3F sparingly; isolate canvases and suspend when offscreen.
- Respect `prefers-reduced-motion`.
- Preload critical fonts (Space Grotesk, Inter, Roboto Mono) with `display=swap`.

## 11) Charts

- Recharts defaults themed to aqua/gold for up, magenta/ember for down.
- Provide skeleton loaders and graceful empty states.

## 12) Accessibility

- Focus rings visible (aqua).
- Color contrast AA.
- Keyboard navigable menus and dialogs (Radix/shadcn).

## 13) Build & Deploy (Static)

- Vite build outputs to `dist/`.
- Ensure all routes work via SPA fallbacks on hosting (e.g., Netlify `_redirects`, Vercel SPA mode, S3 `index.html` fallback).

Commands:

```bash
yarn dev
yarn build
yarn preview
```

## 14) Environment Configuration

`.env` (example; do not commit):

```
VITE_CL8Y_PRICE_API=...
VITE_CL8Y_BURN_API=...
VITE_CL8Y_BRIDGE_API=...
VITE_WALLETCONNECT_PROJECT_ID=...
```

Always read from env, never hardcode values.

## 15) Component Checklist (current IA)

- Chrome: sticky header (Bridge, DEX, Token, Community) + footer explainer/legal.
- Hero: utility headline, one-line subhead, Open Bridge + Open DEX.
- Products: two short cards with labeled links.
- Utility: fee-tier sentence + DEX link. No invented percentages.
- Trust: canceler network, 5-minute delay, audit link.
- Token: official directory — addresses, DEX venues, listings (`#token`).
- Community: Telegram + X from `src/data/links.ts`.

## 15b) Production host headers

This is a static SPA. `render.yaml` is the source of truth and declares
`X-Frame-Options: DENY` and `Content-Security-Policy: frame-ancestors 'none'`
on `/*`. Do not introduce a frameable wallet/connect widget. The app cannot
set these headers from static HTML. After deploy, confirm with
`curl -sI https://cl8y.com`. See [`skills/cl8y-host-headers/SKILL.md`](skills/cl8y-host-headers/SKILL.md).

## 16) QA

- Validate contrast and focus across all pages.
- Test on low-end devices with reduced motion enabled.
- Verify SPA fallback works in production.

## 17) Future Extensions

- MDX-driven docs for partners.
- Theme switch (dark variants only by default; optional high-contrast mode).
- Internationalization via `react-intl` or `lingui`.
