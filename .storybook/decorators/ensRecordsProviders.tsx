import React from 'react'
import type { Decorator } from '@storybook/react-vite'
import { createConfig } from 'wagmi'
import { mainnet, base, optimism } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { injected, metaMask, coinbaseWallet, walletConnect } from 'wagmi/connectors'
import { TransactionProvider } from '../../src/context/transactionContext'
import TransactionModal from '../../src/components/organisms/transaction-modal/TransactionModal'
import { transports } from '../../src/constants/transports'
import { withThorinAppearance } from './thorin'

const wagmiConfig = createConfig({
  chains: [mainnet, base, optimism],
  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet({ appName: 'Ethereum Identity Kit' }),
    walletConnect({ projectId: 'd4f234136ca6a7efeed7abf93474125b' }),
  ],
  transports,
})

const queryClient = new QueryClient()

export const withENSRecordsProviders: Decorator = (Story) => (
  <WagmiProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <TransactionProvider batchTransactions>
        <div style={{ padding: 24, minHeight: 400, width: '100%', maxWidth: 480, margin: '0 auto' }}>
          <Story />
        </div>
        <TransactionModal />
      </TransactionProvider>
    </QueryClientProvider>
  </WagmiProvider>
)

export const ensRecordsThorinDecorators: Decorator[] = [withENSRecordsProviders, withThorinAppearance]
