import React from 'react'
import { clsx } from 'clsx'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'
import EFPPoaps from '../../../molecules/efp-poaps/EFPPoaps'

export const FullWidthProfileStatusSection: React.FC = () => {
  const { ens, role, style, address, showPoaps, isDetailsLoading, hideEFPPoaps, customPoaps } =
    useProfileIdentityContext()

  const paddingBottom =
    typeof style?.paddingBottom === 'string'
      ? Number(style.paddingBottom.slice(0, -2))
      : Number(style?.paddingBottom || 0)

  return (
    <div
      className={clsx('user-profile-status-container', role && 'has-role')}
      style={{
        bottom: `${paddingBottom + 24}px`,
      }}
    >
      {ens?.records?.status && <p className="user-profile-status-desktop">&quot;{ens.records.status}&quot;</p>}
      {showPoaps && address && (
        <EFPPoaps
          addressOrName={address}
          isLoading={isDetailsLoading}
          hideEFPPoaps={hideEFPPoaps}
          customPoaps={customPoaps}
        />
      )}
    </div>
  )
}

FullWidthProfileStatusSection.displayName = 'FullWidthProfile.StatusSection'
