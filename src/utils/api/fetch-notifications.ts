import { EFP_API_URL } from '../../constants'
import { NotificationsResponse } from '../../types'

export const fetchNotifications = async (
  userAddress?: string,
  interval?: 'hour' | 'day' | 'week' | 'month' | 'all'
) => {
  if (!userAddress) return null

  const response = await fetch(`${EFP_API_URL}/users/${userAddress}/notifications?limit=1000&interval=${interval}`)
  const data = (await response.json()) as NotificationsResponse
  return data
}
