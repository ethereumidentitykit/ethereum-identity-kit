import React from 'react'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'
import ImageWithFallback from '../../../atoms/image-with-fallback/ImageWithFallback'
import { DEFAULT_FALLBACK_HEADER } from '../../../../constants'
import { validateEnsHeader } from '../../../../utils'

export const FullWidthProfileHeaderBackgroundWide: React.FC = () => {
  const { ens } = useProfileIdentityContext()

  return (
    <div className="user-profile-header-container-ultra-wide">
      <ImageWithFallback
        src={validateEnsHeader(ens?.records?.header, ens?.name)}
        fallback={DEFAULT_FALLBACK_HEADER}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.2,
        }}
      />
    </div>
  )
}

FullWidthProfileHeaderBackgroundWide.displayName = 'FullWidthProfile.HeaderBackgroundWide'
