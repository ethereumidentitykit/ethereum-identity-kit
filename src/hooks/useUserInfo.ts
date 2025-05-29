import { useState } from 'react'
import { isAddress } from 'viem'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { fetchFollowingTags, nullFollowingTags } from '../utils/api/fetch-following-tags'
import { nullFollowerTags } from '../utils/api/fetch-follower-tags'
import { fetchFollowerTags } from '../utils/api/fetch-follower-tags'
import { fetchProfileFollowing } from '../utils/api/fetch-profile-following'
import { fetchProfileFollowers } from '../utils/api/fetch-profile-followers'
import { FETCH_LIMIT } from '../constants'
import { FollowerResponse, FollowingResponse, FollowSortType, ProfileTableTitleType } from '../types'

export const useUserInfo = (user: string) => {
  const [followingSearch, setFollowingSearch] = useState<string>('')
  const [followersSearch, setFollowersSearch] = useState<string>('')
  const [followingTagsFilter, setFollowingTagsFilter] = useState<string[]>([])
  const [followersTagsFilter, setFollowersTagsFilter] = useState<string[]>([])
  const [followingSort, setFollowingSort] = useState<FollowSortType>('follower count')
  const [followersSort, setFollowersSort] = useState<FollowSortType>('follower count')

  const userIsList = !(isAddress(user) || user.includes('.') || Number.isNaN(Number(user)))
  const listNum = userIsList ? Number(user) : undefined
  const isValidUser =
    isAddress(user) || (userIsList && listNum && listNum > 0 && listNum < 1000000000) || user.includes('.')

  const [isEndOfFollowing, setIsEndOfFollowing] = useState(false)
  const {
    data: fetchedFollowing,
    isLoading: followingIsLoading,
    fetchNextPage: fetchMoreFollowing,
    isFetchingNextPage: isFetchingMoreFollowing,
    isRefetching: isRefetchingFollowing,
  } = useInfiniteQuery({
    queryKey: [
      'following',
      user,
      followingSort,
      followingTagsFilter,
      followingSearch.length > 1 ? followingSearch : undefined,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      setIsEndOfFollowing(false)

      if (!isValidUser)
        return {
          following: [],
          nextPageParam: pageParam,
        }

      const fetchedFollowing = await fetchProfileFollowing({
        addressOrName: user,
        list: listNum,
        limit: FETCH_LIMIT,
        pageParam,
        tags: followingTagsFilter,
        sort: followingSort,
        search: followingSearch,
      })

      if (fetchedFollowing.following.length === 0) setIsEndOfFollowing(true)

      return fetchedFollowing
    },
    staleTime: 30000,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    refetchOnWindowFocus: false,
    enabled: isValidUser,
  })

  const [isEndOfFollowers, setIsEndOfFollowers] = useState(false)
  const {
    data: fetchedFollowers,
    isLoading: followersIsLoading,
    fetchNextPage: fetchMoreFollowers,
    isFetchingNextPage: isFetchingMoreFollowers,
    isRefetching: isRefetchingFollowers,
  } = useInfiniteQuery({
    queryKey: [
      'followers',
      user,
      followersSort,
      followersTagsFilter,
      followersSearch.length > 1 ? followersSearch : undefined,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      setIsEndOfFollowers(false)

      if (!isValidUser)
        return {
          followers: [],
          nextPageParam: pageParam,
        }

      const fetchedFollowers = await fetchProfileFollowers({
        addressOrName: user,
        list: listNum,
        limit: FETCH_LIMIT,
        pageParam,
        tags: followersTagsFilter,
        sort: followersSort,
        search: followersSearch,
      })

      if (fetchedFollowers.followers.length === 0) setIsEndOfFollowers(true)

      return fetchedFollowers
    },
    staleTime: 30000,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    refetchOnWindowFocus: false,
    enabled: isValidUser,
  })

  const followers = fetchedFollowers
    ? fetchedFollowers.pages.reduce((acc, el) => [...acc, ...el.followers], [] as FollowerResponse[])
    : []

  const following = fetchedFollowing
    ? fetchedFollowing.pages.reduce((acc, el) => [...acc, ...el.following], [] as FollowingResponse[])
    : []

  const {
    data: followingTags,
    isLoading: followingTagsLoading,
    isRefetching: isRefetchingFollowingTags,
  } = useQuery({
    queryKey: ['following tags', user],
    queryFn: async () => {
      if (!isValidUser) return nullFollowingTags

      const fetchedTags = await fetchFollowingTags(user, listNum)
      return fetchedTags
    },
    staleTime: 30000,
    refetchOnWindowFocus: false,
  })

  const {
    data: followerTags,
    isLoading: followerTagsLoading,
    isRefetching: isRefetchingFollowerTags,
  } = useQuery({
    queryKey: ['follower tags', user],
    queryFn: async () => {
      if (!isValidUser) return nullFollowerTags

      const fetchedTags = await fetchFollowerTags(user, userIsList ? listNum : undefined)
      return fetchedTags
    },
    staleTime: 30000,
    refetchOnWindowFocus: false,
  })

  const toggleTag = (tab: ProfileTableTitleType, tag: string) => {
    if (tab === 'following') {
      if (followingTagsFilter.includes(tag)) {
        setFollowingTagsFilter(followingTagsFilter.filter((item) => item !== tag))
      } else {
        setFollowingTagsFilter([...followingTagsFilter, tag])
      }
    }

    if (tab === 'followers') {
      if (followersTagsFilter.includes(tag)) {
        setFollowersTagsFilter(followersTagsFilter.filter((item) => item !== tag))
      } else {
        setFollowersTagsFilter([...followersTagsFilter, tag])
      }
    }
  }

  return {
    listNum,
    followers,
    following,
    followerTags,
    followingTags,
    userIsList,
    followersIsLoading: followersIsLoading || isRefetchingFollowers,
    followingIsLoading: followingIsLoading || isRefetchingFollowing,
    followerTagsLoading: followerTagsLoading || isRefetchingFollowerTags,
    followingTagsLoading: followingTagsLoading || isRefetchingFollowingTags,
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
  }
}
