import { fromHex, getContract } from 'viem'
import { createPublicClient, http } from 'viem'
import { DEFAULT_CHAIN } from '../constants/chains'
import { efpListRegistryAbi } from '../constants/abi'
import { coreEfpContracts } from '../constants/contracts'
import { Address } from '../types'

/**
 * Get the list storage location from the list registry contract
 *
 * @param list - the list to get the storage location for
 * @returns the chain id and slot of the list storage location
 */
export const getListStorageLocation = async (list: string) => {
  const listRegistryContract = getContract({
    address: coreEfpContracts.EFPListRegistry,
    abi: efpListRegistryAbi,
    client: createPublicClient({
      chain: DEFAULT_CHAIN,
      transport: http(),
    }),
  })

  // List storage location - https://docs.efp.app/design/list-storage-location/
  const listStorageLocation = await listRegistryContract.read.getListStorageLocation([BigInt(list)])
  const listStorageLocationChainId = fromHex(`0x${listStorageLocation.slice(64, 70)}`, 'number')
  const contractAddress = `0x${listStorageLocation.slice(70, 110)}` as Address
  const slot = BigInt(`0x${listStorageLocation.slice(-64)}`)

  return {
    chainId: listStorageLocationChainId,
    slot,
    contractAddress,
  }
}
