import React from 'react'
import { Slottable, resolveSlotChildren } from '../../../primitives'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'
import ProfileStats from '../../../molecules/profile-stats/ProfileStats'
import type { ProfileTooltipSlotProps } from './slot.types'

export type ProfileTooltipStatsSlotData = {
  addressOrName: ReturnType<typeof useProfileIdentityContext>['addressOrName']
  list?: ReturnType<typeof useProfileIdentityContext>['list']
  followers: number
  following: number
  isLoading: boolean
  onStatClick: ReturnType<typeof useProfileIdentityContext>['onStatClick']
}

export const ProfileTooltipStats: React.FC<ProfileTooltipSlotProps<ProfileTooltipStatsSlotData>> = ({
  asChild,
  className,
  style,
  children,
}) => {
  const { addressOrName, list, followers, following, isStatsLoading, onStatClick } = useProfileIdentityContext()

  const slotData: ProfileTooltipStatsSlotData = {
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

ProfileTooltipStats.displayName = 'ProfileTooltipCard.Stats'
