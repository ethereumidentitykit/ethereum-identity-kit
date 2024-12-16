import { StoryFn, Meta } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProfileCard from './ProfileCard'

const queryClient = new QueryClient()

export default {
  title: 'Organisms/Profile Card',
  component: ProfileCard,
  decorators: [(Story) => <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>],
} as Meta<typeof ProfileCard>

const Template: StoryFn<typeof ProfileCard> = (args) => <ProfileCard {...args} />

export const ProfileCardByAddress = Template.bind({})
ProfileCardByAddress.args = {
  addressOrName: '0x983110309620d911731ac0932219af06091b6744',
  connectedAddress: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  showFollowerState: true,
  style: {
    width: '300px',
  },
  darkMode: false,
}

export const ProfileCardByENS = Template.bind({})
ProfileCardByENS.args = {
  addressOrName: 'encrypteddegen.eth',
  connectedAddress: '0x983110309620d911731ac0932219af06091b6744',
  showFollowerState: true,
  style: {
    width: '300px',
  },
  darkMode: false,
}

export const ProfileCardByList = Template.bind({})
ProfileCardByList.args = {
  addressOrName: '0x5B0f3DBdD49614476e4f5fF5Db6fe13d41fCB516',
  connectedAddress: '0x983110309620d911731ac0932219af06091b6744',
  list: '5',
  showFollowerState: true,
  style: {
    width: '300px',
  },
  darkMode: false,
}

export const ProfileCardPrefetched = Template.bind({})
ProfileCardPrefetched.args = {
  addressOrName: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  connectedAddress: '0x983110309620d911731ac0932219af06091b6744',
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
}
