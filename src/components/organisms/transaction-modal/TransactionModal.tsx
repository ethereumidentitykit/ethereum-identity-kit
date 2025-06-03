import clsx from 'clsx'
import { useState } from 'react'
import { useTransactions } from '../../../context'
import { useTranslation } from '../../../context/TranslationContext'
import { Cross } from '../../icons'
import Cart from './components/cart'
import Steps from './components/steps'
import Summary from './components/summary'
import CancelModal from './components/cancel-modal'
import ChainSelector from './components/chain-selector'
import TransactionItem from './components/transaction-item'
import { TransactionType } from '../../../types'
import type { TransactionModalProps } from './TransactionModal.types'
import './TransactionModal.css'

/**
 * Transaction Modal - allows user to initiate transactions on-chain
 *
 * @param darkMode - whether the component is in dark mode
 * @param className - additional class name for the transaction modal
 * @param onCartProfileClick - the function to call when the profile displayed in the cart is clicked
 * @param showRecommendations - whether to show recommendations and manual add beside the items in the cart
 * @param showPoapClaim - whether to show claim poap modal after minting a new list
 * @param props - HTML div element props
 *
 * @returns TransactionModal component
 */
const TransactionModal: React.FC<TransactionModalProps> = ({
  darkMode,
  className,
  onCartProfileClick,
  showRecommendations = true,
  showPoapClaim = true,
  ...props
}) => {
  const { t } = useTranslation()
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [clearCartModalOpen, setClearCartModalOpen] = useState(false)

  const {
    txModalOpen,
    setTxModalOpen,
    pendingTxs,
    currentTxIndex,
    listsLoading,
    changesOpen,
    batchTransactions,
    resetTransactions,
  } = useTransactions()

  if (!txModalOpen) return null

  const isCurrentTxIndexValid = currentTxIndex !== undefined && currentTxIndex >= 0

  const onClose = () => {
    if (pendingTxs.findIndex((tx) => tx.hash) > -1) {
      setCancelModalOpen(true)
      return
    }

    if (!batchTransactions) {
      setTxModalOpen(false)
      resetTransactions()
    } else {
      setTxModalOpen(false)
    }
  }

  return (
    <div
      className={clsx('transaction-modal-backdrop', darkMode && 'dark')}
      style={{ display: txModalOpen ? 'flex' : 'none' }}
      onClick={onClose}
    >
      {cancelModalOpen && (
        <CancelModal
          title={t('modal.cancelTransactions.title')}
          description={t('modal.cancelTransactions.description')}
          confirmButtonText={t('modal.cancelTransactions.confirm')}
          onCancel={() => setCancelModalOpen(false)}
          onConfirm={() => {
            resetTransactions()
            setCancelModalOpen(false)
          }}
        />
      )}
      {clearCartModalOpen && (
        <CancelModal
          title={t('modal.clearCart.title')}
          description={t('modal.clearCart.description')}
          confirmButtonText={t('modal.clearCart.confirm')}
          onCancel={() => setClearCartModalOpen(false)}
          onConfirm={() => {
            resetTransactions(true)
            setClearCartModalOpen(false)
          }}
        />
      )}
      <div
        className={clsx(
          'transaction-modal-container',
          changesOpen && 'changes-open',
          showRecommendations && 'show-recommendations',
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {listsLoading ? (
          <div className="transaction-modal-loading-spinner" />
        ) : (
          <>
            <div className="transaction-modal-close-button" onClick={onClose}>
              <Cross height={16} width={16} />
            </div>
            <Cart
              setClearCartModalOpen={setClearCartModalOpen}
              onProfileClick={onCartProfileClick}
              showRecommendations={showRecommendations}
            />
            <ChainSelector />
            <Steps transactions={pendingTxs} />
            <div
              className="transaction-modal-transactions-container"
              style={{
                transform:
                  window.innerWidth > 600
                    ? `translatex(${-(isCurrentTxIndexValid ? currentTxIndex + 1 : 0) * 472}px)`
                    : `translatex(${-(isCurrentTxIndexValid ? currentTxIndex + 1 : 0) * 100}vw)`,
              }}
            >
              <Summary />
              {pendingTxs.map((tx: TransactionType, index: number) => (
                <TransactionItem key={index} id={index} transaction={tx} showPoapClaim={showPoapClaim} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default TransactionModal
