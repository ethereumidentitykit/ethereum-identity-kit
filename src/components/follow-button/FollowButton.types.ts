import { Address, InitialFollowingState, FollowingState } from '../../types'

export type FollowButtonProps = {
  lookupAddress: Address
  connectedAddress?: Address
  onDisconnectedClick?: () => void
  disabled?: boolean
  sounds?: Record<FollowingState, string | undefined>
  customClassNames?: Record<FollowingState, string>
  customLoader?: React.ReactNode
  selectedList?: string
  initialState?: InitialFollowingState
} & React.HTMLAttributes<HTMLButtonElement>
