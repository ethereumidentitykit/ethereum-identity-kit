import { useQuery } from '@tanstack/react-query'
import { Address } from '../types/address'
import { fetchProfileDetails } from '../utils/api/fetch-profile-details'
import { useState } from 'react'

export const useProfileDetails = (address: Address) => {
  const [fetchFreshProfileDetails, setFetchFreshProfileDetails] = useState(false)
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['profile', 'details', address, fetchFreshProfileDetails],
    queryFn: async () =>
      await fetchProfileDetails(address, undefined, fetchFreshProfileDetails)
  })

  // const { data: stats, isLoading: statsLoading } = useQuery({
  //   queryKey: ['profile', 'stats', address],
  //   queryFn: async () => await fetchProfileStats(address)
  // })

  const refreshProfileDetails = () => {
    if (fetchFreshProfileDetails) refetch()
    else setFetchFreshProfileDetails(true)
  }

  const primaryList = data?.primary_list
  const ens = data?.ens
  const ranks = data?.ranks
  const detailsLoading = isLoading || isRefetching

  return {
    ens,
    ranks,
    primaryList,
    detailsLoading,
    refreshProfileDetails
  }
}
