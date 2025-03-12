import { useMemo, useState } from 'react'
import { Address } from 'viem'
import { useTransactions } from '../context/transactionContext'
import { FollowingState, InitialFollowingState } from '../types'
import { listOpAddListRecord, listOpAddTag, listOpRemoveListRecord, listOpRemoveTag } from '../utils/list-ops'
import { extractAddressAndTag, formatListOpsTransaction, getPendingTxListOps } from '../utils/transactions'
import { useFollowingState } from './useFollowingState'

export const useFollowButton = ({
  lookupAddress,
  connectedAddress,
  selectedList,
  initialState,
}: {
  lookupAddress?: Address
  connectedAddress?: Address
  selectedList?: string
  initialState?: InitialFollowingState
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
    list: selectedList === 'new list' ? undefined : (selectedList ?? lists?.primary_list),
    initialState,
  })

  const pendingListOps = useMemo(() => {
    if (!batchTransactions) return []
    if (!(connectedAddress && pendingTxs.length > 0)) return []

    const allPendingListOps = getPendingTxListOps(pendingTxs)
    const filteredPendingListOps = allPendingListOps.filter((op) => {
      const { address } = extractAddressAndTag(op.data)
      return address.toLowerCase() === lookupAddress?.toLowerCase()
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
      if (pendingState === 'Pending Block') return 'Blocked'
      if (pendingState === 'Pending Mute') return 'Muted'
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
    if (!connectedAddress) throw new Error('connectedAddress is required')
    if (!lookupAddress) throw new Error('lookupAddress is required')

    setDisableHover(true)

    if (pendingListOps.length) {
      removeListOpsTransaction(pendingListOps.map((op) => op.data))
      return
    }

    const listOps = []

    if (buttonState === 'Block') {
      if (followState !== 'follows') listOps.push(listOpAddListRecord(lookupAddress))
      listOps.push(listOpAddTag(lookupAddress, 'block'))
    }
    if (buttonState === 'Blocked') {
      listOps.push(listOpRemoveListRecord(lookupAddress))
      listOps.push(listOpRemoveTag(lookupAddress, 'block'))
    }

    if (buttonState === 'Mute') {
      if (followState !== 'follows') listOps.push(listOpAddListRecord(lookupAddress))
      listOps.push(listOpAddTag(lookupAddress, 'mute'))
    }
    if (buttonState === 'Muted') {
      listOps.push(listOpRemoveListRecord(lookupAddress))
      listOps.push(listOpRemoveTag(lookupAddress, 'mute'))
    }

    if (buttonText === 'Follow') listOps.push(listOpAddListRecord(lookupAddress))
    if (buttonText === 'Following') listOps.push(listOpRemoveListRecord(lookupAddress))

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
