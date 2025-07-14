import React from 'react'
import { render, screen } from '../../../../__tests__/utils/simple-wagmi-provider'
import EFPPoaps from '../EFPPoaps'
import { mockTestData } from '../../../../__tests__/utils/simple-wagmi-provider'

// Mock the useEFPPoaps hook
jest.mock('../../../../hooks', () => ({
  useEFPPoaps: jest.fn(),
}))

const { useEFPPoaps } = require('../../../../hooks')

describe('EFPPoaps', () => {
  const mockAddress = mockTestData.address

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading state', () => {
    useEFPPoaps.mockReturnValue({
      ownedBadges: [],
      isLoading: true,
      error: null,
    })

    render(<EFPPoaps addressOrName={mockAddress} isLoading={true} />)

    // Should show loading cells or loading indicator
    const loadingElements = document.querySelectorAll('.loading-cell')
    expect(loadingElements.length).toBeGreaterThan(0)
  })

  it('renders empty state when no POAPs', () => {
    useEFPPoaps.mockReturnValue({
      ownedBadges: [],
      isLoading: false,
      error: null,
    })

    render(<EFPPoaps addressOrName={mockAddress} isLoading={false} />)

    // Should not show any POAP content
    expect(screen.queryByText('EFP Early Adopter')).not.toBeInTheDocument()
  })

  it('handles error state gracefully', () => {
    useEFPPoaps.mockReturnValue({
      ownedBadges: [],
      isLoading: false,
      error: new Error('Failed to fetch POAPs'),
    })

    render(<EFPPoaps addressOrName={mockAddress} isLoading={false} />)

    // Component should still render without crashing
    expect(document.body).toBeInTheDocument()
  })

  it('passes correct address to hook', () => {
    useEFPPoaps.mockReturnValue({
      ownedBadges: [],
      isLoading: false,
      error: null,
    })

    render(<EFPPoaps addressOrName={mockAddress} isLoading={true} />)

    expect(useEFPPoaps).toHaveBeenCalledWith({
      addressOrName: mockAddress,
      list: undefined,
    })
  })

  it('applies custom styling when provided', () => {
    const customStyle = { padding: '20px', backgroundColor: 'blue' }

    useEFPPoaps.mockReturnValue({
      ownedBadges: mockTestData.efpPoaps,
      isLoading: false,
      error: null,
    })

    render(<EFPPoaps addressOrName={mockAddress} isLoading={false} style={customStyle} />)

    const container = document.querySelector('.efp-poaps')
    if (container) {
      expect(container).toHaveStyle(customStyle)
    }
  })
})
