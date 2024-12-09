import React from 'react'
import './LoadingCell.css'
import { LoadingCellProps } from "./LoadingCell.types"

export const DEFAULT_LOADING_GRADIENT =
  'linear-gradient(90deg, rgba(200, 200, 200, 0.7) 0%, rgba(172, 172, 172, 0.05) 50%, rgba(200, 200, 200, 0.7) 100%)'
export const LIGHT_LOADING_GRADIENT =
  'linear-gradient(90deg, rgba(212, 212, 212, 0.9) 0%, rgba(132, 132, 132, 0.2) 50%, rgba(212, 212, 212, 0.9) 100%)'

const LoadingCell: React.FC<LoadingCellProps> = ({
  gradient = DEFAULT_LOADING_GRADIENT,
  height = '100%',
  width = '100%',
  radius = '5px',
  ...props
}) => {
  return (
    <div style={{ height, width, borderRadius: radius, overflow: 'hidden', ...props.style }} {...props}>
      <div
        style={{ backgroundImage: gradient }}
        className="loading-cell"
      />
    </div>
  )
}

export default LoadingCell