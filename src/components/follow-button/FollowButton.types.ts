import { Address, FollowingState } from '../../types'

export type FollowButtonProps = {
  lookupAddress: Address
  connectedAddress?: Address
  onDisconnectedClick?: () => void
  disabled?: boolean
  sounds?: Record<FollowingState, string | undefined>
  customLoader?: React.ReactNode
  selectedList?: string
} & React.HTMLAttributes<HTMLButtonElement>
