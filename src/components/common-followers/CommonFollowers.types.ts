import { Address } from '../../types'

export type CommonFollowersProps = {
  connectedAddress: Address
  lookupAddressOrName: Address | string
  displayEmpty?: boolean
}
