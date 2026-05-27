import { createConfig } from 'wagmi'
import { StoryFn, Meta } from '@storybook/react'
import { mainnet, base, optimism } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAccount, useConnect, useDisconnect, WagmiProvider } from 'wagmi'
import { injected, metaMask, coinbaseWallet, walletConnect } from 'wagmi/connectors'
import { TransactionProvider } from '../../../context/transactionContext'
import TransactionModal from '../transaction-modal/TransactionModal'
import { transports } from '../../../constants/transports'
import { ENSRecordsProps } from './ENSRecords.types'
import ENSRecords from './ENSRecords'

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

const ENSRecordsWrapper = (args: ENSRecordsProps) => {
  const { address: connectedAddress } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div
      style={{
        height: '50vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
        {connectedAddress ? (
          <div>
            <p>Connected to {connectedAddress}</p>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '10px',
                borderRadius: '5px',
                fontSize: '16px',
                fontWeight: 'bold',
                border: '1px solid #000',
                cursor: 'pointer',
                margin: '0 auto',
              }}
              onClick={() => disconnect()}
            >
              Disconnect
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <p style={{ fontSize: '16px', fontWeight: 'bold', padding: '0', margin: '0' }}>
              Connect to a wallet to follow
            </p>
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '10px',
                  borderRadius: '5px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  border: '1px solid #000',
                  cursor: 'pointer',
                }}
              >
                {connector.icon && (
                  <img src={connector.icon} alt={connector.name} style={{ width: '20px', height: '20px' }} />
                )}
                {connector.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <ENSRecords
        name={args.name}
        defaultTab={args.defaultTab}
        onClose={args.onClose}
        onImageUpload={args.onImageUpload}
      />
    </div>
  )
}

export default {
  title: 'Organisms/ENS Records',
  component: ENSRecordsWrapper,
  tags: ['!autodocs'],
  // args: {
  //   customClassNames: Object.keys(FOLLOW_BUTTON_STYLES).reduce((acc, key) => {
  //     acc[key] = FOLLOW_BUTTON_STYLES[key]
  //     return acc
  //   }, {}),
  // },
  argTypes: {
    defaultChainId: {
      control: 'select',
      options: [mainnet.id, base.id, optimism.id],
    },
    paymasterService: {
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <TransactionProvider
            batchTransactions={Story().props.batchTransactions}
            paymasterService={Story().props.paymasterService}
            defaultChainId={Story().props.defaultChainId}
          >
            <TransactionModal
              darkMode={Story().props.darkMode}
              showRecommendations={Story().props.showRecommendations}
            />
            {Story()}
          </TransactionProvider>
        </QueryClientProvider>
      </WagmiProvider>
    ),
  ],
} as Meta<typeof ENSRecordsWrapper>

const Template: StoryFn<typeof ENSRecordsWrapper> = (args) => <ENSRecordsWrapper {...args} />

export const SingleTransaction = Template.bind({})
SingleTransaction.args = {
  name: 'test.eth',
  defaultTab: 'records',
  onClose: () => {},
  onImageUpload: () => Promise.resolve(''),
}
