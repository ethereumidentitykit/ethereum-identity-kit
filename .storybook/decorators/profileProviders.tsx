import React from 'react'
import type { Decorator } from '@storybook/react-vite'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '../../src/constants/wagmi'
import { TransactionProvider } from '../../src/context'
import TransactionModal from '../../src/components/organisms/transaction-modal/TransactionModal'
import { withThorinAppearance } from './thorin'

const queryClient = new QueryClient()

export const withProfileProviders: Decorator = (Story) => (
  <QueryClientProvider client={queryClient}>
    <WagmiProvider config={wagmiConfig}>
      <TransactionProvider>
        <Story />
        <TransactionModal />
      </TransactionProvider>
    </WagmiProvider>
  </QueryClientProvider>
)

export const withProfileCardCanvas: Decorator = (Story) => (
  <div style={{ padding: 20, backgroundColor: '#AAAAAA' }}>
    <Story />
  </div>
)

export const withTooltipCanvas: Decorator = (Story) => (
  <div style={{ padding: 24, backgroundColor: '#CCCCCC', minHeight: 400 }}>
    <Story />
  </div>
)

export const withFullWidthCanvas: Decorator = (Story) => (
  <div style={{ padding: 0, fontFamily: 'Inter, sans-serif' }}>
    <Story />
  </div>
)

/** Full decorator stack for Thorin + slotted profile stories (story-level decorators replace meta in SB9). */
export const profileCardThorinDecorators: Decorator[] = [
  withProfileProviders,
  withProfileCardCanvas,
  withThorinAppearance,
]

export const profileTooltipThorinDecorators: Decorator[] = [
  withProfileProviders,
  withTooltipCanvas,
  withThorinAppearance,
]

export const fullWidthProfileThorinDecorators: Decorator[] = [
  withProfileProviders,
  withFullWidthCanvas,
  withThorinAppearance,
]
