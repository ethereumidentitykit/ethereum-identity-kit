import React from 'react'
import { useFollowersYouKnowModal } from '../../../../hooks/followers-you-know/useModal'
import { Cross } from '../../../icons'
import ProfileList from '../../../profile-list/ProfileList'
import { FETCH_LIMIT } from '../../../../constants'
import { FollowersYouKnowModalProps } from './modal.types'
import './modal.css'

const FollowersYouKnowModal: React.FC<FollowersYouKnowModalProps> = ({
  isOpen,
  onClose,
  connectedAddress,
  lookupAddressOrName,
  onProfileClick,
  darkMode,
  selectedList,
}) => {
  const { followersYouKnowProfiles, isEndOfFollowing, followersYouKnowIsLoading, loadMoreRef } =
    useFollowersYouKnowModal({
      connectedAddress,
      lookupAddressOrName,
    })

  if (!isOpen) return null

  return (
    <div className={`common-followers-modal-backdrop ${darkMode ? 'dark' : ''}`} onClick={onClose}>
      <div className="common-followers-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="common-followers-modal-header">
          <h3 className="common-followers-modal-title">Followers you know</h3>
          <button onClick={onClose} className="common-followers-modal-close-button">
            <Cross height={16} width={16} />
          </button>
        </div>
        <div className="common-followers-modal-list-container">
          <ProfileList
            selectedList={selectedList}
            connectedAddress={connectedAddress}
            profiles={followersYouKnowProfiles}
            isLoading={followersYouKnowIsLoading}
            onProfileClick={onProfileClick}
            loadingRows={FETCH_LIMIT}
            rowHeight={80}
            showHeaderImage={true}
            listHeight="calc(100vh - 120px)"
          />
          {!isEndOfFollowing && !followersYouKnowIsLoading && (
            <div id="load-more-container" ref={loadMoreRef as React.RefObject<HTMLDivElement>} />
          )}
        </div>
      </div>
    </div>
  )
}

export default FollowersYouKnowModal
