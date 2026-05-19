import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Simple mock translation context without external dependencies
const MockTranslationProvider = ({ children }: { children: React.ReactNode }) => {
  return <div data-testid="mock-translation-provider">{children}</div>
}

// Simple mock transaction context without Wagmi dependencies
const MockTransactionProvider = ({ children }: { children: React.ReactNode }) => {
  return <div data-testid="mock-transaction-provider">{children}</div>
}

// Simple custom render function without complex dependencies
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
      <MockTranslationProvider>
        <MockTransactionProvider>{children}</MockTransactionProvider>
      </MockTranslationProvider>
    </QueryClientProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

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
      notifications: {
        tag: [
          {
            id: '1',
            type: 'tag',
            from: '0x1111111111111111111111111111111111111111',
            timestamp: Date.now(),
            read: false,
            tag: 'friend',
            address: '0x1111111111111111111111111111111111111111',
            name: 'user1.eth',
            avatar: 'https://example.com/avatar1.png',
          },
        ],
        untag: [
          {
            id: '2',
            type: 'untag',
            from: '0x2222222222222222222222222222222222222222',
            timestamp: Date.now() - 3600000,
            read: true,
            tag: 'friend',
            address: '0x2222222222222222222222222222222222222222',
            name: 'user2.eth',
            avatar: 'https://example.com/avatar2.png',
          },
        ],
      },
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
