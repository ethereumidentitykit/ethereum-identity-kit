import { StoryFn, Meta } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAccount, useConnect, WagmiProvider } from 'wagmi'
import FollowButton from './FollowButton'
import { config } from '../../constants/wagmi'
import { FollowButtonProps } from './FollowButton.types'
import TransactionModal from '../transaction-modal/TransactionModal'
import { TransactionProvider } from '../../context/transactionContext'

const queryClient = new QueryClient()

const FollowButtonWrapper = (args: FollowButtonProps) => {
  const { address: connectedAddress } = useAccount()
  const { connect, connectors } = useConnect()

  return (
    <div style={{ height: '50vh' }}>
      <div>
        {!connectedAddress && (
          <div>
            <p>Connect to a wallet to follow</p>
            {connectors.map((connector) => (
              <button key={connector.uid} onClick={() => connect({ connector })}>
                {connector.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <FollowButton
        lookupAddress="0x983110309620d911731ac0932219af06091b6744"
        connectedAddress={connectedAddress || args.connectedAddress}
        disabled={!connectedAddress}
      />
    </div>
  )
}

export default {
  title: 'Molecules/Follow Button',
  component: FollowButtonWrapper,
  decorators: [
    (Story) => (
      <WagmiProvider config={config} reconnectOnMount={false}>
        <QueryClientProvider client={queryClient}>
          <TransactionProvider>
            <TransactionModal />
            {Story()}
          </TransactionProvider>
        </QueryClientProvider>
      </WagmiProvider>
    ),
  ],
} as Meta<typeof FollowButtonWrapper>

const Template: StoryFn<typeof FollowButtonWrapper> = (args) => <FollowButtonWrapper {...args} />

export const FollowButtonByAddress = Template.bind({})
FollowButtonByAddress.args = {
  lookupAddress: '0x983110309620d911731ac0932219af06091b6744',
  connectedAddress: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
}
