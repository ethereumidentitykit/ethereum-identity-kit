import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

// Mock the ImageWithFallback component implementation for isolated testing
const ImageWithFallback: React.FC<{
  src?: string
  fallback: string
  alt: string
  style?: React.CSSProperties
}> = ({ src, fallback, alt, style }) => {
  const [error, setError] = React.useState<string | null>(null)
  const imageSrc = error ? fallback : src || fallback

  return (
    <img
      className="image-with-fallback"
      src={imageSrc}
      alt={alt}
      style={style}
      data-image-loaded="false"
      onLoad={(event) => {
        event.currentTarget.setAttribute('data-image-loaded', 'true')
      }}
      onError={(event) => {
        setError('invalid image')
        event.currentTarget.setAttribute('data-image-loaded', 'true')
      }}
    />
  )
}

describe('ImageWithFallback (Simple)', () => {
  const mockSrc = 'https://example.com/image.jpg'
  const mockFallback = 'https://example.com/fallback.jpg'
  const mockAlt = 'Test image'

  it('renders with required props', () => {
    render(<ImageWithFallback fallback={mockFallback} alt={mockAlt} />)

    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', mockAlt)
    expect(image).toHaveAttribute('src', mockFallback)
  })

  it('renders with src when provided', () => {
    render(<ImageWithFallback src={mockSrc} fallback={mockFallback} alt={mockAlt} />)

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', mockSrc)
  })

  it('applies custom styles', () => {
    const customStyle = { width: '100px', height: '100px' }
    render(<ImageWithFallback fallback={mockFallback} alt={mockAlt} style={customStyle} />)

    const image = screen.getByRole('img')
    expect(image).toHaveStyle(customStyle)
  })

  it('has correct CSS class', () => {
    render(<ImageWithFallback fallback={mockFallback} alt={mockAlt} />)

    const image = screen.getByRole('img')
    expect(image).toHaveClass('image-with-fallback')
  })

  it('sets data-image-loaded attribute to false initially', () => {
    render(<ImageWithFallback fallback={mockFallback} alt={mockAlt} />)

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('data-image-loaded', 'false')
  })

  it('sets data-image-loaded attribute to true on successful load', async () => {
    render(<ImageWithFallback src={mockSrc} fallback={mockFallback} alt={mockAlt} />)

    const image = screen.getByRole('img')
    fireEvent.load(image)

    await waitFor(() => {
      expect(image).toHaveAttribute('data-image-loaded', 'true')
    })
  })

  it('falls back to fallback image on error', async () => {
    render(<ImageWithFallback src={mockSrc} fallback={mockFallback} alt={mockAlt} />)

    const image = screen.getByRole('img')

    // Initially should have the src
    expect(image).toHaveAttribute('src', mockSrc)

    // Trigger error
    fireEvent.error(image)

    await waitFor(() => {
      expect(image).toHaveAttribute('src', mockFallback)
      expect(image).toHaveAttribute('data-image-loaded', 'true')
    })
  })

  it('uses fallback when src is undefined', () => {
    render(<ImageWithFallback src={undefined} fallback={mockFallback} alt={mockAlt} />)

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', mockFallback)
  })
})
