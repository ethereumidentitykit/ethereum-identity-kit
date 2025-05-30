import { Address, ProfileListType } from '../../../types'

export type FollowersYouKnowProps = {
  connectedAddress: Address
  lookupAddressOrName: Address | string
  displayEmpty?: boolean
  onProfileClick?: (address: Address) => void
  hasModal?: boolean
  darkMode?: boolean
  selectedList?: ProfileListType
}
