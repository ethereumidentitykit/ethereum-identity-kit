import React from 'react'
import { TransactionType } from '../../../../types'
import { extractAddressAndTag, getPendingTxListOps } from '../../../../utils/transactions'
import ActionAccount from './ActionAccount'
import './Actions.css'
import { ACTION_ITEM_ICON } from '../../../../constants/transactions'

interface ActionsProps {
  transactions: TransactionType[]
}

type ActionsItem = {
  opCode: number
  address: string
  tag: string
}

const Actions: React.FC<ActionsProps> = ({ transactions }) => {
  const transactionListOps = getPendingTxListOps(transactions).map(listOp => {
    const { address, tag } = extractAddressAndTag(listOp.data)
    return {
      opCode: listOp.opcode,
      address,
      tag,
    }
  })

  const fiterBlockedAndMuted = (listOps: ActionsItem[]) => {
    const blockAndMuteListOpsAddresses = listOps.filter((op) => op.tag === 'block' || op.tag === 'mute').map((op) => op.address)
    return listOps.filter((op) => !blockAndMuteListOpsAddresses.includes(op.address))
  }

  const allActions = {
    follow: fiterBlockedAndMuted(transactionListOps).filter(op => op.opCode === 1),
    unfollow: fiterBlockedAndMuted(transactionListOps).filter(op => op.opCode === 2),
    tag: fiterBlockedAndMuted(transactionListOps).filter(op => op.opCode === 3),
    untag: fiterBlockedAndMuted(transactionListOps).filter(op => op.opCode === 4),
    block: transactionListOps.filter(op => op.opCode === 3 && op.tag === 'block'),
    unblock: transactionListOps.filter(op => op.opCode === 4 && op.tag === 'block'),
    mute: transactionListOps.filter(op => op.opCode === 3 && op.tag === 'mute'),
    unmute: transactionListOps.filter(op => op.opCode === 4 && op.tag === 'mute'),
  }

  return (
    <div className="transaction-modal-actions-container">
      <p className="transaction-modal-actions-container-title">Actions <span>{transactionListOps.length}</span></p>
      {Object.entries(allActions).map(([key, value]) => {
        if (value.length === 0) return null

        const ActionIcon = ACTION_ITEM_ICON[key as keyof typeof ACTION_ITEM_ICON].icon
        const actionColor = ACTION_ITEM_ICON[key as keyof typeof ACTION_ITEM_ICON].color

        return (
          <div key={key} className="transaction-modal-actions-item">
            <div className="transaction-modal-actions-item-header">
              <div style={{ backgroundColor: actionColor }}><ActionIcon height={20} width={20} /></div>
              <p>{key}</p>
            </div>
            <div className="transaction-modal-actions-item-accounts">
              <div className="transaction-modal-actions-item-accounts-container">
                {value.slice(0, 3).map((op) => (
                  <ActionAccount key={op.address} address={op.address} />
                ))}
              </div>
              <p>{value.length} accounts</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Actions
