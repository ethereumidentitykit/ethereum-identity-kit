import { Meta } from '@storybook/react/*'
import { StoryFn } from '@storybook/react/*'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '../../../constants/wagmi'
import { TransactionProvider } from '../../../context'
import TransactionModal from '../transaction-modal/TransactionModal'
import FollowersAndFollowing from './FollowersAndFollowing'

const queryClient = new QueryClient()

export default {
  title: 'Organisms/Followers And Following Table',
  component: FollowersAndFollowing,
  decorators: [
    (Story) => {
      return (
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig}>
            <TransactionProvider batchTransactions={true}>
              {Story()}
              <TransactionModal />
            </TransactionProvider>
          </WagmiProvider>
        </QueryClientProvider>
      )
    },
  ],
} as Meta<typeof FollowersAndFollowing>

const Template: StoryFn<typeof FollowersAndFollowing> = (args) => <FollowersAndFollowing {...args} />

export const ByAddress = Template.bind({})
ByAddress.args = {
  user: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  defaultTab: 'following',
  showHeaderImage: true,
  onProfileClick: (address) => {
    window.alert(address)
  },
}

export const ByENSName = Template.bind({})
ByENSName.args = {
  user: 'brantly.eth',
  defaultTab: 'followers',
  showHeaderImage: true,
}

export const ConnectedUser = Template.bind({})
ConnectedUser.args = {
  user: 'brantly.eth',
  defaultTab: 'following',
  showHeaderImage: true,
  isConnectedUserProfile: true,
  onProfileClick: (address) => {
    window.alert(address)
  },
  connectedAddress: '0x983110309620d911731ac0932219af06091b6744',
}

export const ConnectedUserWithNoLists = Template.bind({})
ConnectedUserWithNoLists.args = {
  user: '0xBA47418cd3bD9214250d251b6aF4DaFD14C5d0D6',
  defaultTab: 'following',
  showHeaderImage: true,
  showRecommendations: true,
  isConnectedUserProfile: true,
  connectedAddress: '0xBA47418cd3bD9214250d251b6aF4DaFD14C5d0D6',
}

export const IncludeBlocked = Template.bind({})
IncludeBlocked.args = {
  user: 'garypalmerjr.eth',
  defaultTab: 'followers',
  showHeaderImage: true,
  showBlocked: true,
  showTagsByDefault: true,
}

export const IncludeBlockedAndOnlyBlocked = Template.bind({})
IncludeBlockedAndOnlyBlocked.args = {
  user: 'garypalmerjr.eth',
  defaultTab: 'followers',
  showHeaderImage: true,
  showBlocked: true,
  showOnlyBlocked: true,
}

export const ProfileTooltip = Template.bind({})
ProfileTooltip.args = {
  user: 'brantly.eth',
  defaultTab: 'following',
  showHeaderImage: true,
  showProfileTooltip: true,
}
