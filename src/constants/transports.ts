import { http } from 'wagmi'
import { base, mainnet, optimism } from 'wagmi/chains'

export const transports = {
  [mainnet.id]: http('https://eth.llamarpc.com'),
  [base.id]: http('https://mainnet.base.org'),
  [optimism.id]: http('https://mainnet.optimism.io'),
}
