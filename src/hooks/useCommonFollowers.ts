import { useQuery } from '@tanstack/react-query'
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
  })

  const displayedAvatars =
    data && data.results.length > 0
      ? data.results.slice(0, 3).map((result) => ({
          avatar: result.avatar,
          address: result.address,
        }))
      : []
  const displayedNames =
    data && data.results.length > 0
      ? data.results.slice(0, 2).map((result) => result.name || truncateAddress(result.address))
      : []
  const resultLength = data?.length || 0

  return {
    isLoading,
    displayedAvatars,
    displayedNames,
    resultLength,
  }
}
