import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { isAddress } from 'viem'
import { useTransactions } from '../context'
import { Address } from '../types/address'
import { FollowState, InitialFollowingState } from '../types/followState'
import { ProfileListType } from '../types/profile'
import { fetchFollowState } from '../utils/api/fetch-follow-state'

interface UseFollowingStateProps {
  lookupAddressOrName?: Address | string
  connectedAddress?: Address | string
  list?: ProfileListType
  initialState?: InitialFollowingState
}

export const useFollowingState = ({
  lookupAddressOrName,
  connectedAddress,
  list,
  initialState,
}: UseFollowingStateProps) => {
  const { followingAddressesToFetchFresh } = useTransactions()
  const [fetchFresh, setFetchFresh] = useState(
    !!lookupAddressOrName && followingAddressesToFetchFresh.includes(lookupAddressOrName)
  )

  useEffect(() => {
    if (lookupAddressOrName && followingAddressesToFetchFresh.includes(lookupAddressOrName)) setFetchFresh(true)
  }, [followingAddressesToFetchFresh, lookupAddressOrName])

  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ['followingState', lookupAddressOrName, connectedAddress, list, fetchFresh, initialState],
    queryFn: async () => {
      if (!lookupAddressOrName) throw new Error('lookupAddressOrName is required')
      if (!connectedAddress) throw new Error('connectedAddress is required')
      if (!isAddress(connectedAddress)) throw new Error('connectedAddress must be a valid address')
      if (!isAddress(lookupAddressOrName)) throw new Error('lookupAddressOrName must be a valid address')

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
    enabled: !!lookupAddressOrName,
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
