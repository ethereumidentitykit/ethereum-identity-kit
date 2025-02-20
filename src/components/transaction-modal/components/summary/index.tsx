import { useTransactions } from '../../../../context'
import { EFPActionType } from '../../../../types'
import './Summary.css'
import { Arrow } from '../../../icons'
import { useMemo } from 'react'
import Actions from '../actions'
import { ChainIcons, chains } from '../../../../constants/chains'

export default function Summary() {
  const { pendingTxs, setCurrentTxIndex, batchTransactions, setSelectedChainId, setChangesOpen } = useTransactions()

  const onSummaryClose = () => {
    const mintTxIndex = pendingTxs.findIndex((tx) => tx.id === EFPActionType.CreateEFPList)
    if (mintTxIndex >= 0) return setSelectedChainId(undefined)
    if (batchTransactions) return setChangesOpen(true)
  }

  const groupedTransactions = useMemo(() => Object.groupBy(pendingTxs, (tx) => tx.id), [pendingTxs])

  return (
    <div className="summary-container">
      <div className="transaction-modal-arrow-back" onClick={onSummaryClose}>
        <Arrow height={18} width={18} />
      </div>
      <p className="summary-title">Summary</p>
      <div className="summary-items-container">
        {Object.entries(groupedTransactions).map(([id, txs]) => {
          const Chain = chains.find((chain) => chain.id === txs?.[0]?.chainId)
          if (!Chain) return null
          const chainName = Chain.name
          const ChainIcon = ChainIcons[Chain.id]

          return (
            <div key={id} className="summary-item-container">
              <div className="summary-item-chain-container">
                <p>{txs?.length} txns on</p>
                <ChainIcon height={18} width={18} />
                <p className="summary-item-chain-name">{chainName}</p>
              </div>
              {txs && (id === EFPActionType.UpdateEFPList ? <Actions transactions={txs} /> :
                txs.map((tx) => (
                  <div key={tx.id} className='summary-item-transaction-container'>
                    <p className='summary-item-transaction-title'>{tx.title}</p>
                    <p className='summary-item-transaction-description'>{tx.description}</p>
                  </div>))
              )}
            </div>
          )
        })}
        <button className="transaction-modal-confirm-button" onClick={() => setCurrentTxIndex(0)}>
          Confirm
        </button>
      </div>
    </div>
  )
}
