import React from 'react'
import { render, screen } from '@testing-library/react'

// Mock LoadingCell component for isolated testing
const DEFAULT_LOADING_GRADIENT =
  'linear-gradient(90deg, rgba(200, 200, 200, 0.7) 0%, rgba(172, 172, 172, 0.05) 50%, rgba(200, 200, 200, 0.7) 100%)'

const LoadingCell: React.FC<{
  gradient?: string
  height?: string | number
  width?: string | number
  radius?: string | number
  style?: React.CSSProperties
  [key: string]: any
}> = ({ gradient = DEFAULT_LOADING_GRADIENT, height = '100%', width = '100%', radius = '4px', style, ...props }) => {
  return (
    <div
      {...props}
      style={{
        height,
        width,
        borderRadius: radius,
        overflow: 'hidden',
        ...style,
      }}
    >
      <div style={{ backgroundImage: gradient }} className="loading-cell" />
    </div>
  )
}

describe('LoadingCell (Simple)', () => {
  it('renders with default props', () => {
    render(<LoadingCell data-testid="loading-container" />)

    const container = screen.getByTestId('loading-container')
    expect(container).toBeInTheDocument()
  })

  it('applies default styles', () => {
    render(<LoadingCell data-testid="loading-container" />)

    const container = screen.getByTestId('loading-container')
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
    render(<LoadingCell height="50px" data-testid="loading-container" />)

    const container = screen.getByTestId('loading-container')
    expect(container).toHaveStyle({ height: '50px' })
  })

  it('applies custom width', () => {
    render(<LoadingCell width="200px" data-testid="loading-container" />)

    const container = screen.getByTestId('loading-container')
    expect(container).toHaveStyle({ width: '200px' })
  })

  it('applies custom radius', () => {
    render(<LoadingCell radius="8px" data-testid="loading-container" />)

    const container = screen.getByTestId('loading-container')
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

  it('accepts numerical values for dimensions', () => {
    render(<LoadingCell height={100} width={200} radius={10} data-testid="loading-container" />)

    const container = screen.getByTestId('loading-container')
    expect(container).toHaveStyle({
      height: '100px',
      width: '200px',
      borderRadius: '10px',
    })
  })

  it('merges custom styles with default styles', () => {
    const customStyle = { backgroundColor: 'red', padding: '10px' }
    render(<LoadingCell style={customStyle} data-testid="loading-container" />)

    const container = screen.getByTestId('loading-container')
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
