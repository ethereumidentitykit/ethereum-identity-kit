import { fromHex, getContract } from 'viem'
import { createPublicClient, http } from 'viem'
import { DEFAULT_CHAIN } from '../constants/chains'
import { efpListRegistryAbi } from '../constants/abi'
import { coreEfpContracts } from '../constants/contracts'

export const getListStorageLocation = async (list: string) => {
  const listRegistryContract = getContract({
    address: coreEfpContracts.EFPListRegistry,
    abi: efpListRegistryAbi,
    client: createPublicClient({
      chain: DEFAULT_CHAIN,
      transport: http(),
    }),
  })

  const listStorageLocation = await listRegistryContract.read.getListStorageLocation([BigInt(list)])
  const listStorageLocationChainId = fromHex(`0x${listStorageLocation.slice(64, 70)}`, 'number')
  const slot = BigInt(`0x${listStorageLocation.slice(-64)}`)

  return {
    chainId: listStorageLocationChainId,
    slot,
  }
}
