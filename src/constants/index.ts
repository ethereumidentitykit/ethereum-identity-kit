import { FollowersYouKnowResponse } from '../types'

export const EFP_API_URL = 'https://efp-testnet.up.railway.app/api/v1'
export const DEFAULT_FALLBACK_AVATAR = 'https://efp.app/assets/art/default-avatar.svg'
export const DEFAULT_FALLBACK_HEADER = 'https://efp.app/assets/art/default-header.svg'

export const DEFAULT_RECENT_TAGS = ['irl', 'bff', 'based', 'degen', 'top8']

export const DEFAULT_LOADING_GRADIENT =
  'linear-gradient(90deg, rgba(200, 200, 200, 0.7) 0%, rgba(172, 172, 172, 0.05) 50%, rgba(200, 200, 200, 0.7) 100%)'
export const LIGHT_LOADING_GRADIENT =
  'linear-gradient(90deg, rgba(212, 212, 212, 0.9) 0%, rgba(132, 132, 132, 0.2) 50%, rgba(212, 212, 212, 0.9) 100%)'

export const THEMES = ['light', 'dark'] as const

export const noFollowersYouKnow = {
  results: [],
  length: 0,
} satisfies FollowersYouKnowResponse

export const FETCH_LIMIT = 20

// Followers and following
export const SORT_OPTIONS = ['latest first', 'earliest first', 'follower count'] as const
export const QUERY_BLOCK_TAGS = ['block', 'mute']

// Notifications
export const NOTIFICATION_POSITIONS = ['top', 'bottom', 'left', 'right'] as const
export const NOTIFICATION_ALIGNS = ['left', 'center', 'right', 'top', 'bottom'] as const
export const NOTIFICATION_CENTER_VERTICAL = ['left', 'right']

export * from './abi'
export * from './time'
export * from './chains'
export * from './socials'
export * from './contracts'
export * from './transports'
export * from './transactions'
export * from './translations'
export * from './follow-button'
