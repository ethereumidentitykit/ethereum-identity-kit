import React from 'react'
import { clsx } from 'clsx'
import { Slottable, isSlotRenderFn } from '../../../primitives'
import { ProfileCardSlotProps } from './slot.types'

export type ProfileCardBioContainerSlotData = {
  className?: string
}

export const ProfileCardBioContainer: React.FC<ProfileCardSlotProps<ProfileCardBioContainerSlotData>> = ({
  asChild,
  className,
  style,
  children,
}) => {
  const mergedClassName = clsx('profile-bio', className)
  const slotData: ProfileCardBioContainerSlotData = { className: mergedClassName }

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

ProfileCardBioContainer.displayName = 'ProfileCard.BioContainer'
