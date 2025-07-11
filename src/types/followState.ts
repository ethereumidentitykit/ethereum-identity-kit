import { Address } from './address'
import { ProfileListType } from './profile'

/**
 * Follow state indicating the relationship between two addresses
 */
export type FollowState = 'follows' | 'blocks' | 'mutes' | 'none'

/**
 * Type of follow state being queried
 */
export type FollowStatePropType = 'following' | 'follower'

export interface FollowStateProps {
  lookupAddressOrName: Address | string
  connectedAddress?: Address
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

/**
 * Following state for UI display and interaction
 * Includes both current states and pending/loading states
 */
export type FollowingState =
  | 'Block'
  | 'Blocked'
  | 'Follow'
  | 'Pending Following'
  | 'Following'
  | 'Unfollow'
  | 'Mute'
  | 'Muted'
  | 'Pending Block'
  | 'Pending Mute'
  | 'Unblock'
  | 'Unmute'

/**
 * Initial following state when component mounts
 */
export type InitialFollowingState = 'Follow' | 'Blocked' | 'Muted' | 'Following'
