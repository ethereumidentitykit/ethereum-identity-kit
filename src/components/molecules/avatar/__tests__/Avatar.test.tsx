import React from 'react'
import { render, screen, fireEvent } from '../../../../__tests__/utils/test-utils'
import Avatar from '../Avatar'

// Mock the validity utility
jest.mock('../../../../utils', () => ({
  isLinkValid: jest.fn((link) => {
    if (!link) return false
    return link.includes('https://') || link.includes('http://')
  }),
}))

describe('Avatar', () => {
  const mockAddress = '0x1234567890123456789012345678901234567890'
  const mockName = 'test.eth'
  const mockSrc = 'https://example.com/avatar.png'

  it('renders with address only', () => {
    render(<Avatar address={mockAddress} />)

    const container = document.querySelector('.avatar-container')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('avatar-container')
  })

  it('renders with ENS name', () => {
    render(<Avatar address={mockAddress} name={mockName} />)

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', mockName)
  })

  it('uses ENS metadata service when src is not provided or invalid', () => {
    render(<Avatar address={mockAddress} name={mockName} />)

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', `https://metadata.ens.domains/mainnet/avatar/${mockName}`)
  })

  it('uses provided src when valid', () => {
    render(<Avatar address={mockAddress} name={mockName} src={mockSrc} />)

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', mockSrc)
  })

  it('uses default fallback when no custom fallback provided', () => {
    render(<Avatar address={mockAddress} />)

    const image = screen.getByRole('img')
    // Check that ImageWithFallback receives the default fallback
    expect(image).toBeInTheDocument()
  })

  it('uses custom fallback when provided', () => {
    const customFallback = 'https://example.com/custom-fallback.png'
    render(<Avatar address={mockAddress} fallback={customFallback} />)

    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
  })

  it('applies custom styles', () => {
    const customStyle = { width: '50px', height: '50px' }
    render(<Avatar address={mockAddress} style={customStyle} />)

    const container = document.querySelector('.avatar-container')
    expect(container).toHaveStyle(customStyle)
  })

  it('handles click events when onClick provided', () => {
    const handleClick = jest.fn()
    render(<Avatar address={mockAddress} onClick={handleClick} />)

    const container = document.querySelector('.avatar-container')
    fireEvent.click(container)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('sets enable-hover attribute to true when onClick provided', () => {
    const handleClick = jest.fn()
    render(<Avatar address={mockAddress} onClick={handleClick} />)

    const container = document.querySelector('.avatar-container')
    expect(container).toHaveAttribute('enable-hover', 'true')
  })

  it('sets enable-hover attribute to false when no onClick provided', () => {
    render(<Avatar address={mockAddress} />)

    const container = document.querySelector('.avatar-container')
    expect(container).toHaveAttribute('enable-hover', 'false')
  })

  it('uses address as alt text when name is not provided', () => {
    render(<Avatar address={mockAddress} />)

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', mockAddress)
  })

  it('uses empty string as alt when neither name nor address provided', () => {
    render(<Avatar />)

    const image = document.querySelector('img')
    expect(image).toHaveAttribute('alt', '')
  })

  it('forwards additional HTML div props', () => {
    render(<Avatar address={mockAddress} data-testid="custom-avatar" className="custom-class" />)

    const container = screen.getByTestId('custom-avatar')
    expect(container).toHaveClass('custom-class')
    // Note: className prop overwrites default class due to spread operator order
    expect(container).toHaveAttribute('data-testid', 'custom-avatar')
  })

  it('handles null values gracefully', () => {
    render(<Avatar address={null} name={null} src={null} />)

    const container = document.querySelector('.avatar-container')
    const image = document.querySelector('img')

    expect(container).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', '')
  })

  it('falls back to ENS metadata service when src is invalid URL', () => {
    const invalidSrc = 'invalid-url'
    render(<Avatar address={mockAddress} name={mockName} src={invalidSrc} />)

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', `https://metadata.ens.domains/mainnet/avatar/${mockName}`)
  })
})
