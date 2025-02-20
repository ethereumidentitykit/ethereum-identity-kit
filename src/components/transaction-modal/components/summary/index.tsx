import { useTransactions } from '../../../../context'
import { EFPActionType } from '../../../../types'
import './Summary.css'
import { Arrow } from '../../../icons'

export default function Summary() {
  const { pendingTxs, setCurrentTxIndex, batchTransactions, setSelectedChainId, setChangesOpen } = useTransactions()

  const onSummaryClose = () => {
    const mintTxIndex = pendingTxs.findIndex((tx) => tx.id === EFPActionType.CreateEFPList)
    if (mintTxIndex >= 0) return setSelectedChainId(undefined)
    if (batchTransactions) return setChangesOpen(true)
  }

  return (
    <div className="summary-container">
      <div className="transaction-modal-arrow-back" onClick={onSummaryClose}>
        <Arrow height={18} width={18} />
      </div>
      <p className="summary-title">Summary</p>
      <div className="summary-items-container">
        {pendingTxs.map((tx) => (
          <div key={tx.id} className="summary-item">
            <p className="summary-item-title">{tx.id}</p>
            <p className="summary-item-value">{tx.chainId}</p>
          </div>
        ))}
      </div>
      <button className="summary-button" onClick={() => setCurrentTxIndex(0)}>
        Confirm
      </button>
    </div>
  )
}
