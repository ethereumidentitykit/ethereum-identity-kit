import { THEMES } from '.'
import { FollowButtonState } from '../hooks/useFollowButton'

export const FOLLOW_BUTTON_STYLES: Record<FollowButtonState, string> = {
  Follow: 'follow-button-follow',
  Following: 'follow-button-following',
  Block: 'follow-button-block',
  Blocked: 'follow-button-blocked',
  Mute: 'follow-button-mute',
  Muted: 'follow-button-muted',
}

export const FOLLOW_BUTTON_COOL_EMOJI: Record<
  FollowButtonState,
  Record<(typeof THEMES)[number], string | undefined>
> = {
  Follow: {
    light: '/assets/logo.png',
    dark: '/assets/logo.png',
  },
  Following: {
    light: '/assets/icons/unfollow-emoji.png',
    dark: '/assets/icons/unfollow-emoji.png',
  },
  Block: {
    light: '/assets/icons/block-emoji.png',
    dark: '/assets/icons/block-emoji.png',
  },
  Blocked: {
    light: undefined,
    dark: undefined,
  },
  Mute: {
    light: '/assets/icons/mute-emoji.png',
    dark: '/assets/icons/mute-emoji.png',
  },
  Muted: {
    light: undefined,
    dark: undefined,
  },
}
