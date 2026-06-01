import React from 'react'
import type { Meta, StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { useAccount, useConnect, useDisconnect, useSignTypedData } from 'wagmi'
import { sha256 } from 'viem'
import ENSRecords from './ENSRecords'
import type { ENSRecordsProps } from './ENSRecords.types'
import Input from '../../atoms/input/Input'
import {
  ensRecordsThorinDecorators,
  withENSRecordsProviders,
} from '../../../../.storybook/decorators/ensRecordsProviders'

type StoryArgs = ENSRecordsProps & {
  isModal?: boolean
}

const meta: Meta<StoryArgs> = {
  title: 'Organisms/ENS Records',
  component: ENSRecords,
  tags: ['autodocs'],
  decorators: [withENSRecordsProviders],
  parameters: {
    docs: {
      description: {
        component:
          'Edit ENS records and roles for a name. Composable via `ENSRecords.Root` and slots; optional Thorin appearance for buttons and modal chrome.',
      },
    },
  },
}

export default meta

const dataURLToBytes = (dataUrl: string): Uint8Array => {
  const base64 = dataUrl.split(',')[1]
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

const ENSRecordsDemo: React.FC<StoryArgs> = (args) => {
  const [open, setOpen] = useState(!args.isModal)
  const [name, setName] = useState(args.name)
  const { address: connectedAddress } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { signTypedDataAsync } = useSignTypedData()

  const handleImageUpload = async (dataURL: string, type: 'avatar' | 'header') => {
    const urlHash = sha256(dataURLToBytes(dataURL))
    const expiry = `${Date.now() + 1000 * 60 * 60 * 24 * 7}`

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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        expiry,
        dataURL,
        sig,
        unverifiedAddress: connectedAddress,
      }),
    })

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`)
    }

    const result = await response.json()
    return result.url || `https://euc.li/${encodeURIComponent(name)}${type === 'header' ? '/h' : ''}`
  }

  const recordsProps: ENSRecordsProps = {
    name,
    defaultTab: args.defaultTab,
    darkMode: args.darkMode,
    onClose: args.isModal ? () => setOpen(false) : undefined,
    onImageUpload: connectedAddress ? handleImageUpload : undefined,
    style: args.style,
  }

  const panel = (
    <ENSRecords.Root {...recordsProps}>
      <ENSRecords.Loading />
      <ENSRecords.Empty />
      <ENSRecords.Content />
    </ENSRecords.Root>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
      {connectedAddress ? (
        <button type="button" onClick={() => disconnect()}>
          Disconnect {connectedAddress.slice(0, 8)}…
        </button>
      ) : (
        connectors.map((connector) => (
          <button key={connector.uid} type="button" onClick={() => connect({ connector })}>
            Connect {connector.name}
          </button>
        ))
      )}
      {args.isModal && (
        <>
          <Input value={name} onChange={(e) => setName(e.target.value)} style={{ width: 250 }} />
          <button type="button" onClick={() => setOpen((v) => !v)}>
            {open ? 'Close modal' : 'Open modal'}
          </button>
        </>
      )}
      {args.isModal ? (
        <ENSRecords.Shell open={open} onBackdropClick={() => setOpen(false)}>
          {panel}
        </ENSRecords.Shell>
      ) : (
        panel
      )}
    </div>
  )
}

const Template: StoryFn<StoryArgs> = (args) => <ENSRecordsDemo {...args} />

export const Classic = Template.bind({})
Classic.args = {
  name: 'test.eth',
  defaultTab: 'records',
  darkMode: false,
  isModal: false,
}

export const Modal = Template.bind({})
Modal.args = {
  name: 'test.eth',
  defaultTab: 'records',
  darkMode: false,
  isModal: true,
}

export const CustomSlottedLayout = Template.bind({})
CustomSlottedLayout.tags = ['slots']
CustomSlottedLayout.render = (args) => (
  <ENSRecordsDemo
    {...args}
    isModal={false}
  />
)
CustomSlottedLayout.args = {
  name: 'encrypteddegen.eth',
  defaultTab: 'records',
  darkMode: false,
}

export const ThorinAppearance = Template.bind({})
ThorinAppearance.tags = ['thorin']
ThorinAppearance.args = {
  name: 'encrypteddegen.eth',
  defaultTab: 'records',
  darkMode: false,
  isModal: false,
}
ThorinAppearance.decorators = ensRecordsThorinDecorators

export const ThorinSlotted = Template.bind({})
ThorinSlotted.tags = ['thorin', 'slots']
ThorinSlotted.args = {
  ...ThorinAppearance.args,
}
ThorinSlotted.decorators = ensRecordsThorinDecorators
