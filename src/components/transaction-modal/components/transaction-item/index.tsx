import clsx from 'clsx'
import { useTransactionItem } from '../../../../hooks'
import AnimatedClock from '../../../icons/animated/clock'
import { Note, Check, Cross, Clock, Wallet, Arrow } from '../../../icons'
import { TRANSACTION_TITLES } from '../../../../constants/transactions'
import { TransactionType } from '../../../../types'
import './TransactionItem.css'

interface TransactionItemProps {
  id: number
  transaction: TransactionType
}

const TransactionItem: React.FC<TransactionItemProps> = ({ id, transaction }) => {
  const {
    Icon,
    isActive,
    handleClick,
    handleCancel,
    previousStep,
    submitButtonText,
    transactionDetails,
    handlePreviousStep,
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
    <div className="transaction-item" style={{ display: isActive ? 'flex' : 'none' }}>
      {previousStep && (
        <div className="transaction-modal-arrow-back" onClick={handlePreviousStep}>
          <Arrow height={18} width={18} />
        </div>
      )}
      <p className="transaction-title">{TRANSACTION_TITLES[transaction.id]}</p>
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
        <div className="transaction-modal-initiate-container" style={{ padding: '0' }}>
          <button
            className={clsx('transaction-modal-initiate-button', {
              'transaction-modal-initiate-button-done': submitButtonText === 'Finish',
            })}
            onClick={handleClick}
            disabled={submitButtonText === 'Pending...' || submitButtonText === 'Indexing...'}
          >
            {submitButtonText}
          </button>
          <p className="transaction-modal-cancel-text" onClick={handleCancel}>
            Exit and cancel remaining transactions
          </p>
        </div>
      </div>
    </div>
  )
}

export default TransactionItem
