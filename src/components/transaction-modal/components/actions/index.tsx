import React from 'react'
import ActionAccount from './ActionAccount'
import { Address, ListOpType, TransactionType } from '../../../../types'
import { extractAddressAndTag, getPendingTxListOps } from '../../../../utils/transactions'
import { ACTION_ITEM_ICON } from '../../../../constants/transactions'
import './Actions.css'

interface ActionsProps {
  transactions: TransactionType[]
}

type ActionsItem = {
  opcode: number
  address: string
  tag: string
}

const Actions: React.FC<ActionsProps> = ({ transactions }) => {
  const transactionListOps = getPendingTxListOps(transactions)
  const transactionAddressesAndTags = transactionListOps.map((listOp) => {
    const { address, tag } = extractAddressAndTag(listOp.data)
    return {
      opcode: listOp.opcode,
      address,
      tag,
    }
  })

  const fiterBlockedMutedTop8 = (listOps: ListOpType[]) => {
    const blockAndMuteListOpsData = listOps
      .filter((op) => {
        const { tag } = extractAddressAndTag(op.data)
        return tag === 'block' || tag === 'mute' || tag === 'top8'
      })
      .map((op) => op.data)

    return listOps
      .filter((op) => !blockAndMuteListOpsData.includes(op.data))
      .map((listOp) => {
        const { address, tag } = extractAddressAndTag(listOp.data)
        return {
          opcode: listOp.opcode,
          address,
          tag,
        }
      })
  }

  const removeDuplicateAddresses = (listOps: ActionsItem[]) => {
    const newListOps: ActionsItem[] = []
    const seen: Record<string, boolean> = {}

    listOps.forEach((op) => {
      if (seen[op.address]) return
      seen[op.address] = true
      newListOps.push(op)
    })

    return newListOps
  }

  const allActions = {
    follow: fiterBlockedMutedTop8(transactionListOps).filter((op) => op.opcode === 1),
    unfollow: fiterBlockedMutedTop8(transactionListOps).filter((op) => op.opcode === 2),
    tag: removeDuplicateAddresses(fiterBlockedMutedTop8(transactionListOps).filter((op) => op.opcode === 3)),
    untag: removeDuplicateAddresses(fiterBlockedMutedTop8(transactionListOps).filter((op) => op.opcode === 4)),
    unblock: transactionAddressesAndTags.filter((op) => op.opcode === 4 && op.tag === 'block'),
    mute: transactionAddressesAndTags.filter((op) => op.opcode === 3 && op.tag === 'mute'),
    unmute: transactionAddressesAndTags.filter((op) => op.opcode === 4 && op.tag === 'mute'),
    'add to Top 8': transactionAddressesAndTags.filter((op) => op.opcode === 3 && op.tag === 'top8'),
    'remove from Top 8': transactionAddressesAndTags.filter((op) => op.opcode === 4 && op.tag === 'top8'),
  }

  return (
    <div className="transaction-modal-actions-container">
      <p className="transaction-modal-actions-container-title">
        Actions <span>{transactionListOps.length}</span>
      </p>
      {Object.entries(allActions).map(([key, value]) => {
        if (value.length === 0) return null

        const ActionIcon = ACTION_ITEM_ICON[key as keyof typeof ACTION_ITEM_ICON].icon
        const actionColor = ACTION_ITEM_ICON[key as keyof typeof ACTION_ITEM_ICON].color

        return (
          <div key={key} className="transaction-modal-actions-item">
            <div className="transaction-modal-actions-item-header">
              <div style={{ backgroundColor: actionColor }}>
                <ActionIcon height={20} width={20} color="#333333" />
              </div>
              <p>{key}</p>
            </div>
            <div className="transaction-modal-actions-item-accounts">
              {value.length === 1 ? (
                <ActionAccount address={value[0].address as Address} showName />
              ) : (
                <div className="transaction-modal-actions-item-accounts">
                  <div className="transaction-modal-actions-item-accounts-container">
                    {value.slice(0, 3).map((op, index) => (
                      <ActionAccount key={`${op.address}-${index}`} address={op.address as Address} />
                    ))}
                  </div>
                  <p>{`${value.length} accounts`}</p>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Actions
