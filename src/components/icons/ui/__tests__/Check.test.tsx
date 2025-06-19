import React from 'react'
import { render, screen } from '@testing-library/react'
import Check from '../Check'

describe('Check Icon', () => {
  it('renders SVG element', () => {
    render(<Check />)

    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('applies default dimensions', () => {
    render(<Check />)

    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('width', '27')
    expect(svg).toHaveAttribute('height', '32')
  })

  it('applies custom dimensions', () => {
    render(<Check width={50} height={40} />)

    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('width', '50')
    expect(svg).toHaveAttribute('height', '40')
  })

  it('applies default color', () => {
    render(<Check />)

    const path = document.querySelector('path')
    expect(path).toHaveAttribute('fill', 'currentColor')
  })

  it('applies custom color', () => {
    render(<Check color="#ff0000" />)

    const path = document.querySelector('path')
    expect(path).toHaveAttribute('fill', '#ff0000')
  })

  it('has correct viewBox', () => {
    render(<Check />)

    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 16 13')
  })

  it('forwards additional SVG props', () => {
    render(<Check className="custom-class" data-testid="check-icon" />)

    const svg = screen.getByTestId('check-icon')
    expect(svg).toHaveClass('custom-class')
  })

  it('has correct SVG namespace', () => {
    render(<Check />)

    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg')
  })

  it('renders path element with correct shape data', () => {
    render(<Check />)

    const path = document.querySelector('path')
    expect(path).toBeInTheDocument()
    expect(path).toHaveAttribute('d')
    expect(path?.getAttribute('d')).toContain('M15.9009 3.00486C15.9009')
  })
})
