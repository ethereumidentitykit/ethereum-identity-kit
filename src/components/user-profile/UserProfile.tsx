import clsx from 'clsx'
import { ens_beautify } from '@adraffy/ens-normalize'
import { truncateAddress } from '../../utils'
import { DEFAULT_FALLBACK_HEADER } from '../../constants'
import { isLinkValid } from '../../utils'
import Avatar from '../avatar/Avatar'
import CommonFollowers from '../common-followers/CommonFollowers'
import FollowerTag from '../follower-tag/FollowerTag'
import ImageWithFallback from '../image-with-fallback/ImageWithFallback'
import Bio from '../profile-card/components/bio'
import ProfileSocials from '../profile-socials/ProfileSocials'
import { UserProfileProps } from './UserProfile.types'
import { ENS } from '../icons'
import { useProfileDetails } from '../../hooks/useProfileDetails'
import EFPPoaps from '../efp-poaps/EFPPoaps'
import MoreOptions from './components/more-options'
import Loading from './components/loading'
import ProfileStats from '../profile-stats/ProfileStats'
import { useIsClient } from '../../hooks/useIsClient'
import ProfileCard from '../profile-card/ProfileCard'
import './UserProfile.css'

/**
 * User Profile for an Ethereum Profile. Includes ENS and EFP profile data to be displayed in any Web3 app.
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
const UserProfile: React.FC<UserProfileProps> = ({
  addressOrName,
  connectedAddress,
  list,
  darkMode,
  role,
  className,
  options,
  showFollowerState,
  onStatClick,
  selectedList,
  onProfileClick,
  showPoaps = true,
  style,
  alignProfileContent = 'center',
}) => {
  const {
    profileData,
    statsData,
    refetchProfileData,
    refetchStatsData,
    prefetchedProfileLoading,
    nameMenu,
    openListSettings,
    followButton,
  } = options || {}
  const isClient = useIsClient()

  const { ens, address, primaryList, detailsLoading, refreshProfileDetails } = useProfileDetails({
    addressOrName,
    list,
    prefetchedData: profileData,
    refetchPrefetchedData: refetchProfileData,
  })
  const isDetailsLoading = prefetchedProfileLoading ?? detailsLoading

  const isConnectedUserCard = connectedAddress?.toLowerCase() === address?.toLowerCase()
  const showFollowerTag = showFollowerState && connectedAddress && address && !isConnectedUserCard

  return (
    <>
      <div className="user-profile-card-container">
        <ProfileCard
          addressOrName={addressOrName}
          list={list}
          connectedAddress={connectedAddress}
          darkMode={darkMode}
          showFollowerState={showFollowerState}
          onProfileClick={onProfileClick}
          onStatClick={onStatClick}
          options={options}
          showPoaps={showPoaps}
          style={{
            width: '100%',
            borderRadius: '0px',
            ...style,
          }}
        />
      </div>
      {isDetailsLoading ? (
        <Loading darkMode={darkMode} style={style} />
      ) : address ? (
        <div className={clsx('user-profile-container', darkMode && 'dark')} style={{ alignItems: alignProfileContent }}>
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
                refetchStatsData?.()
              }}
            />
            <div
              className={clsx('user-profile-status-container', role && 'has-role')}
              style={{
                bottom: `${(typeof style?.paddingBottom === 'string' ? Number(style.paddingBottom.slice(0, -2)) : Number(style?.paddingBottom || 0)) + 24}px`,
              }}
            >
              {ens?.records?.status && <p className="user-profile-status-desktop">&quot;{ens.records.status}&quot;</p>}
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
                      address.toLowerCase() === connectedAddress?.toLowerCase() ||
                        (!!followButton && 'user-profile-name-connected')
                    )}
                  >
                    {ens?.name ? ens_beautify(ens?.name) : truncateAddress(address)}
                  </p>
                  {address.toLowerCase() === connectedAddress?.toLowerCase() ? (
                    <a href={`https://app.ens.domains/${ens?.name}`} target="_blank" rel="noreferrer">
                      <button className="user-profile-edit-profile-button">
                        <ENS height={20} width={20} />
                        <p>Edit Profile</p>
                      </button>
                    </a>
                  ) : (
                    followButton
                  )}
                  {showFollowerTag && (
                    <FollowerTag connectedAddress={connectedAddress} addressOrName={address} list={selectedList} />
                  )}
                </div>
                <div className="user-profile-stats-container">
                  <ProfileStats
                    addressOrName={address}
                    list={list === Number(primaryList) ? undefined : list}
                    prefetchedStats={statsData}
                    containerDirection="row"
                    statsDirection="row"
                    onStatClick={onStatClick}
                  />
                  <div className="user-profile-desktop-common-followers-container">
                    {connectedAddress && !isConnectedUserCard && (
                      <div className="user-profile-common-followers-container">
                        <CommonFollowers
                          connectedAddress={connectedAddress}
                          lookupAddressOrName={address}
                          onProfileClick={onProfileClick}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {ens?.records?.status && <p className="user-profile-status-mobile">&quot;{ens.records.status}&quot;</p>}
                <div className="user-profile-bio-container">
                  <Bio description={ens?.records?.description} fontSize={18} maxLines={5} />
                </div>
                <ProfileSocials
                  userAddress={address}
                  records={ens?.records}
                  name={ens?.name}
                  includeUrls={true}
                  style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: '16px' }}
                />
                <div className="user-profile-mobile-common-followers-container">
                  {connectedAddress && !isConnectedUserCard && (
                    <div className="user-profile-common-followers-container">
                      <CommonFollowers
                        lookupAddressOrName={address}
                        connectedAddress={connectedAddress}
                        onProfileClick={onProfileClick}
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
          <p className="user-profile-error-text">User doesn&apos;t exist</p>
        </div>
      )}
    </>
  )
}

export default UserProfile
