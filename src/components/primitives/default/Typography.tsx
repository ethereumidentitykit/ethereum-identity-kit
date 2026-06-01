import React from 'react'
import type { EIKTypographyProps } from '../../../context/componentRegistry.types'

export const DefaultTypography: React.FC<EIKTypographyProps> = ({ as: Component = 'p', children, ...props }) => (
  <Component {...props}>{children}</Component>
)

DefaultTypography.displayName = 'DefaultTypography'
