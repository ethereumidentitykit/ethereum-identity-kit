// Mock chains for testing to avoid viem import issues

export const base = {
  id: 8453,
  name: 'Base',
  network: 'base',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: { default: { http: ['https://mainnet.base.org'] } },
  blockExplorers: { default: { name: 'BaseScan', url: 'https://basescan.org' } },
}

export const mainnet = {
  id: 1,
  name: 'Ethereum',
  network: 'homestead',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: { default: { http: ['https://cloudflare-eth.com'] } },
  blockExplorers: { default: { name: 'Etherscan', url: 'https://etherscan.io' } },
}

export const optimism = {
  id: 10,
  name: 'Optimism',
  network: 'optimism',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: { default: { http: ['https://mainnet.optimism.io'] } },
  blockExplorers: { default: { name: 'Etherscan', url: 'https://optimistic.etherscan.io' } },
}

export const mockChains = {
  base,
  mainnet,
  optimism,
}

export const chains = [base, optimism, mainnet] as const
export const DEFAULT_CHAIN = base

export const ChainIcons = {
  [base.id]: () => null,
  [optimism.id]: () => null,
  [mainnet.id]: () => null,
} as const

export type Chain = (typeof chains)[number]

export const LIST_OP_LIMITS: Record<number, number> = {
  [mainnet.id]: 500,
  [optimism.id]: 500,
  [base.id]: 1000,
} as const

export const BLOCK_EXPLORERS = {
  [mainnet.id]: [
    {
      name: 'Etherscan',
      icon: () => null,
      url: (hash: string) => `https://etherscan.io/tx/${hash}`,
    },
  ],
  [optimism.id]: [
    {
      name: 'Etherscan',
      icon: () => null,
      url: (hash: string) => `https://optimistic.etherscan.io/tx/${hash}`,
    },
  ],
  [base.id]: [
    {
      name: 'Etherscan',
      icon: () => null,
      url: (hash: string) => `https://basescan.org/tx/${hash}`,
    },
  ],
}
