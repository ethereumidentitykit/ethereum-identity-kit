import clsx from 'clsx';
import React from 'react'
import { useWaitForTransactionReceipt } from 'wagmi';
import { useTransactions } from '../../../../context';
import { Clock } from '../../../icons';
import { Check } from '../../../icons';
import { Cross, Wallet } from '../../../icons';
import { TransactionType } from '../../../../types';
import './Steps.css';

interface StepProps {
  index: number;
  transaction: TransactionType;
}

const Step: React.FC<StepProps> = ({ index, transaction }) => {
  const { currentTxIndex } = useTransactions()
  const { isPending, isSuccess, isError } = useWaitForTransactionReceipt({
    hash: transaction.hash,
    chainId: transaction.chainId,
  })

  const StepIcon = isSuccess ? Check : transaction.hash && isPending ? Clock : isError ? Cross : currentTxIndex === index ? Wallet : null;
  const StepClassName = isSuccess ? 'transaction-step-done' : transaction.hash && isPending ? 'transaction-step-pending' : isError ? 'transaction-step-error' : currentTxIndex === index ? 'transaction-step-current' : null;

  return (
    <div className={clsx('transaction-step', StepClassName, index === 0 && 'no-line')}>
      {StepIcon && <StepIcon height={18} width={18} />}
    </div>
  )
}

export default Step;
