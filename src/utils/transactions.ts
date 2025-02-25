import { Address, encodePacked, fromHex, Hex, toHex } from 'viem'
import * as abi from '../constants/abi'
import { DEFAULT_CHAIN } from '../constants/chains'
import { EFPActionIds } from '../constants/transactions'
import { coreEfpContracts, ListRecordContracts } from '../constants/contracts'
import { GetListOpsTransactionProps, ListOpType, TransactionType } from '../types/transactions'

export const formatListOpsTransaction = ({ nonce, chainId, listOps, connectedAddress }: GetListOpsTransactionProps) => {
  const operations = listOps.map((listOp: ListOpType) =>
    encodePacked(['uint8', 'uint8', 'uint8', 'uint8', 'bytes'], [1, listOp.opcode, 1, 1, listOp.data])
  )

  return {
    id: EFPActionIds.UpdateEFPList,
    title: 'EFP Update',
    address: chainId ? ListRecordContracts[chainId] : coreEfpContracts.EFPListRecords,
    abi: abi.efpListRecordsAbi,
    chainId,
    functionName: chainId ? 'applyListOps' : 'setMetadataValuesAndApplyListOps',
    args: chainId ? [nonce, operations] : [nonce, [{ key: 'user', value: connectedAddress }], operations],
  }
}

export const getListOpData = (address: Address, tag?: string) => {
  return `0x${address.slice(2)}${tag ? toHex(tag).slice(2) : ''}` as Hex
}

export const getListOpsFromTransaction = (transaction: TransactionType) => {
  const { args } = transaction

  const listOps = args[args.length - 1].map((listOp: Hex) => {
    const opcode = fromHex(`0x${listOp.slice(4, 6)}`, 'number')
    const data = `0x${listOp.slice(10)}`

    return {
      opcode,
      data,
    }
  })

  return listOps as ListOpType[]
}

export const getMintTxNonce = (transaction: TransactionType) => BigInt(`0x${transaction.args[0].slice(-64)}`)

export const getMintTxChainId = (transaction: TransactionType) =>
  fromHex(`0x${transaction.args[0].slice(64, 70)}`, 'number')

export const getMintTxRecordsAddress = (transaction: TransactionType) => `0x${transaction.args[0].slice(70, 110)}`

export const getPendingTxAddresses = (txs: TransactionType[]) => {
  return txs
    .filter((tx) => tx.id === EFPActionIds.UpdateEFPList)
    .flatMap((tx) => {
      const listOps = getListOpsFromTransaction(tx)
      return listOps.map((listOp) => listOp.data.slice(0))
    })
}

export const extractAddressAndTag = (data: Hex) => {
  const address = data.slice(0, 42) as Address
  const tag = fromHex(`0x${data.slice(42)}`, 'string')

  return {
    address,
    tag,
  }
}

export const getPendingTxListOps = (txs: TransactionType[]) => {
  return txs.filter((tx) => tx.id === EFPActionIds.UpdateEFPList).flatMap((tx) => getListOpsFromTransaction(tx))
}

export const getPendingTxAddressesAndTags = (txs: TransactionType[]) =>
  txs
    .filter((tx) => tx.id === EFPActionIds.UpdateEFPList)
    .flatMap((tx) => {
      const listOps = getListOpsFromTransaction(tx)
      return listOps.map((listOp) => extractAddressAndTag(listOp.data))
    })

export const prepareMintTransaction = (mintNonce: bigint) => {
  const mintTransaction = {
    title: 'Mint New List',
    description: 'An NFT representing your List will appear in your wallet. This must be done on Base.',
    id: EFPActionIds.CreateEFPList,
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
    if (tx.id === EFPActionIds.UpdateEFPList) args[0] = (args[0] as bigint).toString()

    return {
      ...tx,
      args,
    }
  })
