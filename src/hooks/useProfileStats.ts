import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchProfileStats } from '../utils'
import { ProfileListType, StatsResponse, Address } from '../types'

interface UseProfileStatsProps {
  addressOrName: Address | string
  list?: ProfileListType
  prefetchedData?: StatsResponse | null
  refetchPrefetchedData?: () => void
}

export const useProfileStats = ({
  addressOrName,
  list,
  prefetchedData,
  refetchPrefetchedData,
}: UseProfileStatsProps) => {
  const [fetchFreshStats, setFetchFreshStats] = useState(false)
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['stats', addressOrName, list, fetchFreshStats],
    queryFn: async () => prefetchedData || (await fetchProfileStats(addressOrName, list, fetchFreshStats)),
  })

  const refreshProfileStats = () => {
    if (isRefetching) return

    if (refetchPrefetchedData) return refetchPrefetchedData()

    if (fetchFreshStats) refetch()
    else setFetchFreshStats(true)
  }

  const followers = data?.followers_count
  const following = data?.following_count
  const statsLoading = isLoading || isRefetching

  return {
    data,
    followers,
    following,
    statsLoading,
    refreshProfileStats,
  }
}
