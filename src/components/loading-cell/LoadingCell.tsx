import React from 'react'
import './LoadingCell.css'
import { LoadingCellProps } from "./LoadingCell.types"
import { DEFAULT_LOADING_GRADIENT } from '../../constants'

/**
 * LoadingCell component - displays a loading cell
 * @param gradient - the gradient of the loading cell
 * @param height - the height of the loading cell
 * @param width - the width of the loading cell
 * @param radius - the radius of the loading cell
 * @param props - <div> element props
 * @returns LoadingCell component
 */
const LoadingCell: React.FC<LoadingCellProps> = ({
  gradient = DEFAULT_LOADING_GRADIENT,
  height = '100%',
  width = '100%',
  radius = '5px',
  ...props
}) => {
  return (
    <div {...props} style={{ height, width, borderRadius: radius, overflow: 'hidden', ...props.style }} >
      <div
        style={{ backgroundImage: gradient }}
        className="loading-cell"
      />
    </div>
  )
}

export default LoadingCell