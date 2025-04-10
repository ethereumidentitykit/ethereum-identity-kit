import { formatQueryParams } from '../formatters'
import { CommonFollower, Address } from '../../types'
import { EFP_API_URL, FETCH_LIMIT } from '../../constants'

interface FetchAllCommonFollowersProps {
  connectedAddress: Address
  lookupAddressOrName: Address | string
  limit?: number
  search?: string
  pageParam: number
}

export const fetchAllCommonFollowers = async ({
  connectedAddress,
  lookupAddressOrName,
  limit = FETCH_LIMIT,
  search,
  pageParam,
}: FetchAllCommonFollowersProps) => {
  try {
    const queryParams = formatQueryParams({
      leader: lookupAddressOrName,
      limit,
      offset: pageParam * limit,
      term: search,
    })

    const url = `${EFP_API_URL}/users/${connectedAddress}/commonFollowers?${queryParams}`

    const response = await fetch(url, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    const data = (await response.json()).results as CommonFollower[]
    return {
      commonFollowers: data ?? [],
      nextPageParam: pageParam + 1,
    }
  } catch (err: unknown) {
    console.error(err)

    return {
      commonFollowers: [],
      nextPageParam: pageParam + 1,
    }
  }
}
