import clsx from 'clsx'
import { useTransactions, useTranslation } from '../../../../../context'
import { useTransactionItem } from '../../../../../hooks'
import TransactionItemDetails from './details'
import { Check, Cross, Clock, Wallet, Arrow } from '../../../../icons'
import { TransactionType } from '../../../../../types'
import './TransactionItem.css'

interface TransactionItemProps {
  id: number
  transaction: TransactionType
  showPoapClaim?: boolean
}

const TransactionItem: React.FC<TransactionItemProps> = ({ id, transaction, showPoapClaim }) => {
  const {
    handleClick,
    currentTxIndex,
    setCurrentTxIndex,
    submitButtonText,
    transactionDetails,
    claimPOAP,
    poapLink,
    setClaimPOAP,
    usesPaymaster,
  } = useTransactionItem(id, transaction)
  const { pendingTxs } = useTransactions()
  const { t } = useTranslation()

  const ProgressIcon = {
    switchChain: Wallet,
    initiate: Wallet,
    pending: Clock,
    reInitiate: Cross,
    indexing: Check,
    finish: Check,
    next: Check,
  }[submitButtonText]

  const ProgressBarClassName = {
    switchChain: null,
    initiate: null,
    pending: 'transaction-progress-bar-pending',
    reInitiate: 'transaction-progress-bar-re-initiate',
    indexing: 'transaction-progress-bar-done',
    finish: 'transaction-progress-bar-done',
    next: 'transaction-progress-bar-done',
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
          <p className="transaction-title">{t('transaction.onchainUpdate')}</p>
          <div>
            <div className="transaction-progress-container">
              <div className={clsx('transaction-progress-bar', ProgressBarClassName)}>
                <ProgressIcon height={20} width={20} />
              </div>
              {(submitButtonText === 'indexing' || submitButtonText === 'finish') && (
                <div
                  className={clsx(
                    'transaction-progress-indexing-bar',
                    usesPaymaster && 'transaction-progress-bar-paymaster'
                  )}
                />
              )}
            </div>
            <TransactionItemDetails transactionDetails={transactionDetails} transaction={transaction} />
            <div className="transaction-modal-initiate-container" style={{ padding: '0' }}>
              <button
                className={clsx('transaction-modal-initiate-button', {
                  'transaction-modal-initiate-button-done':
                    submitButtonText === 'finish' || submitButtonText === 'next' || submitButtonText === 'indexing',
                })}
                onClick={handleClick}
                disabled={submitButtonText === 'pending' || submitButtonText === 'indexing'}
              >
                {t(`transaction.${submitButtonText}`)}
              </button>
            </div>
          </div>
        </>
      )}
      {showPoapClaim && claimPOAP && (
        <div className="transaction-item-poap">
          <p className="transaction-item-poap-title">{t('transaction.claimPOAPTitle')}</p>
          <p className="transaction-item-poap-description">{t('transaction.claimPOAPDescription')}</p>
          <div className="transaction-item-poap-icon">
            <img src="https://efp.app/assets/art/early-user-poap-2025.svg" height={20} width={20} />
          </div>
          <div className="transaction-item-poap-button-container">
            <button onClick={() => setClaimPOAP(false)} className="transaction-item-refuse-poap-button">
              {t('transaction.noThanks')}
            </button>
            <button
              onClick={() => {
                window.open(poapLink, '_blank')
                setClaimPOAP(false)
              }}
              className="transaction-item-claim-poap-button"
            >
              {t('transaction.claimPOAP')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TransactionItem
