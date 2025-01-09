import { Address } from 'viem'
import { useMemo } from 'react'
import { useFollowingState } from './useFollowingState'
import { useTransactions } from '../context/transactionContext'
import { formatListOpsTransaction, getListOpData } from '../utils/list-ops'

export type FollowButtonState = 'Block' | 'Blocked' | 'Follow' | 'Following' | 'Mute' | 'Muted'
// | 'Pending Following'
// | 'Pending Block'
// | 'Pending Mute'
// | 'Subscribe'
// | 'Subscribed'
// | 'Unblock'
// | 'Unfollow'
// | 'Unmute'
// | 'Unsubscribe'

type FollowButtonText = 'Block' | 'Block Back' | 'Mute Back' | 'Blocked' | 'Follow' | 'Following' | 'Mute' | 'Muted'
// | 'Subscribe'
// | 'Subscribed'
// | 'Unblock'
// | 'Unfollow'
// | 'Unmute'
// | 'Unsubscribe'

export const useFollowButton = ({
  lookupAddress,
  connectedAddress,
}: {
  lookupAddress: Address
  connectedAddress?: Address
}) => {
  const { addTransaction, nonce, selectedChainId, listsLoading, lists } = useTransactions()
  const { state: followState, isLoading } = useFollowingState({
    lookupAddressOrName: lookupAddress,
    connectedAddress,
    list: lists?.primary_list,
  })

  const buttonState = useMemo<FollowButtonState>(() => {
    if (!connectedAddress) return 'Follow'

    switch (followState) {
      case 'follows':
        return 'Following'
      case 'blocks':
        return 'Blocked'
      case 'mutes':
        return 'Muted'
      default:
        return 'Follow'
    }
  }, [followState, connectedAddress])

  const buttonText = useMemo<FollowButtonText>(() => {
    if (!connectedAddress) return 'Follow'

    switch (followState) {
      case 'follows':
        return 'Following'
      case 'blocks':
        return 'Blocked'
      case 'mutes':
        return 'Muted'
      default:
        return 'Follow'
    }
  }, [followState, connectedAddress])

  const handleAction = () => {
    if (!connectedAddress) return

    const listOps = []

    if (buttonState === 'Block') {
      if (followState !== 'follows') listOps.push({ opcode: 1, data: getListOpData(lookupAddress) })
      listOps.push({ opcode: 3, data: getListOpData(lookupAddress, 'block') })
    }
    if (buttonState === 'Blocked') {
      listOps.push({ opcode: 2, data: getListOpData(lookupAddress) })
      listOps.push({ opcode: 4, data: getListOpData(lookupAddress, 'block') })
    }

    if (buttonState === 'Mute') {
      if (followState !== 'follows') listOps.push({ opcode: 1, data: getListOpData(lookupAddress) })
      listOps.push({ opcode: 3, data: getListOpData(lookupAddress, 'mute') })
    }
    if (buttonState === 'Muted') {
      listOps.push({ opcode: 2, data: getListOpData(lookupAddress) })
      listOps.push({ opcode: 4, data: getListOpData(lookupAddress, 'mute') })
    }

    if (buttonText === 'Follow') listOps.push({ opcode: 1, data: getListOpData(lookupAddress) })
    if (buttonText === 'Following') listOps.push({ opcode: 2, data: getListOpData(lookupAddress) })

    const transaction = formatListOpsTransaction({
      nonce,
      chainId: selectedChainId,
      listOps,
      connectedAddress,
    })
    addTransaction(transaction)
  }

  return { buttonText, buttonState, handleAction, isLoading: isLoading || listsLoading }
}
