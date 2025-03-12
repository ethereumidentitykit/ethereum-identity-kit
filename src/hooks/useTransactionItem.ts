import { mainnet } from 'viem/chains'
import { publicActionsL2 } from 'viem/op-stack'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { createPublicClient, formatEther, http } from 'viem'
import { useWalletClient, useWaitForTransactionReceipt, useGasPrice, useAccount } from 'wagmi'
import { useChain } from './useChain'
import { useTransactions } from '../context'
import { fetchEthPrice } from '../utils/api/fetch-eth-price'
import { EFP_API_URL } from '../constants'
import { EFPActionIds } from '../constants/transactions'
import { ChainIcons, chains } from '../constants/chains'
import { SubmitButtonText, TransactionType } from '../types'

export const useTransactionItem = (id: number, transaction: TransactionType) => {
  const {
    lists,
    pendingTxs,
    setPendingTxs,
    currentTxIndex,
    setCurrentTxIndex,
    resetTransactions,
    goToNextTransaction,
  } = useTransactions()

  const { isPending, isSuccess, isError } = useWaitForTransactionReceipt({
    hash: transaction.hash,
    chainId: transaction.chainId,
  })

  // Delay last transaction due to indexing
  const [lastTransactionSuccessful, setLastTransactionSuccessful] = useState(false)
  const isLastTransaction = useMemo(() => id === pendingTxs.length - 1, [id, pendingTxs])
  useEffect(() => {
    // Only add delay to last transaction if it's an EFP action
    const actionids = Object.values(EFPActionIds)
    if (!actionids.includes(transaction.id)) return setLastTransactionSuccessful(true)

    if (isLastTransaction && isSuccess) {
      const timeout = setTimeout(() => setLastTransactionSuccessful(true), 5000)
      return () => clearTimeout(timeout)
    }
  }, [isLastTransaction, isSuccess])

  const { address: userAddress } = useAccount()
  const { data: walletClient } = useWalletClient()
  const { currentChainId, checkChain } = useChain()
  const isCorrectChain = useMemo(() => currentChainId === transaction.chainId, [currentChainId, transaction.chainId])
  const ChainIcon = transaction.chainId ? ChainIcons[transaction.chainId as keyof typeof ChainIcons] : null

  const isActive = useMemo(() => {
    return typeof currentTxIndex === 'number' && currentTxIndex === id
  }, [currentTxIndex, id])

  const { data: gasPrice } = useGasPrice({
    chainId: transaction.chainId,
  })
  const [estimatedGas, setEstimatedGas] = useState<string | null>(null)

  const estimateGas = async () => {
    if (!transaction.chainId || !walletClient) return

    if (transaction.chainId === mainnet.id) {
      const publicClient = createPublicClient({
        chain: mainnet,
        transport: http(),
      })

      const gas = await publicClient.estimateContractGas({
        account: walletClient.account,
        address: transaction.address,
        abi: transaction.abi,
        functionName: transaction.functionName,
        args: transaction.args,
      })

      const formattedGas = Number(formatEther(gas * BigInt(gasPrice || 0))).toLocaleString(undefined, {
        maximumFractionDigits: 8,
        minimumFractionDigits: 2,
      })

      setEstimatedGas(formattedGas)
      return
    }

    const publicClient = createPublicClient({
      chain: chains.find((chain) => chain.id === transaction.chainId),
      transport: http(),
    }).extend(publicActionsL2())

    const gas = await publicClient.estimateContractTotalFee({
      account: walletClient.account,
      address: transaction.address,
      abi: transaction.abi,
      functionName: transaction.functionName,
      args: transaction.args,
    })

    const formattedGas = Number(formatEther(gas)).toLocaleString(undefined, {
      maximumFractionDigits: 8,
      minimumFractionDigits: 2,
    })

    setEstimatedGas(formattedGas)
  }

  useEffect(() => {
    estimateGas()
  }, [transaction.chainId, walletClient, gasPrice])

  const ethPrice = useQuery({
    queryKey: ['ethPrice'],
    queryFn: fetchEthPrice,
  })

  const initiateTransaction = async () => {
    if (!transaction.chainId) return

    const hash = await walletClient?.writeContract({
      address: transaction.address,
      abi: transaction.abi,
      functionName: transaction.functionName,
      args: transaction.args,
    })

    // Appends executed transaction's hash to the pedning array
    // to mark it as executed and provide ability to view in a block explorer
    setPendingTxs((pendingTxs) => {
      const newPendingTxs = [...pendingTxs]
      newPendingTxs[id] = {
        ...newPendingTxs[id],
        hash,
      }
      return newPendingTxs
    })
  }

  const handleClick = () => {
    if (transaction.hash && isSuccess) {
      goToNextTransaction()
    } else {
      if (!isCorrectChain) {
        checkChain({ chainId: transaction.chainId })
      } else {
        initiateTransaction()
      }
    }
  }

  const handleCancel = () => {
    resetTransactions()
  }

  const transactionDetails = useMemo(() => {
    return {
      hash: transaction.hash,
      chain: {
        id: transaction.chainId,
        name: chains.find((chain) => chain.id === transaction.chainId)?.name as string,
        icon: ChainIcon,
      },
      gasEth: `${estimatedGas || '0.00'} ETH`,
      gasUsd: estimatedGas
        ? Number(estimatedGas) * (ethPrice.data || 0) < 0.01
          ? '< $0.01'
          : `$${(Number(estimatedGas) * (ethPrice.data || 0)).toLocaleString(undefined, {
              currency: 'USD',
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}`
        : '$0.00',
    }
  }, [transaction, ChainIcon, estimatedGas, lists])

  const submitButtonText: SubmitButtonText = transaction.hash
    ? isPending
      ? 'Pending...'
      : isError
        ? 'Re-Initiate'
        : isLastTransaction
          ? lastTransactionSuccessful
            ? 'Finish'
            : 'Indexing...'
          : 'Next'
    : isCorrectChain
      ? 'Initiate'
      : 'Switch Chain'

  // Users can claim a POAP after minting a new list
  const [claimPOAP, setClaimPOAP] = useState(false)
  const [poapLink, setPoapLink] = useState('')

  const fetchPoapLink = async () => {
    try {
      const response = await fetch(`${EFP_API_URL}/users/${userAddress}/poap`)
      const data = await response.json()
      setPoapLink(data.link)
    } catch (error) {
      console.error(error)
      setPoapLink('')
      setClaimPOAP(false)
    }
  }

  useEffect(() => {
    if (!lists?.primary_list && transaction.id === EFPActionIds.CreateEFPList && transaction.hash) {
      if (isSuccess) setClaimPOAP(true)
      if (!poapLink) fetchPoapLink()
    }
  }, [transaction.hash, isSuccess])

  return {
    isActive,
    poapLink,
    claimPOAP,
    setClaimPOAP,
    handleClick,
    handleCancel,
    submitButtonText,
    transactionDetails,
    currentTxIndex,
    setCurrentTxIndex,
  }
}
