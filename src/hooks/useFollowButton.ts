import { useMemo } from 'react'
import { Address, Hex } from 'viem'
import { useFollowingState } from './useFollowingState'
import { useTransactions } from '../context/transactionContext'
import { formatListOpsTransaction, getListOpData, getListOpFromTransaction } from '../utils/list-ops'
import { FollowingState } from '../types'
import { EFPActionType } from '../types/transactions'

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
    if (!(connectedAddress && lists?.primary_list && pendingTxs.length > 0)) return false

    const pendingUpdateTransaction = pendingTxs
      .filter((tx) => tx.id === EFPActionType.UpdateEFPList)
      .flatMap((tx) => {
        const listOp = getListOpFromTransaction(tx)
        return listOp.data.map((data: Hex) => `0x${data.slice(10, 50).toLowerCase()}`)
      })

    if (pendingUpdateTransaction.length > 0) {
      return pendingUpdateTransaction.includes(lookupAddress.toLowerCase())
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
