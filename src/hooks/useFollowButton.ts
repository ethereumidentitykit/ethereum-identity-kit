import { Address, isAddress } from 'viem'
import { useMemo, useState, useCallback } from 'react'
import { useFollowingState } from './useFollowingState'
import { useTransactions } from '../context/transactionContext'
import { getPendingTxListOps, extractAddressAndTag } from '../utils/transactions'
import { listOpAddListRecord, listOpAddTag, listOpRemoveListRecord, listOpRemoveTag } from '../utils/list-ops'
import { FollowingState, InitialFollowingState, ProfileListType, UseFollowButtonReturn } from '../types'

// Action configuration for cleaner logic
const ACTION_CONFIG = {
  block: {
    addOps: (address: Address, followState: string) => {
      const ops = []
      if (followState !== 'follows') ops.push(listOpAddListRecord(address))
      ops.push(listOpAddTag(address, 'block'))
      return ops
    },
    removeOps: (address: Address) => [listOpRemoveListRecord(address), listOpRemoveTag(address, 'block')],
  },
  mute: {
    addOps: (address: Address, followState: string) => {
      const ops = []
      if (followState !== 'follows') ops.push(listOpAddListRecord(address))
      ops.push(listOpAddTag(address, 'mute'))
      return ops
    },
    removeOps: (address: Address) => [listOpRemoveListRecord(address), listOpRemoveTag(address, 'mute')],
  },
  follow: {
    addOps: (address: Address) => [listOpAddListRecord(address)],
    removeOps: (address: Address) => [listOpRemoveListRecord(address)],
  },
} as const

export interface UseFollowButtonParams {
  lookupAddress: Address
  connectedAddress?: Address
  selectedList?: ProfileListType
  initialState?: InitialFollowingState
}

export const useFollowButton = ({
  lookupAddress,
  connectedAddress,
  selectedList,
  initialState,
}: UseFollowButtonParams): UseFollowButtonReturn => {
  // Input validation
  if (!isAddress(lookupAddress)) {
    throw new Error(`Invalid lookup address: ${lookupAddress}`)
  }

  if (connectedAddress && !isAddress(connectedAddress)) {
    throw new Error(`Invalid connected address: ${connectedAddress}`)
  }
  const [disableHover, setDisableHover] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const { lists, pendingTxs, listsLoading, addListOpsTransaction, removeListOpsTransaction, batchTransactions } =
    useTransactions()
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

  const handleAction = useCallback(async () => {
    if (!connectedAddress) return

    try {
      setError(null)

      // Handle pending transaction cancellation
      if (pendingListOps.length) {
        await removeListOpsTransaction(pendingListOps.map((op) => op.data))
        return
      }

      const listOps = []

      // Use ACTION_CONFIG for cleaner logic
      if (buttonState === 'Block') {
        listOps.push(...ACTION_CONFIG.block.addOps(lookupAddress, followState))
      } else if (buttonState === 'Blocked') {
        listOps.push(...ACTION_CONFIG.block.removeOps(lookupAddress))
      } else if (buttonState === 'Mute') {
        listOps.push(...ACTION_CONFIG.mute.addOps(lookupAddress, followState))
      } else if (buttonState === 'Muted') {
        listOps.push(...ACTION_CONFIG.mute.removeOps(lookupAddress))
      } else if (buttonText === 'Follow') {
        listOps.push(...ACTION_CONFIG.follow.addOps(lookupAddress))
      } else if (buttonText === 'Following') {
        listOps.push(...ACTION_CONFIG.follow.removeOps(lookupAddress))
      }

      if (listOps.length > 0) {
        await addListOpsTransaction(listOps)
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred')
      setError(error)
      console.error('Follow action error:', error)
    }
  }, [
    connectedAddress,
    pendingListOps,
    buttonState,
    buttonText,
    followState,
    lookupAddress,
    addListOpsTransaction,
    removeListOpsTransaction,
  ])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Computed values
  const isDisabled = !connectedAddress || isLoading || listsLoading
  const ariaLabel = `${buttonText} ${lookupAddress}`
  const ariaPressed = buttonState === 'Following'

  return {
    buttonText,
    buttonState,
    handleAction,
    isLoading: isLoading || listsLoading,
    pendingState,
    disableHover,
    setDisableHover,
    isDisabled,
    error,
    clearError,
    ariaLabel,
    ariaPressed,
  }
}
