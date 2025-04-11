import { Address } from '../../types/address'
import { ProfileListType, ProfileStatsClickProps } from '../../types/profile'
import { UserProfileOptions } from '../user-profile/UserProfile.types'

type ProfileCardOptions = UserProfileOptions & {
  followButton?: React.ReactNode
}

export type ProfileCardProps = {
  addressOrName: Address | string
  list?: ProfileListType
  connectedAddress?: Address
  darkMode?: boolean
  showFollowerState?: boolean
  showPoaps?: boolean
  onProfileClick?: (addressOrName: Address | string) => void
  onStatClick?: ({ addressOrName, stat }: ProfileStatsClickProps) => void
  options?: ProfileCardOptions
  selectedList?: ProfileListType
  hasCommonFollowersModal?: boolean
} & React.HTMLAttributes<HTMLDivElement>
