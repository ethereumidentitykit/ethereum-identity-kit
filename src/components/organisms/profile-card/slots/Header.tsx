import React from 'react'
import { Slottable, resolveSlotChildren } from '../../../primitives'
import { useProfileCardContext } from '../ProfileCardContext'
import HeaderImage from '../components/HeaderImage'
import { ProfileCardSlotProps } from './slot.types'

export type ProfileCardHeaderSlotData = {
  src?: string
  name?: string | null
  isLoading: boolean
  style?: React.CSSProperties
}

export const ProfileCardHeader: React.FC<ProfileCardSlotProps<ProfileCardHeaderSlotData>> = ({
  asChild,
  className,
  style,
  children,
}) => {
  const { ens, isDetailsLoading, style: rootStyle } = useProfileCardContext()

  const slotData: ProfileCardHeaderSlotData = {
    src: ens?.records?.header,
    name: ens?.name,
    isLoading: isDetailsLoading,
    style: {
      borderTopLeftRadius: rootStyle?.borderRadius,
      borderTopRightRadius: rootStyle?.borderRadius,
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

ProfileCardHeader.displayName = 'ProfileCard.Header'
