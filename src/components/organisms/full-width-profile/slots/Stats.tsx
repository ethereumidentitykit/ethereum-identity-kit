import React from 'react'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'
import ProfileStats from '../../../molecules/profile-stats/ProfileStats'
import { FullWidthProfileCommonFollowers } from './CommonFollowers'

export const FullWidthProfileStats: React.FC = () => {
  const {
    address,
    list,
    primaryList,
    onStatClick,
    prefetched,
    isConnectedUserCard,
    connectedAddress,
  } = useProfileIdentityContext()

  if (!address) {
    return null
  }

  return (
    <div className="user-profile-stats-container">
      <ProfileStats
        addressOrName={address}
        list={list === Number(primaryList) ? undefined : list}
        prefetched={{
          stats: prefetched?.stats?.data,
          isLoading: prefetched?.stats?.isLoading || false,
        }}
        containerDirection="row"
        statsDirection="row"
        fontSize="lg"
        onStatClick={onStatClick}
      />
      <div className="user-profile-desktop-common-followers-container">
        {connectedAddress && !isConnectedUserCard && (
          <div className="user-profile-common-followers-container">
            <FullWidthProfileCommonFollowers variant="desktop" />
          </div>
        )}
      </div>
    </div>
  )
}

FullWidthProfileStats.displayName = 'FullWidthProfile.Stats'
