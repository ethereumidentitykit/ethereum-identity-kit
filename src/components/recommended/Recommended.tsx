import ProfileList from '../profile-list/ProfileList'
import { useRecommended } from '../../hooks/useRecommended'
import { useWindowSize } from '../../hooks/common/useWindowSize'
import { RecommendedProps } from './Recommended.types'
import './Recommended.css'

const Recommended: React.FC<RecommendedProps> = ({
  connectedAddress,
  selectedList,
  limit = 20,
  onProfileClick,
  listHeight = '100vh',
  style,
}) => {
  const { width } = useWindowSize()
  const { recommended, isLoading, fetchMoreRef, hasNextPage } = useRecommended(connectedAddress, limit, selectedList)

  return (
    <div className="recommended-container" style={{ paddingBottom: width && width < 640 ? '90px' : '0px', ...style }}>
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
          listHeight={listHeight}
          loadMoreElement={
            <div
              className="recommended-load-more"
              ref={fetchMoreRef}
              style={{ display: !hasNextPage ? 'none' : 'block' }}
            />
          }
        />
      )}
      {recommended?.length === 0 && !isLoading && <div className="recommended-empty">No recommended profiles</div>}
    </div>
  )
}

export default Recommended
