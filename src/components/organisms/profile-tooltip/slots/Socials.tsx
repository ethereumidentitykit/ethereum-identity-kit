import React from 'react'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'
import ProfileSocials from '../../../molecules/profile-socials/ProfileSocials'
import type { ProfileTooltipSlotProps } from './slot.types'

export const ProfileTooltipSocials: React.FC<ProfileTooltipSlotProps> = () => {
  const { ens, address, isDetailsLoading, showEmptySocials, hideSocials, showSocials } = useProfileIdentityContext()

  if (!showSocials) {
    return null
  }

  return (
    <ProfileSocials
      records={ens?.records}
      name={ens?.name}
      userAddress={address}
      isLoading={isDetailsLoading}
      showEmptySocials={showEmptySocials}
      hideSocials={hideSocials}
    />
  )
}

ProfileTooltipSocials.displayName = 'ProfileTooltipCard.Socials'
