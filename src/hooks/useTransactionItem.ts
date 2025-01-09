import { formatEther } from 'viem'
import { estimateContractGas } from 'viem/actions'
import { useEffect, useMemo, useState } from 'react'
import { useWalletClient, useWaitForTransactionReceipt } from 'wagmi'
import useChain from './useChain'
import { useTransactions } from '../context/transactionContext'
import { ChainIcons, chains } from '../constants/chains'
import { EFPActionType, SubmitButtonText, TransactionType } from '../types/transactions'

export const useTransactionItem = (id: number, transaction: TransactionType) => {
  const {
    lists,
    pendingTxs,
    setPendingTxs,
    currentTxIndex,
    resetTransactions,
    setSelectedChainId,
    goToNextTransaction,
  } = useTransactions()
  const { isPending, isSuccess, isError } = useWaitForTransactionReceipt({
    hash: transaction.hash,
    chainId: transaction.chainId,
  })

  // Delay last transaction due to indexing
  const [lastTransactionSuccessful, setLastTransactionSuccessful] = useState(false)
  const isLastTransaction = useMemo(() => currentTxIndex === pendingTxs.length - 1, [currentTxIndex, pendingTxs])
  useEffect(() => {
    if (isLastTransaction && isSuccess) {
      const timeout = setTimeout(() => setLastTransactionSuccessful(true), 5000)
      return () => clearTimeout(timeout)
    }
  }, [isLastTransaction, isSuccess])

  const { data: walletClient } = useWalletClient()
  const { currentChainId, checkChain } = useChain()
  const isCorrectChain = useMemo(() => currentChainId === transaction.chainId, [currentChainId, transaction.chainId])
  const Icon = transaction.chainId ? ChainIcons[transaction.chainId as keyof typeof ChainIcons] : null

  const [estimatedGas, setEstimatedGas] = useState<string | null>(null)

  const estimateGas = async () => {
    if (!transaction.chainId || !walletClient) return console.log('No chain or wallet client')

    const gas = await estimateContractGas(walletClient, {
      address: transaction.address,
      abi: transaction.abi,
      functionName: transaction.functionName,
      args: transaction.args,
    })

    setEstimatedGas(formatEther(gas, 'gwei'))
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

  const canGoBack = useMemo(() => {
    if (currentTxIndex === 0 && !transaction.hash) {
      const mintTransaction = pendingTxs.find((tx) => tx.id === EFPActionType.CreateEFPList)
      if (mintTransaction) return true
    }

    return false
  }, [currentTxIndex, transaction.hash, pendingTxs])

  const handleCancel = () => {
    if (canGoBack) {
      setSelectedChainId(undefined)
    } else {
      resetTransactions()
    }
  }

  const transactionDetails = useMemo(() => {
    return {
      list: `#${lists?.primary_list}` || '# -',
      changes:
        transaction.id === EFPActionType.CreateEFPList
          ? 'Mint List'
          : `${transaction.args.slice(-1).flat().length} List ops`,
      chain: chains.find((chain) => chain.id === transaction.chainId)?.name,
      'gas fee': `${estimatedGas || '0.00'} ETH`,
    }
  }, [transaction, Icon, estimatedGas, lists])

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
    Icon,
    canGoBack,
    handleClick,
    handleCancel,
    submitButtonText,
    transactionDetails,
  }
}
