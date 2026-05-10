/// <reference types="vite/client" />

declare module "*.mdx" {
  import type { FC } from "react";
  const MDXComponent: FC;
  export default MDXComponent;
}

declare module "virtual:blog-post-meta" {
  export const postMetaByGlobKey: Record<string, Record<string, unknown>>;
}

interface ImportMetaEnv {
  readonly VITE_CL8Y_PRICE_API: string;
  readonly VITE_CL8Y_PRICE_SEED?: string;
  readonly VITE_CL8Y_BURN_API: string;
  readonly VITE_CL8Y_BRIDGE_API: string;
  readonly VITE_WALLETCONNECT_PROJECT_ID: string;
  readonly VITE_BSC_RPC_URL?: string;
  /** Optional absolute site origin for canonical and OG URLs (e.g. https://example.com). */
  readonly VITE_SITE_ORIGIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
