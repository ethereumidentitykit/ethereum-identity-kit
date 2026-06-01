import React from 'react'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'
import Avatar from '../../../molecules/avatar/Avatar'

export const FullWidthProfileAvatar: React.FC = () => {
  const { ens, address, onProfileClick } = useProfileIdentityContext()

  if (!address) {
    return null
  }

  return (
    <button
      type="button"
      className="user-profile-avatar-container"
      style={{ border: 'none', padding: 0, background: 'transparent' }}
      onClick={() => onProfileClick?.(address)}
    >
      <Avatar src={ens?.avatar} name={ens?.name || address} />
    </button>
  )
}

FullWidthProfileAvatar.displayName = 'FullWidthProfile.Avatar'
