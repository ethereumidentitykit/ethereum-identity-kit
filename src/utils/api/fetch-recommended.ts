import type { Address } from 'viem'
import { DiscoverResponseType } from '../../types'
import { EFP_API_URL } from '../../constants'

export const fetchRecommended = async (
  endpoint: 'discover' | 'recommended',
  addressOrName?: string | Address,
  list?: string | null,
  limit = 10,
  pageParam = 1
) => {
  try {
    const url = `${EFP_API_URL}/${
      endpoint === 'recommended' && addressOrName
        ? `${list === undefined ? 'users' : 'lists'}/${
            list ?? addressOrName
          }/recommended?limit=${limit}&offset=${pageParam * limit}`
        : `${endpoint}?limit=${limit}&offset=${pageParam * limit}`
    }`

    const res = await fetch(url, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    const data = (await res.json()) as DiscoverResponseType
    const formattedData = endpoint === 'recommended' ? data.recommended : data.latestFollows
    return formattedData
  } catch (err: unknown) {
    console.error(err)
    return []
  }
}
