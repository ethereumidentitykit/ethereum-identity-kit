import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Address } from '../types/address'
import { fetchAllCommonFollowers } from '../utils/api/fetch-all-common-followers'
import { isAddress } from '../utils'
import { CommonFollower } from '../types'
import { useDebounce } from './useDebounce'
import { ProfileItemType } from '../components/profile-list/ProfileList.types'
import { useIntersectionObserver } from './useIntersectionObserver'
import { FETCH_LIMIT } from '../constants'

interface CommonFollowersModalProps {
  connectedAddress: Address
  lookupAddressOrName: Address | string
}

export const useCommonFollowersModal = ({ connectedAddress, lookupAddressOrName }: CommonFollowersModalProps) => {
  const [isEndOfFollowing, setIsEndOfFollowing] = useState(false)
  const [commonFollowersSearch, setCommonFollowersSearch] = useState('')

  const debouncedCommonFollowersSearch = useDebounce(commonFollowersSearch, 500)

  const {
    data: fetchedCommonFollowers,
    isLoading: commonFollowersIsLoading,
    fetchNextPage: fetchMoreCommonFollowers,
    isFetchingNextPage: isFetchingMoreCommonFollowers,
    isRefetching: isRefetchingCommonFollowers,
  } = useInfiniteQuery({
    queryKey: ['common-followers-all', connectedAddress, lookupAddressOrName, debouncedCommonFollowersSearch],
    queryFn: async ({ pageParam = 0 }) => {
      setIsEndOfFollowing(false)

      if (!isAddress(connectedAddress))
        return {
          commonFollowers: [],
          nextPageParam: pageParam,
        }

      const fetchedCommonFollowers = await fetchAllCommonFollowers({
        connectedAddress,
        lookupAddressOrName,
        limit: FETCH_LIMIT,
        pageParam,
        search: debouncedCommonFollowersSearch,
      })

      if (fetchedCommonFollowers.commonFollowers.length < FETCH_LIMIT) setIsEndOfFollowing(true)

      return fetchedCommonFollowers
    },
    staleTime: 30000,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    refetchOnWindowFocus: false,
  })

  console.log(fetchedCommonFollowers)

  const commonFollowers = fetchedCommonFollowers
    ? fetchedCommonFollowers.pages.reduce((acc, el) => [...acc, ...el.commonFollowers], [] as CommonFollower[])
    : []

  const commonFollowersProfiles: ProfileItemType[] = commonFollowers.map((commonFollower) => ({
    address: commonFollower.address,
    ens: {
      name: commonFollower.name ?? undefined,
      avatar: commonFollower.avatar ?? undefined,
    },
    tags: [],
  }))

  const commonFollowsLoading = commonFollowersIsLoading || isRefetchingCommonFollowers || isFetchingMoreCommonFollowers

  const loadMoreRef = useIntersectionObserver(
    (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        fetchMoreCommonFollowers()
      }
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }
  )

  return {
    isEndOfFollowing,
    commonFollowersProfiles,
    fetchMoreCommonFollowers,
    commonFollowersIsLoading: commonFollowsLoading,
    commonFollowersSearch,
    setCommonFollowersSearch,
    loadMoreRef,
  }
}
