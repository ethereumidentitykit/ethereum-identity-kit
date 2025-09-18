import { baseSepolia, optimismSepolia, sepolia } from 'viem/chains'
import type { Address } from 'viem'

export const coreEfpContracts: {
  EFPAccountMetadata: Address
  EFPListRegistry: Address
  EFPListRecords: Address
  EFPListMinter: Address
} = {
  EFPAccountMetadata: '0xDAf8088C4DCC8113F49192336cd594300464af8D' as Address,
  EFPListRegistry: '0xDdD39d838909bdFF7b067a5A42DC92Ad4823a26d' as Address,
  EFPListRecords: '0x933a1bB6697Ae3c30Dd63A863d22763B4E40199A' as Address,
  EFPListMinter: '0xA9386Bf5D29033D33F2F3B354a943555f39425c1' as Address,
} as const

export const ListRecordContracts: Record<number, Address> = {
  [baseSepolia.id]: '0x933a1bB6697Ae3c30Dd63A863d22763B4E40199A' as Address,
  [optimismSepolia.id]: '0x1c4530B026CCBC8082D20ab2e39C692c83Aa2341' as Address,
  [sepolia.id]: '0x47e0c55BB810E79DB7051F1F379eEE303DBb19b9' as Address,
} as const
