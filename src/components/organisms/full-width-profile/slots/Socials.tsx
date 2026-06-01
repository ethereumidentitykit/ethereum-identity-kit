import React from 'react'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'
import ProfileSocials from '../../../molecules/profile-socials/ProfileSocials'

export const FullWidthProfileSocials: React.FC = () => {
  const { ens, address, showEmptySocials, hideSocials } = useProfileIdentityContext()

  if (!address) {
    return null
  }

  return (
    <ProfileSocials
      userAddress={address}
      records={ens?.records}
      name={ens?.name}
      includeUrls={true}
      style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: '16px' }}
      showEmptySocials={showEmptySocials}
      hideSocials={hideSocials}
    />
  )
}

FullWidthProfileSocials.displayName = 'FullWidthProfile.Socials'
