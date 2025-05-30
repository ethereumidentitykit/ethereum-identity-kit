import { useCallback, useState } from 'react'

import { useEffect } from 'react'
import { ProfileTabType } from '../types'
import { FETCH_LIMIT, SECOND } from '../constants'
import { useIntersectionObserver } from './common/useIntersectionObserver'
import { useIsClient } from './common/useIsClient'
import { useUserInfo } from './useUserInfo'

let lastScrollTopUserPage = 0

export const useFollowersAndFollowing = ({
  user,
  defaultTab,
  showTagsByDefault,
  isConnectedUserProfile,
  includeBlocked,
}: {
  user: string
  defaultTab: ProfileTabType
  showTagsByDefault?: boolean
  isConnectedUserProfile?: boolean
  includeBlocked?: boolean
}) => {
  const [activeTab, setActiveTab] = useState<ProfileTabType>(defaultTab)
  useEffect(() => {
    setActiveTab(defaultTab)
  }, [defaultTab])

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
  } = useUserInfo({ user, includeBlocked })

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

  const isFollowingTable = activeTab === 'following'
  const showFollowsYouBadges = !isConnectedUserProfile || isFollowingTable

  const profiles =
    params.results?.map((res) => ({
      tags: res.tags,
      address: res.address,
    })) || []

  const loadMoreRef = useIntersectionObserver(
    useCallback(
      (entry) => {
        const isIntersecting = entry[0].isIntersecting
        if (!isIntersecting || params.isEndOfResults) return
        if (params.isLoading || params.isFetchingMore) return

        if (params.results.length > 0 && params.results.length % FETCH_LIMIT === 0) params.fetchMore()
      },
      [params.isEndOfResults, params.isLoading, params.isFetchingMore, params.results.length, params.fetchMore]
    )
  )
  const profilesEmpty = !params.isLoading && params.results.length === 0

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

  return {
    activeTab,
    showTags,
    search,
    profiles,
    loadMoreRef,
    showFollowsYouBadges,
    profilesEmpty,
    displayHeaders,
    isMobile,
    isFollowingTable,
    toggleTag,
    setShowTags,
    setSearch,
    setActiveTab,
    params,
  }
}
