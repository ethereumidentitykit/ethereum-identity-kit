import React from 'react'
import { clsx } from 'clsx'
import { Slottable, resolveSlotChildren } from '../../../primitives'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'
import type { ProfileTooltipSlotProps } from './slot.types'

export type ProfileTooltipStatusSlotData = {
  status?: string
}

export const ProfileTooltipStatus: React.FC<ProfileTooltipSlotProps<ProfileTooltipStatusSlotData>> = ({
  asChild,
  className,
  style,
  children,
}) => {
  const { ens, showStatus } = useProfileIdentityContext()
  const status = ens?.records?.status

  if (!showStatus) {
    return null
  }

  const slotData: ProfileTooltipStatusSlotData = { status }

  if (!status && !children) {
    return null
  }

  const defaultNode = status ? (
    <p className={clsx('tooltip-status', className)} style={style}>
      &quot;{status}&quot;
    </p>
  ) : null

  const content = resolveSlotChildren(children, slotData, defaultNode)

  if (!content) {
    return null
  }

  if (asChild) {
    return (
      <Slottable asChild slotProps={{ className: clsx('tooltip-status', className), style }}>
        {content}
      </Slottable>
    )
  }

  return <>{content}</>
}

ProfileTooltipStatus.displayName = 'ProfileTooltipCard.Status'
