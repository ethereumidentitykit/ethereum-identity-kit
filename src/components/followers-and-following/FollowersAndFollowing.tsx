'use client'

import clsx from 'clsx'
import { useEffect, useState, forwardRef, LegacyRef } from 'react'
import { useTransactions } from '../../context'
import { useIsClient, useUser } from '../../hooks'
import { useIntersectionObserver } from '../../hooks/common/useIntersectionObserver'
import TableHeader from './components/table-headers'
import ProfileList from '../profile-list/ProfileList'
import { Address, FollowerResponse, FollowingResponse, ProfileTableTitleType, ProfileTabType } from '../../types'
import { FETCH_LIMIT, SECOND } from '../../constants'
import Recommended from '../transaction-modal/components/recommended'
import { FollowSortType } from '../../types'

let lastScrollTopUserPage = 0
export interface FollowersAndFollowingProps {
  user: string | Address
  defaultTab: ProfileTabType
  customClass?: string
  isLoading: boolean
  isEndOfResults?: boolean
  isFetchingMore: boolean
  results: FollowerResponse[] | FollowingResponse[]
  fetchMore: () => void
  canEditTags?: boolean
  tagsLoading?: boolean
  selectedTags?: string[]
  sort: FollowSortType
  setSort: (option: FollowSortType) => void
  toggleSelectedTags: (title: ProfileTableTitleType, tag: string) => void
  showTagsByDefault?: boolean
  isShowingBlocked?: boolean
  isTopEight?: boolean
  setSelectedTags: (tags: string[]) => void
  setSearchFilter: (search: string) => void
  setActiveTab?: (tab: ProfileTableTitleType) => void
  showRecommendations?: boolean
  isConnectedUserProfile?: boolean
  darkMode?: boolean
  connectedAddress?: Address
  selectedList?: string
  onProfileClick?: (address: Address) => void
  showHeaderImage?: boolean
  rowHeight?: number
}

const FollowersAndFollowing = forwardRef<HTMLDivElement, FollowersAndFollowingProps>(
  (
    {
      user,
      defaultTab,
      customClass,
      canEditTags,
      tagsLoading,
      showTagsByDefault,
      isShowingBlocked,
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
    const [activeTab, setActiveTab] = useState<ProfileTabType>(defaultTab)

    const {
      followers,
      following,
      followerTags,
      followingTags,
      followersIsLoading,
      followingIsLoading,
      followerTagsLoading,
      followingTagsLoading,
      fetchMoreFollowers,
      fetchMoreFollowing,
      isEndOfFollowing,
      isEndOfFollowers,
      isFetchingMoreFollowers,
      isFetchingMoreFollowing,
      followingTagsFilter,
      followersTagsFilter,
      followingSearch,
      followersSearch,
      setFollowersSearch,
      setFollowingSearch,
      followingSort,
      setFollowingSort,
      followersSort,
      toggleTag,
      setFollowersSort,
      setFollowersTagsFilter,
      setFollowingTagsFilter,
    } = useUser(user)

    const params = {
      following: {
        profile: following,
        tags: followingTags,
        isLoading: followingIsLoading || isFetchingMoreFollowing,
        results: following,
        tagsLoading: followingTagsLoading,
        selectedTags: followingTagsFilter,
        setSelectedTags: setFollowingTagsFilter,
        sort: followingSort,
        setSort: setFollowingSort,
        tagsFilter: followingTagsFilter,
        setTagsFilter: setFollowingTagsFilter,
        isEndOfResults: isEndOfFollowing,
        fetchMore: fetchMoreFollowing,
        search: followingSearch,
        setSearch: setFollowingSearch,
      },
      followers: {
        profile: followers,
        tags: followerTags,
        isLoading: followersIsLoading || isFetchingMoreFollowers,
        results: followers,
        tagsLoading: followerTagsLoading,
        selectedTags: followersTagsFilter,
        setSelectedTags: setFollowersTagsFilter,
        sort: followersSort,
        setSort: setFollowersSort,
        tagsFilter: followersTagsFilter,
        setTagsFilter: setFollowersTagsFilter,
        isEndOfResults: isEndOfFollowers,
        isFetchingMore: isFetchingMoreFollowers,
        fetchMore: fetchMoreFollowers,
        search: followersSearch,
        setSearch: setFollowersSearch,
      },
    }[activeTab]

    const [showTags, setShowTags] = useState(!!showTagsByDefault)
    const [search, setSearch] = useState<string>('')
    // Debounce search to prevent unnecessary re-fetches
    useEffect(() => {
      const userPage = document.getElementById('user-page')
      if (userPage && userPage.scrollTop > (window.innerWidth > 1024 ? 300 : 750)) {
        userPage.scrollTo({ top: window.innerWidth > 1024 ? 300 : 750, behavior: 'instant' })
      }

      const searchTimeout = setTimeout(() => params.setSearch(search), 0.5 * SECOND)
      return () => clearTimeout(searchTimeout)
    }, [search])

    // Reset search when switching tabs
    useEffect(() => {
      setSearch('')
      params.setSearch('')
    }, [activeTab])

    // Display all tags by default if the user is showing the blocked/muted tab
    useEffect(() => {
      if (!showTags) params.setSelectedTags(isShowingBlocked ? ['All'] : [])
    }, [showTags])

    const { lists, selectedList } = useTransactions()

    const isFollowingTable = activeTab === 'following'
    const showFollowsYouBadges = !isConnectedUserProfile || isFollowingTable

    const profiles =
      params.results?.map((res) => ({
        tags: res.tags,
        address: res.address,
      })) || []

    const loadMoreRef = useIntersectionObserver((entry) => {
      const isIntersecting = entry[0].isIntersecting
      if (!isIntersecting || params.isEndOfResults) return
      if (params.isLoading || params.isFetchingMore) return

      if (params.results.length > 0 && params.results.length % FETCH_LIMIT === 0) params.fetchMore()
    })
    const profilesEmpty = !params.isLoading && params.results.length === 0

    const noResults = {
      following:
        search.length > 2 ? (
          <div className="flex h-full items-center justify-center font-bold">none</div>
        ) : (
          <div className="h-full text-center font-bold">
            <div className="flex h-full flex-col items-center justify-center gap-4">
              <p className="text-xl italic">
                {isConnectedUserProfile ? 'following myprofile empty first' : 'following empty first'}
              </p>
              {isConnectedUserProfile && (
                <p className="w-3/4 max-w-96 text-base italic">following myprofile empty second</p>
              )}
            </div>
          </div>
        ),
      followers:
        search.length > 2 ? (
          <div className="flex h-full items-center justify-center font-bold">none</div>
        ) : (
          <p className="flex h-full min-h-12 items-center justify-center text-xl italic">
            {isConnectedUserProfile ? 'followers myprofile empty' : 'followers empty'}
          </p>
        ),
    }[activeTab]

    const isClient = useIsClient()
    const [displayHeaders, setDisplayHeaders] = useState(false)
    const isMobile = isClient && window.innerWidth <= 640

    useEffect(() => {
      const userPage = document.getElementById('user-page')

      if (userPage && isMobile) {
        userPage.addEventListener(
          'scroll',
          () => {
            const deltaY = userPage.scrollTop - lastScrollTopUserPage
            if (deltaY <= 0) setDisplayHeaders(true)
            else setDisplayHeaders(false)
            lastScrollTopUserPage = userPage.scrollTop
          },
          { passive: false }
        )
      }
    }, [isMobile])

    return (
      <div
        className={clsx(
          'flex w-full flex-col rounded-sm',
          !(params.isLoading || params.isFetchingMore) && 'pb-0 sm:pb-0',
          customClass
        )}
      >
        <div
          className={clsx('top-0 z-20 transition-all duration-300', isTopEight ? 'xl:sticky' : 'sticky')}
          style={{ top: isTopEight || !isMobile ? '-2px' : displayHeaders ? '74px' : '-2px' }}
        >
          <TableHeader
            setActiveTab={setActiveTab}
            search={search}
            setSearch={setSearch}
            showTags={showTags}
            setShowTags={(option: boolean) => setShowTags(option)}
            title={activeTab}
            allTags={params.tags?.tags}
            tagsLoading={tagsLoading}
            selectedTags={params.selectedTags}
            sort={params.sort}
            setSort={params.setSort}
            isTopEight={isTopEight}
            toggleSelectedTags={toggleTag}
            isShowingBlocked={isShowingBlocked}
          />
        </div>
        <div className={clsx('flex flex-col pt-4')}>
          {profilesEmpty && (
            <div className="bg-neutral shadow-medium content-center rounded-sm p-8 text-center font-bold">
              {noResults}
            </div>
          )}
          <ProfileList
            ref={ref}
            isLoading={params.isLoading}
            loadingRows={FETCH_LIMIT}
            profiles={profiles}
            showTags={isConnectedUserProfile && activeTab === 'following'}
            showFollowsYouBadges={showFollowsYouBadges}
            canEditTags={canEditTags}
            // if the displayed table is user's followings, automatically set the initial follow state to "Following"
            initialFollowState={activeTab === 'following' && canEditTags && !!selectedList ? 'Following' : undefined}
            darkMode={darkMode}
            connectedAddress={connectedAddress}
            selectedList={selectedList}
            tags={params.tags?.tags}
            onProfileClick={onProfileClick}
            showHeaderImage={showHeaderImage}
            rowHeight={rowHeight}
            visibleCount={20}
            overscanCount={10}
            listHeight={undefined}
          />
          {!params.isLoading && <div ref={loadMoreRef as LegacyRef<HTMLDivElement>} className="mb-4 h-px w-full" />}
          {showRecommendations && isConnectedUserProfile && connectedAddress && (lists?.lists?.length || 0) === 0 && (
            <Recommended
              limit={40}
              connectedAddress={connectedAddress}
              selectedList={selectedList}
              onProfileClick={onProfileClick}
            />
          )}
        </div>
      </div>
    )
  }
)

FollowersAndFollowing.displayName = 'FollowersAndFollowing'

export default FollowersAndFollowing
