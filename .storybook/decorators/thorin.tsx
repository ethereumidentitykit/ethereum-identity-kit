import React from 'react'
import type { Decorator } from '@storybook/react'
import { EthereumIdentityKitThorinProvider } from '../../src/thorin'
import '../../src/styles/themes/thorin.css'

export const withThorinAppearance: Decorator = (Story) => (
  <EthereumIdentityKitThorinProvider theme="light">
    <div style={{ padding: 20 }}>
      <Story />
    </div>
  </EthereumIdentityKitThorinProvider>
)
