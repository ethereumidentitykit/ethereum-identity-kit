import React from 'react'
import { Slottable, resolveSlotChildren } from '../../../primitives'
import { useProfileCardContext } from '../ProfileCardContext'
import ProfileStats from '../../../molecules/profile-stats/ProfileStats'
import { ProfileCardSlotProps } from './slot.types'

export type ProfileCardStatsSlotData = {
  addressOrName: ReturnType<typeof useProfileCardContext>['addressOrName']
  list?: ReturnType<typeof useProfileCardContext>['list']
  followers: number
  following: number
  isLoading: boolean
  onStatClick: ReturnType<typeof useProfileCardContext>['onStatClick']
}

export const ProfileCardStats: React.FC<ProfileCardSlotProps<ProfileCardStatsSlotData>> = ({
  asChild,
  className,
  style,
  children,
}) => {
  const { addressOrName, list, followers, following, isStatsLoading, onStatClick } = useProfileCardContext()

  const slotData: ProfileCardStatsSlotData = {
    addressOrName,
    list,
    followers: followers || 0,
    following: following || 0,
    isLoading: isStatsLoading,
    onStatClick,
  }

  const defaultNode = (
    <ProfileStats
      addressOrName={addressOrName}
      list={list}
      onStatClick={onStatClick}
      prefetched={{
        stats: {
          followers_count: slotData.followers,
          following_count: slotData.following,
        },
        isLoading: slotData.isLoading,
      }}
      fontSize="md"
      gap="20px"
      statsDirection="row"
      containerDirection="row"
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

ProfileCardStats.displayName = 'ProfileCard.Stats'
