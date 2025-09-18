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
import { Address, Hex } from 'viem'
import { useAccount } from 'wagmi'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getMintTxNonce,
  getMintTxChainId,
  getPendingTxAddresses,
  prepareMintTransaction,
  formatListOpsTransaction,
} from '../utils/transactions'
import { safeLocalStorage } from '../utils/storage'
import { generateSlot } from '../utils/generate-slot'
import { fetchProfileLists } from '../utils/api/fetch-profile-lists'
import { getListStorageLocation } from '../utils/list-storage-location'
import { ListRecordContracts } from '../constants'
import { LIST_OP_LIMITS } from '../constants/chains'
import { EFPActionIds } from '../constants/transactions'
import { ProfileListsResponse } from '../types'
import { TransactionType } from '../types/transactions'
import { EFPActionType, ListOpType } from '../types/transactions'

type TransactionContextType = {
  txModalOpen: boolean
  batchTransactions: boolean
  paymasterService?: string
  setTxModalOpen: (txModalOpen: boolean) => void
  changesOpen: boolean
  setChangesOpen: (changesOpen: boolean) => void
  selectedList?: string
  setSelectedList: (selectedList: string | undefined) => void
  pendingTxs: TransactionType[]
  setPendingTxs: Dispatch<SetStateAction<TransactionType[]>>
  lists?: ProfileListsResponse | null
  listsLoading: boolean
  nonce: bigint | undefined
  addTransactions: (txs: TransactionType[]) => void
  addListOpsTransaction: (listOps: ListOpType[]) => void
  removeTransactions: (ids: (EFPActionType | string)[]) => void
  removeListOpsTransaction: (txData: Hex[]) => void
  currentTxIndex: number | undefined
  setCurrentTxIndex: (currentTxIndex: number | undefined) => void
  goToNextTransaction: () => void
  resetTransactions: (keepModalOpen?: boolean) => void
  refetchAssociatedQueries: () => void
  selectedChainId: number | undefined
  setSelectedChainId: (chainId: number | undefined) => void
  defaultChainId: number | undefined
  isCheckoutFinished: boolean
  followingAddressesToFetchFresh: string[]
  setIsCheckoutFinished: (isCheckoutFinished: boolean) => void
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined)

/**
 * TransactionProvider component - provides the transaction context to the app
 *
 * @param batchTransactions - whether to batch transactions (cart)
 * @param paymasterService - the paymaster service to use
 * @param defaultChainId - the default chain id to use for users without a list (new list)
 * @param children - the children to render
 */
export const TransactionProvider = ({
  batchTransactions = false,
  paymasterService,
  defaultChainId,
  children,
}: {
  batchTransactions?: boolean
  paymasterService?: string
  defaultChainId?: number
  children: ReactNode
}) => {
  const [txModalOpen, setTxModalOpen] = useState(false)
  const [pendingTxs, setPendingTxs] = useState<TransactionType[]>([])
  const [currentTxIndex, setCurrentTxIndex] = useState<number | undefined>(undefined)

  // Whether to show the changes button (cart)
  const [changesOpen, setChangesOpen] = useState(batchTransactions && !currentTxIndex)

  // Addresses to fetch the fresh following state for (FollowButton)
  const [followingAddressesToFetchFresh, setFollowingAddressesToFetchFresh] = useState<string[]>([])
  const [selectedList, setSelectedList] = useState<string | undefined>(undefined)
  const [isCheckoutFinished, setIsCheckoutFinished] = useState<boolean>(false)

  useEffect(() => {
    if (!txModalOpen) {
      if (isCheckoutFinished) setIsCheckoutFinished(false)

      const includesUpdateEFPList = pendingTxs.some((tx) => tx.id === EFPActionIds.UpdateEFPList)
      if (includesUpdateEFPList || pendingTxs.length === 0)
        setChangesOpen(batchTransactions && !currentTxIndex && pendingTxs[0]?.hash === undefined)
      if ((!currentTxIndex || currentTxIndex === 0) && pendingTxs[0]?.hash === undefined) setCurrentTxIndex(undefined)
    }
  }, [txModalOpen])

  const [listDetailsLoading, setListDetailsLoading] = useState(false)

  // Nonce to assign to the EFP trasactions
  const [nonce, setNonce] = useState<bigint | undefined>(undefined)
  // Chain ID to be used for EFP List Update transactions (List Ops)
  const [selectedChainId, setSelectedChainId] = useState<number | undefined>(undefined)
  const [listRecordsContractAddress, setListRecordsContractAddress] = useState<Address | undefined>(undefined)

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
    // if user has no primary list, and no specific list has been selected, set the first list (list with the lowest number) as the selected list
    if (lists?.lists?.length && !lists.primary_list && !selectedList) setSelectedList(lists.lists[0])
    else setSelectedList(undefined)
  }, [lists])

  const getListDetails = async () => {
    if (selectedList === 'new list' || (!selectedList && !lists?.primary_list)) {
      // If the user has no list or is creating a new list, reset the chainId and nonce
      setSelectedChainId(undefined)
      setNonce(undefined)
    } else {
      // Otherwise, get the list details from the list storage location onchain
      const { chainId, slot, contractAddress } = await getListStorageLocation(selectedList ?? lists?.primary_list ?? '')
      setSelectedChainId(chainId)
      setNonce(slot)
      setListRecordsContractAddress(contractAddress)
    }

    setListDetailsLoading(false)
  }

  // Load connected user's details and existing pending transactions
  useEffect(() => {
    setListDetailsLoading(true)

    const storedPendingTxs = JSON.parse(
      safeLocalStorage.getItem(
        `eik-pending-txs-${connectedAddress}-${selectedList || lists?.primary_list || 'null'}`
      ) || '[]'
    ) as TransactionType[]

    if (storedPendingTxs && storedPendingTxs.length > 0) {
      // Find the mint transaction and extract the nonce and chainId
      const mintTx = storedPendingTxs.find((tx) => tx.id === EFPActionIds.CreateEFPList)

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

      setPendingTxs(storedPendingTxs)
      setCurrentTxIndex(
        incompleteTxIndex === 0 ? undefined : incompleteTxIndex === -1 ? storedPendingTxs.length - 1 : incompleteTxIndex
      )
      setChangesOpen(batchTransactions && incompleteTxIndex === 0)
      if (!batchTransactions || incompleteTxIndex > 0 || incompleteTxIndex === -1) setTxModalOpen(true)
    } else {
      getListDetails()
      setPendingTxs([])
      setTxModalOpen(false)
      setCurrentTxIndex(undefined)
    }
  }, [connectedAddress, lists?.primary_list, selectedList])

  // Save pending transactions to local storage
  useEffect(() => {
    if (!connectedAddress) return

    if (pendingTxs.length === 0) {
      safeLocalStorage.removeItem(
        `eik-pending-txs-${connectedAddress}-${selectedList || lists?.primary_list || 'null'}`
      )
      return
    }

    // const transformPendingTxs = transformTxsForLocalStorage(pendingTxs)
    safeLocalStorage.setItem(
      `eik-pending-txs-${connectedAddress}-${selectedList || lists?.primary_list || 'null'}`,
      JSON.stringify(pendingTxs, (_, v) => (typeof v === 'bigint' ? v.toString() : v))
    )
  }, [pendingTxs])

  // Add any transaction to the transaction queue (It doesn't need to be an EFP related transaction)
  const addTransactions = (txs: TransactionType[]) => {
    setPendingTxs((prev) => (batchTransactions ? [...prev, ...txs] : txs))
  }

  const addListOpsTransaction = (listOps: ListOpType[]) => {
    if (!connectedAddress) return

    // If the selectedList is 'new list', the list will definitely be minted. Otherwise, check if there is a valid list selected or the user has a primary list
    const userHasList = selectedList === 'new list' ? false : selectedList || lists?.primary_list
    const tx = formatListOpsTransaction({
      listOps,
      connectedAddress,
      nonce,
      listRecordsContractAddress,
      chainId: selectedChainId,
      isMintingNewList: !userHasList,
    })

    setPendingTxs((prev) => {
      const newPendingTxs = batchTransactions ? [...prev] : []

      // Add new transaction and mint if user has no list and there is no pending transaction
      if (newPendingTxs.filter((tx) => tx.id === EFPActionIds.UpdateEFPList).length === 0 || !batchTransactions) {
        newPendingTxs.push(tx)

        if (selectedList === 'new list' || (!selectedList && !lists?.primary_list)) {
          const mintNonce = nonce || generateSlot()

          if (mintNonce !== nonce) {
            setNonce(mintNonce)
            newPendingTxs[0].args[0] = mintNonce
          }

          if (defaultChainId) {
            setSelectedChainId(defaultChainId)
            newPendingTxs[0].chainId = defaultChainId
            newPendingTxs[0].address = ListRecordContracts[defaultChainId]
          }

          const mintTransaction = prepareMintTransaction(mintNonce, defaultChainId)

          newPendingTxs.push(mintTransaction)
        }
      } else if (batchTransactions) {
        // Update the UpdateEFPList transaction if it exists and is not yet complete
        const pendingUpdateTransaction = newPendingTxs
          .filter((tx) => tx.id === EFPActionIds.UpdateEFPList && !tx.hash)
          .slice(-1)[0]

        if (!pendingUpdateTransaction) {
          newPendingTxs.push(tx)
        } else {
          const pendingUpdateTxListOps = pendingUpdateTransaction.args.slice(-1).flat()
          const txListOps = tx.args.slice(-1).flat()

          if (pendingUpdateTxListOps.length >= LIST_OP_LIMITS[tx.chainId as keyof typeof LIST_OP_LIMITS]) {
            newPendingTxs.push(tx)
          } else if (!pendingUpdateTxListOps.includes(txListOps[0])) {
            newPendingTxs[newPendingTxs.indexOf(pendingUpdateTransaction)] = {
              ...pendingUpdateTransaction,
              args: [...pendingUpdateTransaction.args.slice(0, -1), [...pendingUpdateTxListOps, ...txListOps]],
            }
          }
        }
      }

      return newPendingTxs
    })

    if (!batchTransactions) setTxModalOpen(true)
  }

  // Remove any transaction from the transaction queue (removes the whole transaction)
  const removeTransactions = (ids: (EFPActionType | string)[]) => {
    setPendingTxs((prev) => prev.filter((tx) => !ids.includes(tx.id)))
  }

  const removeListOpsTransaction = (txData: Hex[]) => {
    setPendingTxs((prev) => {
      const filteredPendingTxs = [...prev]

      txData.forEach((data) => {
        const updateEFPListTxId = filteredPendingTxs.findIndex(
          (tx) =>
            tx.id === EFPActionIds.UpdateEFPList &&
            !tx.hash &&
            !!tx.args
              .slice(-1)
              .flat()
              .find((op) => op.toLowerCase().includes(data.slice(2).toLowerCase()))
        )

        if (updateEFPListTxId > -1) {
          // Filter out the list op from the UpdateEFPList transaction
          const updateEFPListTx = filteredPendingTxs[updateEFPListTxId]
          const updateEFPListTxListOps = updateEFPListTx.args.slice(-1).flat()
          const filteredArgs = updateEFPListTxListOps.filter(
            (op: Hex) => !op.toLowerCase().includes(data.slice(2).toLowerCase())
          )

          filteredPendingTxs[updateEFPListTxId] = {
            ...updateEFPListTx,
            args: [...updateEFPListTx.args.slice(0, -1), filteredArgs],
          }
        }
      })

      // Filter out any UpdateEFPList transactions that have no list ops left
      const updatedPendingTxs = filteredPendingTxs.filter((tx) =>
        tx.id === EFPActionIds.UpdateEFPList ? tx.args.slice(-1).flat().length > 0 : true
      )

      // Remove the Mint transaction if no EFP List Update transactions are left
      if (updatedPendingTxs.findIndex((tx) => tx.id === EFPActionIds.UpdateEFPList) === -1) {
        return updatedPendingTxs.filter((tx) => tx.id !== EFPActionIds.CreateEFPList)
      }

      return updatedPendingTxs
    })
  }

  const goToNextTransaction = () => {
    const newTxIndex = (currentTxIndex || 0) + 1

    if (newTxIndex === pendingTxs.length) {
      resetTransactions()
      setIsCheckoutFinished(true)
      // Refetch lists if user has minted a new one
      if (pendingTxs.find((tx) => tx.id === EFPActionIds.CreateEFPList)) refetchLists()
    } else {
      setCurrentTxIndex(newTxIndex)
    }
  }

  const queryClient = useQueryClient()
  const refetchAssociatedQueries = () => {
    // Fetch the fresh following state for the addresses that have been updated
    const addresses = getPendingTxAddresses(pendingTxs)
    setFollowingAddressesToFetchFresh((prev) => [...prev, ...addresses])
    addresses.forEach((address) => {
      // Use a partial query key match to ensure we catch all followingState queries for this address
      queryClient.refetchQueries({
        queryKey: ['followingState', address],
        exact: false,
      })
    })
  }

  const resetTransactions = useCallback((keepModalOpen?: boolean) => {
    setTxModalOpen(keepModalOpen ?? false)
    setPendingTxs([])
    setCurrentTxIndex(undefined)
  }, [])

  const value = {
    lists,
    nonce,
    selectedList,
    setSelectedList,
    pendingTxs,
    txModalOpen,
    changesOpen,
    setPendingTxs,
    setChangesOpen,
    setTxModalOpen,
    addTransactions,
    addListOpsTransaction,
    currentTxIndex,
    selectedChainId,
    defaultChainId,
    paymasterService,
    removeTransactions,
    removeListOpsTransaction,
    batchTransactions,
    resetTransactions,
    refetchAssociatedQueries,
    setCurrentTxIndex,
    setSelectedChainId,
    goToNextTransaction,
    isCheckoutFinished,
    setIsCheckoutFinished,
    followingAddressesToFetchFresh,
    listsLoading: listsLoading || listsIsRefetching || listDetailsLoading,
  }

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>
}

/**
 * useTransactions hook - enables use of the transaction context
 *
 * @returns the transaction context
 */
export const useTransactions = (): TransactionContextType => {
  const context = useContext(TransactionContext)
  if (!context) {
    throw new Error('useTransactions must be used within an TransactionProvider')
  }
  return context
}
