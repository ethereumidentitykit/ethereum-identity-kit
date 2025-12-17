import React from 'react'
import clsx from 'clsx'
import { ens_beautify } from '@adraffy/ens-normalize'
import { useProfileDetails, useProfileStats } from '../../../hooks'
import { truncateAddress } from '../../../utils'
import Bio from '../profile-card/components/bio'
import Avatar from '../../molecules/avatar/Avatar'
import HeaderImage from '../profile-card/components/HeaderImage'
import FollowerTag from '../../molecules/follower-tag/FollowerTag'
import LoadingCell from '../../atoms/loading-cell/LoadingCell'
import { DEFAULT_FALLBACK_AVATAR } from '../../../constants'
import { ProfileTooltipProps } from './ProfileTooltip.types'
import ProfileStats from '../../molecules/profile-stats/ProfileStats'
import FollowButton from '../follow-button/FollowButton'
import ProfileSocials from '../../molecules/profile-socials/ProfileSocials'

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
 * @param options - see ProfileCardOption type for all options (optional)
 *
 * @param className - string (optional)
 *
 * @param style - CSS Properties (optional)
 *
 * @param props - HTML div element props (optional)
 *
 *
 * @returns ProfileCard component
 */
const ProfileTooltipCard: React.FC<ProfileTooltipProps> = ({
  addressOrName,
  list,
  connectedAddress,
  darkMode,
  showFollowerState,
  showFollowButton,
  showSocials,
  showEmptySocials,
  showBio = true,
  showStatus,
  onProfileClick = (addressOrname) => {
    window.open(`https://efp.app/${addressOrname}`, '_blank', 'noopener,noreferrer')
  },
  onStatClick,
  extraOptions,
  className,
  style,
  ...props
}) => {
  const { prefetched, customFollowButton } = extraOptions || {}
  const { profile, stats } = prefetched || {}

  const { ens, address, detailsLoading } = useProfileDetails({
    addressOrName,
    list,
    prefetchedData: profile?.data,
  })
  const isDetailsLoading = profile?.isLoading ?? detailsLoading

  const {
    followers,
    following,
    statsLoading: fetchedStatsLoading,
  } = useProfileStats({
    addressOrName,
    list,
    prefetchedData: stats?.data,
  })
  const isStatsLoading = stats?.isLoading ?? fetchedStatsLoading

  const isConnectedUserCard = connectedAddress && address && address?.toLowerCase() === connectedAddress?.toLowerCase()
  const showFollowerTag = showFollowerState && connectedAddress && address && !isConnectedUserCard

  return (
    <div
      className={clsx('tooltip-card', darkMode && 'dark dark-tooltip-card', className)}
      data-testid="tooltip-card"
      style={{ fontFamily: 'Inter, sans-serif', ...style }}
      {...props}
    >
      <HeaderImage
        src={ens?.records?.header}
        isLoading={isDetailsLoading}
        style={{ borderTopLeftRadius: style?.borderRadius, borderTopRightRadius: style?.borderRadius, height: '80px' }}
      />
      <div className="tooltip-details">
        <div className="tooltip-avatar-container">
          {isDetailsLoading ? (
            <LoadingCell height="75px" width="75px" radius="50%" />
          ) : (
            <Avatar
              address={addressOrName}
              src={ens?.avatar}
              name={ens?.name}
              fallback={DEFAULT_FALLBACK_AVATAR}
              style={{ width: '75px', height: '75px' }}
              onClick={() => onProfileClick?.(addressOrName)}
            />
          )}
          {showFollowButton && !isConnectedUserCard
            ? customFollowButton ||
              (address && (
                <div className="tooltip-follow-button">
                  <FollowButton lookupAddress={address} connectedAddress={connectedAddress} />
                </div>
              ))
            : null}
        </div>
        {isDetailsLoading ? (
          <LoadingCell height="26px" width="160px" />
        ) : (
          <div className="tooltip-name-container">
            <p
              className="tooltip-name"
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
          prefetched={{
            stats: {
              followers_count: followers || 0,
              following_count: following || 0,
            },
            isLoading: isStatsLoading,
          }}
          onStatClick={onStatClick}
          fontSize="md"
          gap="20px"
          statsDirection="row"
          containerDirection="row"
        />
        {showStatus && ens?.records?.status && <p className="tooltip-status">&quot;{ens?.records?.status}&quot;</p>}
        <div className="tooltip-bio">
          {showBio &&
            (isDetailsLoading ? (
              <div className="bio-loading">
                <LoadingCell height="18px" width="210px" />
                <LoadingCell height="18px" width="140px" />
              </div>
            ) : (
              <Bio description={ens?.records?.description} maxLines={2} showMore={false} />
            ))}
        </div>
        {showSocials && (
          <ProfileSocials
            records={ens?.records}
            name={ens?.name}
            userAddress={address}
            isLoading={isDetailsLoading}
            showEmptySocials={showEmptySocials}
            hideSocials={extraOptions?.hideSocials}
          />
        )}
      </div>
    </div>
  )
}

export default ProfileTooltipCard
