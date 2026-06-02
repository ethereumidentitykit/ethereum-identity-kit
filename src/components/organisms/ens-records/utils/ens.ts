import { createPublicClient } from 'viem'
import { mainnet } from 'viem/chains'
import { transports } from '../../../../constants'
import { normalizeEnsName } from '../../../../utils'

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
