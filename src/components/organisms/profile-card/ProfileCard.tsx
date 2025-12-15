import React from 'react'
import { clsx } from 'clsx'
import { ens_beautify } from '@adraffy/ens-normalize'
import { useProfileDetails, useProfileStats } from '../../../hooks/'
import { useTranslation } from '../../../context/TranslationContext'
import { truncateAddress } from '../../../utils'
import { defaultOnStatClick } from '../../../utils/profile'
import { ENS } from '../../icons'
import Bio from './components/bio'
import Avatar from '../../molecules/avatar/Avatar'
import HeaderImage from './components/HeaderImage'
import FollowerTag from '../../molecules/follower-tag/FollowerTag'
import LoadingCell from '../../atoms/loading-cell/LoadingCell'
import CardHeader from './components/card-header/CardHeader'
import ProfileSocials from '../../molecules/profile-socials/ProfileSocials'
import FollowersYouKnow from '../../molecules/followers-you-know/FollowersYouKnow'
import { DEFAULT_FALLBACK_AVATAR } from '../../../constants'
import { ProfileCardProps } from './ProfileCard.types'
import EFPPoaps from '../../molecules/efp-poaps/EFPPoaps'
import ProfileStats from '../../molecules/profile-stats/ProfileStats'
import FollowButton from '../follow-button/FollowButton'
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
  showEmptySocials,
  showFollowButton,
  onProfileClick,
  onStatClick = defaultOnStatClick,
  extraOptions,
  className,
  style,
  selectedList,
  hasCommonFollowersModal = true,
  ...props
}) => {
  const { t } = useTranslation()

  const { prefetched, customFollowButton, nameMenu, openListSettings } = extraOptions || {}

  const { profile, stats } = prefetched || {}

  const { ens, address, primaryList, detailsLoading, refreshProfileDetails } = useProfileDetails({
    addressOrName,
    list,
    prefetchedData: profile?.data,
    refetchPrefetchedData: profile?.refetch,
  })
  const isDetailsLoading = profile?.isLoading ?? detailsLoading

  const {
    followers,
    following,
    statsLoading: fetchedStatsLoading,
    refreshProfileStats,
  } = useProfileStats({
    addressOrName,
    list,
    prefetchedData: stats?.data,
    refetchPrefetchedData: stats?.refetch,
  })
  const isStatsLoading = stats?.isLoading ?? fetchedStatsLoading

  const isConnectedUserCard = connectedAddress && address && address?.toLowerCase() === connectedAddress?.toLowerCase()
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
        isLoading={isDetailsLoading}
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
              name={ens?.name}
              fallback={DEFAULT_FALLBACK_AVATAR}
              style={{ width: '100px', height: '100px' }}
              onClick={() => onProfileClick?.(addressOrName)}
            />
          )}
          {isConnectedUserCard ? (
            <a
              href={`https://app.ens.domains/${ens?.name}`}
              target="_blank"
              rel="noreferrer"
              className="user-profile-edit-profile-button-container"
            >
              <button className="user-profile-edit-profile-button">
                <ENS height={20} width={20} />
                <p>{t('profile.editProfile')}</p>
              </button>
            </a>
          ) : showFollowButton ? (
            customFollowButton ||
            (address && <FollowButton lookupAddress={address} connectedAddress={connectedAddress} />)
          ) : null}
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
              <FollowerTag lookupAddressOrName={addressOrName} connectedAddress={connectedAddress} list={list} />
            )}
          </div>
        )}
        <ProfileStats
          addressOrName={addressOrName}
          list={list}
          onStatClick={onStatClick}
          prefetched={{
            stats: {
              followers_count: followers || 0,
              following_count: following || 0,
            },
            isLoading: isStatsLoading,
          }}
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
            showEmptySocials={showEmptySocials}
            hideSocials={extraOptions?.hideSocials}
          />
        </div>
      </div>
      {!isConnectedUserCard && connectedAddress && (
        <FollowersYouKnow
          connectedAddress={connectedAddress}
          lookupAddressOrName={list ? address || addressOrName : addressOrName}
          showEmpty={false}
          onProfileClick={onProfileClick}
          hasModal={hasCommonFollowersModal}
          selectedList={selectedList}
        />
      )}
      {showPoaps && (
        <EFPPoaps
          addressOrName={address}
          isLoading={isDetailsLoading}
          hideEFPPoaps={extraOptions?.hideEFPPoaps}
          customPoaps={extraOptions?.customPoaps}
        />
      )}
    </div>
  )
}

export default ProfileCard
