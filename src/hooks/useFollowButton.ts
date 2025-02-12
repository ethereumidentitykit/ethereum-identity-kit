import { Address } from 'viem'
import { useMemo, useState } from 'react'
import { useFollowingState } from './useFollowingState'
import { useTransactions } from '../context/transactionContext'
import {
  getListOpData,
  getPendingTxListOps,
  extractAddressAndTag,
  formatListOpsTransaction,
} from '../utils/transactions'
import { FollowingState } from '../types'

export const useFollowButton = ({
  lookupAddress,
  connectedAddress,
}: {
  lookupAddress: Address
  connectedAddress?: Address
}) => {
  const [disableHover, setDisableHover] = useState(false)

  const {
    lists,
    nonce,
    pendingTxs,
    listsLoading,
    addTransaction,
    removeTransaction,
    selectedChainId,
    batchTransactions,
  } = useTransactions()
  const { state: followState, isLoading } = useFollowingState({
    lookupAddressOrName: lookupAddress,
    connectedAddress,
    list: lists?.primary_list,
  })

  const pendingListOp = useMemo(() => {
    if (!batchTransactions) return false
    if (!(connectedAddress && pendingTxs.length > 0)) return false

    const pendingListOps = getPendingTxListOps(pendingTxs)
    const pendingListOp = pendingListOps.find((op) => {
      const { address } = extractAddressAndTag(op.data)
      return address.toLowerCase() === lookupAddress.toLowerCase()
    })

    return pendingListOp
  }, [pendingTxs, lookupAddress])

  // Check if the address is already in a pending transaction
  const pendingState = useMemo(() => {
    if (!pendingListOp) return false

    if (pendingListOp.opcode === 1) return 'Pending Following'
    if (pendingListOp.opcode === 2) return 'Unfollow'

    const { tag } = extractAddressAndTag(pendingListOp.data)
    if (pendingListOp.opcode === 3 && tag === 'block') return 'Pending Block'
    if (pendingListOp.opcode === 3 && tag === 'mute') return 'Pending Mute'
    if (pendingListOp.opcode === 4 && tag === 'block') return 'Unblock'
    if (pendingListOp.opcode === 4 && tag === 'mute') return 'Unmute'
  }, [pendingListOp])

  const buttonState = useMemo<FollowingState>(() => {
    if (!connectedAddress) return 'Follow'

    if (pendingState) return pendingState

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
  }, [followState, connectedAddress, pendingState])

  const buttonText = useMemo<FollowingState>(() => {
    if (!connectedAddress) return 'Follow'

    if (pendingState) {
      if (pendingState === 'Pending Following') return 'Following'
      return pendingState
    }

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
  }, [followState, connectedAddress, pendingState])

  const handleAction = () => {
    if (!connectedAddress) return

    setDisableHover(true)

    if (pendingListOp) {
      removeTransaction(pendingListOp.data)
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

  return {
    buttonText,
    buttonState,
    handleAction,
    isLoading: isLoading || listsLoading,
    pendingState,
    disableHover,
    setDisableHover,
  }
}
