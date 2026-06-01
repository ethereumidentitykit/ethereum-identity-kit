import React from 'react'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'
import FollowersYouKnow from '../../../molecules/followers-you-know/FollowersYouKnow'

type CommonFollowersProps = {
  variant: 'desktop' | 'mobile'
}

export const FullWidthProfileCommonFollowers: React.FC<CommonFollowersProps> = ({ variant }) => {
  const { connectedAddress, address, onProfileClick, selectedList, isConnectedUserCard, hasCommonFollowersModal } =
    useProfileIdentityContext()

  if (!connectedAddress || !address || isConnectedUserCard) {
    return null
  }

  if (variant === 'desktop') {
    return (
      <FollowersYouKnow
        connectedAddress={connectedAddress}
        lookupAddressOrName={address}
        onProfileClick={onProfileClick}
        hasModal={hasCommonFollowersModal}
        showEmpty={false}
        selectedList={selectedList}
      />
    )
  }

  return (
    <div className="user-profile-common-followers-container">
      <FollowersYouKnow
        lookupAddressOrName={address}
        connectedAddress={connectedAddress}
        onProfileClick={onProfileClick}
        hasModal={hasCommonFollowersModal}
        showEmpty={false}
        selectedList={selectedList}
      />
    </div>
  )
}

FullWidthProfileCommonFollowers.displayName = 'FullWidthProfile.CommonFollowers'
