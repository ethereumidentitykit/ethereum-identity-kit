import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchFollowState } from '../utils'
import { useTranslation } from '../context/TranslationContext'
import { Address, FollowState, ProfileListType } from '..'

interface UseFollowerStateProps {
  connectedAddress: Address
  addressOrName: Address | string
  list?: ProfileListType
}

export const useFollowerState = ({ connectedAddress, addressOrName, list }: UseFollowerStateProps) => {
  const { t } = useTranslation()

  const {
    data: followerStatus,
    isLoading: isFollowerStatusLoading,
    isRefetching: isFollowerStateRefetching,
  } = useQuery({
    queryKey: ['follower state', addressOrName, list, connectedAddress],
    queryFn: async () => {
      if (!addressOrName) return null

      const fetchedStatus = await fetchFollowState({
        lookupAddressOrName: addressOrName,
        connectedAddress,
        list,
        type: 'follower',
      })

      return fetchedStatus
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  const followState = useMemo((): FollowState => {
    if (!followerStatus?.state) return 'none'

    if (followerStatus.state.block) return 'blocks'
    if (followerStatus.state.mute) return 'mutes'
    if (followerStatus.state.follow) return 'follows'

    return 'none'
  }, [followerStatus])

  const isFollowerStateLoading = isFollowerStatusLoading || isFollowerStateRefetching
  const followerTag = {
    blocks: {
      text: t('followerState.blocksYou'),
      className: 'follower-tag-blocks',
    },
    mutes: {
      text: t('followerState.mutesYou'),
      className: 'follower-tag-mutes',
    },
    follows: {
      text: t('followerState.followsYou'),
      className: 'follower-tag-follows',
    },
    none: {
      text: '',
      className: 'follower-tag-none',
    },
  }[followState]

  return {
    followState,
    followerTag,
    isFollowerStateLoading,
  }
}
