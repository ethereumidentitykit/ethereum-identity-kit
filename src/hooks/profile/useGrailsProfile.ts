import { useQuery } from '@tanstack/react-query'
import { fetchGrailsProfile } from '../../utils/api/fetch-grails-profile'

interface UseGrailsProfileProps {
  addressOrName: string
  enabled?: boolean
}

export const useGrailsProfile = ({ addressOrName, enabled = false }: UseGrailsProfileProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['grails-profile', addressOrName],
    queryFn: async () => await fetchGrailsProfile(addressOrName),
    enabled: enabled && !!addressOrName,
    refetchOnWindowFocus: false,
  })

  return {
    data,
    isLoading,
    isError,
  }
}
