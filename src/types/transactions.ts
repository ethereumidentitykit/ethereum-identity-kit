import { Address, Abi, Hex } from 'viem'

export enum EFPActionType {
  CreateEFPList = 'CreateEFPList',
  UpdateEFPList = 'UpdateEFPList',
}

export type TransactionType = {
  id: EFPActionType
  address: Address
  chainId?: number
  abi: Abi
  functionName: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any[]
  hash?: Hex
}
