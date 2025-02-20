import { base, mainnet, optimism } from 'viem/chains'
import Base from '../components/icons/chains/base'
import Optimism from '../components/icons/chains/optimism'
import Ethereum from '../components/icons/chains/ethereum'
import Blockscout from '../components/icons/socials/Blockscout'
import { Etherscan } from '../components/icons'
import { Hex } from '../types'

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

export const BLOCK_EXPLORERS = {
  [mainnet.id]: [
    {
      name: 'Etherscan',
      icon: Etherscan,
      url: (hash: Hex | string) => `https://etherscan.io/tx/${hash}`,
    },
    {
      name: 'Blockscout',
      icon: Blockscout,
      url: (hash: Hex | string) => `https://eth.blockscout.com/tx/${hash}`,
    },
  ],
  [optimism.id]: [
    {
      name: 'Etherscan',
      icon: Etherscan,
      url: (hash: Hex | string) => `https://optimistic.etherscan.io/tx/${hash}`,
    },
    {
      name: 'Blockscout',
      icon: Blockscout,
      url: (hash: Hex | string) => `https://optimism.blockscout.com/tx/${hash}`,
    },
  ],
  [base.id]: [
    {
      name: 'Etherscan',
      icon: Etherscan,
      url: (hash: Hex | string) => `https://basescan.org/tx/${hash}`,
    },
    {
      name: 'Blockscout',
      icon: Blockscout,
      url: (hash: Hex | string) => `https://base.blockscout.com/tx/${hash}`,
    },
  ],
}
