import { createConfig, http } from 'wagmi'
import { baseSepolia, optimismSepolia, sepolia } from 'wagmi/chains'
import { metaMask, coinbaseWallet, walletConnect, injected } from 'wagmi/connectors'

export const transports = {
  [sepolia.id]: http('https://ethereum-sepolia-rpc.publicnode.com'),
  [baseSepolia.id]: http('https://base-sepolia-public.nodies.app'),
  [optimismSepolia.id]: http('https://optimism-sepolia-public.nodies.app'),
}

export const wagmiConfig = createConfig({
  chains: [sepolia, baseSepolia, optimismSepolia],
  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet({ appName: 'Ethereum Identity Kit' }),
    walletConnect({ projectId: 'd4f234136ca6a7efeed7abf93474125b' }),
  ],
  transports,
})
