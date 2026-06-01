import React from 'react'
import type { Decorator } from '@storybook/react-vite'
import { EthereumIdentityKitThorinProvider } from '../../src/thorin'
import '../../src/styles/themes/thorin.css'

export const withThorinAppearance: Decorator = (Story, context) => {
  const theme = context.globals.theme === 'dark' ? 'dark' : 'light'

  return (
    <EthereumIdentityKitThorinProvider theme={theme}>
      <div style={{ padding: 20 }}>
        <Story />
      </div>
    </EthereumIdentityKitThorinProvider>
  )
}
