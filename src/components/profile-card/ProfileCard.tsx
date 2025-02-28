import React from 'react'
import { clsx } from 'clsx'
import { ens_beautify } from '@adraffy/ens-normalize'
import { useProfileStats } from '../../hooks/useProfileStats'
import { useProfileDetails } from '../../hooks/useProfileDetails'
import { formatNumber } from '../../utils/formatters'
import { isAddress, truncateAddress } from '../../utils'
import { defaultOnStatClick } from '../../utils/profile'
import Avatar from '../avatar/Avatar'
import HeaderImage from './components/HeaderImage'
import FollowerTag from '../follower-tag/FollowerTag'
import LoadingCell from '../loading-cell/LoadingCell'
import CardHeader from './components/card-header/CardHeader'
import ProfileSocials from '../profile-socials/ProfileSocials'
import CommonFollowers from '../common-followers/CommonFollowers'
import { DEFAULT_FALLBACK_AVATAR } from '../../constants'
import { Address } from '../../types/address'
import { ProfileCardProps } from './ProfileCard.types'
import './ProfileCard.css'

/**
 * Profile Card for an Ethereum Profile. Includes ENS and EFP profile data to be displayed in any Web3 app.
 *
 * @param addressOrName - Ethereum Address or ENS name to fetch profile data for (required)
 *
 * @param list - Search profile data by list number - will override addressOrName if provided (used in EFP app) (optional)
 *
 * @param connectedAddress - Address of the user connected to the app (optional)
 *
 * @param darkMode - (optional)
 *
 * @param showFollowerState - shows follower state tag (follows you, blocks you, mutes you) (optional)
 *
 * @param onStatClick - action to be performed when a stat is clicked - default goes to EFP profile with selected stat (optional)
 *
 * @param options - see ProfileCardOption type for all options (optional)
 *
 * @param className - string (optional)
 *
 * @param style - CSS Properties (optional)
 *
 * @param props - HTML div element props (optional)
 *
 * @returns ProfileCard component
 */
const ProfileCard: React.FC<ProfileCardProps> = ({
  addressOrName,
  list,
  connectedAddress,
  darkMode,
  showFollowerState,
  onProfileClick,
  onStatClick = defaultOnStatClick,
  options,
  className,
  style,
  ...props
}) => {
  const {
    profileData,
    statsData,
    prefetchedStatsLoading,
    refetchProfileData,
    refetchStatsData,
    prefetchedProfileLoading,
    followButton,
    nameMenu,
  } = options || {}

  const { ens, address, primaryList, detailsLoading, refreshProfileDetails } = useProfileDetails({
    addressOrName,
    list,
    prefetchedData: profileData,
    refetchPrefetchedData: refetchProfileData,
  })
  const isDetailsLoading = prefetchedProfileLoading ?? detailsLoading

  const {
    followers,
    following,
    statsLoading: fetchedStatsLoading,
    refreshProfileStats,
  } = useProfileStats({
    addressOrName,
    list,
    prefetchedData: statsData,
    refetchPrefetchedData: refetchStatsData,
  })
  const isStatsLoading = prefetchedStatsLoading ?? fetchedStatsLoading

  const isConnectedUserCard = connectedAddress?.toLowerCase() === address?.toLowerCase()
  const showFollowerTag = showFollowerState && connectedAddress && address && !isConnectedUserCard

  return (
    <div
      className={clsx('profile-card', darkMode ? 'profile-card-dark' : 'profile-card-light', className)}
      data-testid="profile-card"
      style={{ fontFamily: 'Inter, sans-serif', ...style }}
      {...props}
    >
      <HeaderImage src={ens?.records?.header} isLoaded={isDetailsLoading} />
      <CardHeader
        name={ens?.name}
        refetchData={() => {
          refreshProfileDetails()
          refreshProfileStats()
        }}
        isConnectedUserCard={!!isConnectedUserCard}
        list={list}
        primaryList={primaryList}
        detailsLoading={isDetailsLoading}
        nameMenu={nameMenu}
      />
      <div className="profile-card-details">
        <div className="profile-avatar-container">
          {isDetailsLoading ? (
            <LoadingCell height="100px" width="100px" radius="50%" />
          ) : (
            <Avatar
              address={addressOrName}
              src={ens?.avatar}
              fallback={DEFAULT_FALLBACK_AVATAR}
              style={{ width: '100px', height: '100px' }}
              onClick={() => onProfileClick?.(addressOrName)}
            />
          )}
          {followButton}
        </div>
        {isDetailsLoading ? (
          <LoadingCell height="26px" width="160px" />
        ) : (
          <div className="profile-name-container">
            <p
              className="profile-name"
              enable-hover={!!onProfileClick ? 'true' : 'false'}
              onClick={() => onProfileClick?.(addressOrName)}
            >
              {ens?.name
                ? ens_beautify(ens.name)
                : isAddress(addressOrName)
                  ? truncateAddress(addressOrName as Address)
                  : ens_beautify(addressOrName)}
            </p>
            {showFollowerTag && (
              <FollowerTag addressOrName={addressOrName} connectedAddress={connectedAddress} list={list} />
            )}
          </div>
        )}
        <div className="profile-card-stats-container">
          <div
            className="profile-card-stats-item"
            enable-hover={!!onStatClick ? 'true' : 'false'}
            onClick={() => onStatClick({ addressOrName: address || addressOrName, stat: 'following' })}
          >
            {isStatsLoading ? (
              <LoadingCell height="24px" width="50px" />
            ) : (
              <div className="profile-card-stats-item-value">{following ? formatNumber(following) : '-'}</div>
            )}
            <div className="profile-card-stats-item-label">Following</div>
          </div>
          <div
            className="profile-card-stats-item"
            enable-hover={!!onStatClick ? 'true' : 'false'}
            onClick={() => onStatClick({ addressOrName: address || addressOrName, stat: 'followers' })}
          >
            {isStatsLoading ? (
              <LoadingCell height="24px" width="50px" />
            ) : (
              <div className="profile-card-stats-item-value">{followers ? formatNumber(followers) : '-'}</div>
            )}
            <div className="profile-card-stats-item-label">Followers</div>
          </div>
        </div>
        <div className="profile-bio">
          {isDetailsLoading ? (
            <div className="profile-bio-loading">
              <LoadingCell height="18px" width="210px" />
              <LoadingCell height="18px" width="140px" />
            </div>
          ) : (
            <p className="profile-bio-text">
              {ens?.records?.description ? (
                ens.records.description.split(' ').map((word) =>
                  word.includes('@') ? (
                    <a key={word} href={`https://efp.app/${word.replace('@', '')}`} className="profile-bio-link">
                      {word}{' '}
                    </a>
                  ) : (
                    `${word} `
                  )
                )
              ) : (
                <i>No bio set</i>
              )}
            </p>
          )}
          <ProfileSocials
            records={ens?.records}
            name={ens?.name}
            userAddress={address}
            isLoading={isDetailsLoading}
            includeUrls={true}
            darkMode={darkMode}
          />
        </div>
      </div>
      {!isConnectedUserCard && connectedAddress && (
        <CommonFollowers
          connectedAddress={connectedAddress}
          lookupAddressOrName={list ? address || addressOrName : addressOrName}
          displayEmpty={false}
        />
      )}
    </div>
  )
}

export default ProfileCard
