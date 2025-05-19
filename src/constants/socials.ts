import { Etherscan, Github, Telegram, X, Discord, GithubDark, EtherscanDark, Email } from '../components/icons'

export const PROFILE_CARD_SOCIALS = [
  {
    name: 'etherscan',
    url: (address: string) => `https://etherscan.io/address/${address}`,
    icon: {
      light: Etherscan,
      dark: EtherscanDark,
    },
  },
  {
    name: 'com.twitter',
    url: (username: string) => `https://twitter.com/${username}`,
    icon: {
      light: X,
      dark: X,
    },
  },
  {
    name: 'com.github',
    url: (username: string) => `https://github.com/${username}`,
    icon: {
      light: Github,
      dark: GithubDark,
    },
  },
  {
    name: 'org.telegram',
    url: (username: string) => `https://t.me/${username}`,
    icon: {
      light: Telegram,
      dark: Telegram,
    },
  },
  {
    name: 'com.discord',
    url: (username: string) => `https://discord.com/users/${username}`,
    icon: {
      light: Discord,
      dark: Discord,
    },
  },
  {
    name: 'email',
    url: (email: string) => `mailto:${email}`,
    icon: {
      light: Email,
      dark: Email,
    },
  },
] as const
