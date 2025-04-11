import { useCommonFollowers } from '../../hooks/useCommonFollowers'
import { formatCommonFollowersText } from '../../utils/formatters'
import Avatar from '../avatar/Avatar'
import LoadingCell from '../loading-cell/LoadingCell'
import { CommonFollowersProps } from './CommonFollowers.types'
import './CommonFollowers.css'
import { useState } from 'react'
import CommonFollowersModal from './components/modal/CommonFollowersModal'

/**
 * CommonFollowers component - displays the common followers between two addresses
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
 * @returns CommonFollowers component
 */
const CommonFollowers: React.FC<CommonFollowersProps> = ({
  connectedAddress,
  lookupAddressOrName,
  displayEmpty = true,
  onProfileClick,
  hasModal = false,
  darkMode = false,
  selectedList,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { displayedAvatars, displayedNames, resultLength, isLoading } = useCommonFollowers(
    connectedAddress,
    lookupAddressOrName
  )

  if (!displayEmpty && resultLength === 0) return null

  return (
    <>
      {hasModal && (
        <CommonFollowersModal
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
        className={`common-followers-container ${darkMode ? 'dark' : ''}`}
        enable-hover={hasModal ? 'true' : 'false'}
        onClick={() => hasModal && setIsModalOpen(true)}
      >
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
                onClick={() => !hasModal && onProfileClick?.(address)}
                style={{ width: '32px', height: '32px', transform: `translateX(-${index * 16}px)` }}
              />
            ))}
        </div>
        {isLoading ? (
          <LoadingCell height="32px" width="240px" style={{ transform: 'translateX(-32px)' }} />
        ) : (
          <p
            className="common-followers-text-container"
            style={{ transform: `translateX(-${(displayedAvatars?.length - 1) * 16}px)` }}
          >
            {displayedNames && formatCommonFollowersText(displayedNames, resultLength)}
          </p>
        )}
      </div>
    </>
  )
}

export default CommonFollowers
