import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { Address } from "../types/address"
import { FollowState } from "../types/followState"
import { fetchFollowState } from "../utils/api/fetch-follow-state"

export const useFollowingState = (lookupAddress: Address, userAddress: Address) => {
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ['followingState', lookupAddress, userAddress],
    queryFn: () => fetchFollowState({ lookupAddress, userAddress, type: 'following' }),
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
    isLoading: isFollowingStateLoading
  }
}
