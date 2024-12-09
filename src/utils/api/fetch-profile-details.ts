import { ProfileDetailsResponse } from "../../types/profile"
import { EFP_API_URL } from '../../constants'

export const fetchProfileDetails = async (
  addressOrName: string,
  list?: number | string,
  fresh?: boolean
) => {
  try {
    const url = `${EFP_API_URL}/${list === undefined ? 'users' : 'lists'}/${
      list ?? addressOrName
    }/details${fresh ? '?cache=fresh' : ''}`

    const response = await fetch(url, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    const data = (await response.json()) as ProfileDetailsResponse
    return data
  } catch (err: unknown) {
    return null
  }
}
