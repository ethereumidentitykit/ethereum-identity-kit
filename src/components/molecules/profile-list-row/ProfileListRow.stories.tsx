import { Meta } from '@storybook/react/*'
import { StoryFn } from '@storybook/react/*'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '../../../constants/wagmi'
import { TransactionProvider } from '../../../context'
import ProfileListRow from './ProfileListRow'

const queryClient = new QueryClient()

export default {
  title: 'Molecules/Profile List Row',
  component: ProfileListRow,
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
} as Meta<typeof ProfileListRow>

const Template: StoryFn<typeof ProfileListRow> = (args) => <ProfileListRow {...args} />

export const PlainProfile = Template.bind({})
PlainProfile.args = {
  profile: {
    address: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
    tags: [],
  },
  showHeaderImage: true,
  onProfileClick: (address) => {
    window.alert(address)
  },
}

export const ProfileWithTags = Template.bind({})
ProfileWithTags.args = {
  profile: {
    address: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
    tags: [],
  },
  showTags: true,
  tags: ['EthID Org', 'Developer'],
  showHeaderImage: true,
}
