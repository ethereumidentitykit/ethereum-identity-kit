import React from 'react'
import { clsx } from 'clsx'
import { Slottable, isSlottableElement, isSlotRenderFn } from '../../../primitives'
import { ProfileCardAvatar } from './Avatar'
import { ProfileCardConnectButton } from './ConnectButton'
import { ProfileCardSlotProps } from './slot.types'

export type ProfileCardAvatarRowSlotData = {
  className?: string
}

export const ProfileCardAvatarRow: React.FC<ProfileCardSlotProps<ProfileCardAvatarRowSlotData>> = ({
  asChild,
  className,
  style,
  children,
}) => {
  const mergedClassName = clsx('profile-avatar-container', className)
  const slotData: ProfileCardAvatarRowSlotData = { className: mergedClassName }

  const defaultContent = (
    <>
      <ProfileCardAvatar />
      <ProfileCardConnectButton />
    </>
  )

  if (isSlotRenderFn(children)) {
    return <>{children(slotData)}</>
  }

  if (asChild && isSlottableElement(children)) {
    return (
      <Slottable asChild slotProps={{ className: mergedClassName, style }}>
        {children}
      </Slottable>
    )
  }

  if (asChild) {
    return (
      <div className={mergedClassName} style={style}>
        {children ?? defaultContent}
      </div>
    )
  }

  return (
    <div className={mergedClassName} style={style}>
      {children ?? defaultContent}
    </div>
  )
}

ProfileCardAvatarRow.displayName = 'ProfileCard.AvatarRow'
