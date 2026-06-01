import React from 'react'
import { DEFAULT_LOADING_GRADIENT } from '../../../constants'
import { useResolvedComponent } from '../../primitives/resolveComponent'
import { LoadingCellProps } from './LoadingCell.types'
import './LoadingCell.css'

export const LoadingCellBase: React.FC<LoadingCellProps> = ({
  gradient = DEFAULT_LOADING_GRADIENT,
  height = '100%',
  width = '100%',
  radius = '4px',
  ...props
}) => {
  return (
    <div {...props} style={{ height, width, borderRadius: radius, overflow: 'hidden', ...props.style }}>
      <div style={{ backgroundImage: gradient }} className="loading-cell" />
    </div>
  )
}

const LoadingCell: React.FC<LoadingCellProps> = (props) => {
  const ResolvedSkeleton = useResolvedComponent('Skeleton', LoadingCellBase)
  return <ResolvedSkeleton {...props} />
}

export default LoadingCell
