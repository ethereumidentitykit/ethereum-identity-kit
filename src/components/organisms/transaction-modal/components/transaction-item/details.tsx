import { Hex } from 'viem'
import Actions from '../actions'
import { BLOCK_EXPLORERS } from '../../../../../constants/chains'
import { EFPActionIds } from '../../../../../constants/transactions'
import { TransactionType } from '../../../../../types'
import ListSettings from '../list-settings'
import './TransactionItem.css'

interface TransactionItemDetailsProps {
  transactionDetails: {
    hash?: Hex | null
    chain: {
      id?: number
      name?: string
      icon: React.FC<React.SVGProps<SVGSVGElement>> | null
    }
    gasEth: string
    gasUsd: string
  }
  transaction: TransactionType
}

const TransactionItemDetails: React.FC<TransactionItemDetailsProps> = ({ transactionDetails, transaction }) => {
  const isUpdateEFPList = transaction.id === EFPActionIds.UpdateEFPList
  const isSetListSettings = transaction.id === EFPActionIds.SetEFPListSettings

  return (
    <div className="transaction-details-container">
      {isUpdateEFPList ? (
        <Actions transactions={[transaction]} />
      ) : isSetListSettings ? (
        <ListSettings txs={[transaction]} />
      ) : (
        <div className="transaction-item-details-description">
          <p className="transaction-item-details-description-title">{transaction.title}</p>
          <p className="transaction-item-details-description-description">{transaction.description}</p>
        </div>
      )}
      <div className="transaction-details">
        <div className="transaction-details-chain-container">
          {transactionDetails.chain.icon && <transactionDetails.chain.icon height={20} width={20} />}
          <p>{transactionDetails.chain.name}</p>
        </div>
        <div className="transaction-details-gas-fee-container">
          <div className="transaction-details-gas-fee-container-usd">
            <p>{transactionDetails.gasUsd}</p>
            <span>est. gas</span>
          </div>
          <p className="transaction-details-gas-fee-container-eth">({transactionDetails.gasEth})</p>
        </div>
        <div className="transaction-details-block-explorer-container">
          {transactionDetails.chain.id &&
            BLOCK_EXPLORERS[transactionDetails.chain.id as keyof typeof BLOCK_EXPLORERS].map((explorer) => (
              <a
                key={explorer.name}
                href={explorer.url(transactionDetails.hash ?? '')}
                target="_blank"
                rel="noopener noreferrer"
                style={{ opacity: transactionDetails.hash ? 1 : 0.5 }}
              >
                <explorer.icon height={24} width={24} />
              </a>
            ))}
        </div>
      </div>
    </div>
  )
}

export default TransactionItemDetails
