import { useWaitForTransactionReceipt, useWalletClient } from 'wagmi'
// import { chains } from "../../../../constants/chains"
import { TransactionType, useTransactions } from '../../../../context/transactionContext'

interface TransactionItemProps {
  id: number
  transaction: TransactionType
}

const TransactionItem: React.FC<TransactionItemProps> = ({ id, transaction }) => {
  const { goToNextTransaction, currentTxIndex, setPendingTxs } = useTransactions()
  const { isPending, isSuccess, isError } = useWaitForTransactionReceipt({
    hash: transaction.hash,
    chainId: transaction.chainId,
  })
  const { data: walletClient } = useWalletClient()

  const initiateTransaction = async () => {
    if (!transaction.chainId) return

    const hash = await walletClient?.writeContract({
      address: transaction.address,
      abi: transaction.abi,
      functionName: transaction.functionName,
      args: transaction.args,
      // chain: chains[transaction.chainId]
    })

    console.log(hash)

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
    console.log({
      address: transaction.address,
      abi: transaction.abi,
      functionName: transaction.functionName,
      args: transaction.args,
    })
    if (transaction.hash && isSuccess) {
      goToNextTransaction()
    } else {
      initiateTransaction()
    }
  }

  return (
    <div>
      <div>
        <p>{transaction.id}</p>
        <p>{transaction.chainId}</p>
      </div>
      <button onClick={handleClick} disabled={id !== currentTxIndex || (transaction.hash && isPending)}>
        {transaction.hash ? (isError ? 'Re-Initiate' : 'Next') : 'Initiate'}
      </button>
    </div>
  )
}

export default TransactionItem
