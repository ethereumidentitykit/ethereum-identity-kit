import clsx from 'clsx'
import type { TransactionModalProps } from './TransactionModal.types'
import './TransactionModal.css'
import ChainSelector from './components/chain-selector'
import { TransactionType, useTransactions } from '../../context/transactionContext'
import TransactionItem from './components/transaction-item'

/**
 * Follower State Tag - displays the relation of address to connectedAddress/list
 *
 * @param props - HTML div element props
 *
 * @returns FollowerTag component
 */
const TransactionModal: React.FC<TransactionModalProps> = ({ className, ...props }) => {
  const { txModalOpen, setTxModalOpen, pendingTxs } = useTransactions()

  return (
    <div
      className="transaction-modal-backdrop"
      style={{ display: txModalOpen ? 'flex' : 'none' }}
      onClick={() => setTxModalOpen(false)}
    >
      <div className={clsx('transaction-modal-container', className)} onClick={(e) => e.stopPropagation()} {...props}>
        <ChainSelector />
        <div>
          {pendingTxs.map((tx: TransactionType, index: number) => (
            <TransactionItem key={index} id={index} transaction={tx} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TransactionModal
