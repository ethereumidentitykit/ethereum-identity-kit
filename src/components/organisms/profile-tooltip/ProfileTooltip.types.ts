import { Address } from '../../../types/address'
import { ProfileListType } from '../../../types/profile'
import { ProfileExtraOptions } from '../full-width-profile/FullWidthProfile.types'
import { Boundary, FlipBehavior, TooltipPlacement } from '../../../hooks/useTooltipPosition'

export type ProfileTooltipExtraOptions = ProfileExtraOptions

export type ProfileCardProps = {
  addressOrName: Address | string
  list?: ProfileListType
  connectedAddress?: Address
  darkMode?: boolean
  showFollowerState?: boolean
  showFollowButton?: boolean
  showPoaps?: boolean
  showEmptySocials?: boolean
  onProfileClick?: (addressOrName: Address | string) => void
  onStatClick?: (stat: 'followers' | 'following', event?: React.MouseEvent) => void
  extraOptions?: ProfileTooltipExtraOptions
  selectedList?: ProfileListType
  hasCommonFollowersModal?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export type ProfileTooltipProps = ProfileCardProps

export interface ProfileTooltipWrapperProps extends ProfileTooltipProps {
  children: React.ReactElement
  verticalPlacement?: TooltipPlacement
  horizontalPlacement?: 'left' | 'right'
  offset?: number
  showArrow?: boolean
  showDelay?: number
  hideDelay?: number
  flipBehavior?: FlipBehavior
  boundary?: Boundary
  keepTooltipOnHover?: boolean
}
