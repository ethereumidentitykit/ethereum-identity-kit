import { useMemo } from 'react'
import { useTransactions } from '../../../../context'
import { Arrow } from '../../../icons'
import ListSettings from '../list-settings'
import Actions from '../actions'
import { ChainIcons, chains } from '../../../../constants/chains'
import { EFPActionIds } from '../../../../constants/transactions'
import { EFPActionType, TransactionType } from '../../../../types/transactions'
import './Summary.css'

export default function Summary() {
  const {
    pendingTxs,
    selectedChainId,
    setCurrentTxIndex,
    batchTransactions,
    setSelectedChainId,
    setChangesOpen,
    setTxModalOpen,
    currentTxIndex,
    resetTransactions,
  } = useTransactions()

  const onSummaryClose = () => {
    const mintTxIndex = pendingTxs.findIndex((tx) => tx.id === EFPActionIds.CreateEFPList)
    if (mintTxIndex >= 0) return setSelectedChainId(undefined)
    if (batchTransactions) return setChangesOpen(true)
    else {
      setTxModalOpen(false)
      resetTransactions()
    }
  }

  const groupedTransactions = useMemo(() => Object.groupBy(pendingTxs, (tx) => tx.id), [pendingTxs])

  const displayedChanges = (id: EFPActionType | string, txs: TransactionType[]) => {
    switch (id) {
      case EFPActionIds.UpdateEFPList:
        return <Actions transactions={txs} />
      case EFPActionIds.SetEFPListSettings:
        return <ListSettings txs={txs} />
      // case EFPActionIds.UpdateENSProfile:
      //   return <UpdateENSProfile txs={txs} />
      default:
        return txs?.map((tx) => (
          <div key={tx.id} className="summary-item-transaction-container">
            <p className="summary-item-transaction-title">{tx.title}</p>
            <p className="summary-item-transaction-description">{tx.description}</p>
          </div>
        ))
    }
  }

  const isSummaryVisible =
    currentTxIndex === undefined &&
    (pendingTxs.some((tx) => tx.id === EFPActionIds.UpdateEFPList) ? selectedChainId : true)

  return (
    <div className="summary-container">
      <div className="transaction-modal-arrow-back" onClick={onSummaryClose}>
        <Arrow height={18} width={18} />
      </div>
      <p className="summary-title">Summary</p>
      <div className="summary-items-container" style={{ display: isSummaryVisible ? 'flex' : 'none' }}>
        {Object.entries(groupedTransactions).map(([id, txs]) => {
          if (!txs) return null
          const Chain = chains.find((chain) => chain.id === txs?.[0]?.chainId)
          if (!Chain) return null
          const chainName = Chain.name
          const ChainIcon = ChainIcons[Chain.id]

          return (
            <div key={id} className="summary-item-container">
              <div className="summary-item-chain-container">
                <p>
                  {txs?.length} {txs?.length === 1 ? 'txn' : 'txns'} on
                </p>
                <ChainIcon height={18} width={18} />
                <p className="summary-item-chain-name">{chainName}</p>
              </div>
              {displayedChanges(id, txs)}
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
