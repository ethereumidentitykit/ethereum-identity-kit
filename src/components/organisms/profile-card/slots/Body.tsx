import React from 'react'
import { clsx } from 'clsx'
import { Slottable, isSlotRenderFn } from '../../../primitives'
import { ProfileCardSlotProps } from './slot.types'

export type ProfileCardBodySlotData = {
  className?: string
}

export const ProfileCardBody: React.FC<ProfileCardSlotProps<ProfileCardBodySlotData>> = ({
  asChild,
  className,
  style,
  children,
}) => {
  const mergedClassName = clsx('profile-card-details', className)
  const slotData: ProfileCardBodySlotData = { className: mergedClassName }

  if (isSlotRenderFn(children)) {
    return <>{children(slotData)}</>
  }

  if (asChild) {
    return (
      <Slottable asChild slotProps={{ className: mergedClassName, style }}>
        {children}
      </Slottable>
    )
  }

  return (
    <div className={mergedClassName} style={style}>
      {children}
    </div>
  )
}

ProfileCardBody.displayName = 'ProfileCard.Body'
