import { http } from 'wagmi'
import { baseSepolia, sepolia, optimismSepolia } from 'wagmi/chains'

export const transports = {
  [sepolia.id]: http('https://ethereum-sepolia-rpc.publicnode.com'),
  [baseSepolia.id]: http('https://base-sepolia-public.nodies.app'),
  [optimismSepolia.id]: http('https://optimism-sepolia-public.nodies.app'),
}
