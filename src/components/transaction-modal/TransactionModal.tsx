import clsx from 'clsx'
import { useTransactions } from '../../context'
import { Cross } from '../icons'
import Cart from './components/cart'
import ChainSelector from './components/chain-selector'
import TransactionItem from './components/transaction-item'
import { TransactionType } from '../../types'
import type { TransactionModalProps } from './TransactionModal.types'
import './TransactionModal.css'
import Summary from './components/summary'
import Steps from './components/steps'
/**
 * Transaction Modal - allows user to initiate transactions on-chain
 *
 * @param className - additional class name for the transaction modal
 *
 * @param props - HTML div element props
 *
 * @returns TransactionModal component
 */
const TransactionModal: React.FC<TransactionModalProps> = ({ darkMode, className, ...props }) => {
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

  return (
    <div
      className={clsx('transaction-modal-backdrop', darkMode && 'dark')}
      style={{ display: txModalOpen ? 'flex' : 'none' }}
      onClick={() => (batchTransactions ? setTxModalOpen(false) : resetTransactions())}
    >
      <div className={clsx('transaction-modal-container', changesOpen && 'changes-open', className)} onClick={(e) => e.stopPropagation()} {...props}>
        {listsLoading ? (
          <div className="transaction-modal-loading-spinner" />
        ) : (
          <>
            <div
              className="transaction-modal-close-button"
              onClick={() => (batchTransactions ? setTxModalOpen(false) : resetTransactions())}
            >
              <Cross height={16} width={16} />
            </div>
            <Cart />
            <ChainSelector />
            <Steps transactions={pendingTxs} />
            <div
              className="transaction-modal-transactions-container"
              style={{
                transform:
                  window.innerWidth > 600
                    ? `translatex(${-(isCurrentTxIndexValid ? currentTxIndex + 1 : 0) * 472}px)`
                    : `translatex(calc(${-(isCurrentTxIndexValid ? currentTxIndex + 1 : 0) * 100}vw - ${(isCurrentTxIndexValid ? currentTxIndex + 1 : 0) * 23}px))`,
              }}
            >
              <Summary />
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
