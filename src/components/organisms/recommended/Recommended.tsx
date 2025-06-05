import ProfileList from '../../molecules/profile-list/ProfileList'
import { useRecommended } from '../../../hooks/useRecommended'
import { useTranslation } from '../../../context/TranslationContext'
import { RecommendedProps } from './Recommended.types'
import './Recommended.css'
import clsx from 'clsx'

const Recommended: React.FC<RecommendedProps> = ({
  connectedAddress,
  endpoint = 'recommended',
  selectedList,
  limit = 20,
  onProfileClick,
  listHeight = '100vh',
  className,
  title,
  useVirtualList = false,
}) => {
  const { t } = useTranslation()
  const { recommended, isLoading, fetchMoreRef, hasNextPage } = useRecommended(
    connectedAddress,
    endpoint,
    limit,
    selectedList
  )

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
      {recommended?.length === 0 && !isLoading && <div className="recommended-empty">{t('recommended.empty')}</div>}
    </div>
  )
}

export default Recommended
