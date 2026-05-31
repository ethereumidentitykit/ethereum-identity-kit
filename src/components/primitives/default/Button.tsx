import React from 'react'
import type { EIKButtonProps } from '../../../context/componentRegistry.types'

export const DefaultButton = React.forwardRef<HTMLButtonElement, EIKButtonProps>(({ children, ...props }, ref) => (
  <button ref={ref} type="button" {...props}>
    {children}
  </button>
))

DefaultButton.displayName = 'DefaultButton'
