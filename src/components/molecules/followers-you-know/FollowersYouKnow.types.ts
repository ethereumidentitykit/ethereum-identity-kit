import { Address, ProfileListType } from '../../../types'

export type FollowersYouKnowProps = {
  connectedAddress: Address
  selectedList?: ProfileListType
  lookupAddressOrName: Address | string
  onProfileClick?: (address: Address) => void
  hasModal?: boolean
  showEmpty?: boolean
  showLoading?: boolean
  darkMode?: boolean
}
