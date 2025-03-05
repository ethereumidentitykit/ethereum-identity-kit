import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchFollowState } from '../utils/api/fetch-follow-state'
import { Address } from '../types/address'
import { FollowState } from '../types/followState'
import { ProfileListType } from '../types/profile'
import { useTransactions } from '../context'

interface UseFollowingStateProps {
  lookupAddressOrName: Address | string
  connectedAddress?: Address
  list?: ProfileListType
}

export const useFollowingState = ({ lookupAddressOrName, connectedAddress, list }: UseFollowingStateProps) => {
  const { followingAddressesToFetchFresh } = useTransactions()
  const [fetchFresh, setFetchFresh] = useState(followingAddressesToFetchFresh.includes(lookupAddressOrName))

  useEffect(() => {
    if (followingAddressesToFetchFresh.includes(lookupAddressOrName)) setFetchFresh(true)
  }, [followingAddressesToFetchFresh, lookupAddressOrName])

  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ['followingState', lookupAddressOrName, connectedAddress, list, fetchFresh],
    queryFn: () =>
      fetchFollowState({ lookupAddressOrName, connectedAddress, list, type: 'following', fresh: fetchFresh }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  const isFollowingStateLoading = isLoading || isRefetching
  const followingState = useMemo((): FollowState => {
    if (!data?.state) return 'none'

    if (data.state.block) return 'blocks'
    if (data.state.mute) return 'mutes'
    if (data.state.follow) return 'follows'

    return 'none'
  }, [data])

  return {
    state: followingState,
    isLoading: isFollowingStateLoading,
  }
}
