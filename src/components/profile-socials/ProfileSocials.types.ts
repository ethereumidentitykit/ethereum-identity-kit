import { Address } from '../../types/address'
import type { ProfileDetailsResponse } from '../../types/profile'

export interface ProfileSocialsProps {
  name?: string
  userAddress: Address
  records: ProfileDetailsResponse['ens']['records']
  iconSize?: number
  isLoading?: boolean
}
