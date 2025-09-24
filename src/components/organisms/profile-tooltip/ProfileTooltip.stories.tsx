import { StoryFn, Meta } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProfileTooltip from './ProfileTooltip'
import { Address } from '../../../types'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '../../../constants/wagmi'
import { TransactionProvider } from '../../../context'
import TransactionModal from '../transaction-modal/TransactionModal'
import { ProfileTooltipWrapperProps } from './ProfileTooltip.types'
import FollowersAndFollowing from '../followers-and-following/FollowersAndFollowing'

const queryClient = new QueryClient()

const onProfileClick = (addressOrName: Address | string) => {
  alert(addressOrName)
}

export default {
  title: 'Organisms/Profile Tooltip',
  component: ProfileTooltip,
  argTypes: {
    horizontalPlacement: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <TransactionProvider>
            {Story()}
            <TransactionModal />
          </TransactionProvider>
        </WagmiProvider>
      </QueryClientProvider>
    ),
  ],
} as Meta<typeof ProfileTooltip>

interface TemplateProps extends ProfileTooltipWrapperProps {
  paddingTop?: number
}

const Template: StoryFn<TemplateProps> = (args) => (
  <div
    style={{ padding: '24px', paddingTop: args.paddingTop || '24px', backgroundColor: '#CCCCCC', minHeight: '400px' }}
  >
    <ProfileTooltip {...args}>
      <button style={{ padding: '10px 20px', cursor: 'pointer' }}>Hover me to see profile</button>
    </ProfileTooltip>
  </div>
)

const ListTemplate: StoryFn<TemplateProps> = (args) => (
  <div
    style={{ padding: '24px', paddingTop: args.paddingTop || '24px', backgroundColor: '#CCCCCC', minHeight: '400px' }}
  >
    <FollowersAndFollowing
      user={args.addressOrName}
      connectedAddress={args.connectedAddress}
      defaultTab={'following'}
      showHeaderImage={true}
      showProfileTooltip={true}
    />
  </div>
)

export const AddressDefaultPosition = Template.bind({})
AddressDefaultPosition.args = {
  addressOrName: '0x983110309620d911731ac0932219af06091b6744',
  connectedAddress: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  showFollowerState: true,
  showSocials: true,
  showBio: true,
  showStatus: true,
  darkMode: false,
  verticalOffset: 8,
  horizontalOffset: 0,
  onProfileClick,
  showFollowButton: false,
  keepTooltipOnHover: false,
  boundary: 'scrollParent',
}

export const ENSTopPosition = Template.bind({})
ENSTopPosition.args = {
  addressOrName: 'encrypteddegen.eth',
  connectedAddress: '0x983110309620d911731ac0932219af06091b6744',
  showFollowerState: true,
  paddingTop: 240,
  darkMode: false,
  verticalOffset: 8,
  horizontalOffset: 0,
  onProfileClick,
  showFollowButton: false,
}

export const LeftTopAlignedWithArrow = Template.bind({})
LeftTopAlignedWithArrow.args = {
  addressOrName: 'encrypteddegen.eth',
  connectedAddress: '0x983110309620d911731ac0932219af06091b6744',
  horizontalPlacement: 'left',
  paddingTop: 240,
  showFollowerState: true,
  showArrow: true,
  verticalOffset: 8,
  horizontalOffset: 0,
  onProfileClick,
  showFollowButton: true,
}

export const ProfileList = ListTemplate.bind({})
ProfileList.args = {
  addressOrName: 'brantly.eth',
  connectedAddress: '0x983110309620d911731ac0932219af06091b6744',
}

export const InlineText = Template.bind({})
InlineText.args = {
  ...AddressDefaultPosition.args,
  inline: true,
  children: (
    <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>Hover this inline text</span>
  ),
}
