import { Address, ENSProfile, InitialFollowingState, ProfileListType } from '../../../types'

export type ProfileListProps = {
  profiles: ProfileItemType[]
  connectedAddress?: Address
  selectedList?: ProfileListType
  isLoading?: boolean
  loadingRows?: number
  tags?: string[]
  darkMode?: boolean
  showTags?: boolean
  canEditTags?: boolean
  initialFollowState?: InitialFollowingState
  onProfileClick?: (address: Address) => void
  showHeaderImage?: boolean
  rowHeight?: number
  visibleCount?: number
  overscanCount?: number
  listHeight?: string
  showFollowsYouBadges?: boolean
  loadMoreElement?: React.ReactNode
  useVirtualList?: boolean
  showBlockBack?: boolean
  showProfileTooltip?: boolean
}

export type ProfileItemType = {
  address: Address
  tags: string[]
  ens?: ENSProfile
}
