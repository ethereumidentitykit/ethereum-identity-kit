import React from 'react'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'

export const FullWidthProfileRole: React.FC = () => {
  const { role } = useProfileIdentityContext()

  if (!role) {
    return null
  }

  return <p className="user-profile-role">{role}</p>
}

FullWidthProfileRole.displayName = 'FullWidthProfile.Role'
