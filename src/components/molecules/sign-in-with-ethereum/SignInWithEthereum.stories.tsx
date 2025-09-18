import { createConfig } from 'wagmi'
import { StoryFn, Meta } from '@storybook/react'
import { optimismSepolia, baseSepolia, sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAccount, useConnect, useDisconnect, WagmiProvider } from 'wagmi'
import { injected, metaMask, coinbaseWallet, walletConnect } from 'wagmi/connectors'
import SignInWithEthereum from './SignInWithEthereum'
import { MINUTE } from '../../../constants'
import { transports } from '../../../constants/transports'
import { SignInWithEthereumProps } from './SignInWithEthereum.types'

function generateClientSideNonce(length = 16) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const config = createConfig({
  chains: [baseSepolia, optimismSepolia, sepolia],
  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet({ appName: 'Ethereum Identity Kit' }),
    walletConnect({ projectId: 'd4f234136ca6a7efeed7abf93474125b' }),
  ],
  transports,
})

const queryClient = new QueryClient()

const SignInWithEthereumWrapper = (
  args: SignInWithEthereumProps & {
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
      <SignInWithEthereum
        verifySignature={args.verifySignature}
        getNonce={args.getNonce}
        onSignInSuccess={args.onSignInSuccess}
        onSignInError={args.onSignInError}
        message={args.message}
        darkMode={args.darkMode}
        autoSignInAfterConnection={args.autoSignInAfterConnection}
        expirationTime={args.expirationTime}
        onDisconnectedClick={args.onDisconnectedClick}
      />
    </div>
  )
}

export default {
  title: 'Molecules/Sign In With Ethereum',
  component: SignInWithEthereumWrapper,
  tags: ['!autodocs'],
  decorators: [
    (Story) => (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
      </WagmiProvider>
    ),
  ],
} as Meta<typeof SignInWithEthereumWrapper>

const Template: StoryFn<typeof SignInWithEthereumWrapper> = (args) => <SignInWithEthereumWrapper {...args} />

export const Button = Template.bind({})
Button.args = {
  verifySignature: async () => {},
  getNonce: async () => generateClientSideNonce(),
  onSignInSuccess: () => {},
  onSignInError: () => {},
  message: 'Hello from Ethereum Identity Kit',
  darkMode: false,
  onDisconnectedClick: () => window.alert('Connect your wallet to sign in'),
  expirationTime: 3 * MINUTE,
  autoSignInAfterConnection: true,
}
