import { useTransactions } from '../../../../../context'
import Step from './Step'
import { TransactionType } from '../../../../../types'
import './Steps.css'

interface StepsProps {
  transactions: TransactionType[]
}

const Steps = ({ transactions }: StepsProps) => {
  const { currentTxIndex } = useTransactions()

  if (currentTxIndex === undefined || transactions.length < 2) return null

  return (
    <div className="transaction-steps-container">
      <div className="transaction-steps">
        {transactions.map((transaction, index) => (
          <Step key={`${transaction.id}-${index}`} transaction={transaction} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Steps
