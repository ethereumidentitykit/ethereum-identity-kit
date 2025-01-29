import type { Address } from 'viem'
import type { CommonFollowersResponse } from '../../types'
import { EFP_API_URL, noCommonFollowers } from '../../constants'

export const fetchCommonFollowers = async (connectedAddress: Address, lookupAddressOrName: string) => {
  try {
    const response = await fetch(
      `${EFP_API_URL}/users/${connectedAddress}/commonFollowers?leader=${lookupAddressOrName}`,
      {
        cache: 'default',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )

    const data = (await response.json()) as CommonFollowersResponse
    return data
  } catch (err: unknown) {
    console.error(err)
    return noCommonFollowers
  }
}
