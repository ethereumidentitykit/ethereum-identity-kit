import { FollowingState } from '../types'

export const FOLLOW_BUTTON_STYLES: Record<FollowingState, string> = {
  Follow: 'follow-button-follow',
  Following: 'follow-button-following',
  Block: 'follow-button-block',
  'Block Back': 'follow-button-block',
  Blocked: 'follow-button-blocked',
  Mute: 'follow-button-mute',
  'Mute Back': 'follow-button-mute',
  Muted: 'follow-button-muted',
  'Pending Following': 'follow-button-pending',
  Unfollow: 'follow-button-unfollow',
  'Pending Block': 'follow-button-blocked',
  'Pending Mute': 'follow-button-muted',
  Unblock: 'follow-button-unblock',
  Unmute: 'follow-button-unmute',
}

export const FOLLOW_BUTTON_COOL_EMOJI: Record<FollowingState, string | undefined> = {
  Follow: 'https://efp.app/assets/logo.png',
  Following: 'https://efp.app/assets/icons/emojis/unfollow-emoji.svg',
  Block: 'https://efp.app/assets/icons/emojis/block-emoji.svg',
  'Block Back': 'https://efp.app/assets/icons/emojis/block-emoji.svg',
  Blocked: undefined,
  Mute: 'https://efp.app/assets/icons/emojis/mute-emoji.svg',
  'Mute Back': 'https://efp.app/assets/icons/emojis/mute-emoji.svg',
  Muted: undefined,
  'Pending Following': undefined,
  Unfollow: undefined,
  'Pending Block': undefined,
  'Pending Mute': undefined,
  Unblock: undefined,
  Unmute: undefined,
}
