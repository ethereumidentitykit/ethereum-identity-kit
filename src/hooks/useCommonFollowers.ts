import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ens_beautify } from '@adraffy/ens-normalize'
import { truncateAddress } from '../utils'
import { fetchCommonFollowers } from '../utils/api/fetch-common-followers'
import { noCommonFollowers } from '../constants'
import { Address } from '../types'

export const useCommonFollowers = (connectedAddress: Address, lookupAddressOrName: Address | string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['common-followers', connectedAddress, lookupAddressOrName],
    queryFn: async () => {
      if (!connectedAddress) return noCommonFollowers

      const response = await fetchCommonFollowers(connectedAddress, lookupAddressOrName)
      return response
    },
    refetchOnWindowFocus: false,
  })

  const sortedResults = useMemo(() => {
    return data && data.results.length > 0
      ? data.results.sort((a, b) =>
          // sort by avatar                                         // sort by name
          a.avatar && b.avatar ? 1 : a.avatar ? -1 : b.avatar ? 1 : a.name && b.name ? 1 : a.name ? -1 : b.name ? 1 : -1
        )
      : []
  }, [data])

  // First 3 avatars and names to be displayed in the component
  const displayedAvatars = sortedResults.slice(0, 3).map((result) => ({
    avatar: result.avatar,
    address: result.address,
  }))
  const displayedAddresses = sortedResults.slice(0, 3).map((result) => result.address)
  const displayedNames = sortedResults
    .slice(0, 2)
    .map((result) => (result.name ? ens_beautify(result.name) : truncateAddress(result.address)))
  const resultLength = data?.length || 0

  return {
    isLoading,
    displayedAvatars,
    displayedNames,
    displayedAddresses,
    resultLength,
  }
}
