# CL8Y Web

A fast, static React (Vite) site for the CL8Y project. Built with Tailwind, Framer Motion, and modern Web3 tooling (wagmi + viem). No server-side rendering.

## Quick start

```bash
# Node & package manager
nvm use
corepack enable
yarn --version

# Install deps
yarn install

# Develop
yarn dev

# Type check & lint
yarn typecheck
yarn lint

# Build & preview static site
yarn build
yarn preview
```

## Tech stack

- React 19 + Vite 7
- TypeScript (strict)
- Tailwind CSS
- Framer Motion
- React Router
- wagmi + viem + WalletConnect
- Recharts
- MDX (optional)

## Project structure

```
public/           # static assets
src/
  app/            # routes
  components/     # UI + visuals
  features/       # sections (engine, security, tokenomics, ...)
  hooks/ lib/     # data & utils
  providers/      # theme, query, wagmi configs
  theme/          # CSS vars and tokens
index.html        # SPA entry
```

See `PROJECT_GUIDE.md` and `STYLE_GUIDE.md` for detailed architecture and theming.

## Environment

Create a `.env` (do not commit):

```bash
VITE_CL8Y_PRICE_API=
VITE_CL8Y_BURN_API=
VITE_CL8Y_BRIDGE_API=
VITE_WALLETCONNECT_PROJECT_ID=
```

Guidelines:

- Always read from env; don’t hardcode URLs or price values.
- Prefer efficient caching to reduce blockchain RPC calls.

## Scripts

- `yarn dev`: start local dev server
- `yarn build`: create static site in `dist/`
- `yarn preview`: preview the production build
- `yarn typecheck`: TypeScript check
- `yarn lint`: ESLint with max-warnings=0
- `yarn format`: Prettier format

## Deployment

- Output is `dist/` (static). Ensure SPA fallback is configured:
  - Netlify: `_redirects` with `/* /index.html 200`
  - Vercel: SPA mode or rewrite to `/index.html`
  - S3/CloudFront: default root object `index.html`

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0-only). See [`LICENSE`](LICENSE).

AGPL notice: If you run a modified version on a publicly accessible server, you must offer the Corresponding Source to users interacting with it over the network.
