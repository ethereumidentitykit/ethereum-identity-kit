import React from 'react'
import { Slottable, resolveSlotChildren } from '../../../primitives'
import { useProfileCardContext } from '../ProfileCardContext'
import EFPPoaps from '../../../molecules/efp-poaps/EFPPoaps'
import { ProfileCardSlotProps } from './slot.types'

export type ProfileCardPoapsSlotData = {
  addressOrName?: ReturnType<typeof useProfileCardContext>['address']
  isLoading: boolean
  hideEFPPoaps?: boolean
  customPoaps?: ReturnType<typeof useProfileCardContext>['customPoaps']
}

export const ProfileCardPoaps: React.FC<ProfileCardSlotProps<ProfileCardPoapsSlotData>> = ({
  asChild,
  className,
  style,
  children,
}) => {
  const { showPoaps, address, isDetailsLoading, hideEFPPoaps, customPoaps } = useProfileCardContext()

  if (!showPoaps) {
    return null
  }

  const slotData: ProfileCardPoapsSlotData = {
    addressOrName: address,
    isLoading: isDetailsLoading,
    hideEFPPoaps,
    customPoaps,
  }

  const defaultNode = (
    <EFPPoaps
      addressOrName={slotData.addressOrName}
      isLoading={slotData.isLoading}
      hideEFPPoaps={slotData.hideEFPPoaps}
      customPoaps={slotData.customPoaps}
      style={style}
    />
  )

  const content = resolveSlotChildren(children, slotData, defaultNode)

  if (asChild) {
    return (
      <Slottable asChild slotProps={{ className, style }}>
        {content}
      </Slottable>
    )
  }

  return <>{content}</>
}

ProfileCardPoaps.displayName = 'ProfileCard.Poaps'
