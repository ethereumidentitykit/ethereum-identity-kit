import { Address } from 'viem'
import { useQuery } from '@tanstack/react-query'
import { fetchRecommended } from '../utils/api/fetch-recommended'

export const useRecommended = (connectedAddress: Address) => {
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ['recommended', connectedAddress],
    queryFn: () => fetchRecommended('recommended', connectedAddress),
  })

  const recommendedProfiles = data?.map((profile) => ({
    ...profile,
    isFollowing: profile.isFollowing || false,
  }))

  return {
    recommended: recommendedProfiles,
    isLoading,
    isRefetching,
  }
}
