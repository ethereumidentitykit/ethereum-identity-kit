import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTransactions } from '../../context'
import { Cross } from '../icons'
import ChainSelector from './components/chain-selector'
import TransactionItem from './components/transaction-item'
import { TransactionType } from '../../types'
import ChangesList from './components/changes-list'
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
const TransactionModal: React.FC<TransactionModalProps> = ({ darkMode, className, ...props }) => {
  const {
    txModalOpen,
    setTxModalOpen,
    pendingTxs,
    currentTxIndex,
    listsLoading,
    batchTransactions,
    resetTransactions,
  } = useTransactions()
  const [openChanges, setOpenChanges] = useState(batchTransactions && !currentTxIndex)

  useEffect(() => {
    if (!txModalOpen) {
      setOpenChanges(batchTransactions && !currentTxIndex && pendingTxs[0]?.hash === undefined)
    }
  }, [txModalOpen])

  if (!txModalOpen) return null

  return (
    <div
      className={clsx('transaction-modal-backdrop', darkMode && 'dark')}
      style={{ display: txModalOpen ? 'flex' : 'none' }}
      onClick={() => (batchTransactions ? setTxModalOpen(false) : resetTransactions())}
    >
      <div className={clsx('transaction-modal-container', className)} onClick={(e) => e.stopPropagation()} {...props}>
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
            <ChangesList openChanges={openChanges} setOpenChanges={setOpenChanges} />
            <ChainSelector setOpenChanges={setOpenChanges} />
            <div
              className="transaction-modal-transactions-container"
              style={{
                transform:
                  window.innerWidth > 600
                    ? `translatex(${-(currentTxIndex || 0) * 472}px)`
                    : `translatex(calc(${-(currentTxIndex || 0) * 100}vw - ${(currentTxIndex || 0) * 23}px))`,
              }}
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
