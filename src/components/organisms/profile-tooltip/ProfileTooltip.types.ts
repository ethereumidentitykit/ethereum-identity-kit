import type { ReactElement, HTMLAttributes } from 'react'
import { Address, ProfileListType, ProfileStatsClickProps } from '../../../types'
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
  showSocials?: boolean
  showEmptySocials?: boolean
  showBio?: boolean
  showStatus?: boolean
  onProfileClick?: (addressOrName: Address | string) => void
  onStatClick?: ({ addressOrName, stat }: ProfileStatsClickProps) => void
  extraOptions?: ProfileTooltipExtraOptions
  selectedList?: ProfileListType
} & HTMLAttributes<HTMLDivElement>

export type ProfileTooltipProps = ProfileCardProps

export interface ProfileTooltipWrapperProps extends ProfileTooltipProps {
  children: ReactElement
  verticalPlacement?: TooltipPlacement
  horizontalPlacement?: 'left' | 'right'
  verticalOffset?: number
  horizontalOffset?: number
  showArrow?: boolean
  showDelay?: number
  hideDelay?: number
  flipBehavior?: FlipBehavior
  boundary?: Boundary
  keepTooltipOnHover?: boolean
}
