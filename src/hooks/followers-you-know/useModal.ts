import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Address } from '../../types'
import { fetchAllFollowersYouKnow } from '../../utils/api/fetch-all-followers-you-know'
import { isAddress } from '../../utils'
import { FollowerYouKnow } from '../../types'
import { useDebounce } from '../common/useDebounce'
import { ProfileItemType } from '../../components/molecules/profile-list/ProfileList.types'
import { useIntersectionObserver } from '../common/useIntersectionObserver'
import { FETCH_LIMIT } from '../../constants'

interface FollowersYouKnowModalProps {
  connectedAddress: Address
  lookupAddressOrName: Address | string
}

export const useFollowersYouKnowModal = ({ connectedAddress, lookupAddressOrName }: FollowersYouKnowModalProps) => {
  const [isEndOfFollowing, setIsEndOfFollowing] = useState(false)
  const [followersYouKnowSearch, setFollowersYouKnowSearch] = useState('')

  const debouncedFollowersYouKnowSearch = useDebounce(followersYouKnowSearch, 500)

  const {
    data: fetchedFollowersYouKnow,
    isLoading: followersYouKnowIsLoading,
    fetchNextPage: fetchMoreFollowersYouKnow,
    isFetchingNextPage: isFetchingMoreFollowersYouKnow,
    isRefetching: isRefetchingFollowersYouKnow,
  } = useInfiniteQuery({
    queryKey: ['followers-you-know-all', connectedAddress, lookupAddressOrName, debouncedFollowersYouKnowSearch],
    queryFn: async ({ pageParam = 0 }) => {
      setIsEndOfFollowing(false)

      if (!isAddress(connectedAddress))
        return {
          followersYouKnow: [],
          nextPageParam: pageParam,
        }

      const fetchedFollowersYouKnow = await fetchAllFollowersYouKnow({
        connectedAddress,
        lookupAddressOrName,
        limit: FETCH_LIMIT,
        pageParam,
        search: debouncedFollowersYouKnowSearch,
      })

      if (fetchedFollowersYouKnow.followersYouKnow.length < FETCH_LIMIT) setIsEndOfFollowing(true)

      return fetchedFollowersYouKnow
    },
    staleTime: 30000,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    refetchOnWindowFocus: false,
  })

  const followersYouKnow = fetchedFollowersYouKnow
    ? fetchedFollowersYouKnow.pages.reduce((acc, el) => [...acc, ...el.followersYouKnow], [] as FollowerYouKnow[])
    : []

  const followersYouKnowProfiles: ProfileItemType[] = followersYouKnow.map((followersYouKnow) => ({
    address: followersYouKnow.address,
    ens: {
      name: followersYouKnow.name ?? undefined,
      avatar: followersYouKnow.avatar ?? undefined,
      header: followersYouKnow.header ?? undefined,
    },
    tags: [],
  }))

  const followersYouKnowLoading =
    followersYouKnowIsLoading || isRefetchingFollowersYouKnow || isFetchingMoreFollowersYouKnow

  const loadMoreRef = useIntersectionObserver((entries) => {
    const [entry] = entries
    if (entry.isIntersecting) {
      fetchMoreFollowersYouKnow()
    }
  })

  return {
    isEndOfFollowing,
    followersYouKnowProfiles,
    fetchMoreFollowersYouKnow,
    followersYouKnowIsLoading: followersYouKnowLoading,
    followersYouKnowSearch,
    setFollowersYouKnowSearch,
    loadMoreRef,
  }
}
