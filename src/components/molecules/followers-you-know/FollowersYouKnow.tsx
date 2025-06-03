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

/**
 * FollowersYouKnow component - displays the common followers between two addresses
 * The component is used to display how many people you follow also follow a given address
 *
 * @param connectedAddress - the address of the connected user
 *
 * @param lookupAddressOrName - the address or ENS name to compare followers with
 *
 * @param displayEmpty (optional) - whether to display the component when there are no common followers
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
  displayEmpty = true,
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

  if (!displayEmpty && resultLength === 0) return null

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
      <div className={clsx('common-followers-container', darkMode && 'dark')}>
        <div className="common-followers-avatars-container">
          {isLoading
            ? new Array(3)
                .fill(null)
                .map((_, index) => (
                  <LoadingCell
                    key={index}
                    height="32px"
                    width="32px"
                    style={{ borderRadius: '50%', transform: `translateX(-${index * 16}px)` }}
                  />
                ))
            : displayedAvatars?.map(({ avatar, address }, index) => (
                <Avatar
                  key={address}
                  src={avatar}
                  address={address}
                  onClick={() => onProfileClick?.(address)}
                  style={{ width: '32px', height: '32px', transform: `translateX(-${index * 16}px)` }}
                />
              ))}
        </div>
        {isLoading ? (
          <LoadingCell height="32px" width="240px" style={{ transform: 'translateX(-32px)' }} />
        ) : (
          <p
            className="common-followers-text-container"
            enable-hover={hasModal ? 'true' : 'false'}
            onClick={() => hasModal && setIsModalOpen(true)}
            style={{ transform: `translateX(-${(displayedAvatars?.length - 1) * 16}px)` }}
          >
            {resultLength === 0 && t('followersYouKnow.noCommon')}
            {displayedNames?.[0] && displayedAddresses?.[0] && (
              <span
                className="common-followers-name"
                onClick={(e) => {
                  e.stopPropagation()
                  onProfileClick?.(displayedAddresses[0])
                }}
              >
                {displayedNames[0]}
              </span>
            )}
            {resultLength === 2 ? ' and ' : resultLength > 2 ? ', ' : ' '}
            {displayedNames?.[1] && displayedAddresses?.[1] && (
              <span
                className="common-followers-name"
                onClick={(e) => {
                  e.stopPropagation()
                  onProfileClick?.(displayedAddresses[1])
                }}
              >
                {displayedNames[1]}
              </span>
            )}
            {resultLength >= 3 && t('followersYouKnow.and')}
            {formatFollowersYouKnowText(resultLength, t)}
          </p>
        )}
      </div>
    </>
  )
}

export default FollowersYouKnow
