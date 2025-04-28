import React from 'react'
import { clsx } from 'clsx'
import { ens_beautify } from '@adraffy/ens-normalize'
import { useProfileStats } from '../../hooks/profile/useProfileStats'
import { useProfileDetails } from '../../hooks/profile/useProfileDetails'
import { truncateAddress } from '../../utils'
import { defaultOnStatClick } from '../../utils/profile'
import Bio from './components/bio'
import Avatar from '../avatar/Avatar'
import HeaderImage from './components/HeaderImage'
import FollowerTag from '../follower-tag/FollowerTag'
import LoadingCell from '../loading-cell/LoadingCell'
import CardHeader from './components/card-header/CardHeader'
import ProfileSocials from '../profile-socials/ProfileSocials'
import FollowersYouKnow from '../followers-you-know/FollowersYouKnow'
import { DEFAULT_FALLBACK_AVATAR } from '../../constants'
import { ProfileCardProps } from './ProfileCard.types'
import EFPPoaps from '../efp-poaps/EFPPoaps'
import ProfileStats from '../profile-stats/ProfileStats'
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
 * @param showPoaps - shows EFP POAPs on the profile card (optional)
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
 * @param hasCommonFollowersModal - Whether to show the common followers modal (optional)
 *
 * @returns ProfileCard component
 */
const ProfileCard: React.FC<ProfileCardProps> = ({
  addressOrName,
  list,
  connectedAddress,
  darkMode,
  showFollowerState,
  showPoaps,
  onProfileClick,
  onStatClick = defaultOnStatClick,
  options,
  className,
  style,
  selectedList,
  hasCommonFollowersModal = true,
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
    openListSettings,
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
      className={clsx('profile-card', darkMode && 'dark dark-profile-card', className)}
      data-testid="profile-card"
      style={{ fontFamily: 'Inter, sans-serif', ...style }}
      {...props}
    >
      <HeaderImage
        src={ens?.records?.header}
        isLoaded={isDetailsLoading}
        style={{ borderTopLeftRadius: style?.borderRadius, borderTopRightRadius: style?.borderRadius }}
      />
      <CardHeader
        openListSettings={openListSettings}
        name={ens?.name}
        refetchData={() => {
          refreshProfileDetails()
          refreshProfileStats()
        }}
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
              {ens?.name ? ens_beautify(ens.name) : address ? truncateAddress(address) : addressOrName}
            </p>
            {showFollowerTag && (
              <FollowerTag addressOrName={addressOrName} connectedAddress={connectedAddress} list={list} />
            )}
          </div>
        )}
        <ProfileStats
          addressOrName={addressOrName}
          list={list}
          onStatClick={onStatClick}
          prefetchedStats={{
            followers_count: followers || 0,
            following_count: following || 0,
          }}
          isPrefetchedStatsLoading={isStatsLoading}
          fontSize="md"
          gap="20px"
          statsDirection="row"
          containerDirection="row"
        />
        {ens?.records?.status && <p className="profile-status">&quot;{ens?.records?.status}&quot;</p>}
        <div className="profile-bio">
          {isDetailsLoading ? (
            <div className="profile-bio-loading">
              <LoadingCell height="18px" width="210px" />
              <LoadingCell height="18px" width="140px" />
            </div>
          ) : (
            <Bio description={ens?.records?.description} />
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
        <FollowersYouKnow
          connectedAddress={connectedAddress}
          lookupAddressOrName={list ? address || addressOrName : addressOrName}
          displayEmpty={false}
          onProfileClick={onProfileClick}
          hasModal={hasCommonFollowersModal}
          selectedList={selectedList}
        />
      )}
      {showPoaps && <EFPPoaps addressOrName={address} isLoading={isDetailsLoading} />}
    </div>
  )
}

export default ProfileCard
