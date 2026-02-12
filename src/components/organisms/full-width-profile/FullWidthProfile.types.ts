import { Address, ProfileDetailsResponse } from '../../../types'
import {
  ProfileEFPPoapResponse,
  ProfileEFPSocialType,
  ProfileListType,
  ProfileStatsClickProps,
  StatsResponse,
} from '../../../types/profile'

export type ProfileExtraOptions = {
  role?: string
  customFollowButton?: React.ReactNode
  nameMenu?: React.ReactNode
  openListSettings?: () => void
  onEditProfileClick?: () => void
  prefetched?: {
    profile: {
      data: ProfileDetailsResponse | undefined
      isLoading: boolean
      refetch: () => void
    }
    stats: {
      data: StatsResponse | undefined
      isLoading: boolean
      refetch: () => void
    }
  }
  customPoaps?: ProfileEFPPoapResponse[]
  hideEFPPoaps?: boolean
  hideSocials?: ProfileEFPSocialType[]
}

export interface FullWidthProfileProps {
  addressOrName: Address | string
  connectedAddress?: Address
  list?: ProfileListType
  selectedList?: string
  darkMode?: boolean
  showPoaps?: boolean
  showFollowerState?: boolean
  showFollowButton?: boolean
  showEmptySocials?: boolean
  onProfileClick?: (addressOrName: Address | string) => void
  onStatClick?: ({ addressOrName, stat }: ProfileStatsClickProps) => void
  extraOptions?: ProfileExtraOptions
  className?: string
  style?: React.CSSProperties
  alignProfileContent?: 'center' | 'start' | 'end'
}
