import React from 'react'
import type { EIKModalProps } from '../../../context/componentRegistry.types'

export const DefaultModal: React.FC<EIKModalProps> = ({
  overlayClassName,
  containerClassName,
  onOverlayClick,
  overlayStyle,
  containerStyle,
  overlayChildren,
  children,
  ...props
}) => (
  <div className={overlayClassName} style={overlayStyle} onClick={onOverlayClick}>
    {overlayChildren}
    <div
      className={containerClassName}
      style={containerStyle}
      onClick={(event) => event.stopPropagation()}
      {...props}
    >
      {children}
    </div>
  </div>
)

DefaultModal.displayName = 'DefaultModal'
