import React from 'react'
import { Slottable, resolveSlotChildren } from '../../../primitives'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'
import HeaderImage from '../../profile-card/components/HeaderImage'
import type { ProfileTooltipSlotProps } from './slot.types'

export type ProfileTooltipHeaderSlotData = {
  src?: string
  name?: string | null
  isLoading: boolean
  style?: React.CSSProperties
}

export const ProfileTooltipHeader: React.FC<ProfileTooltipSlotProps<ProfileTooltipHeaderSlotData>> = ({
  asChild,
  className,
  style,
  children,
}) => {
  const { ens, isDetailsLoading, style: rootStyle } = useProfileIdentityContext()

  const slotData: ProfileTooltipHeaderSlotData = {
    src: ens?.records?.header,
    name: ens?.name,
    isLoading: isDetailsLoading,
    style: {
      borderTopLeftRadius: rootStyle?.borderRadius,
      borderTopRightRadius: rootStyle?.borderRadius,
      height: '80px',
      ...style,
    },
  }

  const defaultNode = (
    <HeaderImage src={slotData.src} name={slotData.name} isLoading={slotData.isLoading} style={slotData.style} />
  )

  const content = resolveSlotChildren(children, slotData, defaultNode)

  if (asChild) {
    return (
      <Slottable asChild slotProps={{ className, style: slotData.style }}>
        {content}
      </Slottable>
    )
  }

  return <>{content}</>
}

ProfileTooltipHeader.displayName = 'ProfileTooltipCard.Header'
