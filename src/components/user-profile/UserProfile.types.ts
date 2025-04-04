import { ProfileListType, ProfileStatsClickProps, StatsResponse } from '../../types/profile'
import { Address, ProfileDetailsResponse } from '../../types'

export type UserProfileOptions = {
  followButton?: React.ReactNode
  nameMenu?: React.ReactNode
  profileData?: ProfileDetailsResponse
  prefetchedProfileLoading?: boolean
  refetchProfileData?: () => void
  statsData?: StatsResponse
  prefetchedStatsLoading?: boolean
  refetchStatsData?: () => void
  openListSettings?: () => void
}

export interface UserProfileProps {
  addressOrName: Address | string
  connectedAddress?: Address
  list?: ProfileListType
  role?: string
  selectedList?: string
  darkMode?: boolean
  showPoaps?: boolean
  showFollowerState?: boolean
  onProfileClick?: (addressOrName: Address | string) => void
  onStatClick?: ({ addressOrName, stat }: ProfileStatsClickProps) => void
  options?: UserProfileOptions
  className?: string
  style?: React.CSSProperties
  alignProfileContent?: 'center' | 'start' | 'end'
}
