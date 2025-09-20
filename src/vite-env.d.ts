/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CL8Y_PRICE_API: string;
  readonly VITE_CL8Y_PRICE_SEED?: string;
  readonly VITE_CL8Y_BURN_API: string;
  readonly VITE_CL8Y_BRIDGE_API: string;
  readonly VITE_WALLETCONNECT_PROJECT_ID: string;
  readonly VITE_BSC_RPC_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
