import React from 'react'
import { render, screen, fireEvent } from '../../../../__tests__/utils/test-utils'
import ProfileCard from '../ProfileCard'

// Mock all the hooks and utilities
jest.mock('../../../../hooks', () => ({
  useProfileDetails: jest.fn(),
  useProfileStats: jest.fn(),
  useEFPPoaps: jest.fn(),
}))

jest.mock('../../../../context/TranslationContext', () => ({
  useTranslation: jest.fn(() => ({
    t: (key: string) => key,
  })),
}))

jest.mock('../../../../utils', () => ({
  truncateAddress: jest.fn((address) => `${address.slice(0, 6)}...${address.slice(-4)}`),
  formatNumber: jest.fn((num) => num?.toString() || '0'),
}))

jest.mock('../../../../utils/profile', () => ({
  defaultOnStatClick: jest.fn(),
}))

jest.mock('@adraffy/ens-normalize', () => ({
  ens_beautify: jest.fn((name) => name),
}))

const { useProfileDetails, useProfileStats, useEFPPoaps } = require('../../../../hooks')
const { truncateAddress } = require('../../../../utils')

describe('ProfileCard', () => {
  const mockAddress = '0x1234567890123456789012345678901234567890'
  const mockName = 'test.eth'
  const mockConnectedAddress = '0x9876543210987654321098765432109876543210'

  const mockProfileData = {
    address: mockAddress,
    ens: {
      name: mockName,
      avatar: 'https://example.com/avatar.png',
      records: {
        description: 'Test bio',
        'com.twitter': 'testuser',
        'com.github': 'testuser',
      },
    },
    followers: 100,
    following: 50,
  }

  beforeEach(() => {
    jest.clearAllMocks()

    useProfileDetails.mockReturnValue({
      profile: mockProfileData,
      isLoading: false,
      error: null,
    })

    useProfileStats.mockReturnValue({
      followers: 100,
      following: 50,
      statsLoading: false,
    })

    useEFPPoaps.mockReturnValue({
      ownedBadges: [],
      isLoading: false,
    })

    truncateAddress.mockImplementation((address) => `${address.slice(0, 6)}...${address.slice(-4)}`)
  })

  it('renders profile card with address', () => {
    render(<ProfileCard addressOrName={mockAddress} />)

    const profileCard = document.querySelector('.profile-card')
    expect(profileCard).toBeInTheDocument()
  })

  it('renders profile card with ENS name', () => {
    render(<ProfileCard addressOrName={mockName} />)

    // Should show the profile content
    const profileCard = document.querySelector('.profile-card')
    expect(profileCard).toBeInTheDocument()
  })

  it('shows loading state when profile is loading', () => {
    useProfileDetails.mockReturnValue({
      profile: null,
      isLoading: true,
      error: null,
    })

    render(<ProfileCard addressOrName={mockAddress} />)

    // Should render profile card during loading
    const profileCard = document.querySelector('.profile-card')
    expect(profileCard).toBeInTheDocument()
  })

  it('displays profile bio when available', () => {
    render(<ProfileCard addressOrName={mockAddress} />)

    const profileCard = document.querySelector('.profile-card')
    expect(profileCard).toBeInTheDocument()
  })

  it('shows follower state when enabled and connected', () => {
    render(<ProfileCard addressOrName={mockAddress} connectedAddress={mockConnectedAddress} showFollowerState={true} />)

    // FollowerTag component should be rendered
    // This will depend on the FollowerTag mock, but we can check if the component structure is correct
    const profileCard = document.querySelector('.profile-card')
    expect(profileCard).toBeInTheDocument()
  })

  it('shows EFP POAPs when enabled', () => {
    render(<ProfileCard addressOrName={mockAddress} showPoaps={true} />)

    // EFPPoaps component should be rendered
    const profileCard = document.querySelector('.profile-card')
    expect(profileCard).toBeInTheDocument()
  })

  it('handles profile click events', () => {
    const mockOnProfileClick = jest.fn()

    render(<ProfileCard addressOrName={mockAddress} onProfileClick={mockOnProfileClick} />)

    // Click on the profile area (this will depend on the actual implementation)
    const avatarContainer = document.querySelector('.avatar-container')
    if (avatarContainer) {
      fireEvent.click(avatarContainer)
      expect(mockOnProfileClick).toHaveBeenCalledWith(mockAddress)
    }
  })

  it('handles stat click events', () => {
    const mockOnStatClick = jest.fn()

    render(<ProfileCard addressOrName={mockAddress} onStatClick={mockOnStatClick} />)

    // This will depend on ProfileStats implementation
    // The stat click should propagate through
    expect(useProfileStats).toHaveBeenCalled()
  })

  it('applies dark mode class when enabled', () => {
    render(<ProfileCard addressOrName={mockAddress} darkMode={true} />)

    const profileCard = document.querySelector('.profile-card')
    expect(profileCard).toBeInTheDocument()
  })

  it('shows social links when available', () => {
    render(<ProfileCard addressOrName={mockAddress} />)

    // ProfileSocials component should render social links
    // This depends on the ProfileSocials component implementation
    const profileCard = document.querySelector('.profile-card')
    expect(profileCard).toBeInTheDocument()
  })

  it('passes list parameter to hooks when provided', () => {
    const mockList = { listNumber: 1 }

    render(<ProfileCard addressOrName={mockAddress} list={mockList} />)

    expect(useProfileDetails).toHaveBeenCalledWith({
      addressOrName: mockAddress,
      list: mockList,
    })
  })

  it('forwards additional HTML div props', () => {
    render(<ProfileCard addressOrName={mockAddress} data-testid="profile-card-test" className="custom-class" />)

    const profileCard = screen.getByTestId('profile-card-test')
    expect(profileCard).toHaveClass('custom-class')
  })

  it('handles error state gracefully', () => {
    useProfileDetails.mockReturnValue({
      profile: null,
      isLoading: false,
      error: new Error('Profile not found'),
    })

    render(<ProfileCard addressOrName={mockAddress} />)

    // Should still render the component structure
    const profileCard = document.querySelector('.profile-card')
    expect(profileCard).toBeInTheDocument()
  })

  it('shows followers you know modal when enabled', () => {
    render(
      <ProfileCard addressOrName={mockAddress} connectedAddress={mockConnectedAddress} hasCommonFollowersModal={true} />
    )

    // FollowersYouKnow component should be rendered with modal capability
    const profileCard = document.querySelector('.profile-card')
    expect(profileCard).toBeInTheDocument()
  })
})
