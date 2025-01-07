import EtherscanIcon from '../components/icons/socials/Etherscan'
import GithubIcon from '../components/icons/socials/Github'
import TelegramIcon from '../components/icons/socials/Telegram'
import XIcon from '../components/icons/socials/x'
import DiscordIcon from '../components/icons/socials/Discord'
import EtherscanDark from '../components/icons/socials/EtherscanDark'
import GithubDark from '../components/icons/socials/GithubDark'

export const PROFILE_CARD_SOCIALS = [
  {
    name: 'etherscan',
    url: (address: string) => `https://etherscan.io/address/${address}`,
    icon: {
      light: EtherscanIcon,
      dark: EtherscanDark,
    },
  },
  {
    name: 'com.twitter',
    url: (username: string) => `https://twitter.com/${username}`,
    icon: {
      light: XIcon,
      dark: XIcon,
    },
  },
  {
    name: 'com.github',
    url: (username: string) => `https://github.com/${username}`,
    icon: {
      light: GithubIcon,
      dark: GithubDark,
    },
  },
  {
    name: 'org.telegram',
    url: (username: string) => `https://t.me/${username}`,
    icon: {
      light: TelegramIcon,
      dark: TelegramIcon,
    },
  },
  {
    name: 'com.discord',
    url: (username: string) => `https://discord.com/users/${username}`,
    icon: {
      light: DiscordIcon,
      dark: DiscordIcon,
    },
  },
] as const
