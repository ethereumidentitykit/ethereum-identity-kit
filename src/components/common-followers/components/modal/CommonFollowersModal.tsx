import React from 'react'
import { CommonFollowersModalProps } from './CommonFollowersModal.types'
import { useCommonFollowersModal } from '../../../../hooks/useCommonFollowersModal'
import { Cross } from '../../../icons'
import ProfileList from '../../../profile-list/ProfileList'
import { FETCH_LIMIT } from '../../../../constants'
import './CommonFollowersModal.css'

const CommonFollowersModal: React.FC<CommonFollowersModalProps> = ({
  isOpen,
  onClose,
  connectedAddress,
  lookupAddressOrName,
  onProfileClick,
}) => {
  const { commonFollowersProfiles, isEndOfFollowing, commonFollowersIsLoading, loadMoreRef } = useCommonFollowersModal({
    connectedAddress,
    lookupAddressOrName,
  })

  if (!isOpen) return null

  return (
    <div className="common-followers-modal-backdrop" onClick={onClose}>
      <div className="common-followers-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="common-followers-modal-header">
          <h3 className="common-followers-modal-title">Common Followers</h3>
          <button onClick={onClose} className="common-followers-modal-close-button">
            <Cross height={16} width={16} />
          </button>
        </div>
        <ProfileList
          profiles={commonFollowersProfiles}
          isLoading={commonFollowersIsLoading}
          onProfileClick={onProfileClick}
          loadingRows={FETCH_LIMIT}
        />
        {!isEndOfFollowing && !commonFollowersIsLoading && (
          <div id="load-more-container" ref={loadMoreRef as React.RefObject<HTMLDivElement>} />
        )}
      </div>
    </div>
  )
}

export default CommonFollowersModal
