import { EFP_API_URL } from '../../constants'
import { Address, ProfileEFPPoapResponse } from '../../types'

export const fetchProfileEFPPoaps = async (
  addressOrName: Address | string | null,
  list?: number | null,
  fresh?: boolean
) => {
  try {
    const url = `${EFP_API_URL}/${list === undefined ? 'users' : 'lists'}/${
      list ?? addressOrName
    }/badges${fresh ? '?cache=fresh' : ''}`

    const response = await fetch(url, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    const data = (await response.json()).poaps as ProfileEFPPoapResponse[]
    return data || []
  } catch (err: unknown) {
    console.error(err)
    return []
  }
}
