'use client'

import {
  Dispatch,
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
  type ReactNode,
  SetStateAction,
} from 'react'
import { useAccount } from 'wagmi'
import { encodePacked } from 'viem'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import * as abi from '../constants/abi'
import { DEFAULT_CHAIN } from '../constants/chains'
import { ProfileListsResponse } from '../types'
import { coreEfpContracts } from '../constants/contracts'
import { fetchProfileLists } from '../utils/api/fetch-profile-lists'
import { getListStorageLocation } from '../utils/list-storage-location'
import { generateListStorageLocationSlot } from '../utils/generate-slot'
import { EFPActionType } from '../types/transactions'
import { TransactionType } from '../types/transactions'

type TransactionContextType = {
  txModalOpen: boolean
  setTxModalOpen: (txModalOpen: boolean) => void
  pendingTxs: TransactionType[]
  setPendingTxs: Dispatch<SetStateAction<TransactionType[]>>
  lists?: ProfileListsResponse | null
  listsLoading: boolean
  nonce: bigint | undefined
  addTransaction: (newTransaction: TransactionType) => void
  currentTxIndex: number | undefined
  goToNextTransaction: () => void
  resetTransactions: () => void
  selectedChainId: number | undefined
  setSelectedChainId: (chainId: number | undefined) => void
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined)

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [txModalOpen, setTxModalOpen] = useState(false)
  const [pendingTxs, setPendingTxs] = useState<TransactionType[]>([])
  const [currentTxIndex, setCurrentTxIndex] = useState<number | undefined>(undefined)

  const [nonce, setNonce] = useState<bigint | undefined>(undefined)
  const [selectedChainId, setSelectedChainId] = useState<number | undefined>(undefined)

  const { address: connectedAddress } = useAccount()
  const {
    data: lists,
    isLoading: listsLoading,
    refetch: refetchLists,
    isRefetching: listsIsRefetching,
  } = useQuery({
    queryKey: ['lists', connectedAddress],
    queryFn: async () => {
      if (!connectedAddress) return null

      const fetchedLists = await fetchProfileLists(connectedAddress, true)
      return fetchedLists
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  useEffect(() => {
    const getListDetails = async () => {
      if (!lists?.primary_list) {
        setSelectedChainId(undefined)
        setNonce(undefined)
        return
      }

      const { chainId, slot } = await getListStorageLocation(lists?.primary_list)
      setSelectedChainId(chainId)
      setNonce(slot)
    }

    setPendingTxs([])
    setTxModalOpen(false)
    setCurrentTxIndex(undefined)

    getListDetails()
  }, [connectedAddress, lists?.primary_list])

  const prepareMintTransaction = (mintNonce: bigint) => {
    const mintTransaction = {
      id: EFPActionType.CreateEFPList,
      chainId: DEFAULT_CHAIN.id,
      address: coreEfpContracts.EFPListMinter,
      abi: abi.efpListMinterAbi,
      functionName: 'mintPrimaryListNoMeta',
      args: [
        encodePacked(
          ['uint8', 'uint8', 'uint256', 'address', 'uint'],
          [1, 1, BigInt(DEFAULT_CHAIN.id), coreEfpContracts.EFPListRecords, mintNonce]
        ),
      ],
    }

    return mintTransaction
  }

  const addTransaction = (tx: TransactionType) => {
    const newPendingTxs = [...pendingTxs]

    // Add new transaction and mint if user has no list
    if (newPendingTxs.length === 0) {
      newPendingTxs.push(tx)

      if (!lists?.primary_list) {
        const mintNonce = nonce || generateListStorageLocationSlot()

        if (mintNonce !== nonce) {
          setNonce(mintNonce)
          newPendingTxs[0].args[0] = mintNonce
        }

        const mintTransaction = prepareMintTransaction(mintNonce)

        newPendingTxs.push(mintTransaction)
      }
    } else {
      // Update the transaction if it exists and is not yet complete
      const pendingUpdateTransaction = newPendingTxs.findIndex(
        (tx) => tx.id === EFPActionType.UpdateEFPList && !tx.hash
      )
      if (pendingUpdateTransaction === -1) {
        newPendingTxs.push(tx)
      } else {
        const pendingUpdateTxListOps = newPendingTxs[pendingUpdateTransaction].args.slice(-1).flat()
        const txListOps = tx.args.slice(-1).flat()

        if (!pendingUpdateTxListOps.includes(txListOps[0])) {
          newPendingTxs[pendingUpdateTransaction] = {
            ...newPendingTxs[pendingUpdateTransaction],
            args: [
              ...newPendingTxs[pendingUpdateTransaction].args.slice(0, -1),
              [...pendingUpdateTxListOps, ...txListOps],
            ],
          }
        }
      }
    }

    setPendingTxs(newPendingTxs)
    setTxModalOpen(true)
    if (!currentTxIndex) setCurrentTxIndex(0)
  }

  const queryClient = useQueryClient()
  const goToNextTransaction = () => {
    const newTxIndex = (currentTxIndex || 0) + 1
    if (newTxIndex === pendingTxs.length) {
      setTxModalOpen(false)
      resetTransactions()
      if (!lists?.primary_list) refetchLists()
      queryClient.invalidateQueries({ queryKey: ['followingState'] })
      queryClient.refetchQueries({ queryKey: ['profile'] })
    } else {
      setCurrentTxIndex(newTxIndex)
    }
  }

  const resetTransactions = useCallback(() => {
    setTxModalOpen(false)
    setPendingTxs([])
    setCurrentTxIndex(undefined)
  }, [])

  const value = {
    txModalOpen,
    setTxModalOpen,
    pendingTxs,
    setPendingTxs,
    lists,
    listsLoading: listsLoading || listsIsRefetching,
    nonce,
    addTransaction,
    currentTxIndex,
    goToNextTransaction,
    resetTransactions,
    selectedChainId,
    setSelectedChainId,
  }

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>
}

export const useTransactions = (): TransactionContextType => {
  const context = useContext(TransactionContext)
  if (!context) {
    throw new Error('useTransactions must be used within an TransactionProvider')
  }
  return context
}
