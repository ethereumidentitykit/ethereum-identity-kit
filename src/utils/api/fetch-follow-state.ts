import type { FollowStateProps, FollowStatusResponse } from '../../types/followState'
import { EFP_API_URL } from '../../constants'

export const fetchFollowState = async ({
  lookupAddress,
  userAddress,
  list,
  type,
  fresh
}: FollowStateProps) => {
  try {
    if ((!list && type === 'following') || !(userAddress || list))
      return null

    // fetch by user if list is undefined, otherwise fetch by list
    // buttonState (is userAddress following lookupAddress) OR followerState (is lookupAddress following userAddress)
    const url = `${EFP_API_URL}/${list === undefined ? 'users' : 'lists'}/${
      list ?? userAddress
    }/${lookupAddress}/${type === 'following' ? 'buttonState' : 'followerState'}${
      fresh ? '?cache=fresh' : ''
    }`

    const response = await fetch(url, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    const data = (await response.json()) as FollowStatusResponse
    return data
  } catch (err: unknown) {
    return null
  }
}
