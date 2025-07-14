import { Address, Abi, Hex } from 'viem'

export type EFPActionType = 'CreateEFPList' | 'UpdateEFPList' | 'SetEFPListSettings' | 'UpdateENSProfile'

/**
 * Represents a blockchain transaction for EFP operations
 */
export type TransactionType = {
  /** Human-readable title for the transaction */
  title?: string
  /** Detailed description of what the transaction does */
  description?: string
  /** Unique identifier for the transaction type */
  id: EFPActionType | string
  /** Contract address to interact with */
  address: Address
  /** Blockchain chain ID (optional, uses default if not provided) */
  chainId?: number
  /** Contract ABI for the transaction */
  abi: Abi
  /** Name of the contract function to call */
  functionName: string
  /** Arguments to pass to the contract function */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any[]
  /** Transaction hash after execution (populated after submission) */
  hash?: Hex
}

export type SubmitButtonText = 'switchChain' | 'initiate' | 'pending' | 'reInitiate' | 'indexing' | 'finish' | 'next'

export type OpCodeType = 1 | 2 | 3 | 4

export type ListOpType = {
  version?: number
  opcode: OpCodeType
  data: Hex
}

export type GetListOpsTransactionProps = {
  nonce?: bigint
  chainId?: number
  listOps: ListOpType[]
  connectedAddress: Address
  isMintingNewList?: boolean
}
