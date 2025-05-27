import clsx from 'clsx'
import { forwardRef } from 'react'
import { useTransactions } from '../../context'
import TableHeader from './components/TableHeaders'
import ProfileList from '../profile-list/ProfileList'
import { FETCH_LIMIT } from '../../constants'
import Recommended from '../recommended/Recommended'
import { useFollowersAndFollowing } from '../../hooks/useFollowersAndFollowing'
import { FollowersAndFollowingProps } from './FollowersAndFollowing.types'
import './FollowersAndFollowing.css'

const FollowersAndFollowing = forwardRef<HTMLDivElement, FollowersAndFollowingProps>(
  (
    {
      user,
      defaultTab,
      canEditTags,
      showTagsByDefault,
      excludeBlocked,
      isTopEight,
      showRecommendations,
      isConnectedUserProfile,
      darkMode,
      connectedAddress,
      onProfileClick,
      showHeaderImage,
      rowHeight = 80,
    },
    ref
  ) => {
    const { lists, selectedList } = useTransactions()
    const {
      activeTab,
      showTags,
      search,
      profiles,
      loadMoreRef,
      showFollowsYouBadges,
      profilesEmpty,
      displayHeaders,
      isMobile,
      toggleTag,
      setShowTags,
      setSearch,
      setActiveTab,
      params,
    } = useFollowersAndFollowing({
      user,
      defaultTab,
      showTagsByDefault,
      isConnectedUserProfile,
    })

    const noResults = {
      following:
        search.length > 2 ? (
          <div className="empty-state-message">none</div>
        ) : (
          <div className="empty-state-content">
            <p className="empty-state-text">
              {isConnectedUserProfile ? "You don't follow anyone yet!" : 'No following'}
            </p>
            {isConnectedUserProfile && (
              <p className="empty-state-subtext">
                To get started, just browse and start following. Once you confirm them onchain, they&apos;ll show up
                here.
              </p>
            )}
          </div>
        ),
      followers:
        search.length > 2 ? (
          <div className="empty-state-message">none</div>
        ) : (
          <p className="empty-state-text">No followers</p>
        ),
    }[activeTab]

    return (
      <div className={clsx('followers-following-container', !params.isLoading && 'loading', darkMode && 'dark')}>
        <div
          className={clsx('table-header-container', isTopEight && 'top-eight', isMobile && displayHeaders && 'mobile')}
          style={{ top: isTopEight || !isMobile ? '-2px' : displayHeaders ? '74px' : '-2px' }}
        >
          <TableHeader
            setActiveTab={setActiveTab}
            search={search}
            setSearch={setSearch}
            showTags={showTags}
            setShowTags={(option: boolean) => setShowTags(option)}
            title={activeTab}
            allTags={params.tags?.tagCounts}
            tagsLoading={params.tagsLoading}
            selectedTags={params.selectedTags}
            sort={params.sort}
            setSort={params.setSort}
            isTopEight={isTopEight}
            toggleSelectedTags={toggleTag}
            excludeBlocked={excludeBlocked}
          />
        </div>
        <div className="content-container">
          {profilesEmpty && <div className="empty-state-container">{noResults}</div>}
          <ProfileList
            ref={ref}
            isLoading={params.isLoading}
            loadingRows={FETCH_LIMIT}
            profiles={profiles}
            showTags={isConnectedUserProfile && activeTab === 'following' && showTags}
            showFollowsYouBadges={showFollowsYouBadges}
            canEditTags={canEditTags}
            initialFollowState={activeTab === 'following' && isConnectedUserProfile ? 'Following' : undefined}
            darkMode={darkMode}
            connectedAddress={connectedAddress}
            selectedList={selectedList}
            onProfileClick={onProfileClick}
            showHeaderImage={showHeaderImage}
            rowHeight={rowHeight}
            visibleCount={20}
            overscanCount={10}
            listHeight="calc(100vh - 50px)"
            loadMoreElement={<div ref={loadMoreRef} className="load-more-trigger" />}
          />
        </div>
        {showRecommendations &&
          isConnectedUserProfile &&
          activeTab === 'following' &&
          connectedAddress &&
          (lists?.lists?.length || 0) === 0 && (
            <Recommended
              limit={40}
              connectedAddress={connectedAddress}
              selectedList={selectedList}
              onProfileClick={onProfileClick}
              listHeight="calc(100vh - 150px)"
              style={{ boxShadow: 'var(--ethereum-identity-kit-shadow-medium)' }}
            />
          )}
      </div>
    )
  }
)

FollowersAndFollowing.displayName = 'FollowersAndFollowing'

export default FollowersAndFollowing
