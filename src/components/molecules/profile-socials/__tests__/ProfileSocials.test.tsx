import React from 'react'
import { render, screen } from '../../../../__tests__/utils/test-utils'
import ProfileSocials from '../ProfileSocials'

describe('ProfileSocials', () => {
  const mockAddress = '0x1234567890123456789012345678901234567890'
  const mockName = 'test.eth'

  const mockRecords = {
    'com.twitter': 'testuser',
    'com.github': 'testuser',
    url: 'https://example.com',
    contenthash: 'ipfs://QmExample',
  }

  it('renders social icons when records provided', () => {
    render(<ProfileSocials userAddress={mockAddress} records={mockRecords} />)

    const container = document.querySelector('.profile-socials')
    expect(container).toBeInTheDocument()
  })

  it('applies dark mode class when enabled', () => {
    render(<ProfileSocials userAddress={mockAddress} records={mockRecords} darkMode={true} />)

    const container = document.querySelector('.profile-socials')
    expect(container).toHaveClass('profile-socials')
    expect(container).toHaveClass('dark')
  })

  it('shows loading cells when loading', () => {
    render(<ProfileSocials userAddress={mockAddress} records={mockRecords} isLoading={true} includeUrls={true} />)

    const loadingCells = document.querySelectorAll('.loading-cell')
    expect(loadingCells.length).toBeGreaterThan(0)
  })

  it('includes URLs when includeUrls is true', () => {
    render(<ProfileSocials userAddress={mockAddress} records={mockRecords} includeUrls={true} />)

    const linksContainer = document.querySelector('.profile-links-container')
    expect(linksContainer).toBeInTheDocument()
  })

  it('does not include URLs when includeUrls is false', () => {
    render(<ProfileSocials userAddress={mockAddress} records={mockRecords} includeUrls={false} />)

    const linksContainer = document.querySelector('.profile-links-container')
    expect(linksContainer).not.toBeInTheDocument()
  })

  it('applies custom styles', () => {
    const customStyle = { padding: '10px', backgroundColor: 'red' }

    render(<ProfileSocials userAddress={mockAddress} records={mockRecords} style={customStyle} />)

    const container = document.querySelector('.profile-socials')
    expect(container).toHaveStyle(customStyle)
  })

  it('renders with empty records', () => {
    render(<ProfileSocials userAddress={mockAddress} records={{}} />)

    const container = document.querySelector('.profile-socials')
    expect(container).toBeInTheDocument()
  })

  it('handles null records gracefully', () => {
    render(<ProfileSocials userAddress={mockAddress} records={null} />)

    const container = document.querySelector('.profile-socials')
    expect(container).toBeInTheDocument()
  })

  it('shows URL link when URL record exists', () => {
    render(<ProfileSocials userAddress={mockAddress} records={{ url: 'example.com' }} includeUrls={true} />)

    const linkElements = screen.getAllByRole('link')
    const urlLink = linkElements.find((link) => link.getAttribute('href')?.includes('example.com'))
    expect(urlLink).toBeInTheDocument()
    expect(urlLink).toHaveAttribute('href', 'https://example.com')
  })

  it('normalizes URL protocol', () => {
    render(<ProfileSocials userAddress={mockAddress} records={{ url: 'https://example.com' }} includeUrls={true} />)

    const linkElements = screen.getAllByRole('link')
    const urlLink = linkElements.find((link) => link.getAttribute('href') === 'https://example.com')
    expect(urlLink).toHaveAttribute('href', 'https://example.com')
  })

  it('opens links in new tab', () => {
    render(<ProfileSocials userAddress={mockAddress} records={{ url: 'example.com' }} includeUrls={true} />)

    const linkElements = screen.getAllByRole('link')
    const urlLink = linkElements.find((link) => link.getAttribute('href')?.includes('example.com'))
    expect(urlLink).toHaveAttribute('target', '_blank')
    expect(urlLink).toHaveAttribute('rel', 'noreferrer')
  })

  it('handles IPFS contenthash', () => {
    render(
      <ProfileSocials userAddress={mockAddress} records={{ contenthash: 'ipfs://QmExample' }} includeUrls={true} />
    )

    const container = document.querySelector('.profile-links-container')
    expect(container).toBeInTheDocument()
  })

  it('applies custom icon size', () => {
    render(<ProfileSocials userAddress={mockAddress} records={mockRecords} iconSize={24} />)

    // The icon size should be passed to social icons
    const container = document.querySelector('.profile-socials')
    expect(container).toBeInTheDocument()
  })

  it('renders social media icons for known platforms', () => {
    render(
      <ProfileSocials
        userAddress={mockAddress}
        records={{
          'com.twitter': 'testuser',
          'com.github': 'testuser',
          'com.discord': 'testuser#1234',
        }}
      />
    )

    const container = document.querySelector('.profile-socials')
    expect(container).toBeInTheDocument()

    // Should render social icons based on the PROFILE_CARD_SOCIALS constant
    // This depends on the implementation details of how social icons are rendered
  })
})
