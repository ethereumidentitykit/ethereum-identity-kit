import { StoryFn, Meta } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserProfile from './UserProfile'
import { Address } from '../../types/address'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '../../constants/wagmi'
import { TransactionProvider } from '../../context'
import TransactionModal from '../transaction-modal/TransactionModal'

const queryClient = new QueryClient()

const onProfileClick = (addressOrName: Address | string) => {
  alert(addressOrName)
}

export default {
  title: 'Organisms/Full width Profile Card',
  component: UserProfile,
  argTypes: {
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
} as Meta<typeof UserProfile>

const Template: StoryFn<typeof UserProfile> = (args) => <UserProfile {...args} />

export const FullWidthProfileCardByAddress = Template.bind({})
FullWidthProfileCardByAddress.args = {
  addressOrName: '0x983110309620d911731ac0932219af06091b6744',
  showFollowerState: true,
  darkMode: false,
  onProfileClick,
  connectedAddress: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  alignProfileContent: 'center',
}

export const FullWidthProfileCardByENS = Template.bind({})
FullWidthProfileCardByENS.args = {
  addressOrName: 'encrypteddegen.eth',
  showFollowerState: true,
  darkMode: false,
  onProfileClick,
  style: {
    paddingBottom: '120px',
  },
  role: 'Frontend developer',
}

export const FullWidthProfileCardByList = Template.bind({})
FullWidthProfileCardByList.args = {
  addressOrName: '',
  list: '5',
  showFollowerState: true,
  darkMode: false,
  onProfileClick,
}

export const FullWidthProfileCardPrefetched = Template.bind({})
FullWidthProfileCardPrefetched.args = {
  addressOrName: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  showFollowerState: true,
  options: {
    profileData: {
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
  },
  onProfileClick,
}
