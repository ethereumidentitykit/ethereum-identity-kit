import { Address } from '../../../types/address'
import { ProfileListType, ProfileStatsClickProps } from '../../../types/profile'
import { FullWidthProfileOptions } from '../full-width-profile/FullWidthProfile.types'

type ProfileCardOptions = FullWidthProfileOptions & {
  followButton?: React.ReactNode
}

export type ProfileCardProps = {
  addressOrName: Address | string
  list?: ProfileListType
  connectedAddress?: Address
  darkMode?: boolean
  showFollowerState?: boolean
  showPoaps?: boolean
  showFollowButton?: boolean
  onProfileClick?: (addressOrName: Address | string) => void
  onStatClick?: ({ addressOrName, stat }: ProfileStatsClickProps) => void
  options?: ProfileCardOptions
  selectedList?: ProfileListType
  hasCommonFollowersModal?: boolean
} & React.HTMLAttributes<HTMLDivElement>
