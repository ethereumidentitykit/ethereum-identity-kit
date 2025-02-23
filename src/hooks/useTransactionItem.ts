import { formatEther } from 'viem'
import { estimateContractGas } from 'viem/actions'
import { useEffect, useMemo, useState } from 'react'
import { useWalletClient, useWaitForTransactionReceipt } from 'wagmi'
import { useChain } from './useChain'
import { useTransactions } from '../context'
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
    if (isLastTransaction && isSuccess) {
      const timeout = setTimeout(() => setLastTransactionSuccessful(true), 5000)
      return () => clearTimeout(timeout)
    }
  }, [isLastTransaction, isSuccess])

  const { data: walletClient } = useWalletClient()
  const { currentChainId, checkChain } = useChain()
  const isCorrectChain = useMemo(() => currentChainId === transaction.chainId, [currentChainId, transaction.chainId])
  const ChainIcon = transaction.chainId ? ChainIcons[transaction.chainId as keyof typeof ChainIcons] : null

  const isActive = useMemo(() => {
    return typeof currentTxIndex === 'number' && currentTxIndex === id
  }, [currentTxIndex, id])

  const [estimatedGas, setEstimatedGas] = useState<string | null>(null)

  const estimateGas = async () => {
    if (!transaction.chainId || !walletClient) return

    const gas = await estimateContractGas(walletClient, {
      address: transaction.address,
      abi: transaction.abi,
      functionName: transaction.functionName,
      args: transaction.args,
    })

    const formattedGas = formatEther(gas, 'gwei')

    setEstimatedGas(
      Number(formattedGas).toLocaleString(undefined, { maximumFractionDigits: 5, minimumFractionDigits: 2 })
    )
  }

  useEffect(() => {
    estimateGas()
  }, [transaction.chainId, walletClient])

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
      'Est. gas fee': `${estimatedGas || '0.00'} ETH`,
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

  return {
    isActive,
    handleClick,
    handleCancel,
    submitButtonText,
    transactionDetails,
    currentTxIndex,
    setCurrentTxIndex,
  }
}
