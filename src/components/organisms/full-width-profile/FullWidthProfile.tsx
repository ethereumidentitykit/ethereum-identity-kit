import clsx from 'clsx'
import { ens_beautify } from '@adraffy/ens-normalize'
import { useTranslation } from '../../../context'
import { useIsClient } from '../../../hooks/common/useIsClient'
import { useProfileDetails } from '../../../hooks/profile/useProfileDetails'
import { truncateAddress, isLinkValid } from '../../../utils'
import { ENS } from '../../icons'
import Avatar from '../../molecules/avatar/Avatar'
import Loading from './components/loading'
import EFPPoaps from '../../molecules/efp-poaps/EFPPoaps'
import Bio from '../profile-card/components/bio'
import MoreOptions from './components/more-options'
import FollowerTag from '../../molecules/follower-tag/FollowerTag'
import ProfileCard from '../profile-card/ProfileCard'
import ProfileStats from '../../molecules/profile-stats/ProfileStats'
import ProfileSocials from '../../molecules/profile-socials/ProfileSocials'
import FollowersYouKnow from '../../molecules/followers-you-know/FollowersYouKnow'
import ImageWithFallback from '../../atoms/image-with-fallback/ImageWithFallback'
import { DEFAULT_FALLBACK_HEADER } from '../../../constants'
import { FullWidthProfileProps } from './FullWidthProfile.types'
import FollowButton from '../follow-button/FollowButton'
import './FullWidthProfile.css'

/**
 * Full Width Profile for any Ethereum Profile. Includes ENS and EFP profile data to be displayed in any Web3 app.
 *
 * @param addressOrName - Ethereum Address or ENS name to fetch profile data for (required)
 *
 * @param list - Search profile data by list number - will override addressOrName if provided (used in EFP app) (optional)
 *
 * @param connectedAddress - Address of the user connected to the app (optional)
 *
 * @param darkMode - (optional)
 *
 * @param role - can be used to add any additional information to the profile (used to display roles on https://ethid.org) (optional)
 *
 * @param showFollowerState - shows follower state tag (follows you, blocks you, mutes you) (optional)
 *
 * @param onStatClick - action to be performed when a stat (following, followers) is clicked - default goes to EFP profile with selected stat (optional)
 *
 * @param selectedList - list number selected in you application for the connected user (optional)
 *
 * @param onProfileClick - action to be performed when the profile is clicked (optional)
 *
 * @param showPoaps - shows EFP related poaps on the profile (optional)
 *
 * @param alignProfileContent - can be used to align the profile content when max-width is surpassed (center, start, end) (optional)
 *
 * @param extraOptions - see ProfileCardOption type for all options (optional)
 *
 * @param className - string (optional)
 *
 * @param style - CSS Properties (optional)
 *
 * @param props - HTML div element props (optional)
 *
 * @returns ProfileCard component
 */
const FullWidthProfile: React.FC<FullWidthProfileProps> = ({
  addressOrName,
  connectedAddress,
  list,
  darkMode,
  className,
  extraOptions,
  showFollowerState,
  showFollowButton,
  showEmptySocials,
  onStatClick,
  selectedList,
  onProfileClick,
  showPoaps = true,
  style,
  alignProfileContent = 'center',
}) => {
  const { role, nameMenu, prefetched, openListSettings, customFollowButton } = extraOptions || {}

  const { profile, stats } = prefetched || {}

  const { t } = useTranslation()
  const isClient = useIsClient()

  const { ens, address, primaryList, detailsLoading, refreshProfileDetails } = useProfileDetails({
    addressOrName,
    list,
    prefetchedData: profile?.data,
    refetchPrefetchedData: profile?.refetch,
  })
  const isDetailsLoading = profile?.isLoading || detailsLoading

  const isConnectedUserCard = connectedAddress && address && address?.toLowerCase() === connectedAddress?.toLowerCase()
  const showFollowerTag = showFollowerState && connectedAddress && address && !isConnectedUserCard

  return (
    <>
      <div className="user-profile-card-container">
        <ProfileCard
          addressOrName={addressOrName}
          list={list}
          connectedAddress={connectedAddress}
          darkMode={darkMode}
          showFollowButton={showFollowButton}
          showFollowerState={showFollowerState}
          onProfileClick={onProfileClick}
          onStatClick={onStatClick}
          showEmptySocials={showEmptySocials}
          extraOptions={extraOptions}
          showPoaps={showPoaps}
          style={{
            width: '100%',
            borderRadius: '0px',
            ...style,
          }}
        />
      </div>
      <div className="full-width-profile-container">
        {isDetailsLoading ? (
          <Loading darkMode={darkMode} style={style} />
        ) : address ? (
          <div
            className={clsx('user-profile-container', darkMode && 'dark')}
            style={{ alignItems: alignProfileContent }}
          >
            <div
              id="user-profile"
              className={clsx('user-profile', className)}
              style={{
                ...style,
              }}
            >
              <div className="user-profile-header-container">
                <ImageWithFallback
                  src={isLinkValid(ens?.records?.header) ? ens?.records?.header : DEFAULT_FALLBACK_HEADER}
                  fallback={DEFAULT_FALLBACK_HEADER}
                  alt="Profile Summary Card"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.2,
                  }}
                />
              </div>
              {role && <p className="user-profile-role">{role}</p>}
              <MoreOptions
                profileList={list ?? Number(primaryList)}
                primaryList={primaryList}
                nameMenu={nameMenu}
                openListSettingsModal={openListSettings}
                refetchData={() => {
                  refreshProfileDetails()
                  stats?.refetch?.()
                }}
              />
              <div
                className={clsx('user-profile-status-container', role && 'has-role')}
                style={{
                  bottom: `${(typeof style?.paddingBottom === 'string' ? Number(style.paddingBottom.slice(0, -2)) : Number(style?.paddingBottom || 0)) + 24}px`,
                }}
              >
                {ens?.records?.status && (
                  <p className="user-profile-status-desktop">&quot;{ens.records.status}&quot;</p>
                )}
                {showPoaps && <EFPPoaps addressOrName={address} isLoading={detailsLoading} />}
              </div>
              <div className="user-profile-content">
                <div onClick={() => onProfileClick?.(address)} className="user-profile-avatar-container">
                  <Avatar src={ens?.avatar} name={ens?.name || address} className="user-profile-avatar-container" />
                </div>
                <div className="user-profile-details">
                  <div className="user-profile-name-container">
                    <p
                      className={clsx(
                        'user-profile-name',
                        isConnectedUserCard || (!!customFollowButton && 'user-profile-name-connected')
                      )}
                    >
                      {ens?.name ? ens_beautify(ens?.name) : truncateAddress(address)}
                    </p>
                    {isConnectedUserCard ? (
                      <a href={`https://app.ens.domains/${ens?.name}`} target="_blank" rel="noreferrer">
                        <button className="user-profile-edit-profile-button">
                          <ENS height={20} width={20} />
                          <p>{t('profile.editProfile')}</p>
                        </button>
                      </a>
                    ) : showFollowButton ? (
                      customFollowButton || <FollowButton lookupAddress={address} connectedAddress={connectedAddress} />
                    ) : null}
                    {showFollowerTag && (
                      <FollowerTag
                        connectedAddress={connectedAddress}
                        lookupAddressOrName={address}
                        list={selectedList}
                      />
                    )}
                  </div>
                  <div className="user-profile-stats-container">
                    <ProfileStats
                      addressOrName={address}
                      list={list === Number(primaryList) ? undefined : list}
                      prefetched={{
                        stats: stats?.data,
                        isLoading: stats?.isLoading || false,
                      }}
                      containerDirection="row"
                      statsDirection="row"
                      fontSize="lg"
                      onStatClick={onStatClick}
                    />
                    <div className="user-profile-desktop-common-followers-container">
                      {connectedAddress && !isConnectedUserCard && (
                        <div className="user-profile-common-followers-container">
                          <FollowersYouKnow
                            connectedAddress={connectedAddress}
                            lookupAddressOrName={address}
                            onProfileClick={onProfileClick}
                            hasModal={true}
                            showEmpty={false}
                            selectedList={selectedList}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {ens?.records?.status && (
                    <p className="user-profile-status-mobile">&quot;{ens.records.status}&quot;</p>
                  )}
                  <div className="user-profile-bio-container">
                    <Bio description={ens?.records?.description} fontSize={18} maxLines={5} />
                  </div>
                  <ProfileSocials
                    userAddress={address}
                    records={ens?.records}
                    name={ens?.name}
                    includeUrls={true}
                    style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: '16px' }}
                    showEmptySocials={showEmptySocials}
                  />
                  <div className="user-profile-mobile-common-followers-container">
                    {connectedAddress && !isConnectedUserCard && (
                      <div className="user-profile-common-followers-container">
                        <FollowersYouKnow
                          lookupAddressOrName={address}
                          connectedAddress={connectedAddress}
                          onProfileClick={onProfileClick}
                          hasModal={true}
                          showEmpty={false}
                          selectedList={selectedList}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="user-profile-header-container-ultra-wide"
              style={{ height: isClient ? document.getElementById('user-profile')?.clientHeight : 420 }}
            >
              <ImageWithFallback
                src={isLinkValid(ens?.records?.header) ? ens?.records?.header : DEFAULT_FALLBACK_HEADER}
                fallback={DEFAULT_FALLBACK_HEADER}
                alt="Profile Summary Card"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.2,
                }}
              />
            </div>
          </div>
        ) : (
          <div className={clsx('user-profile-error-container', darkMode && 'dark')}>
            <p className="user-profile-error-text">{t('profile.noUser')}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default FullWidthProfile
