import clsx from 'clsx'
import { forwardRef } from 'react'
import { useTransactions, useTranslation } from '../../../context'
import TableHeader from './components/TableHeaders'
import ProfileList from '../../molecules/profile-list/ProfileList'
import { FETCH_LIMIT } from '../../../constants'
import Recommended from '../recommended/Recommended'
import { useFollowersAndFollowing } from '../../../hooks/useFollowersAndFollowing'
import { FollowersAndFollowingProps } from './FollowersAndFollowing.types'
import './FollowersAndFollowing.css'

/**
 * Followers and Following component
 *
 * @param user - the user to display followers and following for
 *
 * @param defaultTab - the default tab to display
 *
 * @param canEditTags - whether the user can edit tags
 *
 * @param showTagsByDefault - whether to show tags by default (tags open by default)
 *
 * @param includeBlocked - whether to display blocked and muted users in the results
 *
 * @param showRecommendations - whether to show recommendations on the following tab of a connected user with no lists
 *
 * @param isConnectedUserProfile - whether the user is the connected user
 *
 * @param darkMode - whether the dark mode is enabled
 *
 * @param connectedAddress - the address of the connected user
 *
 * @param onProfileClick - the function to call when a profile is clicked
 *
 * @param showHeaderImage - whether to show the header image
 *
 * @param rowHeight - the height of each row
 *
 * @param useVirtualList - whether to use virtual list
 *
 * @param ref - the ref to the container
 *
 * @returns FollowersAndFollowing component
 */
const FollowersAndFollowing = forwardRef<HTMLDivElement, FollowersAndFollowingProps>(
  (
    {
      user,
      defaultTab,
      showTagsByDefault,
      showRecommendations,
      isConnectedUserProfile,
      darkMode,
      connectedAddress,
      onProfileClick,
      showHeaderImage,
      rowHeight = 80,
      useVirtualList = false,
      showBlocked,
      showOnlyBlocked,
    },
    ref
  ) => {
    const { t } = useTranslation()
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
      showBlocked,
      showOnlyBlocked,
    })

    const noResults = {
      following:
        search.length > 2 ? (
          <div className="empty-state-message">none</div>
        ) : (
          <div className="empty-state-content">
            <p className="empty-state-text">
              {isConnectedUserProfile ? showOnlyBlocked ? t('blocking.empty.connectedUser') : t('following.empty.connectedUser') : showOnlyBlocked ? t('blocking.empty') : t('following.empty')}
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
          <p className="empty-state-text">{showOnlyBlocked ? t('blocked.empty') : t('followers.empty')}</p>
        ),
    }[activeTab]

    return (
      <div className={clsx('followers-following-container', !params.isLoading && 'loading', darkMode && 'dark')}>
        <div
          className={clsx('table-header-container', isMobile && displayHeaders && 'mobile')}
          style={{ top: !isMobile ? '-2px' : displayHeaders ? '74px' : '-2px' }}
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
            toggleSelectedTags={toggleTag}
            showBlocked={showBlocked}
            showOnlyBlocked={showOnlyBlocked}
          />
        </div>
        <div className="content-container">
          {profilesEmpty ? (
            <div className="empty-state-container">{noResults}</div>
          ) : (
            <ProfileList
              ref={ref}
              isLoading={params.isLoading}
              loadingRows={FETCH_LIMIT}
              profiles={profiles}
              showTags={showTags}
              showFollowsYouBadges={showFollowsYouBadges}
              canEditTags={isConnectedUserProfile && activeTab === 'following'}
              initialFollowState={activeTab === 'following' && isConnectedUserProfile && !showOnlyBlocked ? 'Following' : undefined}
              darkMode={darkMode}
              connectedAddress={connectedAddress}
              selectedList={selectedList}
              onProfileClick={onProfileClick}
              showHeaderImage={showHeaderImage}
              rowHeight={rowHeight}
              visibleCount={20}
              overscanCount={10}
              listHeight="100vh"
              loadMoreElement={<div ref={loadMoreRef} className="load-more-trigger" />}
              useVirtualList={useVirtualList}
              showBlockBack={showOnlyBlocked && isConnectedUserProfile && activeTab === 'followers'}
            />
          )}
        </div>
        {showRecommendations &&
          isConnectedUserProfile &&
          activeTab === 'following' &&
          connectedAddress &&
          (lists?.lists?.length || 0) === 0 && (
            <Recommended
              title={t("recommendations.connectedUser")}
              limit={40}
              connectedAddress={connectedAddress}
              selectedList={selectedList}
              onProfileClick={onProfileClick}
              listHeight="calc(100vh - 150px)"
              className="no-followings-recommendations-container"
            />
          )}
      </div>
    )
  }
)

FollowersAndFollowing.displayName = 'FollowersAndFollowing'

export default FollowersAndFollowing
