import { EFP_API_URL } from '../../constants'
import { AccountResponseType, ProfileListType } from '../../types/profile'

export const fetchAccount = async (addressOrName: string, list?: ProfileListType) => {
  try {
    const url = `${EFP_API_URL}/${list === undefined ? 'users' : 'lists'}/${list ?? addressOrName}/account`

    const response = await fetch(url, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    const data = (await response.json()) as AccountResponseType
    return data
  } catch (err: unknown) {
    console.error(err)
    return null
  }
}
