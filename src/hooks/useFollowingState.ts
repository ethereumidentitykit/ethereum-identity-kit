import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { Address } from "../types/address"
import { FollowState } from "../types/followState"
import { fetchFollowState } from "../utils/api/fetch-follow-state"
import { ProfileListType } from "../types/profile"

interface UseFollowingStateProps {
  lookupAddressOrName: Address | string
  connectedAddress: Address
  list?: ProfileListType
}

export const useFollowingState = ({ lookupAddressOrName, connectedAddress, list }: UseFollowingStateProps) => {
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ['followingState', lookupAddressOrName, connectedAddress, list],
    queryFn: () => fetchFollowState({ lookupAddressOrName, connectedAddress, list, type: 'following' }),
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
