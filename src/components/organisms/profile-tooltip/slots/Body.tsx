import React from 'react'
import { clsx } from 'clsx'
import { Slottable, isSlottableElement, isSlotRenderFn } from '../../../primitives'
import type { ProfileTooltipSlotProps } from './slot.types'

export type ProfileTooltipBodySlotData = {
  className?: string
}

export const ProfileTooltipBody: React.FC<ProfileTooltipSlotProps<ProfileTooltipBodySlotData>> = ({
  asChild,
  className,
  style,
  children,
}) => {
  const mergedClassName = clsx('tooltip-details', className)
  const slotData: ProfileTooltipBodySlotData = { className: mergedClassName }

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

  return (
    <div className={mergedClassName} style={style}>
      {children}
    </div>
  )
}

ProfileTooltipBody.displayName = 'ProfileTooltipCard.Body'
