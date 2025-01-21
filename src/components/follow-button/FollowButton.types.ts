import { Address } from '../../types'

export type FollowButtonProps = {
  lookupAddress: Address
  connectedAddress?: Address
  onDisconnectedClick?: () => void
  disabled?: boolean
  customLoader?: React.ReactNode
} & React.HTMLAttributes<HTMLButtonElement>
