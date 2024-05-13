import '../styles/global.css';
import '@merkletrade/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { createConfig, http, WagmiProvider } from 'wagmi';
import {
  connectorsForWallets,
  RainbowKitProvider,
} from '@merkletrade/rainbowkit';
import { coinbaseWallet, walletConnect } from 'wagmi/connectors';
import { mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { metaMaskWallet, rainbowWallet } from '@merkletrade/rainbowkit/wallets';

const projectId = 'YOUR_PROJECT_ID';

const appName = 'RainbowKit demo';

const connectors = connectorsForWallets(
  [{ groupName: 'Popular', wallets: [metaMaskWallet, rainbowWallet] }],
  {
    projectId,
    appName,
  },
);

const config = createConfig({
  connectors: [
    ...connectors,
    coinbaseWallet({
      appName,
    }),
    walletConnect({
      projectId,
    }),
  ],
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  multiInjectedProviderDiscovery: false,
  ssr: true,
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
