import clsx from 'clsx'
import { useTransactions } from '../../../../../context'
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

  const ProgressIcon = {
    'Switch Chain': Wallet,
    Initiate: Wallet,
    'Pending...': Clock,
    'Re-Initiate': Cross,
    'Indexing...': Check,
    Finish: Check,
    Next: Check,
  }[submitButtonText]

  const ProgressBarClassName = {
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
          <p className="transaction-title">Onchain Update</p>
          <div>
            <div className="transaction-progress-container">
              <div className={clsx('transaction-progress-bar', ProgressBarClassName)}>
                <ProgressIcon height={20} width={20} />
              </div>
              {(submitButtonText === 'Indexing...' || submitButtonText === 'Finish') && (
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
      {showPoapClaim && claimPOAP && (
        <div className="transaction-item-poap">
          <p className="transaction-item-poap-title">Claim your POAP</p>
          <p className="transaction-item-poap-description">
            Congratulations! You&apos;ve earned a POAP for being an early user of EFP.
          </p>
          <div className="transaction-item-poap-icon">
            <img src="https://efp.app/assets/art/early-user-poap-2025.svg" height={20} width={20} />
          </div>
          <div className="transaction-item-poap-button-container">
            <button onClick={() => setClaimPOAP(false)} className="transaction-item-refuse-poap-button">
              No thanks
            </button>
            <button
              onClick={() => {
                window.open(poapLink, '_blank')
                setClaimPOAP(false)
              }}
              className="transaction-item-claim-poap-button"
            >
              Claim
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TransactionItem
