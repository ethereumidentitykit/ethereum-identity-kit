import React from 'react'
import { clsx } from 'clsx'
import { Slottable, resolveSlotChildren } from '../../../primitives'
import type { ProfileTooltipSlotProps } from './slot.types'

export const ProfileTooltipBody: React.FC<ProfileTooltipSlotProps> = ({ asChild, className, style, children }) => {
  const defaultNode = <div className={clsx('tooltip-details', className)} style={style} />

  if (asChild) {
    return (
      <Slottable asChild slotProps={{ className: clsx('tooltip-details', className), style }}>
        {resolveSlotChildren(children, undefined, defaultNode)}
      </Slottable>
    )
  }

  return <div className={clsx('tooltip-details', className)} style={style}>{children}</div>
}

ProfileTooltipBody.displayName = 'ProfileTooltipCard.Body'
