import clsx from 'clsx'
import { useTransactionItem } from '../../../../hooks'
import TransactionItemDetails from './details'
import { Check, Cross, Clock, Wallet, Arrow } from '../../../icons'
import { TransactionType } from '../../../../types'
import './TransactionItem.css'
import { useTransactions } from '../../../../context'

interface TransactionItemProps {
  id: number
  transaction: TransactionType
}

const TransactionItem: React.FC<TransactionItemProps> = ({ id, transaction }) => {
  const { handleClick, currentTxIndex, setCurrentTxIndex, submitButtonText, transactionDetails } = useTransactionItem(
    id,
    transaction
  )
  const { pendingTxs } = useTransactions()

  const ProgressIcon = {
    'Switch Chain': Wallet,
    Initiate: Wallet,
    'Pending...': Clock,
    'Re-Initiate': Cross,
    'Indexing...': Check,
    Finish: Check,
    Next: Check,
  }[submitButtonText]

  const ProgressionClassName = {
    'Switch Chain': null,
    Initiate: null,
    'Pending...': 'transaction-progress-bar-pending',
    'Re-Initiate': 'transaction-progress-bar-re-initiate',
    'Indexing...': 'transaction-progress-bar-done',
    Finish: 'transaction-progress-bar-done',
    Next: 'transaction-progress-bar-done',
  }[submitButtonText]

  return (
    <div className="transaction-item" style={{ gap: pendingTxs.length > 1 ? '64px' : '24px' }}>
      {currentTxIndex === id && (
        <>
          <div
            className="transaction-modal-arrow-back"
            onClick={() => setCurrentTxIndex(id === 0 ? undefined : id - 1)}
          >
            <Arrow height={18} width={18} />
          </div>
          <p className="transaction-title">{transaction.title ?? 'Transaction'}</p>
          <div>
            <div className="transaction-progress-container">
              <div className={clsx('transaction-progress-bar', ProgressionClassName)}>
                <ProgressIcon height={20} width={20} />
              </div>
              {(submitButtonText === 'Indexing...' || submitButtonText === 'Finish') && (
                <div className="transaction-progress-indexing-bar" />
              )}
            </div>
            <TransactionItemDetails transactionDetails={transactionDetails} transaction={transaction} />
            <div className="transaction-modal-initiate-container" style={{ padding: '0' }}>
              <button
                className={clsx('transaction-modal-initiate-button', {
                  'transaction-modal-initiate-button-done':
                    submitButtonText === 'Finish' || submitButtonText === 'Next' || submitButtonText === 'Indexing...',
                })}
                onClick={handleClick}
                disabled={submitButtonText === 'Pending...' || submitButtonText === 'Indexing...'}
              >
                {submitButtonText}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TransactionItem
