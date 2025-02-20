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
    addListOpsTransaction,
    removeListOpsTransaction,
    selectedChainId,
    batchTransactions,
  } = useTransactions()
  const { state: followState, isLoading } = useFollowingState({
    lookupAddressOrName: lookupAddress,
    connectedAddress,
    list: lists?.primary_list,
  })

  const pendingListOps = useMemo(() => {
    if (!batchTransactions) return []
    if (!(connectedAddress && pendingTxs.length > 0)) return []

    const allPendingListOps = getPendingTxListOps(pendingTxs)
    const filteredPendingListOps = allPendingListOps.filter((op) => {
      const { address } = extractAddressAndTag(op.data)
      return address.toLowerCase() === lookupAddress.toLowerCase()
    })

    return filteredPendingListOps
  }, [pendingTxs, lookupAddress])

  // Check if the address is already in a pending transaction
  const pendingState = useMemo(() => {
    if (!pendingListOps.length) return false

    const listOps = pendingListOps.map((op) => ({
      tag: extractAddressAndTag(op.data).tag,
      address: extractAddressAndTag(op.data).address,
      opcode: op.opcode,
    }))
    if (listOps.some((op) => op.opcode === 3 && op.tag === 'block')) return 'Pending Block'
    if (listOps.some((op) => op.opcode === 3 && op.tag === 'mute')) return 'Pending Mute'
    if (listOps.some((op) => op.opcode === 4 && op.tag === 'block')) return 'Unblock'
    if (listOps.some((op) => op.opcode === 4 && op.tag === 'mute')) return 'Unmute'

    if (listOps.some((op) => op.opcode === 1)) return 'Pending Following'
    if (listOps.some((op) => op.opcode === 2)) return 'Unfollow'
  }, [pendingListOps])

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

    if (pendingListOps.length) {
      removeListOpsTransaction(pendingListOps.map((op) => op.data))
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
    addListOpsTransaction(transaction)
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
