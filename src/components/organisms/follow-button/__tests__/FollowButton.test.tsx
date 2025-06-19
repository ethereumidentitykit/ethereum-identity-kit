import React from 'react'
import { render, screen, fireEvent } from '../../../../__tests__/utils/test-utils'
import FollowButton from '../FollowButton'

// Mock the hooks
jest.mock('../../../../hooks', () => ({
  useFollowButton: jest.fn(),
  useCoolMode: jest.fn(() => ({ ref: { current: null } })),
}))

jest.mock('../../../../context', () => ({
  useTranslation: jest.fn(() => ({
    t: (key: string) => {
      const translations = {
        follow: 'Follow',
        unfollow: 'Unfollow',
        block: 'Block',
        unblock: 'Unblock',
        mute: 'Mute',
        unmute: 'Unmute',
        loading: 'Loading',
      }
      return translations[key as keyof typeof translations] || key
    },
  })),
}))

const { useFollowButton, useCoolMode } = require('../../../../hooks')
const { useTranslation } = require('../../../../context')

describe('FollowButton', () => {
  const mockLookupAddress = '0x1234567890123456789012345678901234567890'
  const mockConnectedAddress = '0x9876543210987654321098765432109876543210'

  beforeEach(() => {
    jest.clearAllMocks()

    // Default mock implementation
    useFollowButton.mockReturnValue({
      buttonText: 'Follow',
      buttonState: 'not-following',
      handleAction: jest.fn(),
      isLoading: false,
      pendingState: null,
      disableHover: false,
      setDisableHover: jest.fn(),
    })

    useCoolMode.mockReturnValue({
      ref: { current: null },
    })
  })

  it('renders follow button with text', () => {
    render(<FollowButton lookupAddress={mockLookupAddress} connectedAddress={mockConnectedAddress} />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('Follow')).toBeInTheDocument()
  })

  it('shows different button states', () => {
    useFollowButton.mockReturnValue({
      buttonText: 'Unfollow',
      buttonState: 'following',
      handleAction: jest.fn(),
      isLoading: false,
      pendingState: null,
      disableHover: false,
      setDisableHover: jest.fn(),
    })

    render(<FollowButton lookupAddress={mockLookupAddress} connectedAddress={mockConnectedAddress} />)

    expect(screen.getByText('Unfollow')).toBeInTheDocument()
  })

  it('shows loading state', () => {
    useFollowButton.mockReturnValue({
      buttonText: 'Follow',
      buttonState: 'not-following',
      handleAction: jest.fn(),
      isLoading: true,
      pendingState: null,
      disableHover: false,
      setDisableHover: jest.fn(),
    })

    render(<FollowButton lookupAddress={mockLookupAddress} connectedAddress={mockConnectedAddress} />)

    // Should show loading indicator instead of text
    const loadingCell = document.querySelector('.loading-cell')
    expect(loadingCell).toBeInTheDocument()
  })

  it('shows custom loader when provided and loading', () => {
    useFollowButton.mockReturnValue({
      buttonText: 'Follow',
      buttonState: 'not-following',
      handleAction: jest.fn(),
      isLoading: true,
      pendingState: null,
      disableHover: false,
      setDisableHover: jest.fn(),
    })

    const customLoader = <div data-testid="custom-loader">Loading...</div>

    render(
      <FollowButton
        lookupAddress={mockLookupAddress}
        connectedAddress={mockConnectedAddress}
        customLoader={customLoader}
      />
    )

    expect(screen.getByTestId('custom-loader')).toBeInTheDocument()
  })

  it('handles button clicks', () => {
    const mockHandleAction = jest.fn()

    useFollowButton.mockReturnValue({
      buttonText: 'Follow',
      buttonState: 'not-following',
      handleAction: mockHandleAction,
      isLoading: false,
      pendingState: null,
      disableHover: false,
      setDisableHover: jest.fn(),
    })

    render(<FollowButton lookupAddress={mockLookupAddress} connectedAddress={mockConnectedAddress} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockHandleAction).toHaveBeenCalledTimes(1)
  })

  it('calls onDisconnectedClick when not connected', () => {
    const mockOnDisconnectedClick = jest.fn()

    render(<FollowButton lookupAddress={mockLookupAddress} onDisconnectedClick={mockOnDisconnectedClick} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockOnDisconnectedClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<FollowButton lookupAddress={mockLookupAddress} connectedAddress={mockConnectedAddress} disabled={true} />)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('applies custom class names', () => {
    const customClassNames = {
      'not-following': 'custom-not-following',
      following: 'custom-following',
      blocking: 'custom-blocking',
      muting: 'custom-muting',
    }

    render(
      <FollowButton
        lookupAddress={mockLookupAddress}
        connectedAddress={mockConnectedAddress}
        customClassNames={customClassNames}
        className="base-class"
      />
    )

    const button = screen.getByRole('button')
    expect(button).toHaveClass('base-class')
    expect(button).toHaveClass('custom-not-following')
  })

  it('passes parameters to useFollowButton hook', () => {
    const mockSelectedList = { listNumber: 1 }
    const mockInitialState = { state: 'following' }

    render(
      <FollowButton
        lookupAddress={mockLookupAddress}
        connectedAddress={mockConnectedAddress}
        selectedList={mockSelectedList}
        initialState={mockInitialState}
      />
    )

    expect(useFollowButton).toHaveBeenCalledWith({
      lookupAddress: mockLookupAddress,
      connectedAddress: mockConnectedAddress,
      selectedList: mockSelectedList,
      initialState: mockInitialState,
    })
  })

  it('forwards additional button props', () => {
    render(
      <FollowButton
        lookupAddress={mockLookupAddress}
        connectedAddress={mockConnectedAddress}
        data-testid="follow-btn"
        id="follow-button"
      />
    )

    const button = screen.getByTestId('follow-btn')
    expect(button).toHaveAttribute('id', 'follow-button')
  })

  it('handles loading state with pending state', () => {
    useFollowButton.mockReturnValue({
      buttonText: 'Follow',
      buttonState: 'not-following',
      handleAction: jest.fn(),
      isLoading: true,
      pendingState: 'following',
      disableHover: false,
      setDisableHover: jest.fn(),
    })

    render(<FollowButton lookupAddress={mockLookupAddress} connectedAddress={mockConnectedAddress} />)

    // Button should show loading state
    const loadingCell = document.querySelector('.loading-cell')
    expect(loadingCell).toBeInTheDocument()
  })
})
