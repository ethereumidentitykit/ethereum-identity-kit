import { Address, ProfileTabType } from '../../types'

export interface FollowersAndFollowingProps {
  user: string | Address
  defaultTab: ProfileTabType
  canEditTags?: boolean
  showTagsByDefault?: boolean
  excludeBlocked?: boolean
  isTopEight?: boolean
  showRecommendations?: boolean
  isConnectedUserProfile?: boolean
  darkMode?: boolean
  connectedAddress?: Address
  selectedList?: string
  onProfileClick?: (address: Address) => void
  showHeaderImage?: boolean
  rowHeight?: number
  preventDefaultScroll?: boolean
  useVirtualList?: boolean
}
