import React from 'react'
import { render, screen } from '../../../../__tests__/utils/test-utils'
import FollowerTag from '../FollowerTag'

// Mock the useFollowerState hook
jest.mock('../../../../hooks', () => ({
  useFollowerState: jest.fn(),
}))

const { useFollowerState } = require('../../../../hooks')

describe('FollowerTag', () => {
  const mockAddress = '0x1234567890123456789012345678901234567890'
  const mockConnectedAddress = '0x9876543210987654321098765432109876543210'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders follower tag with text', () => {
    useFollowerState.mockReturnValue({
      followerTag: {
        text: 'Follows you',
        className: 'follows-you',
      },
      isFollowerStateLoading: false,
    })

    render(<FollowerTag addressOrName={mockAddress} connectedAddress={mockConnectedAddress} />)

    expect(screen.getByText('Follows you')).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    useFollowerState.mockReturnValue({
      followerTag: {
        text: 'Blocks you',
        className: 'blocks-you',
      },
      isFollowerStateLoading: false,
    })

    render(<FollowerTag addressOrName={mockAddress} connectedAddress={mockConnectedAddress} />)

    const tag = screen.getByText('Blocks you')
    expect(tag).toHaveClass('follower-tag')
    expect(tag).toHaveClass('blocks-you')
  })

  it('applies custom className', () => {
    useFollowerState.mockReturnValue({
      followerTag: {
        text: 'Mutes you',
        className: 'mutes-you',
      },
      isFollowerStateLoading: false,
    })

    render(<FollowerTag addressOrName={mockAddress} connectedAddress={mockConnectedAddress} className="custom-class" />)

    const tag = screen.getByText('Mutes you')
    expect(tag).toHaveClass('follower-tag')
    expect(tag).toHaveClass('mutes-you')
    expect(tag).toHaveClass('custom-class')
  })

  it('shows loading cell when loading and showLoading is true', () => {
    useFollowerState.mockReturnValue({
      followerTag: null,
      isFollowerStateLoading: true,
    })

    render(<FollowerTag addressOrName={mockAddress} connectedAddress={mockConnectedAddress} showLoading={true} />)

    const loadingCell = document.querySelector('.loading-cell')
    expect(loadingCell).toBeInTheDocument()
  })

  it('shows nothing when loading and showLoading is false', () => {
    useFollowerState.mockReturnValue({
      followerTag: null,
      isFollowerStateLoading: true,
    })

    const { container } = render(
      <FollowerTag addressOrName={mockAddress} connectedAddress={mockConnectedAddress} showLoading={false} />
    )

    expect(container.firstChild).toBeNull()
  })

  it('shows nothing when loading and showLoading is undefined', () => {
    useFollowerState.mockReturnValue({
      followerTag: null,
      isFollowerStateLoading: true,
    })

    const { container } = render(<FollowerTag addressOrName={mockAddress} connectedAddress={mockConnectedAddress} />)

    expect(container.firstChild).toBeNull()
  })

  it('passes correct parameters to useFollowerState hook', () => {
    const mockList = { listNumber: 1 }

    useFollowerState.mockReturnValue({
      followerTag: {
        text: 'Following',
        className: 'following',
      },
      isFollowerStateLoading: false,
    })

    render(<FollowerTag addressOrName={mockAddress} connectedAddress={mockConnectedAddress} list={mockList} />)

    expect(useFollowerState).toHaveBeenCalledWith({
      addressOrName: mockAddress,
      connectedAddress: mockConnectedAddress,
      list: mockList,
    })
  })

  it('forwards additional HTML div props', () => {
    useFollowerState.mockReturnValue({
      followerTag: {
        text: 'Test tag',
        className: 'test-class',
      },
      isFollowerStateLoading: false,
    })

    render(
      <FollowerTag
        addressOrName={mockAddress}
        connectedAddress={mockConnectedAddress}
        data-testid="custom-tag"
        id="follower-tag-id"
      />
    )

    const tag = screen.getByTestId('custom-tag')
    expect(tag).toHaveAttribute('id', 'follower-tag-id')
  })

  it('handles ENS names', () => {
    useFollowerState.mockReturnValue({
      followerTag: {
        text: 'Follows you',
        className: 'follows-you',
      },
      isFollowerStateLoading: false,
    })

    render(<FollowerTag addressOrName="test.eth" connectedAddress={mockConnectedAddress} />)

    expect(useFollowerState).toHaveBeenCalledWith({
      addressOrName: 'test.eth',
      connectedAddress: mockConnectedAddress,
      list: undefined,
    })
  })

  it('renders with correct loading cell dimensions', () => {
    useFollowerState.mockReturnValue({
      followerTag: null,
      isFollowerStateLoading: true,
    })

    render(<FollowerTag addressOrName={mockAddress} connectedAddress={mockConnectedAddress} showLoading={true} />)

    const loadingContainer = document.querySelector('[style*="height: 22px"]')
    expect(loadingContainer).toBeInTheDocument()
    expect(loadingContainer).toHaveStyle({ width: '70px' })
  })
})
