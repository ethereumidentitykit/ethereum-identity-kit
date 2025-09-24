import { Meta } from '@storybook/react/*'
import { StoryFn } from '@storybook/react/*'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Notifications from './Notifications'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '../../../constants/wagmi'
import { TransactionProvider } from '../../../context'
import TransactionModal from '../transaction-modal/TransactionModal'
import { CSSProperties } from 'react'

const queryClient = new QueryClient()

const getStoryPosition = (position?: string, align?: string): CSSProperties => {
  if (!position || !align) {
    return {}
  }

  const baseStyle: CSSProperties = {
    position: 'absolute' as const,
  }

  // Position styles
  switch (position) {
    case 'top':
      baseStyle.bottom = '20px'
      baseStyle.marginBottom = '8px'
      break
    case 'bottom':
      baseStyle.top = '20px'
      baseStyle.marginTop = '8px'
      break
    case 'left':
      baseStyle.right = '0'
      baseStyle.marginRight = '8px'
      break
    case 'right':
      baseStyle.left = '0'
      baseStyle.marginLeft = '8px'
      break
  }

  // Alignment styles
  switch (align) {
    case 'left':
      baseStyle.right = '10px'
      break
    case 'right':
      baseStyle.left = '10px'
      break
    case 'center':
      switch (position) {
        case 'bottom':
          baseStyle.left = '50%'
          baseStyle.top = '30px'
          break
        case 'top':
          baseStyle.left = '50%'
          baseStyle.bottom = '30px'
          break
        case 'left':
          baseStyle.top = '50%'
          baseStyle.right = '0px'
          break
        case 'right':
          baseStyle.top = '50%'
          baseStyle.left = '0px'
          break
      }
      break
    case 'top':
      baseStyle.bottom = '20px'
      break
    case 'bottom':
      baseStyle.top = '20px'
      break
  }

  return baseStyle
}

export default {
  title: 'Organisms/Notifications',
  component: Notifications,
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'top', 'bottom'],
    },
  },
  decorators: [
    (Story, context) => {
      const position = context.args.position
      const align = context.args.align
      const style = getStoryPosition(position, align)

      return (
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig}>
            <TransactionProvider>
              <div style={style}>{Story()}</div>
              <TransactionModal />
            </TransactionProvider>
          </WagmiProvider>
        </QueryClientProvider>
      )
    },
  ],
} as Meta<typeof Notifications>

const Template: StoryFn<typeof Notifications> = (args) => <Notifications {...args} />

export const NotificationsByAddress = Template.bind({})
NotificationsByAddress.args = {
  addressOrName: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  position: 'right',
  align: 'bottom',
  darkMode: true,
}

export const NotificationsByENSName = Template.bind({})
NotificationsByENSName.args = {
  addressOrName: 'brantly.eth',
  position: 'right',
  align: 'bottom',
  darkMode: false,
}
