import clsx from 'clsx'
import { useState } from 'react'
import { useFollowersYouKnow } from '../../../hooks/followers-you-know/useFollowersYouKnow'
import { formatFollowersYouKnowText } from '../../../utils/formatters'
import { useTranslation } from '../../../context/TranslationContext'
import Avatar from '../avatar/Avatar'
import LoadingCell from '../../atoms/loading-cell/LoadingCell'
import { FollowersYouKnowProps } from './FollowersYouKnow.types'
import FollowersYouKnowModal from './components/modal/modal'
import './FollowersYouKnow.css'
import ProfileTooltip from '../../organisms/profile-tooltip/ProfileTooltip'

/**
 * FollowersYouKnow component - displays the common followers between two addresses
 * The component is used to display how many people you follow also follow a given address
 *
 * @param connectedAddress - the address of the connected user
 *
 * @param lookupAddressOrName - the address or ENS name to compare followers with
 *
 * @param showEmpty (optional) - whether to display the component when there are no common followers (no common followers text)
 *
 * @param showLoading (optional) - whether to show the loading skeleton
 *
 * @param onProfileClick (optional) - the function to call when a profile is clicked
 *
 * @param hasModal (optional) - whether to show the modal when the component is clicked
 *
 * @param darkMode (optional) - whether to use dark mode
 *
 * @param selectedList (optional) - the list to use for the common followers
 *
 * @returns FollowersYouKnow component
 */
const FollowersYouKnow: React.FC<FollowersYouKnowProps> = ({
  connectedAddress,
  lookupAddressOrName,
  showEmpty = true,
  showLoading = true,
  onProfileClick,
  hasModal = false,
  darkMode = false,
  selectedList,
}) => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { displayedAvatars, displayedNames, displayedAddresses, resultLength, isLoading } = useFollowersYouKnow(
    connectedAddress,
    lookupAddressOrName
  )

  if (isLoading) {
    if (!showLoading) return null

    return (
      <div
        className={clsx('common-followers-container', darkMode && 'dark')}
        onClick={() => hasModal && setIsModalOpen(true)}
      >
        <div className="common-followers-avatars-container">
          {new Array(3).fill(null).map((_, index) => (
            <LoadingCell
              key={index}
              height="32px"
              width="32px"
              style={{ borderRadius: '50%', transform: `translateX(-${index * 16}px)` }}
            />
          ))}
        </div>
        <LoadingCell height="32px" width="240px" style={{ transform: 'translateX(-32px)' }} />
      </div>
    )
  }

  if (!showEmpty && resultLength === 0) return null

  return (
    <>
      {hasModal && (
        <FollowersYouKnowModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          connectedAddress={connectedAddress}
          lookupAddressOrName={lookupAddressOrName}
          onProfileClick={onProfileClick}
          darkMode={darkMode}
          selectedList={selectedList}
        />
      )}
      <div
        className={clsx('common-followers-container', darkMode && 'dark')}
        onClick={() => hasModal && setIsModalOpen(true)}
      >
        {/* Avatars of first three common followers */}
        <div className="common-followers-avatars-container">
          {displayedAvatars?.map(({ avatar, address }, index) => (
            <ProfileTooltip
              key={address}
              addressOrName={address}
              boundary="viewport"
              verticalPlacement="bottom"
              horizontalPlacement="left"
              verticalOffset={4}
              horizontalOffset={-(index * 16 + 4)}
              showArrow={true}
              keepTooltipOnHover={false}
            >
              <Avatar
                key={address}
                src={avatar}
                address={address}
                onClick={(e) => {
                  if (onProfileClick) {
                    e.stopPropagation()
                    onProfileClick(address)
                  }
                }}
                style={{ width: '32px', height: '32px', transform: `translateX(-${index * 16}px)` }}
              />
            </ProfileTooltip>
          ))}
        </div>

        {/* Text container */}
        <p
          className="common-followers-text-container"
          enable-hover={hasModal ? 'true' : 'false'}
          style={{ transform: `translateX(-${(displayedAvatars?.length - 1) * 16}px)` }}
        >
          {/* No common followers */}
          {resultLength === 0 && t('followersYouKnow.noCommon')}

          {/* Name of first common follower */}
          {displayedNames?.[0] && displayedAddresses?.[0] && (
            <span
              className="common-followers-name"
              style={{ pointerEvents: onProfileClick ? 'auto' : 'none' }}
              onClick={(e) => {
                if (onProfileClick) {
                  e.stopPropagation()
                  onProfileClick(displayedAddresses[0])
                }
              }}
            >
              {displayedNames[0]}
            </span>
          )}

          {/* Separator between first and second common follower */}
          {resultLength === 2 ? t('followersYouKnow.and') : resultLength > 2 ? ', ' : ' '}

          {/* Name of second common follower */}
          {displayedNames?.[1] && displayedAddresses?.[1] && (
            <span
              className="common-followers-name"
              style={{ pointerEvents: onProfileClick ? 'auto' : 'none' }}
              onClick={(e) => {
                if (onProfileClick) {
                  e.stopPropagation()
                  onProfileClick(displayedAddresses[1])
                }
              }}
            >
              {displayedNames[1]}
            </span>
          )}

          {/* Separator between second common followers and number of more common followers */}
          {resultLength >= 3 && t('followersYouKnow.and')}

          {/* Number of more common followers */}
          {formatFollowersYouKnowText(resultLength, t)}
        </p>
      </div>
    </>
  )
}

export default FollowersYouKnow
