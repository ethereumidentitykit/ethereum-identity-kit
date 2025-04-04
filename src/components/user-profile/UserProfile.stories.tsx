import { StoryFn, Meta } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserProfile from './UserProfile'
import { Address } from '../../types/address'

const queryClient = new QueryClient()

const onProfileClick = (addressOrName: Address | string) => {
  alert(addressOrName)
}

export default {
  title: 'Organisms/User Profile',
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
        <div style={{ padding: '0px', fontFamily: 'Inter, sans-serif' }}>{Story()}</div>
      </QueryClientProvider>
    ),
  ],
} as Meta<typeof UserProfile>

const Template: StoryFn<typeof UserProfile> = (args) => <UserProfile {...args} />

export const ProfileCardByAddress = Template.bind({})
ProfileCardByAddress.args = {
  addressOrName: '0x983110309620d911731ac0932219af06091b6744',
  showFollowerState: true,
  darkMode: false,
  onProfileClick,
  connectedAddress: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  alignProfileContent: 'center',
  role: 'Frontend developer',

  // options: {
  //   followButton: <button style={{
  //     backgroundColor: '#ffE060',
  //     color: '#000',
  //     width: '110px',
  //     height: '37px',
  //     borderRadius: '4px',
  //     border: 'none',
  //     cursor: 'pointer',
  //   }}>Follow</button>,
  // },
}

export const ProfileCardByENS = Template.bind({})
ProfileCardByENS.args = {
  addressOrName: 'encrypteddegen.eth',
  showFollowerState: true,
  darkMode: false,
  onProfileClick,
  style: {
    paddingBottom: '120px',
  },
}

export const ProfileCardByList = Template.bind({})
ProfileCardByList.args = {
  addressOrName: '',
  list: '5',
  showFollowerState: true,
  darkMode: false,
  onProfileClick,
}

export const ProfileCardPrefetched = Template.bind({})
ProfileCardPrefetched.args = {
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
