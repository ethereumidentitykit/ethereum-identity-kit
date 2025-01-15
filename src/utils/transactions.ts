import { Address, encodePacked, fromHex, Hex, toHex } from 'viem'
import * as abi from '../constants/abi'
import { DEFAULT_CHAIN } from '../constants/chains'
import { efpListRecordsAbi } from '../constants/abi'
import { coreEfpContracts } from '../constants/contracts'
import { ListRecordContracts } from '../constants/contracts'
import { EFPActionType, GetListOpsTransactionProps, ListOpType, TransactionType } from '../types/transactions'

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
  const opcode = args[args.length - 1].slice(4, 6)
  const data = args[args.length - 1]

  const listOp = {
    opcode,
    data,
  }

  return listOp
}

export const getMintTxNonce = (transaction: TransactionType) => BigInt(`0x${transaction.args[0].slice(-64)}`)

export const getMintTxChainId = (transaction: TransactionType) =>
  fromHex(`0x${transaction.args[0].slice(64, 70)}`, 'number')

export const getMintTxRecordsAddress = (transaction: TransactionType) => `0x${transaction.args[0].slice(70, 110)}`

export const getPendingTxAddresses = (txs: TransactionType[]) => {
  return txs
    .filter((tx) => tx.id === EFPActionType.UpdateEFPList)
    .flatMap((tx) => {
      const listOp = getListOpFromTransaction(tx)
      return listOp.data.map((data: Hex) => `0x${data.slice(10, 50).toLowerCase()}`)
    })
}

export const getPendingTxAddressesAndTags = (txs: TransactionType[]) =>
  txs
    .filter((tx) => tx.id === EFPActionType.UpdateEFPList)
    .flatMap((tx) => {
      const listOp = getListOpFromTransaction(tx)
      return listOp.data.map((data: Hex) => {
        const address = `0x${data.slice(10, 50).toLowerCase()}`
        const tag = `0x${data.slice(50).toLowerCase()}`

        return {
          address,
          tag,
        }
      })
    })

export const prepareMintTransaction = (mintNonce: bigint) => {
  const mintTransaction = {
    id: EFPActionType.CreateEFPList,
    chainId: DEFAULT_CHAIN.id,
    address: coreEfpContracts.EFPListMinter,
    abi: abi.efpListMinterAbi,
    functionName: 'mintPrimaryListNoMeta',
    args: [
      encodePacked(
        ['uint8', 'uint8', 'uint256', 'address', 'uint'],
        [1, 1, BigInt(0o0), coreEfpContracts.EFPListRecords, mintNonce]
      ),
    ],
  }

  return mintTransaction
}

export const transformTxsForLocalStorage = (txs: TransactionType[]) =>
  txs.map((tx) => {
    const args = tx.args
    if (tx.id === EFPActionType.UpdateEFPList) args[0] = (args[0] as bigint).toString()

    return {
      ...tx,
      args,
    }
  })
