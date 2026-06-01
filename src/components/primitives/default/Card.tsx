import React from 'react'
import type { EIKCardProps } from '../../../context/componentRegistry.types'

export const DefaultCard = React.forwardRef<HTMLDivElement, EIKCardProps>(({ children, ...props }, ref) => (
  <div ref={ref} {...props}>
    {children}
  </div>
))

DefaultCard.displayName = 'DefaultCard'
