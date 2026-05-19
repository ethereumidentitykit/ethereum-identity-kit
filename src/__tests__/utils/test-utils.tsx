import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  })

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Mock utilities
export const mockAddress = '0x1234567890123456789012345678901234567890'
export const mockEnsName = 'test.eth'
export const mockAvatar = 'https://example.com/avatar.png'
export const mockFallbackAvatar = 'https://efp.app/assets/art/default-avatar.svg'

// Mock profile data
export const mockProfileData = {
  address: mockAddress,
  name: mockEnsName,
  avatar: mockAvatar,
  bio: 'This is a test bio',
  followers: 100,
  following: 50,
  stats: {
    followers_count: 100,
    following_count: 50,
  },
}

// Mock hook return values
export const mockUseProfileStats = {
  followers: 100,
  following: 50,
  statsLoading: false,
}

export const mockUseProfileDetails = {
  profile: mockProfileData,
  isLoading: false,
  error: null,
}
