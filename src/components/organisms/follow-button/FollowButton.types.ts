import { Address, InitialFollowingState, FollowingState, ProfileListType, ForceFollowingState } from '../../../types'

export type FollowButtonProps = {
  lookupAddress: Address
  connectedAddress?: Address
  customOnClick?: (state: FollowingState) => void
  onDisconnectedClick?: () => void
  disabled?: boolean
  sounds?: Record<FollowingState, string | undefined>
  customClassNames?: Record<FollowingState, string>
  customLoader?: React.ReactNode
  selectedList?: ProfileListType
  initialState?: InitialFollowingState
    forceState?: ForceFollowingState
  showBlockBack?: boolean
  showMuteBack?: boolean
} & React.HTMLAttributes<HTMLButtonElement>
