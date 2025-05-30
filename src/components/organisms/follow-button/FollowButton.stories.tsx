import { createConfig } from 'wagmi'
import { StoryFn, Meta } from '@storybook/react'
import { mainnet, base, optimism } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAccount, useConnect, useDisconnect, WagmiProvider } from 'wagmi'
import { injected, metaMask, coinbaseWallet, walletConnect } from 'wagmi/connectors'
import { TransactionProvider, useTransactions } from '../../../context/transactionContext'
import FollowButton from './FollowButton'
import TransactionModal from '../transaction-modal/TransactionModal'
import { transports } from '../../../constants/transports'
import { FollowButtonProps } from './FollowButton.types'

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

const FollowButtonWrapper = (
  args: FollowButtonProps & {
    darkMode?: boolean
    batchTransactions?: boolean
    showRecommendations?: boolean
    paymasterService?: string
    defaultChainId?: number
  }
) => {
  const { address: connectedAddress } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { pendingTxs, setTxModalOpen, selectedList } = useTransactions()

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
        {args.batchTransactions && (
          <button
            onClick={() => setTxModalOpen(true)}
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
            Open Transaction Modal ({pendingTxs.length})
          </button>
        )}
      </div>
      <FollowButton
        selectedList={selectedList}
        lookupAddress={args.lookupAddress}
        connectedAddress={connectedAddress || args.connectedAddress}
        disabled={!connectedAddress}
        initialState={args.initialState}
      />
    </div>
  )
}

export default {
  title: 'Organisms/Follow Button & Transaction Modal',
  component: FollowButtonWrapper,
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
} as Meta<typeof FollowButtonWrapper>

const Template: StoryFn<typeof FollowButtonWrapper> = (args) => <FollowButtonWrapper {...args} />

export const SingleTransaction = Template.bind({})
SingleTransaction.args = {
  lookupAddress: '0x983110309620d911731ac0932219af06091b6744',
  darkMode: false,
  batchTransactions: false,
  defaultChainId: undefined,
  paymasterService: undefined,
}

export const BatchTransactions = Template.bind({})
BatchTransactions.args = {
  lookupAddress: '0x983110309620d911731ac0932219af06091b6744',
  darkMode: false,
  batchTransactions: true,
  showRecommendations: true,
  paymasterService: undefined,
  defaultChainId: undefined,
}

export const InitialState = Template.bind({})
InitialState.args = {
  lookupAddress: '0x983110309620d911731ac0932219af06091b6744',
  darkMode: false,
  batchTransactions: false,
  initialState: 'Follow',
  showRecommendations: true,
  defaultChainId: undefined,
  paymasterService: undefined,
}

// export const FollowButtonCustomClassNames = Template.bind({})
// FollowButtonCustomClassNames.args = {
//   lookupAddress: '0x983110309620d911731ac0932219af06091b6744',
//   darkMode: false,
//   batchTransactions: false,
//   customClassNames: {
//     Follow: 'follow-button-follow',
//     Following: 'follow-button-following',
//     Block: 'follow-button-block',
//     Blocked: 'follow-button-blocked',
//     Mute: 'follow-button-mute',
//     Muted: 'follow-button-muted',
//     'Pending Following': 'follow-button-pending',
//     Unfollow: 'follow-button-unfollow',
//     'Pending Block': 'follow-button-blocked',
//     'Pending Mute': 'follow-button-muted',
//     Unblock: 'follow-button-unblock',
//     Unmute: 'follow-button-unmute',
//   },
// }
