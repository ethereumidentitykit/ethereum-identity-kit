import { Address, encodePacked, Hex, toHex } from 'viem'
import { efpListRecordsAbi } from '../constants/abi'
import { coreEfpContracts } from '../constants/contracts'
import { ListRecordContracts } from '../constants/contracts'
import { EFPActionType, TransactionType } from '../context/transactionContext'

type ListOpType = {
  opcode: number
  data: Hex
}

type GetListOpsTransactionProps = {
  nonce?: bigint
  chainId?: number
  listOps: ListOpType[]
  connectedAddress: Address
}

export const formatListOpsTransaction = ({ nonce, chainId, listOps, connectedAddress }: GetListOpsTransactionProps) => {
  const operations = listOps.map((listOp: ListOpType) =>
    encodePacked(['uint8', 'uint8', 'uint8', 'uint8', 'bytes'], [1, listOp.opcode, 1, 1, listOp.data])
  )

  return {
    id: EFPActionType.UpdateEFPList,
    address: chainId ? ListRecordContracts[chainId] : coreEfpContracts.EFPListRecords,
    abi: efpListRecordsAbi,
    chainId,
    functionName: chainId ? 'applyListOps' : 'setMetadataValuesAndApplyListOps',
    args: chainId ? [nonce, operations] : [nonce, [{ key: 'user', value: connectedAddress }], operations],
  }
}

export const getListOpData = (address: Address, tag?: string) => {
  return `0x${address.slice(2)}${tag ? toHex(tag).slice(2) : ''}` as Hex
}

export const getListOpFromTransaction = (transaction: TransactionType) => {
  const { args } = transaction

  const listOp = {
    opcode: args[0][1],
    data: args[0][4],
  }

  return listOp
}
