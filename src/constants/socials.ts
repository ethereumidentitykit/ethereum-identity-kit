import EtherscanIcon from '../assets/etherscan.png'
import GithubIcon from '../assets/github.png'
import TelegramIcon from '../assets/telegram.png'
import TwitterIcon from '../assets/twitter.png'
import DiscordIcon from '../assets/discord.png'

export const PROFILE_CARD_SOCIALS = [
  {
    name: 'etherscan',
    url: (address: string) => `https://etherscan.io/address/${address}`,
    icon: EtherscanIcon
  },
  {
    name: 'com.twitter',
    url: (username: string) => `https://twitter.com/${username}`,
    icon: TwitterIcon
  },
  {
    name: 'com.github',
    url: (username: string) => `https://github.com/${username}`,
    icon: GithubIcon
  },
  {
    name: 'org.telegram',
    url: (username: string) => `https://t.me/${username}`,
    icon: TelegramIcon
  },
  {
    name: 'com.discord',
    url: (username: string) => `https://discord.com/users/${username}`,
    icon: DiscordIcon
  }
] as const