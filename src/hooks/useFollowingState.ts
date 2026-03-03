import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { useTransactions } from '../context'
import { fetchFollowState } from '../utils/api/fetch-follow-state'
import { Address } from '../types/address'
import { ProfileListType } from '../types/profile'
import { FollowState, ForceFollowingState, InitialFollowingState } from '../types/followState'
import { UseFollowingStateReturn } from '../types/hooks'

interface UseFollowingStateProps {
  lookupAddressOrName: Address | string
  connectedAddress?: Address
  list?: ProfileListType
  initialState?: InitialFollowingState
  forceState?: ForceFollowingState
}

export const useFollowingState = ({
  lookupAddressOrName,
  connectedAddress,
  list,
  initialState,
  forceState,
}: UseFollowingStateProps): UseFollowingStateReturn => {
  const { followingAddressesToFetchFresh } = useTransactions()
  const [fetchFresh, setFetchFresh] = useState(followingAddressesToFetchFresh.includes(lookupAddressOrName))

  useEffect(() => {
    if (followingAddressesToFetchFresh.includes(lookupAddressOrName)) setFetchFresh(true)
  }, [followingAddressesToFetchFresh, lookupAddressOrName])

  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ['followingState', lookupAddressOrName, connectedAddress, list, fetchFresh, initialState, forceState],
    queryFn: async () => {
      if (forceState) {
        return {
          state: forceState.state,
        }
      }

      if (initialState && !fetchFresh)
        return {
          state:
            initialState === 'Follow'
              ? undefined
              : {
                  follow: initialState === 'Following',
                  block: initialState === 'Blocked',
                  mute: initialState === 'Muted',
                },
        }

      return await fetchFollowState({
        lookupAddressOrName,
        connectedAddress,
        list,
        type: 'following',
        fresh: fetchFresh,
      })
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  const isFollowingStateLoading = forceState ? forceState.isLoading : isLoading || isRefetching
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
