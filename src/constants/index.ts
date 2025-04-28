import { FollowersYouKnowResponse } from '../types'

export const EFP_API_URL = 'https://data.ethfollow.xyz/api/v1'
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

export * from './socials'
export * from './chains'
export * from './contracts'
export * from './transactions'
export * from './abi'
export * from './follow-button'
export * from './transports'
