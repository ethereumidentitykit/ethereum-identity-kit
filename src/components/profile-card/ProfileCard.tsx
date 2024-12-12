import { ens_beautify } from '@adraffy/ens-normalize'
import { clsx } from 'clsx'
import React from 'react'
import { DEFAULT_FALLBACK_AVATAR } from '../../constants'
import { useProfileDetails } from '../../hooks/useProfileDetails'
import { useProfileStats } from '../../hooks/useProfileStats'
import { Address } from '../../types/address'
import { isAddress, truncateAddress } from '../../utils/address'
import { defaultOnStatClick } from '../../utils/profile'
import Avatar from '../avatar/Avatar'
import FollowerTag from '../follower-tag/FollowerTag'
import Refresh from '../icons/Refresh'
import LoadingCell from '../loading-cell/LoadingCell'
import ProfileSocials from '../profile-socials/ProfileSocials'
import '../profile-stats/ProfileStats.css'
import HeaderImage from './HeaderImage'
import './ProfileCard.css'
import { ProfileCardProps } from './ProfileCard.types'
import { formatNumber } from '../../utils/formatters'
import Ens from '../icons/Ens'

/**
 * Profile Card for an Ethereum Profile. Includes ENS and EFP profile data to be displayed in any Web3 app.
 * Sorry for the long description, but I wanted to make sure it's clear what each prop does,
 * as this is becoming waaaaay to complicated (gotta do something about it 😬).
 * @param addressOrName - Ethereum Address or ENS name to fetch profile data for (required)
 * @param list - Search profile data by list number - will override addressOrName if provided (used in EFP app) (optional)
 * @param connectedAddress - Address of the user connected to the app (optional)
 * @param darkMode - (optional)
 * @param onStatClick - action to be performed when a stat is clicked - default goes to EFP profile with selected stat (optional)
 * @param followButton - Custom follow button component (coming to Ethereum Identity Kit Soon) (optional)
 * @param nameMenu - Extra menu besides the name (used in EFP app) (optional)
 * @param className - string (optional)
 * @param style - CSS Properties (optional)
 * @param profileData - Prefetched profile data - handle loading state externally if provided (optional)
 * @param statsData - Prefetched stats data - handle loading state externally if provided (optional)
 * @param refetchProfileData - Refetch the prefetched profile data (optional)
 * @param refetchStatsData - Refetch the prefetched stats data (optional)
 * @param props - <div> element props (optional)
 * @returns ProfileCard component
 */
const ProfileCard: React.FC<ProfileCardProps> = ({
  addressOrName,
  list,
  connectedAddress,
  darkMode,
  onStatClick = defaultOnStatClick,
  followButton,
  nameMenu,
  className,
  style,
  profileData,
  statsData,
  refetchProfileData,
  refetchStatsData,
  ...props
}) => {
  const { ens, address, primaryList, detailsLoading, refreshProfileDetails } = useProfileDetails({
    addressOrName,
    list,
    prefetchedData: profileData,
    refetchPrefetchedData: refetchProfileData
  })

  const { followers, following, statsLoading, refreshProfileStats } = useProfileStats({
    addressOrName,
    list,
    prefetchedData: statsData,
    refetchPrefetchedData: refetchStatsData
  })

  const isConnectedUserCard = connectedAddress && address && connectedAddress.toLowerCase() === address.toLowerCase()
  const showFollowerTag = connectedAddress && address && !isConnectedUserCard

  return (
    <div
      className={clsx(
        'profile-card',
        darkMode ? 'profile-card-dark' : 'profile-card-light',
        className
      )}
      style={{ fontFamily: 'Inter, sans-serif', ...style }}
      {...props}
    >
      <HeaderImage src={ens?.records?.header} isLoaded={detailsLoading} />
      <div className='profile-card-header'>
        {(list || !detailsLoading) ? (
          <div className='profile-card-header-left'>List #{formatNumber(Number(list || primaryList))}</div>
        ) : <LoadingCell height='24px' width='65px' radius='25px' style={{ marginLeft: '10px' }} />}
        <div className='profile-card-header-right'>
          {isConnectedUserCard ? <a href={`https://app.ens.domains/${ens?.name}`} className='profile-card-header-edit-profile' target='_blank' rel='noopener noreferrer'>
            <Ens height={22} width={22} />
            <p>Edit Profile</p>
          </a> : <div>
          </div>}
          <div
            className='profile-card-header-refresh'
            onClick={() => {
              refreshProfileDetails()
              refreshProfileStats()
            }}
          >
            <Refresh height={16} width={16} />
          </div>
        </div>
      </div>
      <div className='profile-card-details'>
        {detailsLoading ? (
          <LoadingCell height='100px' width='100px' radius='50%' />
        ) : (
          <Avatar
            address={addressOrName}
            src={ens?.avatar}
            fallback={DEFAULT_FALLBACK_AVATAR}
            style={{ width: '100px', height: '100px' }}
          />
        )}
        {detailsLoading ? (
          <LoadingCell height='26px' width='160px' />
        ) : (
          <div className='profile-name-container'>
            <p className='profile-name'>
              {ens?.name
                ? ens_beautify(ens.name)
                : isAddress(addressOrName)
                  ? truncateAddress(addressOrName as Address)
                  : ens_beautify(addressOrName)}
            </p>
            {nameMenu}
          </div>
        )}
        {showFollowerTag && <FollowerTag address={address} list={list} connectedAddress={connectedAddress} />}
        {followButton}
        <div className='profile-bio'>
          {detailsLoading ? (
            <div className='profile-bio-loading'>
              <LoadingCell height='18px' width='210px' />
              <LoadingCell height='18px' width='140px' />
            </div>
          ) : (
            <p className='profile-bio-text'>{ens?.records?.description ? (
              ens.records.description.split(' ').map(word =>
                word.includes('@') ? (
                  <a
                    key={word}
                    href={`https://ethfollow.xyz/${word.replace('@', '')}`}
                    className='profile-bio-link'
                  >
                    {word}{' '}
                  </a>
                ) : (
                  `${word} `
                )
              )
            ) : (
              <i>No bio set</i>
            )}</p>
          )}
          <ProfileSocials
            records={ens?.records}
            name={ens?.name}
            userAddress={address}
            isLoading={detailsLoading}
            includeUrls={true}
            darkMode={darkMode}
          />
        </div>
      </div>
      <div className='profile-stats-container'>
        <div
          className='profile-stats-item'
          onClick={() =>
            onStatClick({ addressOrName: address || addressOrName, stat: 'following' })
          }
        >
          {statsLoading ? (
            <LoadingCell height='24px' width='50px' />
          ) : (
            <div className='profile-stats-item-value'>{following ? formatNumber(following) : '-'}</div>
          )}
          <div className='profile-stats-item-label'>Following</div>
        </div>
        <div
          className='profile-stats-item'
          onClick={() =>
            onStatClick({ addressOrName: address || addressOrName, stat: 'followers' })
          }
        >
          {statsLoading ? (
            <LoadingCell height='24px' width='50px' />
          ) : (
            <div className='profile-stats-item-value'>{followers ? formatNumber(followers) : '-'}</div>
          )}
          <div className='profile-stats-item-label'>Followers</div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
