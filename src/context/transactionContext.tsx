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
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { generateSlot } from '../utils/generate-slot'
import { fetchProfileLists } from '../utils/api/fetch-profile-lists'
import { getListStorageLocation } from '../utils/list-storage-location'
import {
  getMintTxChainId,
  getMintTxNonce,
  prepareMintTransaction,
  transformTxsForLocalStorage,
} from '../utils/transactions'
import { ProfileListsResponse } from '../types'
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

  const [listDetailsLoading, setListDetailsLoading] = useState(false)
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

  const getListDetails = async () => {
    if (!lists?.primary_list) {
      setSelectedChainId(undefined)
      setNonce(undefined)
    } else {
      const { chainId, slot } = await getListStorageLocation(lists?.primary_list)
      setSelectedChainId(chainId)
      setNonce(slot)
    }

    setListDetailsLoading(false)
  }

  // Load connected user's details and existing pending transactions
  useEffect(() => {
    setListDetailsLoading(true)

    const storedPendingTxs = JSON.parse(
      localStorage.getItem(`eik-pending-txs-${connectedAddress}-${lists?.primary_list || 'null'}`) || '[]'
    ) as TransactionType[]

    if (storedPendingTxs.length > 0) {
      // Find the mint transaction and extract the nonce and chainId
      const mintTx = storedPendingTxs.find((tx) => tx.id === EFPActionType.CreateEFPList)

      if (mintTx) {
        const storedNonce = getMintTxNonce(mintTx)
        const storedChainId = getMintTxChainId(mintTx)

        if (storedNonce !== nonce) setNonce(storedNonce)
        if (storedChainId !== selectedChainId) setSelectedChainId(storedChainId)
        setListDetailsLoading(false)
      } else {
        getListDetails()
      }

      // Find the index of the first incomplete transaction to set it as the current transaction
      const incompleteTxIndex = storedPendingTxs.findIndex((tx) => !tx.hash)

      setTxModalOpen(true)
      setPendingTxs(storedPendingTxs)
      setCurrentTxIndex(incompleteTxIndex === -1 ? storedPendingTxs.length - 1 : incompleteTxIndex)
    } else {
      getListDetails()
      setPendingTxs([])
      setTxModalOpen(false)
      setCurrentTxIndex(undefined)
    }
  }, [connectedAddress, lists?.primary_list])

  // Save pending transactions to local storage
  useEffect(() => {
    if (!connectedAddress) return

    if (pendingTxs.length === 0) {
      localStorage.removeItem(`eik-pending-txs-${connectedAddress}-${lists?.primary_list || 'null'}`)
      return
    }

    const transformPendingTxs = transformTxsForLocalStorage(pendingTxs)
    localStorage.setItem(
      `eik-pending-txs-${connectedAddress}-${lists?.primary_list || 'null'}`,
      JSON.stringify(transformPendingTxs)
    )
  }, [pendingTxs])

  const addTransaction = (tx: TransactionType) => {
    const newPendingTxs = [...pendingTxs]

    // Add new transaction and mint if user has no list and there is no pending transaction
    if (newPendingTxs.length === 0) {
      newPendingTxs.push(tx)

      if (!lists?.primary_list) {
        const mintNonce = nonce || generateSlot()

        if (mintNonce !== nonce) {
          setNonce(mintNonce)
          newPendingTxs[0].args[0] = mintNonce
        }

        const mintTransaction = prepareMintTransaction(mintNonce)

        newPendingTxs.push(mintTransaction)
      }
    } else {
      // Update the UpdateEFPList transaction if it exists and is not yet complete
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
      // Refetch lists if user has minted a new one
      if (pendingTxs.find((tx) => tx.id === EFPActionType.CreateEFPList)) refetchLists()

      resetTransactions()

      // Refetch follow button and profile data
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
    listsLoading: listsLoading || listsIsRefetching || listDetailsLoading,
    selectedChainId,
    setSelectedChainId,
    nonce,
    addTransaction,
    currentTxIndex,
    goToNextTransaction,
    resetTransactions,
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
