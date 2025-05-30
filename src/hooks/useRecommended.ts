import { Address } from 'viem'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchRecommended } from '../utils/api/fetch-recommended'
import { RecommendedItemType } from '../types'
import { useIntersectionObserver } from './common/useIntersectionObserver'

export const useRecommended = (
  connectedAddress: Address,
  endpoint: 'recommended' | 'discover',
  limit: number,
  list?: string
) => {
  const { data, isLoading, isRefetching, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['recommended', connectedAddress, limit, list],
    queryFn: async ({ pageParam = 0 }) => {
      const discoverAccounts = await fetchRecommended(
        endpoint,
        connectedAddress,
        list === 'new list' ? undefined : list,
        limit,
        pageParam
      )

      return {
        results: discoverAccounts,
        nextPageParam: pageParam + 1,
        previousPageParam: pageParam > 0 ? pageParam - 1 : 0,
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    getPreviousPageParam: (lastPage) => lastPage.previousPageParam,
    refetchOnWindowFocus: false,
  })

  const recommendedProfiles = data?.pages
    .reduce((acc: RecommendedItemType[], page) => [...acc, ...page.results], [])
    .map((profile) => ({
      ...profile,
      ens: {
        name: profile.name,
        avatar: profile.avatar,
        records: profile.header ? { header: profile.header } : undefined,
      },
      tags: [],
    }))

  const hasNextPage =
    (recommendedProfiles?.length || 0) % limit === 0 &&
    (data?.pages[data?.pages.length - 1]?.results.length || 0) === limit
  const recommendedLoading = isLoading || isFetchingNextPage

  const fetchMoreRef = useIntersectionObserver((entries) => {
    const [entry] = entries
    if (entry.isIntersecting) {
      fetchNextPage()
    }
  })

  return {
    recommended: recommendedProfiles,
    isLoading: recommendedLoading,
    isRefetching,
    fetchMoreRef,
    hasNextPage,
  }
}
