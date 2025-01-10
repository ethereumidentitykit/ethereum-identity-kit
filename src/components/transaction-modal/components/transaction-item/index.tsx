import clsx from 'clsx'
import { useTransactionItem } from '../../../../hooks'
import Note from '../../../icons/ui/Note'
import Check from '../../../icons/ui/Check'
import Cross from '../../../icons/ui/Cross'
import Clock from '../../../icons/ui/Clock'
import Wallet from '../../../icons/ui/Wallet'
import { TRANSACTION_TITLES } from '../../../../constants'
import { TransactionType } from '../../../../types'
import './TransactionItem.css'

interface TransactionItemProps {
  id: number
  transaction: TransactionType
}

const TransactionItem: React.FC<TransactionItemProps> = ({ id, transaction }) => {
  const { Icon, canGoBack, handleClick, handleCancel, submitButtonText, transactionDetails } = useTransactionItem(
    id,
    transaction
  )

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
      <p className="transaction-title">{TRANSACTION_TITLES[transaction.id]}</p>
      <div>
        <div className="transaction-progress-container">
          <div className={clsx('transaction-progress-bar', ProgressionClassName)}>
            <ProgressIcon height={20} width={20} />
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
        <div className="transaction-modal-buttons-container">
          <button className="transaction-modal-cancel-button" disabled={!!transaction.hash} onClick={handleCancel}>
            {canGoBack ? 'Back' : 'Cancel'}
          </button>
          <button
            className="transaction-modal-confirm-button"
            onClick={handleClick}
            disabled={submitButtonText === 'Pending...' || submitButtonText === 'Indexing...'}
          >
            {submitButtonText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransactionItem
