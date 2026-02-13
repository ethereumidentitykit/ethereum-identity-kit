import React from 'react'
import { render, screen } from '@testing-library/react'
import Cross from '../Cross'

describe('Cross Icon', () => {
  it('renders SVG element', () => {
    render(<Cross />)

    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('applies default dimensions', () => {
    render(<Cross />)

    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('width', '27')
    expect(svg).toHaveAttribute('height', '32')
  })

  it('applies custom dimensions', () => {
    render(<Cross width={50} height={40} />)

    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('width', '50')
    expect(svg).toHaveAttribute('height', '40')
  })

  it('applies default color to stroke', () => {
    render(<Cross />)

    const paths = document.querySelectorAll('path')
    paths.forEach((path) => {
      expect(path).toHaveAttribute('stroke', 'currentColor')
    })
  })

  it('applies custom color to stroke', () => {
    render(<Cross color="#ff0000" />)

    const paths = document.querySelectorAll('path')
    paths.forEach((path) => {
      expect(path).toHaveAttribute('stroke', '#ff0000')
    })
  })

  it('has correct viewBox', () => {
    render(<Cross />)

    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 26 26')
  })

  it('renders two path elements for cross lines', () => {
    render(<Cross />)

    const paths = document.querySelectorAll('path')
    expect(paths).toHaveLength(2)
  })

  it('has correct stroke properties on paths', () => {
    render(<Cross />)

    const paths = document.querySelectorAll('path')
    paths.forEach((path) => {
      expect(path).toHaveAttribute('stroke-width', '5')
      expect(path).toHaveAttribute('stroke-linecap', 'round')
    })
  })

  it('forwards additional SVG props', () => {
    render(<Cross className="custom-class" data-testid="cross-icon" />)

    const svg = screen.getByTestId('cross-icon')
    expect(svg).toHaveClass('custom-class')
  })

  it('has correct SVG namespace', () => {
    render(<Cross />)

    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg')
  })
})
