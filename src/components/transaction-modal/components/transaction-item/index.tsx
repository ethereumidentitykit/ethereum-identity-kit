import { estimateContractGas } from 'viem/actions'
import { useEffect, useMemo, useState } from 'react'
import { createPublicClient, formatEther } from 'viem'
import { useWaitForTransactionReceipt, useWalletClient } from 'wagmi'
import useChain from '../../../../hooks/useChain'
import { useTransactions } from '../../../../context/transactionContext'
import { transports } from '../../../../constants/wagmi'
import { ChainIcons, chains } from '../../../../constants/chains'
import { TRANSACTION_TITLES } from '../../../../constants/transaction'
import { EFPActionType, TransactionType } from '../../../../types/transactions'
import './TransactionItem.css'
import Check from '../../../icons/ui/Check'
import Wallet from '../../../icons/ui/Wallet'
import Cross from '../../../icons/ui/Cross'
import Clock from '../../../icons/ui/Clock'

interface TransactionItemProps {
  id: number
  transaction: TransactionType
}

const TransactionItem: React.FC<TransactionItemProps> = ({ id, transaction }) => {
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

  const { data: walletClient } = useWalletClient()
  const { currentChainId, checkChain } = useChain()
  const isCorrectChain = useMemo(() => currentChainId === transaction.chainId, [currentChainId, transaction.chainId])
  const Icon = transaction.chainId ? ChainIcons[transaction.chainId as keyof typeof ChainIcons] : null

  const [estimatedGas, setEstimatedGas] = useState<string | null>(null)

  const estimateGas = async () => {
    if (!transaction.chainId || !walletClient) return

    const publicClient = createPublicClient({
      chain: chains[transaction.chainId],
      transport: transports[transaction.chainId as keyof typeof transports],
    })
    const gas = await estimateContractGas(publicClient, {
      address: transaction.address,
      abi: transaction.abi,
      functionName: transaction.functionName,
      args: transaction.args,
    })

    console.log(gas, formatEther(gas, 'gwei'))
    setEstimatedGas(formatEther(gas, 'gwei'))
  }

  useEffect(() => {
    estimateGas()
  }, [transaction.chainId])

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
      list: lists?.primary_list || '-',
      changes:
        transaction.id === EFPActionType.CreateEFPList
          ? 'Mint List'
          : `${transaction.args.slice(-1).flat().length} List ops`,
      chain: chains.find((chain) => chain.id === transaction.chainId)?.name,
      'gas fee': estimatedGas,
    }
  }, [transaction, Icon, estimatedGas])

  const submitButtonText = transaction.hash
    ? isPending
      ? 'Pending...'
      : isError
        ? 'Re-Initiate'
        : 'Next'
    : isCorrectChain
      ? 'Initiate'
      : 'Switch Chain'

  return (
    <div className="transaction-item">
      <p className="transaction-title">{TRANSACTION_TITLES[transaction.id]}</p>
      <div>
        <div className="transaction-indicator">
          <div>{transaction.hash ? isPending ? <Clock /> : isError ? <Cross /> : <Check /> : <Wallet />}</div>
        </div>
        <div className="transaction-details-container">
          {Object.entries(transactionDetails).map(([key, value]) => (
            <div key={key} className="transaction-details-item">
              <p className="transaction-details-key">{key}</p>
              <div className="transaction-details-value">
                {key === 'chain' && Icon && <Icon height={16} width={16} />}
                {value}
              </div>
            </div>
          ))}
        </div>
        <div className="transaction-modal-buttons-container">
          <button className="transaction-modal-cancel-button" disabled={!!transaction.hash} onClick={handleCancel}>
            {canGoBack ? 'Back' : 'Cancel'}
          </button>
          <button
            className="transaction-modal-confirm-button"
            onClick={handleClick}
            disabled={id !== currentTxIndex || (transaction.hash && isPending)}
          >
            {submitButtonText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransactionItem
