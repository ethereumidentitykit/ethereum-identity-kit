import { Meta } from '@storybook/react/*'
import { StoryFn } from '@storybook/react/*'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '../../../constants/wagmi'
import { TransactionProvider } from '../../../context'
import ProfileList from './ProfileList'

const queryClient = new QueryClient()

export default {
  title: 'Molecules/Profile List',
  component: ProfileList,
  decorators: [
    (Story) => {
      return (
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig}>
            <TransactionProvider batchTransactions={true}>{Story()}</TransactionProvider>
          </WagmiProvider>
        </QueryClientProvider>
      )
    },
  ],
} as Meta<typeof ProfileList>

const Template: StoryFn<typeof ProfileList> = (args) => <ProfileList {...args} />

export const ByAddress = Template.bind({})
ByAddress.args = {
  profiles: [
    {
      address: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
      tags: [],
    },
    {
      address: '0x983110309620d911731ac0932219af06091b6744',
      tags: [],
    },
    {
      address: '0x111111176b0b13ffc31d387d08726772a0492948',
      tags: [],
    },
    {
      address: '0xe2cded674643743ec1316858dfd4fd2116932e63',
      tags: [],
    },
    {
      address: '0x34ab2a3c4b2ae1c940e5e307f22eb92e47906e28',
      tags: [],
    },
    {
      address: '0xc9c3a4337a1bba75d0860a1a81f7b990dc607334',
      tags: [],
    },
    {
      address: '0xa8b4756959e1192042fc2a8a103dfe2bddf128e8',
      tags: [],
    },
  ],
  showHeaderImage: true,
  onProfileClick: (address) => {
    window.alert(address)
  },
}

export const ProfilesWithTags = Template.bind({})
ProfilesWithTags.args = {
  profiles: [
    {
      address: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
      tags: ['EthID Org', 'Developer'],
    },
    {
      address: '0x983110309620d911731ac0932219af06091b6744',
      tags: ['EthID Org', 'Founder'],
    },
    {
      address: '0x111111176b0b13ffc31d387d08726772a0492948',
      tags: ['ENS collector'],
    },
  ],
  showTags: true,
  tags: ['EthID Org', 'Developer'],
  showHeaderImage: true,
}
