import { Hex } from 'viem'
import { EFPActionType, TransactionType } from '../../../../types'
import Actions from '../actions'
import { BLOCK_EXPLORERS } from '../../../../constants/chains'

interface TransactionItemDetailsProps {
  transactionDetails: {
    hash?: Hex | null
    chain: {
      id?: number
      name?: string
      icon: React.FC<React.SVGProps<SVGSVGElement>> | null
    }
    'Est. gas fee': string
  }
  transaction: TransactionType
}

const TransactionItemDetails: React.FC<TransactionItemDetailsProps> = ({ transactionDetails, transaction }) => {
  const isUpdateEFPList = transaction.id === EFPActionType.UpdateEFPList

  return (
    <div className="transaction-details-container">
      {isUpdateEFPList ? <Actions transactions={[transaction]} /> :
        <div className='transaction-item-details-description'>
          <p className='transaction-item-details-description-title'>{transaction.title}</p>
          <p className='transaction-item-details-description-description'>{transaction.description}</p>
        </div>
      }
      <div className="transaction-details">
        <div className="transaction-details-chain-container">
          {transactionDetails.chain.icon && <transactionDetails.chain.icon height={20} width={20} />}
          <p>{transactionDetails.chain.name}</p>
        </div>
        <div className="transaction-details-gas-fee-container">
          <p>{transactionDetails['Est. gas fee']}</p><span>est. gas</span>
        </div>
        <div className="transaction-details-block-explorer-container">
          {transactionDetails.chain.id && BLOCK_EXPLORERS[transactionDetails.chain.id as keyof typeof BLOCK_EXPLORERS].map((explorer) => (
            <a key={explorer.name} href={explorer.url(transactionDetails.hash ?? '')} target="_blank" rel="noopener noreferrer" style={{ opacity: transactionDetails.hash ? 1 : 0.5 }}>
              <explorer.icon height={24} width={24} />
            </a>
          ))}
        </div>
      </div>
    </div >
  )
}

export default TransactionItemDetails
