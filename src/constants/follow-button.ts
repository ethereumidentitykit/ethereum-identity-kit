import { FollowingState } from '../types'

export const FOLLOW_BUTTON_STYLES: Record<FollowingState, string> = {
  Follow: 'follow-button-follow',
  Following: 'follow-button-following',
  Block: 'follow-button-block',
  Blocked: 'follow-button-blocked',
  Mute: 'follow-button-mute',
  Muted: 'follow-button-muted',
  'Pending Following': 'follow-button-pending',
  Unfollow: 'follow-button-unfollow',
  'Pending Block': 'follow-button-pending',
  'Pending Mute': 'follow-button-pending',
  Unblock: 'follow-button-unblock',
  Unmute: 'follow-button-unmute',
}

export const FOLLOW_BUTTON_COOL_EMOJI: Record<FollowingState, string | undefined> = {
  Follow: '/assets/logo-efp.png',
  Following: '/assets/icons/unfollow.png',
  Block: '/assets/icons/block.png',
  Blocked: undefined,
  Mute: '/assets/icons/mute.png',
  Muted: undefined,
  'Pending Following': undefined,
  Unfollow: undefined,
  'Pending Block': undefined,
  'Pending Mute': undefined,
  Unblock: undefined,
  Unmute: undefined,
}
