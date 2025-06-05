import clsx from 'clsx'
import React from 'react'
import { useProfileStats } from '../../../hooks'
import { useTranslation } from '../../../context/TranslationContext'
import LoadingCell from '../../atoms/loading-cell/LoadingCell'
import { formatNumber } from '../../../utils'
import { ProfileStatType } from '../../../types/profile'
import { defaultOnStatClick } from '../../../utils/profile'
import type { ProfileStatsProps } from './ProfileStats.types'
import './ProfileStats.css'

/**
 * Component for displaying follower and following stats for a given address or list
 *
 * @param addressOrName - Address or ENS name to lookup stats for (required)
 *
 * @param list - List to lookup stats for - will override addressOrName (optional)
 *
 * @param containerDirection - Direction of the container (optional, default: 'row')
 *
 * @param statsDirection - Direction of the stats (optional, default: 'column')
 *
 * @param fontSize - Font size of the stats (optional, default: 'md')
 *
 * @param gap - Gap between the stats (optional, default: '32px')
 *
 * @param isPrefetchedStatsLoading - Whether the stats are prefetched and loading (optional, default: false)
 *
 * @param onStatClick - Function to be called when a stat is clicked (optional)
 *
 * @param props - HTML div element props
 *
 * @returns ProfileStats component
 */
const ProfileStats: React.FC<ProfileStatsProps> = ({
  list,
  addressOrName,
  fontSize = 'md',
  gap = '32px',
  prefetchedStats,
  statsDirection = 'column',
  containerDirection = 'row',
  isPrefetchedStatsLoading = false,
  onStatClick = defaultOnStatClick,
}) => {
  const { t } = useTranslation()
  const { followers, following, statsLoading } = useProfileStats({
    addressOrName,
    list,
    prefetchedData: prefetchedStats,
  })
  const isLoading = isPrefetchedStatsLoading || statsLoading

  const stats = {
    following: {
      value: following,
      label: t('following'),
    },
    followers: {
      value: followers,
      label: t('followers'),
    },
  }

  return (
    <div
      className="profile-stats-container"
      style={{
        flexDirection: containerDirection,
        gap,
      }}
    >
      {Object.entries(stats).map(([key, { value, label }]) => (
        <div
          key={key}
          className={clsx('profile-stats-item', {
            'profile-stats-item-xs': fontSize === 'xs',
            'profile-stats-item-sm': fontSize === 'sm',
            'profile-stats-item-md': fontSize === 'md',
            'profile-stats-item-lg': fontSize === 'lg',
            'profile-stats-item-xl': fontSize === 'xl',
          })}
          style={{
            flexDirection: statsDirection,
            fontSize,
          }}
          enable-hover={!!onStatClick ? 'true' : 'false'}
          onClick={() => onStatClick({ addressOrName, stat: key as ProfileStatType })}
        >
          {isLoading ? (
            <LoadingCell height="24px" width="64px" />
          ) : (
            <div className="profile-stats-item-value">{value ? formatNumber(value) : '0'}</div>
          )}
          <div className="profile-stats-item-label">{label}</div>
        </div>
      ))}
    </div>
  )
}

export default ProfileStats
