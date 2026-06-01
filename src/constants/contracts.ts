import { base, mainnet, optimism } from 'viem/chains'
import type { Address } from 'viem'

export const coreEfpContracts: {
  EFPAccountMetadata: Address
  EFPListRegistry: Address
  EFPListRecords: Address
  EFPListMinter: Address
} = {
  EFPAccountMetadata: '0x5289fE5daBC021D02FDDf23d4a4DF96F4E0F17EF' as Address,
  EFPListRegistry: '0x0E688f5DCa4a0a4729946ACbC44C792341714e08' as Address,
  EFPListRecords: '0x41Aa48Ef3c0446b46a5b1cc6337FF3d3716E2A33' as Address,
  EFPListMinter: '0xDb17Bfc64aBf7B7F080a49f0Bbbf799dDbb48Ce5' as Address,
} as const

export const ListRecordContracts: Record<number, Address> = {
  [base.id]: '0x41Aa48Ef3c0446b46a5b1cc6337FF3d3716E2A33' as Address,
  [optimism.id]: '0x4Ca00413d850DcFa3516E14d21DAE2772F2aCb85' as Address,
  [mainnet.id]: '0x5289fE5daBC021D02FDDf23d4a4DF96F4E0F17EF' as Address,
} as const

export const ENSContracts: {
  BaseRegistrar: Address
  Registry: Address
  PublicResolver: Address
} = {
  BaseRegistrar: '0x59E16fcCd424Cc24e280Be16E11Bcd56fb0CE547' as Address,
  Registry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e' as Address,
  PublicResolver: '0xF29100983E058B709F3D539b0c765937B804AC15' as Address,
} as const
