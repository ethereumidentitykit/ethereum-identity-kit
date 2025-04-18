import { Meta } from '@storybook/react/*'
import { StoryFn } from '@storybook/react/*'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CommonFollowers from './CommonFollowers'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '../../constants/wagmi'
import { TransactionProvider } from '../../context'
import TransactionModal from '../transaction-modal/TransactionModal'

const queryClient = new QueryClient()

export default {
  title: 'Molecules/Friends who follow them',
  component: CommonFollowers,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <TransactionProvider>
            {Story()}
            <TransactionModal />
          </TransactionProvider>
        </WagmiProvider>
      </QueryClientProvider>
    ),
  ],
} as Meta<typeof CommonFollowers>

const Template: StoryFn<typeof CommonFollowers> = (args) => <CommonFollowers {...args} />

export const FriendsWhoFollowThem = Template.bind({})
FriendsWhoFollowThem.args = {
  connectedAddress: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  lookupAddressOrName: '0x983110309620d911731ac0932219af06091b6744',
  hasModal: true,
  onProfileClick: (address) => {
    alert(address)
  },
  darkMode: false,
}
