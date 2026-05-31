import React from 'react'
import { Slottable, resolveSlotChildren } from '../../../primitives'
import { useProfileCardContext } from '../ProfileCardContext'
import FollowersYouKnow from '../../../molecules/followers-you-know/FollowersYouKnow'
import { ProfileCardSlotProps } from './slot.types'

export type ProfileCardFollowersYouKnowSlotData = {
  connectedAddress: NonNullable<ReturnType<typeof useProfileCardContext>['connectedAddress']>
  lookupAddressOrName: ReturnType<typeof useProfileCardContext>['addressOrName']
  selectedList?: ReturnType<typeof useProfileCardContext>['selectedList']
  hasCommonFollowersModal: boolean
  onProfileClick?: ReturnType<typeof useProfileCardContext>['onProfileClick']
}

export const ProfileCardFollowersYouKnow: React.FC<ProfileCardSlotProps<ProfileCardFollowersYouKnowSlotData>> = ({
  asChild,
  className,
  style,
  children,
}) => {
  const {
    isConnectedUserCard,
    connectedAddress,
    list,
    address,
    addressOrName,
    onProfileClick,
    hasCommonFollowersModal,
    selectedList,
  } = useProfileCardContext()

  if (isConnectedUserCard || !connectedAddress) {
    return null
  }

  const slotData: ProfileCardFollowersYouKnowSlotData = {
    connectedAddress,
    lookupAddressOrName: list ? address || addressOrName : addressOrName,
    selectedList,
    hasCommonFollowersModal: hasCommonFollowersModal ?? true,
    onProfileClick,
  }

  const defaultNode = (
    <FollowersYouKnow
      connectedAddress={slotData.connectedAddress}
      lookupAddressOrName={slotData.lookupAddressOrName}
      showEmpty={false}
      onProfileClick={slotData.onProfileClick}
      hasModal={slotData.hasCommonFollowersModal}
      selectedList={slotData.selectedList}
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

ProfileCardFollowersYouKnow.displayName = 'ProfileCard.FollowersYouKnow'
