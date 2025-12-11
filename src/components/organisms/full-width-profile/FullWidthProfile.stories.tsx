import { WagmiProvider } from 'wagmi'
import { StoryFn, Meta } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TransactionProvider } from '../../../context'
import TransactionModal from '../transaction-modal/TransactionModal'
import { wagmiConfig } from '../../../constants/wagmi'
import { Address } from '../../../types/address'
import FullWidthProfile from './FullWidthProfile'

const queryClient = new QueryClient()

const onProfileClick = (addressOrName: Address | string) => {
  alert(addressOrName)
}

export default {
  title: 'Organisms/Full Width Profile',
  component: FullWidthProfile,
  argTypes: {
    addressOrName: {
      control: 'text',
      type: 'string',
    },
    alignProfileContent: {
      control: 'select',
      options: ['center', 'start', 'end'],
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <TransactionProvider>
            <div style={{ padding: '0px', fontFamily: 'Inter, sans-serif' }}>{Story()}</div>
            <TransactionModal />
          </TransactionProvider>
        </WagmiProvider>
      </QueryClientProvider>
    ),
  ],
} as Meta<typeof FullWidthProfile>

const Template: StoryFn<typeof FullWidthProfile> = (args) => <FullWidthProfile {...args} />

export const ByAddress = Template.bind({})
ByAddress.args = {
  addressOrName: '0x983110309620d911731ac0932219af06091b6744',
  showFollowerState: true,
  darkMode: false,
  onProfileClick,
  connectedAddress: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  alignProfileContent: 'center',
  showPoaps: true,
  showFollowButton: false,
  showEmptySocials: true,
  extraOptions: {
    customPoaps: [
      {
        eventId: '7538953',
        participated: true,
        collection: {
          event: {
            id: 7538953,
            fancy_id: '7538953',
            name: 'Grails ENS Market Early 2025',
            event_url: 'https://collectors.poap.xyz/token/7538953',
            image_url: 'https://assets.poap.xyz/585f0404-49e0-443f-a805-184c5ae76b7b.png?size=xlarge',
            country: '',
            city: '',
            description: "You were an early user of the Grails ENS Market in 2025 - you're officially an OG.",
            year: 2025,
            start_date: '2025-01-01',
            end_date: '2025-01-01',
            expiry_date: '2025-01-01',
          },
          tokenId: '7538953',
          owner: '0x...',
        },
      },
    ],
  },
}

export const ByENSName = Template.bind({})
ByENSName.args = {
  addressOrName: 'encrypteddegen.eth',
  showFollowerState: true,
  darkMode: false,
  onProfileClick,
  style: {
    paddingBottom: '120px',
  },
  extraOptions: {
    role: 'Frontend developer',
  },
  showPoaps: true,
  showEmptySocials: true,
  showFollowButton: false,
}

export const ByList = Template.bind({})
ByList.args = {
  addressOrName: '0x983110309620d911731ac0932219af06091b6744',
  list: '5',
  showFollowerState: true,
  darkMode: false,
  onProfileClick,
  showPoaps: false,
  showEmptySocials: true,
  showFollowButton: false,
}

export const PrefetchedData = Template.bind({})
PrefetchedData.args = {
  addressOrName: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  showFollowerState: true,
  extraOptions: {
    prefetched: {
      profile: {
        data: {
          address: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
          ens: {
            name: 'encrypteddegen.eth',
            avatar: 'https://euc.li/encrypteddegen.eth',
            records: {
              avatar: 'https://euc.li/encrypteddegen.eth',
              'com.discord': 'encrypteddegen.eth',
              'com.github': 'encryptedDegen',
              'com.twitter': 'ZunecJan',
              description: 'UI/UX Designer & Developer | Building the web3 social graph @efp.eth',
              header: 'https://i.imgur.com/pWYMFBn.jpeg',
              'org.telegram': 'encrypteddegen',
              url: 'https://efp.app',
            },
          },
          ranks: {
            mutuals_rank: 270,
            followers_rank: 119,
            following_rank: 694,
            top8_rank: 133,
            blocks_rank: 0,
          },
          primary_list: '1',
        },
        isLoading: false,
        refetch: () => {},
      },
      stats: {
        data: {
          followers_count: 100,
          following_count: 100,
        },
        isLoading: false,
        refetch: () => {},
      },
    },
  },
  onProfileClick,
  showPoaps: true,
  showEmptySocials: true,
  showFollowButton: false,
}
