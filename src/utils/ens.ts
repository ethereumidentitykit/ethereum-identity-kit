import { ens_beautify, ens_normalize } from '@adraffy/ens-normalize'
import { createPublicClient } from 'viem'
import { mainnet } from 'viem/chains'
import { transports } from '../constants'

export const normalizeEnsName = (name: string) => {
  try {
    return ens_normalize(name)
  } catch (error) {
    console.error('Error normalizing name:', error)
    return name
  }
}

export const beautifyEnsName = (name: string) => {
  try {
    return ens_beautify(name)
  } catch (error) {
    console.error('Error beautifying name:', error)
    return name
  }
}

export const resolveEnsAddress = async (name: string) => {
  try {
    const publicClient = createPublicClient({
      chain: mainnet,
      transport: transports[mainnet.id],
    })

    const ensAddress = await publicClient.getEnsAddress({
      name: normalizeEnsName(name),
    })

    return ensAddress
  } catch (error) {
    console.error('Error resolving ENS address:', error)
    return ''
  }
}
