import { Address } from '../../../types/address'
import { ProfileListType, ProfileStatsClickProps } from '../../../types/profile'
import { ProfileExtraOptions } from '../full-width-profile/FullWidthProfile.types'

export type ProfileCardProps = {
  addressOrName: Address | string
  list?: ProfileListType
  connectedAddress?: Address
  darkMode?: boolean
  showFollowerState?: boolean
  showPoaps?: boolean
  showFollowButton?: boolean
  showEmptySocials?: boolean
  onProfileClick?: (addressOrName: Address | string) => void
  onStatClick?: ({ addressOrName, stat }: ProfileStatsClickProps) => void
  extraOptions?: ProfileExtraOptions
  selectedList?: ProfileListType
  hasCommonFollowersModal?: boolean
} & React.HTMLAttributes<HTMLDivElement>
