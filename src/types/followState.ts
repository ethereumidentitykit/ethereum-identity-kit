import { Address } from "./address"

export type FollowState = 'follows' | 'blocks' | 'mutes' | 'none'

export type FollowStatePropType = 'following' | 'follower'

export interface FollowStateProps {
  lookupAddress: Address
  userAddress?: Address
  list?: string | number
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