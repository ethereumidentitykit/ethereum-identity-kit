import { EFP_API_URL } from '../../constants'
import { ProfileListsResponse } from '../../types/profile'

export const fetchProfileLists = async (addressOrName: string, fresh?: boolean) => {
  try {
    const response = await fetch(`${EFP_API_URL}/users/${addressOrName}/lists${fresh ? '?cache=fresh' : ''}`, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    const data = (await response.json()) as ProfileListsResponse
    return data
  } catch (err: unknown) {
    console.error(err)
    return {
      primary_list: null,
      lists: [],
    } as ProfileListsResponse
  }
}
