import React from 'react'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'
import Bio from '../../profile-card/components/bio'

export const FullWidthProfileBio: React.FC = () => {
  const { ens, onBioLinkClick } = useProfileIdentityContext()

  return (
    <div className="user-profile-bio-container">
      <Bio description={ens?.records?.description} fontSize={18} maxLines={5} onBioLinkClick={onBioLinkClick} />
    </div>
  )
}

FullWidthProfileBio.displayName = 'FullWidthProfile.Bio'
