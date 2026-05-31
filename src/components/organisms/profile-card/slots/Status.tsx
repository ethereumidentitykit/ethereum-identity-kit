import React from 'react'
import { clsx } from 'clsx'
import { Slottable, resolveSlotChildren } from '../../../primitives'
import { useProfileCardContext } from '../ProfileCardContext'
import { ProfileCardSlotProps } from './slot.types'

export type ProfileCardStatusSlotData = {
  status?: string
}

export const ProfileCardStatus: React.FC<ProfileCardSlotProps<ProfileCardStatusSlotData>> = ({
  asChild,
  className,
  style,
  children,
}) => {
  const { ens } = useProfileCardContext()
  const status = ens?.records?.status

  const slotData: ProfileCardStatusSlotData = { status }

  if (!status && !children) {
    return null
  }

  const defaultNode = status ? (
    <p className={clsx('profile-status', className)} style={style}>
      &quot;{status}&quot;
    </p>
  ) : null

  const content = resolveSlotChildren(children, slotData, defaultNode)

  if (!content) {
    return null
  }

  if (asChild) {
    return (
      <Slottable asChild slotProps={{ className: clsx('profile-status', className), style }}>
        {content}
      </Slottable>
    )
  }

  return <>{content}</>
}

ProfileCardStatus.displayName = 'ProfileCard.Status'
