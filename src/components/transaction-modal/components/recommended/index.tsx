import { Address } from '../../../../types'
import ProfileList from '../../../profile-list/ProfileList'
import { useRecommended } from '../../../../hooks/useRecommended'
import './Recommended.css'

const Recommended = ({ connectedAddress, limit = 20 }: { connectedAddress: Address; limit?: number }) => {
  const { recommended, isLoading, fetchMoreRef, hasNextPage } = useRecommended(connectedAddress, limit)

  return (
    <div className="recommended-container">
      <div className="recommended-title">Recommended</div>
      {(recommended || isLoading) && (
        <ProfileList
          profiles={recommended || []}
          connectedAddress={connectedAddress}
          isLoading={isLoading}
          loadingRows={limit}
        />
      )}
      <div
        className="recommended-load-more"
        ref={fetchMoreRef}
        style={{ display: isLoading || !hasNextPage ? 'none' : 'block' }}
      />
    </div>
  )
}

export default Recommended
