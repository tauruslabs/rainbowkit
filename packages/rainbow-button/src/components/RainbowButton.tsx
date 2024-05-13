import { RainbowKitProvider, WalletButton } from '@merkletrade/rainbowkit';
import type { RainbowKitProviderProps } from '@merkletrade/rainbowkit/dist/components/RainbowKitProvider/RainbowKitProvider';
import React from 'react';

export function RainbowButtonProvider({
  children,
  ...options
}: Omit<
  RainbowKitProviderProps,
  'chains' | 'avatar' | 'initialChain' | 'modalSize' | 'showRecentTransactions'
>) {
  return <RainbowKitProvider {...options}>{children}</RainbowKitProvider>;
}

export const RainbowButton = () => {
  return <WalletButton wallet="rainbow" />;
};

RainbowButton.Custom = WalletButton.Custom;
