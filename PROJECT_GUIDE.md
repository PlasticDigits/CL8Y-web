### CL8Y Web — Project Guide (Static React)

This document outlines how to build the CL8Y website as a static React app: tooling, packages, architecture, and implementation notes for a beautifully animated, accessible UI.

## 0) Key Links

- ⚡⚡ **TRADING LIVE NOW!**
  - **TidalDex.com (BSC)**: https://tidaldex.com/swap?outputCurrency=0x8F452a1fdd388A45e1080992eFF051b4dd9048d2
  - **AscendEX (CEX)**: https://ascendex.com/en-us/cashtrade-spottrading/usdt/cl8y
  - **Uniswap (DEX)**: https://app.uniswap.org/explore/tokens/bnb/0x8F452a1fdd388A45e1080992eFF051b4dd9048d2
  - **PancakeSwap (DEX)**: https://pancakeswap.finance/swap?outputCurrency=0x8F452a1fdd388A45e1080992eFF051b4dd9048d2
  - **GDEX (TerraClassic)**: https://garuda-defi.org/market/terra1kkrwna59jzpvsp7n4l3xdt72rmejcz5d2xaezxl29zvkssn7vvtqmtmemv

- **Contract Addresses**
  - **TerraClassic**: https://finder.terra.money/classic/address/terra16wtml2q66g82fdkx66tap0qjkahqwp4lwq3ngtygacg5q0kzycgqvhpax3 — `terra16wtml2q66g82fdkx66tap0qjkahqwp4lwq3ngtygacg5q0kzycgqvhpax3`
  - **BSC**: https://bscscan.com/token/0x8F452a1fdd388A45e1080992eFF051b4dd9048d2 — `0x8F452a1fdd388A45e1080992eFF051b4dd9048d2`

- **Chart**
  - **GeckoTerminal**: https://www.geckoterminal.com/bsc/pools/0x8F452a1fdd388A45e1080992eFF051b4dd9048d2

- **Social**
  - **Telegram**: https://t.me/ceramicliberty
  - **X (Twitter)**: https://x.com/ceramictoken

- **Listings**
  - **Blockspot**: https://blockspot.io/coin/ceramicliberty-com/
  - **DropsTab**: https://dropstab.com/coins/ceramicliberty-com
  - **CoinGecko**: https://blockspot.io/coin/ceramicliberty-com/

- **Audit**
  - **SpyWolf**: https://spywolf.co/audits/CL8Y_0x999311589cc1Ed0065AD9eD9702cB593FFc62ddF.pdf

Implementation note: these are also centralized in `src/data/links.ts` with icon metadata for UI usage.

## 1) Principles

- **Static-first**: Pre-render everything. No server-side rendering. Use client fetch for live data.
- **Fast + Animated**: Lean bundle, GPU-accelerated effects, respectful motion.
- **Data-driven UI**: All visuals wired to tokenized theme and live feeds.
- **Dual-track UX**: Meme-native hype + institutional proof.

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
- **TypeScript**: Strict mode on.
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
      hero/
      engine/             # Autopilot Scarcity loop
      security/           # Guardian Protocol + Bridge viz
      tokenomics/
      community/
      institutional/
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
- Pages: `Hero`, `Engine`, `Security`, `Tokenomics`, `Community`, `Institutional`.
- Add top-level anchors for one-page scroll and deep links.

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

- Configure wagmi with chains in scope (BSC, Terra Classic via EVM-compatible bridges if any, or document cross-chain approach).
- Use WalletConnect for multi-wallet; hide advanced controls until needed.

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

## 15) Component Checklist (MVP)

- Hero: headline, subhead, live metrics (circulating supply, market cap, 24h burns, price), CTAs.
- Engine: animated scarcity loop with tooltips and live stats.
- Security: Guardian Protocol diagram + live bridge dashboard.
- Tokenomics: deflation timeline chart, addresses, liquidity lock.
- Community: embeds for Telegram + X.
- Institutional: whitepaper, audits, API endpoints, contact form.

## 16) QA

- Validate contrast and focus across all pages.
- Test on low-end devices with reduced motion enabled.
- Verify SPA fallback works in production.

## 17) Future Extensions

- MDX-driven docs for partners.
- Theme switch (dark variants only by default; optional high-contrast mode).
- Internationalization via `react-intl` or `lingui`.
