import { Meta } from '@storybook/react/*'
import { StoryFn } from '@storybook/react/*'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Notifications from './Notifications'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '../../constants/wagmi'
import { TransactionProvider } from '../../context'
import TransactionModal from '../transaction-modal/TransactionModal'

const queryClient = new QueryClient()

export default {
  title: 'Organisms/Notifications',
  component: Notifications,
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
} as Meta<typeof Notifications>

const Template: StoryFn<typeof Notifications> = (args) => <Notifications {...args} />

export const NotificationsByAddress = Template.bind({})
NotificationsByAddress.args = {
  addressOrName: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  onClose: () => {
    console.log('Notifications closed')
  },
}

export const NotificationsByENSName = Template.bind({})
NotificationsByENSName.args = {
  addressOrName: 'brantly.eth',
  onClose: () => {
    console.log('Notifications closed')
  },
}