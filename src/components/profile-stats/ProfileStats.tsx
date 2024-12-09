import React from 'react'
import './ProfileStats.css'
import type { ProfileStatsProps } from './ProfileStats.types'
import { useProfileStats } from '../../hooks/useProfileStats';
import LoadingCell from '../loading-cell';

const ProfileStats: React.FC<ProfileStatsProps> = ({ userAddress, direction = 'row', statsDirection = 'column', statsStyle, style }) => {
  const { followers, following, statsLoading } = useProfileStats(userAddress)

  return (
    <div className='profile-stats-container' style={{
      flexDirection: direction,
      gap: '32px',
      ...style
    }}>
      <div className='profile-stats-item' style={{
        flexDirection: statsDirection,
        ...statsStyle
      }}>
        {statsLoading ? <LoadingCell height='24px' width='100px' /> : <div className='profile-stats-item-value'>{following}</div>}
        <div className='profile-stats-item-label'>Following</div>
      </div>
      <div className='profile-stats-item' style={{
        flexDirection: statsDirection,
        ...statsStyle
      }}>
        {statsLoading ? <LoadingCell height='24px' width='100px' /> : <div className='profile-stats-item-value'>{followers}</div>}
        <div className='profile-stats-item-label'>Followers</div>
      </div>
    </div>
  )
}

export default ProfileStats
