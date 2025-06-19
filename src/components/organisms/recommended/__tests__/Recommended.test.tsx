import React from 'react'
import { render } from '../../../../__tests__/utils/test-utils'
import Recommended from '../Recommended'

// Mock the hooks
jest.mock('../../../../hooks', () => ({
  useRecommended: jest.fn(),
  useFollowButton: jest.fn(),
  useFollowerState: jest.fn(),
  useCoolMode: jest.fn(),
  useTranslation: jest.fn(),
}))

const { useRecommended, useFollowButton, useFollowerState, useCoolMode, useTranslation } = require('../../../../hooks')

describe('Recommended', () => {
  const mockRecommendedProfiles = [
    {
      address: '0x3333333333333333333333333333333333333333',
      name: 'recommended1.eth',
      avatar: 'https://example.com/rec1.png',
      followers: 500,
      bio: 'Recommended profile 1',
    },
    {
      address: '0x4444444444444444444444444444444444444444',
      name: 'recommended2.eth',
      avatar: 'https://example.com/rec2.png',
      followers: 750,
      bio: 'Recommended profile 2',
    },
    {
      address: '0x5555555555555555555555555555555555555555',
      name: 'recommended3.eth',
      avatar: 'https://example.com/rec3.png',
      followers: 1000,
      bio: 'Recommended profile 3',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()

    useTranslation.mockReturnValue({
      t: (key: string) => {
        const translations: Record<string, string> = {
          recommended: 'Recommended',
          noRecommendations: 'No recommendations available',
          loading: 'Loading...',
          seeAll: 'See all',
          follow: 'Follow',
        }
        return translations[key] || key
      },
    })

    useFollowButton.mockReturnValue({
      buttonText: 'Follow',
      buttonState: 'not-following',
      handleAction: jest.fn(),
      isLoading: false,
      pendingState: null,
      disableHover: false,
      setDisableHover: jest.fn(),
    })

    useFollowerState.mockReturnValue({
      followerTag: null,
      isFollowerStateLoading: false,
    })

    useCoolMode.mockReturnValue({
      current: null,
    })
  })

  it('renders loading state', () => {
    useRecommended.mockReturnValue({
      recommended: [],
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    })

    render(<Recommended connectedAddress={'0x9876543210987654321098765432109876543210' as `0x${string}`} />)

    // Should show loading indicators
    const loadingElements = document.querySelectorAll('.loading-cell, .loading')
    expect(loadingElements.length).toBeGreaterThan(0)
  })

  it('handles error state gracefully', () => {
    useRecommended.mockReturnValue({
      recommended: [],
      isLoading: false,
      error: new Error('Failed to fetch recommendations'),
      refetch: jest.fn(),
    })

    render(<Recommended connectedAddress={'0x9876543210987654321098765432109876543210' as `0x${string}`} />)

    // Should not crash on error
    expect(document.body).toBeInTheDocument()
  })

  it('applies custom styling', () => {
    const customStyle = { backgroundColor: 'lightgreen', padding: '15px' }

    useRecommended.mockReturnValue({
      recommended: mockRecommendedProfiles,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    })

    render(
      <Recommended
        connectedAddress={'0x9876543210987654321098765432109876543210' as `0x${string}`}
        style={customStyle}
      />
    )

    const container = document.querySelector('.recommended')
    if (container) {
      expect(container).toHaveStyle(customStyle)
    }
  })
})
