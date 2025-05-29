import { Meta } from '@storybook/react/*'
import { StoryFn } from '@storybook/react/*'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CommonFollowers from './FollowersYouKnow'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '../../../constants/wagmi'
import { TransactionProvider } from '../../../context'
import TransactionModal from '../../organisms/transaction-modal/TransactionModal'

const queryClient = new QueryClient()

export default {
  title: 'Molecules/Followers you know',
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

export const ByAddress = Template.bind({})
ByAddress.args = {
  connectedAddress: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  lookupAddressOrName: '0x983110309620d911731ac0932219af06091b6744',
  hasModal: true,
  onProfileClick: (address) => {
    alert(address)
  },
  darkMode: false,
}

export const ByENSName = Template.bind({})
ByENSName.args = {
  connectedAddress: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  lookupAddressOrName: 'brantly.eth',
}
