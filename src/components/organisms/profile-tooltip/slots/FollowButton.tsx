import React from 'react'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'
import FollowButton from '../../follow-button/FollowButton'
import type { ProfileTooltipSlotProps } from './slot.types'

export const ProfileTooltipFollowButton: React.FC<ProfileTooltipSlotProps> = () => {
  const { showFollowButton, isConnectedUserCard, customFollowButton, address, connectedAddress } =
    useProfileIdentityContext()

  if (!showFollowButton || isConnectedUserCard) {
    return null
  }

  if (customFollowButton) {
    return <div className="tooltip-follow-button">{customFollowButton}</div>
  }

  if (!address) {
    return null
  }

  return (
    <div className="tooltip-follow-button">
      <FollowButton lookupAddress={address} connectedAddress={connectedAddress} />
    </div>
  )
}

ProfileTooltipFollowButton.displayName = 'ProfileTooltipCard.FollowButton'
