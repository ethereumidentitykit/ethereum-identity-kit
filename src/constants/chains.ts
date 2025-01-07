import { base, mainnet, optimism } from 'viem/chains'
import Base from '../components/icons/chains/base'
import Optimism from '../components/icons/chains/optimism'
import Ethereum from '../components/icons/chains/ethereum'

export const chains = [base, optimism, mainnet] as const
export const DEFAULT_CHAIN = base

export const ChainIcons = {
  [base.id]: Base,
  [optimism.id]: Optimism,
  [mainnet.id]: Ethereum,
}

export type Chain = (typeof chains)[number]

export const LIST_OP_LIMITS: Record<number, number> = {
  [mainnet.id]: Number(500),
  [optimism.id]: Number(500),
  [base.id]: Number(500),
} as const
