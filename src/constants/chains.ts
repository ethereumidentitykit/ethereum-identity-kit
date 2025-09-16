import { baseSepolia, optimismSepolia, sepolia } from 'viem/chains'
import Base from '../components/icons/chains/base'
import Optimism from '../components/icons/chains/optimism'
import Ethereum from '../components/icons/chains/ethereum'
import Blockscout from '../components/icons/socials/Blockscout'
import { Etherscan } from '../components/icons'
import { Hex } from '../types'

export const chains = [baseSepolia, optimismSepolia, sepolia] as const
export const DEFAULT_CHAIN = baseSepolia

export const ChainIcons = {
  [baseSepolia.id]: Base,
  [optimismSepolia.id]: Optimism,
  [sepolia.id]: Ethereum,
} as const

export type Chain = (typeof chains)[number]

export const LIST_OP_LIMITS: Record<number, number> = {
  [sepolia.id]: Number(500),
  [optimismSepolia.id]: Number(500),
  [baseSepolia.id]: Number(1000),
} as const

export const BLOCK_EXPLORERS = {
  [sepolia.id]: [
    {
      name: 'Etherscan',
      icon: Etherscan,
      url: (hash: Hex | string) => `https://sepolia.etherscan.io/tx/${hash}`,
    },
    {
      name: 'Blockscout',
      icon: Blockscout,
      url: (hash: Hex | string) => `https://eth-sepolia.blockscout.com/tx/${hash}`,
    },
  ],
  [optimismSepolia.id]: [
    {
      name: 'Etherscan',
      icon: Etherscan,
      url: (hash: Hex | string) => `https://optimistic.etherscan.io/tx/${hash}`,
    },
    {
      name: 'Blockscout',
      icon: Blockscout,
      url: (hash: Hex | string) => `https://optimism-sepolia.blockscout.com/tx/${hash}`,
    },
  ],
  [baseSepolia.id]: [
    {
      name: 'Etherscan',
      icon: Etherscan,
      url: (hash: Hex | string) => `https://sepolia.basescan.org/tx/${hash}`,
    },
    {
      name: 'Blockscout',
      icon: Blockscout,
      url: (hash: Hex | string) => `https://base-sepolia.blockscout.com/tx/${hash}`,
    },
  ],
}
