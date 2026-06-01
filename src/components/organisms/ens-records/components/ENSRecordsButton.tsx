import React from 'react'
import { clsx } from 'clsx'
import { useResolvedComponent } from '../../../primitives/resolveComponent'
import { DefaultButton } from '../../../primitives/default'
import type { EIKButtonProps } from '../../../../context/componentRegistry.types'

export type ENSRecordsButtonProps = EIKButtonProps & {
  variant?: 'primary' | 'neutral'
}

export const ENSRecordsButton: React.FC<ENSRecordsButtonProps> = ({
  variant = 'primary',
  className,
  children,
  ...props
}) => {
  const Button = useResolvedComponent('Button', DefaultButton)

  return (
    <Button
      type="button"
      className={clsx(
        'ens-modal-btn',
        variant === 'primary' && 'ens-modal-btn--primary',
        variant === 'neutral' && 'ens-modal-btn--neutral',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}
