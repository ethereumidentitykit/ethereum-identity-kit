import { Address } from 'viem'
import { useRef, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchRecommended } from '../utils/api/fetch-recommended'
import { RecommendedItemType } from '../types'

export const useRecommended = (connectedAddress: Address, limit: number, list?: string) => {
  const { data, isLoading, isRefetching, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['recommended', connectedAddress, limit, list],
    queryFn: async ({ pageParam = 0 }) => {
      const discoverAccounts = await fetchRecommended(
        'recommended',
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

  const fetchMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (fetchMoreRef.current) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage()
        }
      })

      observer.observe(fetchMoreRef.current)

      return () => {
        if (fetchMoreRef.current) observer.unobserve(fetchMoreRef.current)
      }
    }
  }, [fetchMoreRef])

  return {
    recommended: recommendedProfiles,
    isLoading: recommendedLoading,
    isRefetching,
    fetchMoreRef,
    hasNextPage,
  }
}
