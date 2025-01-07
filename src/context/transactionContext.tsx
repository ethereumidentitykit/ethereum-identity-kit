'use client'

import {
  useState,
  useContext,
  useCallback,
  createContext,
  type ReactNode,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react'
import { useAccount } from 'wagmi'
import { Abi, encodePacked, type Hex } from 'viem'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import * as abi from '../constants/abi'
import { DEFAULT_CHAIN } from '../constants/chains'
import { Address, ProfileListsResponse } from '../types'
import { coreEfpContracts } from '../constants/contracts'
import { fetchProfileLists } from '../utils/api/fetch-profile-lists'
import { getListStorageLocation } from '../utils/list-storage-location'
import { generateListStorageLocationSlot } from '../utils/generate-slot'

export enum EFPActionType {
  CreateEFPList = 'CreateEFPList',
  UpdateEFPList = 'UpdateEFPList',
}

export type TransactionType = {
  id: EFPActionType
  address: Address
  chainId?: number
  abi: Abi
  functionName: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any[]
  hash?: Hex
}

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

  const addTransaction = (tx: TransactionType) => {
    const newPendingTxs = [tx]

    if (pendingTxs.length === 0 && !lists?.primary_list) {
      const mintNonce = nonce || generateListStorageLocationSlot()
      if (mintNonce !== nonce) {
        setNonce(mintNonce)
        newPendingTxs[0].args[0] = mintNonce
      }

      console.log('mintNonce', mintNonce)

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

      newPendingTxs.push(mintTransaction)
    }

    setPendingTxs((currentTxs) => [...currentTxs, ...newPendingTxs])
    setCurrentTxIndex(0)
    setTxModalOpen(true)
  }

  const queryClient = useQueryClient()
  const goToNextTransaction = () => {
    if ((currentTxIndex || 0) + 1 === pendingTxs.length) {
      setTxModalOpen(false)
      setCurrentTxIndex(undefined)
      refetchLists()
      queryClient.invalidateQueries({ queryKey: ['followingState'] })
      queryClient.refetchQueries({ queryKey: ['profile'] })
    } else {
      setCurrentTxIndex((currIndex) => (currIndex || 0) + 1)
    }
  }

  const resetTransactions = useCallback(() => {
    setPendingTxs([])
    setCurrentTxIndex(undefined)
  }, [])

  const value = {
    txModalOpen,
    setTxModalOpen,
    pendingTxs,
    setPendingTxs,
    lists,
    listsLoading,
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
