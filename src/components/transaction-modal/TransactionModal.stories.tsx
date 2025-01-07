import { StoryFn, Meta } from '@storybook/react'
import { useAccount, useConnect, WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '../../constants/wagmi'
import TransactionModal from './TransactionModal'
import { TransactionProvider } from '../../context/transactionContext'

const queryClient = new QueryClient()

const TransactionModalWrapper = () => {
  const { connect, connectors } = useConnect()
  const { address: connectedAddress } = useAccount()

  return (
    <div>
      {connectedAddress ? (
        <TransactionModal />
      ) : (
        <div>
          {connectors.map((connector) => (
            <button key={connector.uid} onClick={() => connect({ connector })}>
              {connector.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default {
  title: 'Organisms/Transaction Modal',
  component: TransactionModalWrapper,
  decorators: [
    (Story) => (
      <WagmiProvider config={config} reconnectOnMount={false}>
        <QueryClientProvider client={queryClient}>
          <TransactionProvider>{Story()}</TransactionProvider>
        </QueryClientProvider>
      </WagmiProvider>
    ),
  ],
} as Meta<typeof TransactionModalWrapper>

const Template: StoryFn<typeof TransactionModalWrapper> = () => <TransactionModalWrapper />

export const TransactionModalTest = Template.bind({})
