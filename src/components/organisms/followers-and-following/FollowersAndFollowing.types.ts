import { Address, ProfileTabType } from '../../../types'

export interface FollowersAndFollowingProps {
  user: string | Address
  defaultTab: ProfileTabType
  canEditTags?: boolean
  showTagsByDefault?: boolean
  includeBlocked?: boolean
  showRecommendations?: boolean
  isConnectedUserProfile?: boolean
  darkMode?: boolean
  connectedAddress?: Address
  selectedList?: string
  onProfileClick?: (address: Address) => void
  showHeaderImage?: boolean
  useVirtualList?: boolean
  rowHeight?: number
  preventDefaultScroll?: boolean
}
