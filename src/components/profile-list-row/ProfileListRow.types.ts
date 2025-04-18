import { Address, InitialFollowingState, ProfileListType } from '../../types'
import { ProfileItemType } from '../profile-list/ProfileList.types'

export type ProfileListRowProps = {
  profile: ProfileItemType
  connectedAddress?: Address
  selectedList?: ProfileListType
  tags?: string[]
  showTags?: boolean
  canEditTags?: boolean
  initialFollowState?: InitialFollowingState
  onProfileClick?: (address: Address) => void
  showHeaderImage?: boolean
}
