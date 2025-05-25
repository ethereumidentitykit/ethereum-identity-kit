import { Meta } from '@storybook/react/*'
import { StoryFn } from '@storybook/react/*'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '../../constants/wagmi'
import { TransactionProvider } from '../../context'
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
            <TransactionProvider>
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

export const FollowersAndFollowingByAddress = Template.bind({})
FollowersAndFollowingByAddress.args = {
  user: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  defaultTab: 'followers',
  isLoading: false,
  isEndOfResults: false,
  isFetchingMore: false,
  results: [],
  fetchMore: () => {},
  canEditTags: false,
  tagsLoading: false,
  selectedTags: [],
}

export const FollowersAndFollowingByENSName = Template.bind({})
FollowersAndFollowingByENSName.args = {
  user: 'brantly.eth',
  defaultTab: 'followers',
  isLoading: false,
  isEndOfResults: false,
  isFetchingMore: false,
  results: [],
  fetchMore: () => {},
  canEditTags: false,
  tagsLoading: false,
  selectedTags: [],
}
