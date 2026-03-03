import type { BatchFollowStateProps, BatchFollowStateResponse } from '../../types/followState'
import { EFP_API_URL } from '../../constants'

export const fetchBatchFollowState = async ({
  lookupAddressesOrNames,
  list,
}: BatchFollowStateProps) => {
  try {
    if (!list) return null

    const url = `${EFP_API_URL}/lists/${list}/buttonStateBatch`

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(lookupAddressesOrNames),
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    const data = (await response.json()) as BatchFollowStateResponse
    return data
  } catch (err: unknown) {
    console.error(err)
    return null
  }
}
