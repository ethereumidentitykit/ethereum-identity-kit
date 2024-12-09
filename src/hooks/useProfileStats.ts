import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Address } from '../types/address'
import { fetchProfileStats } from '../utils/api/fetch-profile-stats'

export const useProfileStats = (address: Address) => {
  const [fetchFreshStats, setFetchFreshStats] = useState(false)
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['profile', 'stats', address, fetchFreshStats],
    queryFn: async () => await fetchProfileStats(address, undefined, fetchFreshStats)
  })

  const refreshProfileStats = () => {
    if (fetchFreshStats) refetch()
    else setFetchFreshStats(true)
  }

  const followers = data?.followers_count
  const following = data?.following_count
  const statsLoading = isLoading || isRefetching

  return {
    followers,
    following,
    statsLoading,
    refreshProfileStats
  }
}
