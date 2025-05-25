import { Address } from '../../../../types'
import ProfileList from '../../../profile-list/ProfileList'
import { useRecommended } from '../../../../hooks/useRecommended'
import './Recommended.css'
import { useWindowSize } from '../../../../hooks/common/useWindowSize'

const Recommended = ({
  connectedAddress,
  selectedList,
  limit = 20,
  onProfileClick,
}: {
  connectedAddress: Address
  selectedList?: string
  limit?: number
  onProfileClick?: (address: Address) => void
}) => {
  const { width } = useWindowSize()
  const { recommended, isLoading, fetchMoreRef, hasNextPage } = useRecommended(connectedAddress, limit, selectedList)

  return (
    <div className="recommended-container" style={{ paddingBottom: width && width < 640 ? '90px' : '0px' }}>
      <div className="recommended-title">Recommended</div>
      {((recommended && recommended.length > 0) || isLoading) && (
        <ProfileList
          profiles={recommended || []}
          connectedAddress={connectedAddress}
          isLoading={isLoading}
          loadingRows={limit}
          selectedList={selectedList}
          initialFollowState={'Follow'}
          onProfileClick={onProfileClick}
          listHeight="calc(80vh - 200px)"
        />
      )}
      {recommended?.length === 0 && !isLoading && <div className="recommended-empty">No recommended profiles</div>}
      <div
        className="recommended-load-more"
        ref={fetchMoreRef}
        style={{ display: isLoading || !hasNextPage ? 'none' : 'block' }}
      />
    </div>
  )
}

export default Recommended
