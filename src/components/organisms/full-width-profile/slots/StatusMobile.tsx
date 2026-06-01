import React from 'react'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'

export const FullWidthProfileStatusMobile: React.FC = () => {
  const { ens } = useProfileIdentityContext()

  if (!ens?.records?.status) {
    return null
  }

  return <p className="user-profile-status-mobile">&quot;{ens.records.status}&quot;</p>
}

FullWidthProfileStatusMobile.displayName = 'FullWidthProfile.StatusMobile'
