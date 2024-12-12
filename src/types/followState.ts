import { Address } from "./address"
import { ProfileListType } from "./profile"

export type FollowState = 'follows' | 'blocks' | 'mutes' | 'none'

export type FollowStatePropType = 'following' | 'follower'

export interface FollowStateProps {
  lookupAddressOrName: Address | string
  connectedAddress: Address
  list?: ProfileListType
  type: FollowStatePropType
  fresh?: boolean
}

export interface FollowStatusResponse {
  token_id?: string
  address?: Address
  state: {
    follow: boolean
    block: boolean
    mute: boolean
  }
}