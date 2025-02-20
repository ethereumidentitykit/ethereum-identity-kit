import clsx from 'clsx'
import { useTransactionItem } from '../../../../hooks'
import TransactionItemDetails from './details'
import AnimatedClock from '../../../icons/animated/clock'
import { Note, Check, Cross, Clock, Wallet, Arrow } from '../../../icons'
import { TransactionType } from '../../../../types'
import './TransactionItem.css'

interface TransactionItemProps {
  id: number
  transaction: TransactionType
}

const TransactionItem: React.FC<TransactionItemProps> = ({ id, transaction }) => {
  const {
    handleClick,
    setCurrentTxIndex,
    submitButtonText,
    transactionDetails,
  } = useTransactionItem(id, transaction)

  const ProgressIcon = {
    'Switch Chain': Wallet,
    Initiate: Wallet,
    'Pending...': Clock,
    'Re-Initiate': Cross,
    'Indexing...': Note,
    Finish: Check,
    Next: Check,
  }[submitButtonText]

  const ProgressionClassName = {
    'Switch Chain': null,
    Initiate: null,
    'Pending...': 'transaction-progress-bar-pending',
    'Re-Initiate': 'transaction-progress-bar-re-initiate',
    'Indexing...': 'transaction-progress-bar-pending',
    Finish: 'transaction-progress-bar-done',
    Next: 'transaction-progress-bar-done',
  }[submitButtonText]

  return (
    <div className="transaction-item">
      <div className="transaction-modal-arrow-back" onClick={() => setCurrentTxIndex(id === 0 ? undefined : id - 1)}>
        <Arrow height={18} width={18} />
      </div>
      <p className="transaction-title">{transaction.id}</p>
      <div>
        <div className="transaction-progress-container">
          <div className={clsx('transaction-progress-bar', ProgressionClassName)}>
            {submitButtonText === 'Pending...' ? (
              <AnimatedClock height={16} width={16} color="#000" />
            ) : (
              <ProgressIcon height={20} width={20} />
            )}
          </div>
        </div>
        <TransactionItemDetails transactionDetails={transactionDetails} transaction={transaction} />
        <div className="transaction-modal-initiate-container" style={{ padding: '0' }}>
          <button
            className={clsx('transaction-modal-initiate-button', {
              'transaction-modal-initiate-button-done': submitButtonText === 'Finish' || submitButtonText === 'Next',
            })}
            onClick={handleClick}
            disabled={submitButtonText === 'Pending...' || submitButtonText === 'Indexing...'}
          >
            {submitButtonText}
          </button>
          {/* <p className="transaction-modal-cancel-text" onClick={handleCancel}>
            Exit and cancel remaining transactions
          </p> */}
        </div>
      </div>
    </div>
  )
}

export default TransactionItem
