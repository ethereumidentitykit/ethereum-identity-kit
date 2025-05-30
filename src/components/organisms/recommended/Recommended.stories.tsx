import { Meta } from '@storybook/react/*'
import { StoryFn } from '@storybook/react/*'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '../../../constants/wagmi'
import { TransactionProvider } from '../../../context'
import TransactionModal from '../transaction-modal/TransactionModal'
import Recommended from './Recommended'

const queryClient = new QueryClient()

export default {
  title: 'Organisms/Recommended',
  component: Recommended,
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
} as Meta<typeof Recommended>

const Template: StoryFn<typeof Recommended> = (args) => <Recommended {...args} />

export const RecommendedAddresses = Template.bind({})
RecommendedAddresses.args = {
  connectedAddress: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  endpoint: 'recommended',
  listHeight: 'calc(100vh - 100px)',
  title: 'Recommended',
}

export const DiscoverAddresses = Template.bind({})
DiscoverAddresses.args = {
  connectedAddress: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  endpoint: 'discover',
  title: 'Discover',
}
