import { Address, InitialFollowingState } from '../../types'
import { ProfileItemType } from '../profile-list/ProfileList.types'

export type ProfileListRowProps = {
  profile: ProfileItemType
  connectedAddress?: Address
  selectedList?: string
  tags?: string[]
  showTags?: boolean
  canEditTags?: boolean
  initialFollowState?: InitialFollowingState
}
