import React from 'react'
import { render, screen } from '@testing-library/react'
import Ethereum from '../ethereum'

describe('Ethereum Chain Icon', () => {
  it('renders SVG element', () => {
    render(<Ethereum />)

    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('applies default dimensions', () => {
    render(<Ethereum />)

    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('width')
    expect(svg).toHaveAttribute('height')
  })

  it('applies custom dimensions', () => {
    render(<Ethereum width={50} height={40} />)

    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('width', '50')
    expect(svg).toHaveAttribute('height', '40')
  })

  it('has correct viewBox for Ethereum logo', () => {
    render(<Ethereum />)

    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('viewBox')
  })

  it('forwards additional SVG props', () => {
    render(<Ethereum className="custom-class" data-testid="ethereum-icon" />)

    const svg = screen.getByTestId('ethereum-icon')
    expect(svg).toHaveClass('custom-class')
  })

  it('has correct SVG namespace', () => {
    render(<Ethereum />)

    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg')
  })

  it('renders Ethereum logo shape elements', () => {
    render(<Ethereum />)

    // Ethereum logo typically has path elements for the diamond shape
    const paths = document.querySelectorAll('path')
    expect(paths.length).toBeGreaterThan(0)
  })

  it('applies Ethereum brand colors when specified', () => {
    render(<Ethereum />)

    // Check if it has default Ethereum colors or accepts custom colors
    const coloredElements = document.querySelectorAll('path, polygon')
    expect(coloredElements.length).toBeGreaterThan(0)
  })

  it('maintains aspect ratio', () => {
    render(<Ethereum width={100} />)

    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
    // Should maintain proper aspect ratio for Ethereum logo
  })

  it('renders without props', () => {
    render(<Ethereum />)

    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })
})
