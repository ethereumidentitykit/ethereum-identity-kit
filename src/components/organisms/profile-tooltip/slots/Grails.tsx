import React from 'react'
import { useGrailsProfile } from '../../../../hooks'
import LoadingCell from '../../../atoms/loading-cell/LoadingCell'
import { useProfileIdentityContext } from '../../../profile-identity/ProfileIdentityContext'
import type { GrailsProfileResponse } from '../../../../types'
import { ENS as ENSIcon, Grails as GrailsIcon, Ethereum as EthereumIcon } from '../../../icons'
import type { ProfileTooltipSlotProps } from './slot.types'

const formatTimeAgo = (dateString?: string | null) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return 'N/A'

  const diffSeconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (diffSeconds < 60) return 'just now'

  const diffMinutes = Math.floor(diffSeconds / 60)
  if (diffMinutes < 60) return `${diffMinutes}min ago`

  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours}h ago`

  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 7) return `${diffDays}d ago`

  const diffWeeks = Math.floor(diffDays / 7)
  if (diffDays < 30) return `${diffWeeks}w ago`

  const diffMonths = Math.floor(diffDays / 30)
  if (diffDays < 365) return `${diffMonths}mo ago`

  const diffYears = Math.floor(diffDays / 365)
  return `${diffYears}y ago`
}

const getGrailsNameCount = (grailsProfile?: GrailsProfileResponse['data']) => {
  return grailsProfile?.stats?.totalNames ?? grailsProfile?.ownedNames?.length ?? 0
}

export const ProfileTooltipGrails: React.FC<ProfileTooltipSlotProps> = () => {
  const { addressOrName, includeGrails } = useProfileIdentityContext()

  const { data: grailsData, isLoading: isGrailsLoading } = useGrailsProfile({
    addressOrName,
    enabled: Boolean(includeGrails),
  })

  if (!includeGrails) {
    return null
  }

  const grailsProfile = grailsData?.data

  if (!isGrailsLoading && !grailsProfile) {
    return null
  }

  return (
    <div className="tooltip-grails-data">
      {isGrailsLoading ? (
        <div className="grails-loading">
          <LoadingCell height="14px" width="100%" />
          <LoadingCell height="14px" width="100%" />
          <LoadingCell height="14px" width="100%" />
        </div>
      ) : grailsProfile ? (
        <>
          <div className="grails-stat">
            <div className="grails-stat-label-container">
              <GrailsIcon width={14} height={14} />
              <span className="grails-stat-label">Last seen on Grails:</span>
            </div>
            <span className="grails-stat-value">{formatTimeAgo(grailsProfile.lastSeenAt)}</span>
          </div>
          <div className="grails-stat">
            <div className="grails-stat-label-container">
              <EthereumIcon width={14} height={14} />
              <span className="grails-stat-label">Last tx on Ethereum:</span>
            </div>
            <span className="grails-stat-value">{formatTimeAgo(grailsProfile.lastSeenOnchain)}</span>
          </div>
          <div className="grails-stat">
            <div className="grails-stat-label-container">
              <ENSIcon width={14} height={14} color="#0080BC" />
              <span className="grails-stat-label">Number of names they own:</span>
            </div>
            <span className="grails-stat-value">{getGrailsNameCount(grailsProfile)}</span>
          </div>
        </>
      ) : null}
    </div>
  )
}

ProfileTooltipGrails.displayName = 'ProfileTooltipCard.Grails'
