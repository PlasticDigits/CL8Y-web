import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { injected, walletConnect } from "@wagmi/connectors";
import { mainnet, bsc } from "viem/chains";
import { env } from "../lib/env";

export function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            gcTime: 5 * 60_000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            retry: 2,
          },
        },
      }),
  );
  const wcProjectId = env.walletConnectProjectId;
  const wagmiConfig = createConfig({
    chains: [mainnet, bsc],
    transports: {
      [mainnet.id]: http(),
      [bsc.id]: http(),
    },
    connectors: [
      injected({ shimDisconnect: true }),
      ...(wcProjectId
        ? [
            walletConnect({
              projectId: wcProjectId,
              showQrModal: true,
            }),
          ]
        : []),
    ],
    ssr: false,
  });
  return (
    <WagmiProvider config={wagmiConfig} reconnectOnMount>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
