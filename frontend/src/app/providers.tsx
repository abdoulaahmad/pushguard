'use client';

import { PushUniversalWalletProvider, PushUI } from '@pushchain/ui-kit';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  const walletConfig = {
    network: PushUI.CONSTANTS.PUSH_NETWORK.TESTNET as any,
    login: {
      email: true,
      google: true,
      wallet: {
        enabled: true,
      },
      appPreview: true,
    },
    modal: {
      loginLayout: PushUI.CONSTANTS.LOGIN.LAYOUT.SPLIT,
      connectedLayout: PushUI.CONSTANTS.CONNECTED.LAYOUT.HOVER,
      appPreview: true,
    },
  };

  // Define Your App Preview
  const appMetadata = {
    logoUrl: '/logo.png', // You can update this with your actual logo
    title: 'PushGuard',
    description: 'Universal Wallet Guardian - One guard. All chains. Zero compromises.',
  };

  return (
    <PushUniversalWalletProvider config={walletConfig} app={appMetadata}>
      {children}
    </PushUniversalWalletProvider>
  );
}