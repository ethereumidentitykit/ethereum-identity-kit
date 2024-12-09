import React from 'react'
import { ens_beautify } from '@adraffy/ens-normalize'
import { useProfileStats } from '../../hooks/useProfileStats';
import { useProfileDetails } from '../../hooks/useProfileDetails';
import { truncateAddress } from '../../utils/truncateAddress';
import Avatar from '../avatar/Avatar';
import LoadingCell from '../loading-cell';
import ProfileSocials from '../profile-socials/ProfileSocials';
import { ProfileCardProps } from './ProfileCard.types';
import { DEFAULT_FALLBACK_AVATAR } from '../../constants';
import Refresh from '../../assets/refresh.png';
import './ProfileCard.css';
import '../profile-stats/ProfileStats.css';

const ProfileCard: React.FC<ProfileCardProps> = ({ userAddress, ...props }) => {
  const { ens, primaryList, detailsLoading, refreshProfileDetails } = useProfileDetails(userAddress)
  const { followers, following, statsLoading, refreshProfileStats } = useProfileStats(userAddress)

  return (
    <div className='profile-card' {...props} style={{ fontFamily: "Inter, sans-serif", ...props.style }}>
      <div className='profile-card-header'>
        <div className='profile-card-header-left'>List #{primaryList}</div>
        <div className='profile-card-header-right' onClick={() => { refreshProfileDetails(); refreshProfileStats() }}>
          <img src={Refresh} alt='refresh' width={16} height={16} />
        </div>
      </div>
      <div className='profile-card-details'>
        {detailsLoading ?
          <LoadingCell height='75px' width='75px' radius='50%' />
          : <Avatar address={userAddress} src={ens?.avatar} fallback={DEFAULT_FALLBACK_AVATAR} style={{ width: '75px', height: '75px' }} />}
        {detailsLoading ?
          <LoadingCell height='26px' width='160px' />
          : <p className='profile-name'>{ens?.name ? ens_beautify(ens.name) : truncateAddress(userAddress)}</p>}
        <div className='profile-bio'>
          {detailsLoading ?
            <div className='profile-bio-loading'>
              <LoadingCell height='18px' width='210px' />
              <LoadingCell height='18px' width='140px' />
            </div>
            : <p className='profile-bio-text'>{ens?.records?.description || 'No bio set'}</p>}
          <ProfileSocials records={ens?.records} name={ens?.name} userAddress={userAddress} isLoading={detailsLoading} />
        </div>
      </div>
      <div className='profile-stats-container'>
        <div className='profile-stats-item'>
          {statsLoading ? <LoadingCell height='24px' width='50px' /> : <div className='profile-stats-item-value'>{following}</div>}
          <div className='profile-stats-item-label'>Following</div>
        </div>
        <div className='profile-stats-item'>
          {statsLoading ? <LoadingCell height='24px' width='50px' /> : <div className='profile-stats-item-value'>{followers}</div>}
          <div className='profile-stats-item-label'>Followers</div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard;
