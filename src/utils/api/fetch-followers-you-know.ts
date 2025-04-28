import type { Address } from 'viem'
import type { FollowersYouKnowResponse } from '../../types'
import { EFP_API_URL, noFollowersYouKnow } from '../../constants'

export const fetchFollowersYouKnow = async (connectedAddress: Address, lookupAddressOrName: string) => {
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

    const data = (await response.json()) as FollowersYouKnowResponse
    return data
  } catch (err: unknown) {
    console.error(err)
    return noFollowersYouKnow
  }
}
