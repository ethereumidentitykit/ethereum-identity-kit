import { createConfig, http } from 'wagmi'
import { mainnet, optimism, base } from 'wagmi/chains'
import { metaMask, coinbaseWallet, walletConnect, injected } from 'wagmi/connectors'

export const transports = {
  [mainnet.id]: http('https://eth.llamarpc.com'),
  [base.id]: http('https://mainnet.base.org'),
  [optimism.id]: http('https://mainnet.optimism.io'),
}

export const wagmiConfig = createConfig({
  chains: [mainnet, base, optimism],
  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet({ appName: 'Ethereum Identity Kit' }),
    walletConnect({ projectId: 'd4f234136ca6a7efeed7abf93474125b' }),
  ],
  transports,
})
