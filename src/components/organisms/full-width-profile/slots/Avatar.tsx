import React from 'react'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'
import Avatar from '../../../molecules/avatar/Avatar'

export const FullWidthProfileAvatar: React.FC = () => {
  const { ens, address, onProfileClick } = useProfileIdentityContext()

  if (!address) {
    return null
  }

  return (
    <div onClick={() => onProfileClick?.(address)} className="user-profile-avatar-container">
      <Avatar src={ens?.avatar} name={ens?.name || address} className="user-profile-avatar-container" />
    </div>
  )
}

FullWidthProfileAvatar.displayName = 'FullWidthProfile.Avatar'
