import { Address, ENSProfile, InitialFollowingState, ProfileListType } from '../../types'

export type ProfileListProps = {
  profiles: ProfileItemType[]
  darkMode?: boolean
  connectedAddress?: Address
  selectedList?: ProfileListType
  isLoading?: boolean
  loadingRows?: number
  tags?: string[]
  showTags?: boolean
  canEditTags?: boolean
  initialFollowState?: InitialFollowingState
  onProfileClick?: (address: Address) => void
  showHeaderImage?: boolean
  rowHeight?: number
  visibleCount?: number
  overscanCount?: number
  listHeight?: string
}

export type ProfileItemType = {
  address: Address
  tags: string[]
  ens?: ENSProfile
}
