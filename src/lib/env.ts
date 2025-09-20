import { z } from "zod";

const EnvSchema = z.object({
  VITE_CL8Y_PRICE_API: z.string().optional(),
  VITE_CL8Y_PRICE_SEED: z.string().optional(),
  VITE_CL8Y_BURN_API: z.string().optional(),
  VITE_CL8Y_BRIDGE_API: z.string().optional(),
  VITE_WALLETCONNECT_PROJECT_ID: z.string().optional(),
  VITE_GECKOTERMINAL_POOL_ID: z.string().optional(),
  VITE_CL8Y_SUPPLY_TOTAL_API: z.string().optional(),
  VITE_CL8Y_SUPPLY_CIRCULATING_API: z.string().optional(),
  VITE_CL8Y_SUPPLY_DEFAULT: z.string().optional(),
  VITE_BSC_RPC_URL: z.string().optional(),
  // Onchain configuration
  VITE_CL8Y_ADDRESS: z.string().optional(),
  VITE_CZUSD_ADDRESS: z.string().optional(),
  VITE_CL8Y_CZUSD_PAIR_ADDRESS: z.string().optional(),
});

const parsed = EnvSchema.safeParse(import.meta.env ?? {});

// Log validation failures in development env only
if (!parsed.success && import.meta.env?.MODE !== "production") {
  console.warn("Invalid environment variables:", parsed.error.flatten());
}

export const env = {
  priceApi: parsed.success ? parsed.data.VITE_CL8Y_PRICE_API : undefined,
  priceSeed:
    parsed.success && parsed.data.VITE_CL8Y_PRICE_SEED
      ? Number(parsed.data.VITE_CL8Y_PRICE_SEED)
      : 0.75,
  burnApi: parsed.success ? parsed.data.VITE_CL8Y_BURN_API : undefined,
  bridgeApi: parsed.success ? parsed.data.VITE_CL8Y_BRIDGE_API : undefined,
  walletConnectProjectId: parsed.success ? parsed.data.VITE_WALLETCONNECT_PROJECT_ID : undefined,
  geckoTerminalPoolId: parsed.success ? parsed.data.VITE_GECKOTERMINAL_POOL_ID : undefined,
  supplyTotalApi: parsed.success ? parsed.data.VITE_CL8Y_SUPPLY_TOTAL_API : undefined,
  supplyCirculatingApi: parsed.success ? parsed.data.VITE_CL8Y_SUPPLY_CIRCULATING_API : undefined,
  supplyDefault:
    parsed.success && parsed.data.VITE_CL8Y_SUPPLY_DEFAULT
      ? Number.parseFloat(parsed.data.VITE_CL8Y_SUPPLY_DEFAULT)
      : 2_876_179,
  bscRpcUrl: parsed.success ? parsed.data.VITE_BSC_RPC_URL : undefined,
  // Onchain addresses (BSC)
  cl8yAddress:
    (parsed.success && parsed.data.VITE_CL8Y_ADDRESS) ||
    "0x8f452a1fdd388a45e1080992eff051b4dd9048d2",
  czusdAddress:
    (parsed.success && parsed.data.VITE_CZUSD_ADDRESS) ||
    "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
  cl8yCzusdPairAddress:
    (parsed.success && parsed.data.VITE_CL8Y_CZUSD_PAIR_ADDRESS) ||
    "0xBe9F06b76e301b49Dc345948a7a5E3418264886A",
} as const;
