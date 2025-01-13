import { createConfig } from 'wagmi'
import { StoryFn, Meta } from '@storybook/react'
import { mainnet, base, optimism } from 'wagmi/chains'
import { useAccount, useConnect, WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { injected, metaMask, coinbaseWallet, walletConnect } from 'wagmi/connectors'
import TransactionModal from './TransactionModal'
import { TransactionProvider } from '../../context/transactionContext'
import { transports } from '../../constants/transports'
import type { TransactionModalProps } from './TransactionModal.types'

const config = createConfig({
  chains: [mainnet, base, optimism],
  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet({ appName: 'Ethereum Identity Kit' }),
    walletConnect({ projectId: 'd4f234136ca6a7efeed7abf93474125b' }),
  ],
  transports,
})

const queryClient = new QueryClient()

const TransactionModalWrapper = (args: TransactionModalProps) => {
  const { connect, connectors } = useConnect()
  const { address: connectedAddress } = useAccount()

  return (
    <div>
      {connectedAddress ? (
        <TransactionModal {...args} />
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
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <TransactionProvider batchTransactions={false}>
            <TransactionModal />
            {Story()}
          </TransactionProvider>
        </QueryClientProvider>
      </WagmiProvider>
    ),
  ],
} as Meta<typeof TransactionModalWrapper>

const Template: StoryFn<typeof TransactionModalWrapper> = (args: TransactionModalProps) => (
  <TransactionModalWrapper {...args} />
)
export const TransactionModalLight = Template.bind({})
export const TransactionModalDark = Template.bind({})
TransactionModalDark.args = {
  isDark: true,
}
