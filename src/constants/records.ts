import { Discord, Github, Telegram, X } from '../components'

export const TEXT_RECORD_KEYS = [
  'description',
  'status',
  'location',
  'url',
  'email',
  'com.twitter',
  'com.github',
  'org.telegram',
  'com.discord',
  'avatar',
  'header',
] as const

export const ADDRESS_RECORD_KEYS = ['btc'] as const

export const COIN_TYPES: Record<string, number> = {
  btc: 0,
  sol: 501,
  doge: 3,
}

export const SOCIAL_RECORDS = [
  {
    key: 'com.twitter',
    label: 'Twitter / X',
    icon: {
      light: X,
      dark: X,
    },
    placeholder: 'username',
  },
  {
    key: 'com.github',
    label: 'GitHub',
    icon: {
      light: Github,
      dark: Github,
    },
    placeholder: 'username',
  },
  {
    key: 'org.telegram',
    label: 'Telegram',
    icon: {
      light: Telegram,
      dark: Telegram,
    },
    placeholder: 'username',
  },
  {
    key: 'com.discord',
    label: 'Discord',
    icon: {
      light: Discord,
      dark: Discord,
    },
    placeholder: 'username',
  },
] as const

export const ADDRESS_LABELS: Record<string, string> = {
  btc: 'BTC',
  // sol: 'SOL',
  // doge: 'DOGE',
}
