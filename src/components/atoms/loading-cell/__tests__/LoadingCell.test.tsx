import React from 'react'
import { render, screen } from '@testing-library/react'
import LoadingCell from '../LoadingCell'

// Mock the constant to avoid importing complex dependencies
const DEFAULT_LOADING_GRADIENT =
  'linear-gradient(90deg, rgba(200, 200, 200, 0.7) 0%, rgba(172, 172, 172, 0.05) 50%, rgba(200, 200, 200, 0.7) 100%)'

describe('LoadingCell', () => {
  it('renders with default props', () => {
    render(<LoadingCell />)

    const container = document.querySelector('div[style*="height: 100%"]')
    expect(container).toBeInTheDocument()
  })

  it('applies default styles', () => {
    render(<LoadingCell />)

    const container = document.querySelector('div[style*="height: 100%"]')
    expect(container).toHaveStyle({
      height: '100%',
      width: '100%',
      borderRadius: '4px',
      overflow: 'hidden',
    })
  })

  it('renders loading cell with default gradient', () => {
    render(<LoadingCell />)

    const loadingDiv = document.querySelector('.loading-cell')
    expect(loadingDiv).toBeInTheDocument()
    expect(loadingDiv).toHaveStyle({
      backgroundImage: DEFAULT_LOADING_GRADIENT,
    })
  })

  it('applies custom height', () => {
    render(<LoadingCell height="50px" />)

    const container = document.querySelector('div[style*="height: 50px"]')
    expect(container).toHaveStyle({ height: '50px' })
  })

  it('applies custom width', () => {
    render(<LoadingCell width="200px" />)

    const container = document.querySelector('div[style*="height: 100%"]')
    expect(container).toHaveStyle({ width: '200px' })
  })

  it('applies custom radius', () => {
    render(<LoadingCell radius="8px" />)

    const container = document.querySelector('div[style*="height: 100%"]')
    expect(container).toHaveStyle({ borderRadius: '8px' })
  })

  it('applies custom gradient', () => {
    const customGradient = 'linear-gradient(90deg, red, blue)'
    render(<LoadingCell gradient={customGradient} />)

    const loadingDiv = document.querySelector('.loading-cell')
    expect(loadingDiv).toHaveStyle({
      backgroundImage: customGradient,
    })
  })

  it('merges custom styles with default styles', () => {
    const customStyle = { backgroundColor: 'red', padding: '10px' }
    render(<LoadingCell style={customStyle} />)

    const container = document.querySelector('div[style*="height: 100%"]')
    expect(container).toHaveStyle({
      backgroundColor: 'red',
      padding: '10px',
      height: '100%',
      width: '100%',
      borderRadius: '4px',
      overflow: 'hidden',
    })
  })

  it('forwards additional HTML div props', () => {
    render(<LoadingCell data-testid="custom-loading-cell" className="custom-class" />)

    const container = screen.getByTestId('custom-loading-cell')
    expect(container).toHaveClass('custom-class')
  })

  it('has correct CSS class on loading animation element', () => {
    render(<LoadingCell />)

    const loadingDiv = document.querySelector('.loading-cell')
    expect(loadingDiv).toHaveClass('loading-cell')
  })
})
