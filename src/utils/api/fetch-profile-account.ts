import { ProfileAccountResponse, ProfileListType } from '../../types/profile'
import { EFP_API_URL } from '../../constants'

export const fetchProfileAccount = async (addressOrName: string, list?: ProfileListType, fresh?: boolean) => {
  try {
    const url = `${EFP_API_URL}/${list === undefined ? 'users' : 'lists'}/${
      list ?? addressOrName
    }/account${fresh ? '?cache=fresh' : ''}`

    const response = await fetch(url, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    const data = (await response.json()) as ProfileAccountResponse
    return data
  } catch (err: unknown) {
    console.error(err)
    return null
  }
}
