import { createConfig, useSignTypedData } from 'wagmi'
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
import { CSSProperties, useState } from 'react'
import Input from '../../atoms/input/Input'
import { sha256 } from 'viem'

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

const ENSRecordsWrapper = (args: ENSRecordsProps & { isModal?: boolean }) => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(args.name)
  const { address: connectedAddress } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { signTypedDataAsync } = useSignTypedData()

  const containerStyle = args.isModal
    ? ({
        width: '100%',
        height: '100dvh',
        padding: '20px',
        paddingBottom: '0px',
        display: open ? 'flex' : 'none',
        justifyContent: 'center',
        position: 'fixed',
        overflow: 'scroll',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
      } as CSSProperties)
    : undefined

  const handleClose = args.isModal
    ? () => {
        setOpen(false)
      }
    : undefined

  //////////////////////////////////////////////////////////////
  // EthID function for uploading images
  //
  // use if you don't

  // turn image data URL to bytes
  const dataURLToBytes = (dataUrl: string): Uint8Array => {
    const base64 = dataUrl.split(',')[1]
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return bytes
  }

  // Upload to EtthID Image Service
  const handleImageUpload = async (dataURL: string, type: 'avatar' | 'header') => {
    try {
      const urlHash = sha256(dataURLToBytes(dataURL))
      const expiry = `${Date.now() + 1000 * 60 * 60 * 24 * 7}` // 7 days

      const sig = await signTypedDataAsync({
        primaryType: 'Upload',
        domain: { name: 'Ethereum Name Service', version: '1' },
        types: {
          Upload: [
            { name: 'upload', type: 'string' },
            { name: 'expiry', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'hash', type: 'string' },
          ],
        },
        message: {
          upload: type,
          expiry,
          name,
          hash: urlHash,
        },
      })

      const response = await fetch(`https://eidk.me/${encodeURIComponent(name)}${type === 'header' ? '/h' : ''}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expiry,
          dataURL,
          sig,
          unverifiedAddress: connectedAddress,
        }),
      })

      if (!response.ok) {
        if (response.status === 413) {
          throw new Error('File size is too large (max 500KB)')
        }
        if (response.status === 415) {
          throw new Error('Unsupported file type. Use JPG/JPEG.')
        }
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const result = await response.json()

      await new Promise((resolve) => setTimeout(resolve, 1000)) // wait for image to be uploaded to euc.li

      const url = result.url || `https://euc.li/${encodeURIComponent(name)}${type === 'header' ? '/h' : ''}`

      return url
    } catch (err: unknown) {
      throw new Error(err instanceof Error ? err.message : 'Upload failed')
    }
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        paddingBottom: '100px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '20px' }}>
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
      {args.isModal && (
        <>
          <Input value={name} onChange={(e) => setName(e.target.value)} style={{ width: '250px', margin: '0 auto' }} />
          <button onClick={() => setOpen(true)}>{open ? 'Close' : 'Open'}</button>
        </>
      )}
      <div style={containerStyle} onClick={handleClose}>
        <ENSRecords
          name={name}
          defaultTab={args.defaultTab}
          onClose={handleClose}
          darkMode={args.darkMode}
          onImageUpload={handleImageUpload}
          style={args.style}
        />
      </div>
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
    defaultTab: {
      control: 'select',
      options: ['records', 'roles'],
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

export const classic = Template.bind({})
classic.args = {
  name: 'test.eth',
  defaultTab: 'records',
  darkMode: false,
  isModal: false,
}

export const modal = Template.bind({})
modal.args = {
  name: 'test.eth',
  defaultTab: 'records',
  darkMode: false,
  isModal: true,
}
