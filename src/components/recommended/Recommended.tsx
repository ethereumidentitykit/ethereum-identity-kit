import ProfileList from '../profile-list/ProfileList'
import { useRecommended } from '../../hooks/useRecommended'
import { RecommendedProps } from './Recommended.types'
import './Recommended.css'
import clsx from 'clsx'

const Recommended: React.FC<RecommendedProps> = ({
  connectedAddress,
  selectedList,
  limit = 20,
  onProfileClick,
  listHeight = '100vh',
  className,
  title,
  useVirtualList = false,
}) => {
  const { recommended, isLoading, fetchMoreRef, hasNextPage } = useRecommended(connectedAddress, limit, selectedList)

  return (
    <div className={clsx('recommended-container', className)}>
      {title && <div className="recommended-title">{title}</div>}
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
          useVirtualList={useVirtualList}
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
