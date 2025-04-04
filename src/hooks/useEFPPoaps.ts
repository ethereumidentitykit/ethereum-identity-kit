import { useQuery } from '@tanstack/react-query'
import { fetchProfileEFPPoaps } from '../utils/api/fetch-profile-efp-poaps'
import { Address } from '../types'

interface UseEFPPoapsProps {
  addressOrName?: Address | string | null
  list?: number | null
}

export const useEFPPoaps = ({ addressOrName, list }: UseEFPPoapsProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ['profile-efp-poaps', addressOrName, list],
    queryFn: async () => (addressOrName ? await fetchProfileEFPPoaps(addressOrName, list) : []),
  })

  const ownedBadges = data?.filter((badge) => badge.collection !== null) || []

  return {
    ownedBadges,
    isLoading,
  }
}
