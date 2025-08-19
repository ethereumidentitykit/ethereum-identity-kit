import React from 'react'
import { render, screen } from '@testing-library/react'
import Arrow from '../Arrow'

describe('Arrow Icon', () => {
  it('renders SVG element', () => {
    render(<Arrow />)

    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('applies default dimensions', () => {
    render(<Arrow />)

    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('width')
    expect(svg).toHaveAttribute('height')
  })

  it('applies custom dimensions', () => {
    render(<Arrow width={50} height={40} />)

    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('width', '50')
    expect(svg).toHaveAttribute('height', '40')
  })

  it('applies default color', () => {
    render(<Arrow />)

    const coloredElement = document.querySelector('path, circle, line')
    if (coloredElement) {
      // Check if it has any color attribute (stroke, fill, or currentColor)
      const hasColor =
        coloredElement.hasAttribute('stroke') ||
        coloredElement.hasAttribute('fill') ||
        coloredElement.getAttribute('stroke') === 'currentColor' ||
        coloredElement.getAttribute('fill') === 'currentColor'
      expect(hasColor).toBeTruthy()
    }
  })

  it('applies custom color', () => {
    render(<Arrow color="#ff0000" />)

    const coloredElement = document.querySelector('path, circle, line')
    if (coloredElement) {
      // Check if custom color is applied to stroke or fill
      const hasCustomColor =
        coloredElement.getAttribute('stroke') === '#ff0000' || coloredElement.getAttribute('fill') === '#ff0000'
      expect(hasCustomColor).toBeTruthy()
    }
  })

  it('has correct viewBox', () => {
    render(<Arrow />)

    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('viewBox')
  })

  it('forwards additional SVG props', () => {
    render(<Arrow className="custom-class" data-testid="arrow-icon" />)

    const svg = screen.getByTestId('arrow-icon')
    expect(svg).toHaveClass('custom-class')
  })

  it('has correct SVG namespace', () => {
    render(<Arrow />)

    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg')
  })

  it('renders path or shape elements', () => {
    render(<Arrow />)

    const shapeElements = document.querySelectorAll('path, line, polygon, polyline')
    expect(shapeElements.length).toBeGreaterThan(0)
  })
})
