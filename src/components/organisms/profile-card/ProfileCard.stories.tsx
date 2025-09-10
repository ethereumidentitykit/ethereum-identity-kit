import { StoryFn, Meta } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProfileCard from './ProfileCard'
import { Address } from '../../../types'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '../../../constants/wagmi'
import { TransactionProvider } from '../../../context'
import TransactionModal from '../transaction-modal/TransactionModal'

const queryClient = new QueryClient()

const onProfileClick = (addressOrName: Address | string) => {
  alert(addressOrName)
}

export default {
  title: 'Organisms/Profile Card',
  component: ProfileCard,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <TransactionProvider>
            <div style={{ padding: '20px', backgroundColor: '#AAAAAA' }}>{Story()}</div>
            <TransactionModal />
          </TransactionProvider>
        </WagmiProvider>
      </QueryClientProvider>
    ),
  ],
} as Meta<typeof ProfileCard>

const Template: StoryFn<typeof ProfileCard> = (args) => <ProfileCard {...args} />

export const ByAddress = Template.bind({})
ByAddress.args = {
  addressOrName: '0x983110309620d911731ac0932219af06091b6744',
  connectedAddress: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  showFollowerState: true,
  style: {
    width: '400px',
  },
  darkMode: false,
  onProfileClick,
  showEmptySocials: false,
  showFollowButton: false,
  hasCommonFollowersModal: true,
}

export const ByENS = Template.bind({})
ByENS.args = {
  addressOrName: 'encrypteddegen.eth',
  connectedAddress: '0x983110309620d911731ac0932219af06091b6744',
  showFollowerState: true,
  style: {
    width: '400px',
  },
  darkMode: false,
  onProfileClick,
  showEmptySocials: true,
  showFollowButton: false,
  hasCommonFollowersModal: true,
}

export const ByList = Template.bind({})
ByList.args = {
  addressOrName: '',
  list: '5',
  connectedAddress: '0x983110309620d911731ac0932219af06091b6744',
  showFollowerState: true,
  darkMode: false,
  onProfileClick,
  showEmptySocials: true,
  showFollowButton: false,
  hasCommonFollowersModal: true,
}

export const PrefetchedData = Template.bind({})
PrefetchedData.args = {
  addressOrName: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  connectedAddress: '0x983110309620d911731ac0932219af06091b6744',
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
              url: 'https://encrypteddegensomethingsomething.eth',
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
  showEmptySocials: true,
  showFollowButton: false,
  hasCommonFollowersModal: true,
}
