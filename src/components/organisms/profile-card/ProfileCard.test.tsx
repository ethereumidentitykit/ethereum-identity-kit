import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TextEncoder, TextDecoder } from 'util'

Object.assign(global, { TextDecoder, TextEncoder })

jest.mock('../../../context/TranslationContext', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

jest.mock('../../../utils', () => ({
  beautifyEnsName: jest.fn((name: string) => name),
  truncateAddress: jest.fn((address: string) => address),
  validateEnsHeader: jest.fn((src?: string) => src),
  formatNumber: jest.fn((value: number) => String(value)),
}))

jest.mock('../../../constants', () => ({
  DEFAULT_FALLBACK_AVATAR: 'fallback.png',
  DEFAULT_FALLBACK_HEADER: 'fallback-header.png',
}))

jest.mock(
  './components/bio',
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
  './components/HeaderImage',
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
jest.mock(
  '../../molecules/followers-you-know/FollowersYouKnow',
  () =>
    function MockFollowersYouKnow() {
      return <div data-testid="followers-you-know" />
    }
)
jest.mock(
  '../../molecules/efp-poaps/EFPPoaps',
  () =>
    function MockEFPPoaps() {
      return <div data-testid="efp-poaps" />
    }
)
jest.mock(
  './components/card-header/CardHeader',
  () =>
    function MockCardHeader() {
      return <div data-testid="card-header" />
    }
)

jest.mock('../../../hooks', () => ({
  useProfileDetails: jest.fn().mockReturnValue({
    ens: {
      name: 'vitalik.eth',
      avatar: 'avatar.png',
      records: {
        header: 'header.png',
        description: 'Building Ethereum',
        status: 'hello world',
      },
    },
    address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    primaryList: '1',
    detailsLoading: false,
    refreshProfileDetails: jest.fn(),
  }),
  useProfileStats: jest.fn().mockReturnValue({
    followers: 100,
    following: 50,
    statsLoading: false,
    refreshProfileStats: jest.fn(),
  }),
}))

import ProfileCard from './ProfileCard'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const renderWithProviders = (ui: React.ReactElement) =>
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)

describe('ProfileCard slotted composition', () => {
  it('renders the default slot arrangement with expected structure', () => {
    const { container } = renderWithProviders(
      <ProfileCard
        addressOrName="vitalik.eth"
        connectedAddress="0xc983ebc9db969782d994627bdffec0ae6efee1b3"
        showFollowerState
        showPoaps
        showFollowButton
        style={{ width: '400px' }}
      />
    )

    expect(screen.getByTestId('profile-card')).toBeInTheDocument()
    expect(screen.getByTestId('profile-card')).toHaveClass('profile-card')
    expect(container.querySelector('.profile-card-details')).toBeInTheDocument()
    expect(container.querySelector('.profile-avatar-container')).toBeInTheDocument()
    expect(container.querySelector('.profile-name-container')).toBeInTheDocument()
    expect(container.querySelector('.profile-bio')).toBeInTheDocument()
    expect(screen.getByTestId('header-image')).toBeInTheDocument()
    expect(screen.getByTestId('card-header')).toBeInTheDocument()
    expect(screen.getByTestId('avatar')).toBeInTheDocument()
    expect(screen.getByTestId('follower-tag')).toBeInTheDocument()
    expect(screen.getByTestId('profile-stats')).toBeInTheDocument()
    expect(screen.getByTestId('bio')).toBeInTheDocument()
    expect(screen.getByTestId('profile-socials')).toBeInTheDocument()
    expect(screen.getByTestId('followers-you-know')).toBeInTheDocument()
    expect(screen.getByTestId('efp-poaps')).toBeInTheDocument()
    expect(container.querySelector('.profile-status')).toHaveTextContent('"hello world"')
  })

  it('exposes slotted subcomponents on the ProfileCard namespace', () => {
    expect(ProfileCard.Root).toBeDefined()
    expect(ProfileCard.Header).toBeDefined()
    expect(ProfileCard.Avatar).toBeDefined()
    expect(ProfileCard.Name).toBeDefined()
    expect(ProfileCard.Stats).toBeDefined()
  })

  it('supports custom slot layout via ProfileCard.Root', () => {
    renderWithProviders(
      <ProfileCard.Root addressOrName="vitalik.eth" data-testid="profile-card">
        <ProfileCard.Header />
        <ProfileCard.Name>{({ displayName }) => <h2 data-testid="custom-name">{displayName}</h2>}</ProfileCard.Name>
      </ProfileCard.Root>
    )

    expect(screen.getByTestId('custom-name')).toHaveTextContent('vitalik.eth')
  })
})
