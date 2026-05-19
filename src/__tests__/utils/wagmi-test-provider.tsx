import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, createConfig } from 'wagmi'
import { mainnet, optimism, base } from 'wagmi/chains'
import { http } from 'wagmi'
import { TranslationProvider } from '../../context/TranslationContext'
import { TransactionProvider } from '../../context/transactionContext'

// Mock Wagmi config for testing
const mockConfig = createConfig({
  chains: [mainnet, optimism, base],
  transports: {
    [mainnet.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
  },
})

// Mock translation function
const mockTranslations = {
  en: {
    following: 'Following',
    followers: 'Followers',
    follow: 'Follow',
    unfollow: 'Unfollow',
    loading: 'Loading...',
    error: 'Error',
    'sign-in': 'Sign In',
    'sign-out': 'Sign Out',
    block: 'Block',
    unblock: 'Unblock',
    mute: 'Mute',
    unmute: 'Unmute',
    signingMessage: 'Signing message...',
    signInWithEthereum: 'Sign in with Ethereum',
  },
}

// Enhanced test provider with all necessary contexts
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={mockConfig}>
        <TranslationProvider translations={mockTranslations} fallbackLanguage="en">
          <TransactionProvider>{children}</TransactionProvider>
        </TranslationProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}

const renderWithProviders = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { renderWithProviders as render }

// Enhanced mock data for testing
export const mockTestData = {
  address: '0x1234567890123456789012345678901234567890',
  connectedAddress: '0x9876543210987654321098765432109876543210',
  ensName: 'test.eth',
  avatar: 'https://example.com/avatar.png',
  fallbackAvatar: 'https://efp.app/assets/art/default-avatar.svg',

  profileData: {
    address: '0x1234567890123456789012345678901234567890',
    name: 'test.eth',
    avatar: 'https://example.com/avatar.png',
    bio: 'This is a test bio',
    followers: 100,
    following: 50,
    records: {
      'com.twitter': 'testuser',
      'com.github': 'testuser',
      url: 'https://example.com',
    },
    stats: {
      followers_count: 100,
      following_count: 50,
    },
  },

  transactionData: {
    hash: '0xabcdef1234567890',
    chainId: 1,
    status: 'pending',
    type: 'follow' as const,
  },

  followersYouKnow: [
    {
      address: '0x1111111111111111111111111111111111111111',
      name: 'friend1.eth',
      avatar: 'https://example.com/friend1.png',
    },
    {
      address: '0x2222222222222222222222222222222222222222',
      name: 'friend2.eth',
      avatar: 'https://example.com/friend2.png',
    },
  ],

  notifications: [
    {
      id: '1',
      type: 'follow',
      from: '0x1111111111111111111111111111111111111111',
      timestamp: Date.now(),
      read: false,
    },
    {
      id: '2',
      type: 'unfollow',
      from: '0x2222222222222222222222222222222222222222',
      timestamp: Date.now() - 3600000,
      read: true,
    },
  ],

  efpPoaps: [
    {
      id: '1',
      name: 'EFP Early Adopter',
      image: 'https://example.com/poap1.png',
      description: 'Early adopter of EFP protocol',
    },
    {
      id: '2',
      name: 'EFP Contributor',
      image: 'https://example.com/poap2.png',
      description: 'Contributed to EFP development',
    },
  ],
}
