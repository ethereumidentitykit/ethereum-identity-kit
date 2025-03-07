import { Address } from '../../../../types'
import ProfileList from '../../../profile-list/ProfileList'
import { useRecommended } from '../../../../hooks/useRecommended'
import './Recommended.css'

const Recommended = ({
  connectedAddress,
  selectedList,
  limit = 20,
}: {
  connectedAddress: Address
  selectedList?: string
  limit?: number
}) => {
  const { recommended, isLoading, fetchMoreRef, hasNextPage } = useRecommended(connectedAddress, limit, selectedList)

  return (
    <div className="recommended-container">
      <div className="recommended-title">Recommended</div>
      {((recommended && recommended.length > 0) || isLoading) && (
        <ProfileList
          profiles={recommended || []}
          connectedAddress={connectedAddress}
          isLoading={isLoading}
          loadingRows={limit}
          selectedList={selectedList}
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
