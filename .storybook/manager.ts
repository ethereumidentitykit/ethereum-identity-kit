import { addons } from 'storybook/manager-api'
import { defaultConfig, type TagBadgeParameters } from 'storybook-addon-tag-badges'
import eikTheme from './eik-theme'

addons.setConfig({
  theme: eikTheme,
  tagBadges: [
    {
      tags: 'thorin',
      badge: {
        text: 'Thorin',
        style: {
          backgroundColor: '#1e3a8a',
          color: '#dbeafe',
        },
        tooltip: 'Uses EthereumIdentityKitThorinProvider — opt-in ENS design system',
      },
    },
    {
      tags: 'slots',
      badge: {
        text: 'Slots',
        style: {
          backgroundColor: '#581c87',
          color: '#f3e8ff',
        },
        tooltip: 'Composable slot-based API (ProfileCard.*)',
      },
    },
    ...defaultConfig,
  ] satisfies TagBadgeParameters,
})
