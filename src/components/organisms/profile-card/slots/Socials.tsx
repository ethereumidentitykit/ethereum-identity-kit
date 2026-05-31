import React from 'react'
import { Slottable, resolveSlotChildren } from '../../../primitives'
import { useProfileCardContext } from '../ProfileCardContext'
import ProfileSocials from '../../../molecules/profile-socials/ProfileSocials'
import { ProfileCardSlotProps } from './slot.types'

export type ProfileCardSocialsSlotData = {
  records?: ReturnType<typeof useProfileCardContext>['ens'] extends infer E
    ? E extends { records?: infer R }
      ? R
      : never
    : never
  name?: string
  userAddress?: ReturnType<typeof useProfileCardContext>['address']
  isLoading: boolean
  darkMode?: boolean
  showEmptySocials?: boolean
  hideSocials?: ReturnType<typeof useProfileCardContext>['hideSocials']
}

export const ProfileCardSocials: React.FC<ProfileCardSlotProps<ProfileCardSocialsSlotData>> = ({
  asChild,
  className,
  style,
  children,
}) => {
  const { ens, address, isDetailsLoading, darkMode, showEmptySocials, hideSocials } = useProfileCardContext()

  const slotData: ProfileCardSocialsSlotData = {
    records: ens?.records,
    name: ens?.name,
    userAddress: address,
    isLoading: isDetailsLoading,
    darkMode,
    showEmptySocials,
    hideSocials,
  }

  const defaultNode = (
    <ProfileSocials
      records={slotData.records}
      name={slotData.name}
      userAddress={slotData.userAddress}
      isLoading={slotData.isLoading}
      includeUrls={true}
      darkMode={slotData.darkMode}
      showEmptySocials={slotData.showEmptySocials}
      hideSocials={slotData.hideSocials}
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

ProfileCardSocials.displayName = 'ProfileCard.Socials'
