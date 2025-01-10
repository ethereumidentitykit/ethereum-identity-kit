import { Address } from 'viem'
import { useMemo } from 'react'
import { useTransactions } from '../context/transactionContext'
import { useFollowingState } from './useFollowingState'
import { formatListOpsTransaction, getListOpData, getPendingTxsAddresses } from '../utils'
import { FollowingState } from '../types'

export const useFollowButton = ({
  lookupAddress,
  connectedAddress,
}: {
  lookupAddress: Address
  connectedAddress?: Address
}) => {
  const { addTransaction, nonce, selectedChainId, listsLoading, lists, pendingTxs, setTxModalOpen } = useTransactions()
  const { state: followState, isLoading } = useFollowingState({
    lookupAddressOrName: lookupAddress,
    connectedAddress,
    list: lists?.primary_list,
  })

  // Check if the address is already in a pending transaction
  const isPending = useMemo(() => {
    if (!(connectedAddress && pendingTxs.length > 0)) return false

    const pendingAddresses = getPendingTxsAddresses(pendingTxs)

    if (pendingAddresses.length > 0) {
      return pendingAddresses.includes(lookupAddress.toLowerCase())
    }

    return false
  }, [pendingTxs])

  const buttonState = useMemo<FollowingState>(() => {
    if (!connectedAddress) return 'Follow'

    if (isPending) return 'Pending'

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
  }, [followState, connectedAddress, isPending])

  const buttonText = useMemo<FollowingState>(() => {
    if (!connectedAddress) return 'Follow'

    if (isPending) return 'Pending'

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
  }, [followState, connectedAddress, isPending])

  const handleAction = () => {
    if (!connectedAddress) return

    if (isPending) {
      setTxModalOpen(true)
      return
    }

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
