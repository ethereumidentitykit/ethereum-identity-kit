import React from 'react'
import { useProfileStats } from '../../hooks/useProfileStats'
import { ProfileStatType } from '../../types/profile'
import { formatNumber } from '../../utils'
import { defaultOnStatClick } from '../../utils/profile'
import LoadingCell from '../loading-cell/LoadingCell'
import type { ProfileStatsProps } from './ProfileStats.types'
import './ProfileStats.css'

/**
 * Component for displaying follower and following stats for a given address or list
 * @param addressOrName - Address or ENS name to lookup stats for (required)
 * @param list - List to lookup stats for - will override addressOrName (optional)
 * @param containerDirection - Direction of the container (optional, default: 'row')
 * @param statsDirection - Direction of the stats (optional, default: 'column')
 * @param statsStyle - Style of the stats (optional)
 * @param containerStyle - Style of the container (optional)
 * @param onStatClick - Function to be called when a stat is clicked (optional)
 * @param props - <div> element props
 * @returns ProfileStats component
 */
const ProfileStats: React.FC<ProfileStatsProps> = ({
  addressOrName,
  list,
  containerDirection = 'row',
  statsDirection = 'column',
  statsStyle,
  containerStyle,
  onStatClick = defaultOnStatClick,
}) => {
  const { followers, following, statsLoading } = useProfileStats({ addressOrName, list })

  return (
    <div
      className="profile-stats-container"
      style={{
        flexDirection: containerDirection,
        gap: '32px',
        ...containerStyle,
      }}
    >
      <div
        className="profile-stats-item"
        style={{
          flexDirection: statsDirection,
          ...statsStyle,
        }}
        enable-hover={!!onStatClick}
        onClick={() => onStatClick({ addressOrName: addressOrName, stat: 'followers' })}
      >
        {statsLoading ? (
          <LoadingCell height="24px" width="64px" />
        ) : (
          <div className="profile-stats-item-value">{following ? formatNumber(following) : '-'}</div>
        )}
        <div className="profile-stats-item-label">Following</div>
      </div>
      <div
        className="profile-stats-item"
        style={{
          flexDirection: statsDirection,
          ...statsStyle,
        }}
        enable-hover={!!onStatClick}
        onClick={() => onStatClick({ addressOrName, stat: 'followers' as ProfileStatType })}
      >
        {statsLoading ? (
          <LoadingCell height="24px" width="64px" />
        ) : (
          <div className="profile-stats-item-value">{followers ? formatNumber(followers) : '-'}</div>
        )}
        <div className="profile-stats-item-label">Followers</div>
      </div>
    </div>
  )
}

export default ProfileStats
