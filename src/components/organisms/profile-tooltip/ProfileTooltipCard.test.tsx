import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TextEncoder, TextDecoder } from 'util'

Object.assign(global, { TextDecoder, TextEncoder })

jest.mock('wagmi', () => ({
  useAccount: jest.fn().mockReturnValue({ address: '0x123' }),
  useSignMessage: jest.fn(),
}))

jest.mock('../../../utils', () => ({
  beautifyEnsName: jest.fn((name) => name),
  truncateAddress: jest.fn((address) => address),
}))

jest.mock('../../../constants', () => ({
  DEFAULT_FALLBACK_AVATAR: 'fallback.png',
}))

jest.mock(
  '../profile-card/components/bio',
  () =>
    function MockBio() {
      return <div data-testid="bio" />
    }
)
jest.mock(
  '../../molecules/avatar/Avatar',
  () =>
    function MockAvatar() {
      return <div data-testid="avatar" />
    }
)
jest.mock(
  '../profile-card/components/HeaderImage',
  () =>
    function MockHeaderImage() {
      return <div data-testid="header-image" />
    }
)
jest.mock(
  '../../molecules/follower-tag/FollowerTag',
  () =>
    function MockFollowerTag() {
      return <div data-testid="follower-tag" />
    }
)
jest.mock(
  '../../atoms/loading-cell/LoadingCell',
  () =>
    function MockLoadingCell() {
      return <div data-testid="loading-cell" />
    }
)
jest.mock(
  '../../molecules/profile-stats/ProfileStats',
  () =>
    function MockProfileStats() {
      return <div data-testid="profile-stats" />
    }
)
jest.mock(
  '../follow-button/FollowButton',
  () =>
    function MockFollowButton() {
      return <div data-testid="follow-button" />
    }
)
jest.mock(
  '../../molecules/profile-socials/ProfileSocials',
  () =>
    function MockProfileSocials() {
      return <div data-testid="profile-socials" />
    }
)

import * as hooksModule from '../../../hooks'

jest.mock('../../../hooks', () => ({
  useProfileDetails: jest.fn().mockReturnValue({
    ens: { name: 'vitalik.eth' },
    address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    detailsLoading: false,
  }),
  useProfileStats: jest.fn().mockReturnValue({
    followers: 100,
    following: 50,
    statsLoading: false,
  }),
  useGrailsProfile: jest.fn(),
}))

import ProfileTooltipCard from './ProfileTooltipCard'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
}

describe('ProfileTooltipCard Grails Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('does not call or render Grails data when includeGrails is false', () => {
    const useGrailsProfileSpy = jest.spyOn(hooksModule, 'useGrailsProfile').mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    })

    renderWithProviders(<ProfileTooltipCard addressOrName="vitalik.eth" includeGrails={false} />)

    expect(useGrailsProfileSpy).not.toHaveBeenCalled()
    expect(screen.queryByText('Last seen on Grails:')).not.toBeInTheDocument()
  })

  it('fetches and renders Grails data when includeGrails is true', async () => {
    const mockGrailsData = {
      data: {
        lastSeenAt: '2023-10-01T12:00:00Z',
        lastSeenOnchain: '2023-10-02T12:00:00Z',
        stats: {
          totalNames: 42,
        },
      },
    }

    const useGrailsProfileSpy = jest.spyOn(hooksModule, 'useGrailsProfile').mockReturnValue({
      data: mockGrailsData,
      isLoading: false,
      isError: false,
    })

    renderWithProviders(<ProfileTooltipCard addressOrName="vitalik.eth" includeGrails={true} />)

    expect(useGrailsProfileSpy).toHaveBeenCalledWith({
      addressOrName: 'vitalik.eth',
      enabled: true,
    })

    await waitFor(() => {
      expect(screen.getByText('Last seen on Grails:')).toBeInTheDocument()
      expect(screen.getByText('Last tx on Ethereum:')).toBeInTheDocument()
      expect(screen.getByText('Number of names they own:')).toBeInTheDocument()
      expect(screen.getByText('42')).toBeInTheDocument()
    })
  })

  it('does not render an empty Grails section when no Grails data is returned', () => {
    jest.spyOn(hooksModule, 'useGrailsProfile').mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    })

    const { container } = renderWithProviders(<ProfileTooltipCard addressOrName="vitalik.eth" includeGrails={true} />)

    expect(container.querySelector('.tooltip-grails-data')).not.toBeInTheDocument()
  })
})
