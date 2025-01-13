import clsx from 'clsx'
import { useTransactions } from '../../context'
import Cross from '../icons/ui/Cross'
import ChainSelector from './components/chain-selector'
import TransactionItem from './components/transaction-item'
import { TransactionType } from '../../types'
import type { TransactionModalProps } from './TransactionModal.types'
import './TransactionModal.css'

/**
 * Transaction Modal - allows user to initiate transactions on-chain
 *
 * @param className - additional class name for the transaction modal
 *
 * @param props - HTML div element props
 *
 * @returns TransactionModal component
 */
const TransactionModal: React.FC<TransactionModalProps> = ({ isDark, className, ...props }) => {
  const {
    txModalOpen,
    setTxModalOpen,
    pendingTxs,
    currentTxIndex,
    listsLoading,
    batchTransactions,
    resetTransactions,
  } = useTransactions()

  return (
    <div
      className="transaction-modal-backdrop"
      style={{ display: txModalOpen ? 'flex' : 'none' }}
      onClick={() => (batchTransactions ? setTxModalOpen(false) : resetTransactions())}
    >
      <div
        className={clsx(
          'transaction-modal-container',
          isDark ? 'transaction-modal-dark' : 'transaction-modal-light',
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {listsLoading ? (
          <div className="transaction-modal-loading-spinner" />
        ) : (
          <>
            <div
              className="transaction-modal-close-button"
              onClick={() => (batchTransactions ? setTxModalOpen(false) : resetTransactions())}
            >
              <Cross height={16} width={16} color={isDark ? 'white' : 'black'} />
            </div>
            <ChainSelector />
            <div
              className="transaction-modal-transactions-container"
              style={{ transform: `translatex(${-(currentTxIndex || 0) * 432}px)` }}
            >
              {pendingTxs.map((tx: TransactionType, index: number) => (
                <TransactionItem key={index} id={index} transaction={tx} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default TransactionModal
