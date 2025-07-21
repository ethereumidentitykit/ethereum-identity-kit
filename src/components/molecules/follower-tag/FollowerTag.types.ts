import { Address, ProfileListType } from '../../../types'

export type FollowerTagProps = {
  lookupAddressOrName: Address | string
  connectedAddress: Address
  list?: ProfileListType
  showLoading?: boolean
} & React.HTMLAttributes<HTMLDivElement>
