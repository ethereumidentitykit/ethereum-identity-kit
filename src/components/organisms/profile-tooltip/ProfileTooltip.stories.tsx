import { StoryFn, Meta } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProfileTooltip from './ProfileTooltip'
import { Address } from '../../../types'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '../../../constants/wagmi'
import { TransactionProvider } from '../../../context'
import TransactionModal from '../transaction-modal/TransactionModal'
import { ProfileTooltipWrapperProps } from './ProfileTooltip.types'

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

export const AddressDefaultPosition = Template.bind({})
AddressDefaultPosition.args = {
  addressOrName: '0x983110309620d911731ac0932219af06091b6744',
  connectedAddress: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  showFollowerState: true,
  darkMode: false,
  onProfileClick,
  showFollowButton: false,
  keepTooltipOnHover: false,
}

export const ENSTopPosition = Template.bind({})
ENSTopPosition.args = {
  addressOrName: 'encrypteddegen.eth',
  connectedAddress: '0x983110309620d911731ac0932219af06091b6744',
  showFollowerState: true,
  paddingTop: 240,
  darkMode: false,
  onProfileClick,
  showFollowButton: false,
}

export const ProfileList = Template.bind({})
ProfileList.args = {
  addressOrName: '',
  list: '5',
  connectedAddress: '0x983110309620d911731ac0932219af06091b6744',
  showFollowerState: true,
  darkMode: false,
  onProfileClick,
  showFollowButton: false,
}

export const PrefetchedData = Template.bind({})
PrefetchedData.args = {
  addressOrName: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  connectedAddress: '0x983110309620d911731ac0932219af06091b6744',
  showFollowerState: true,
  extraOptions: {
    prefetched: {
      profile: {
        data: {
          address: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
          ens: {
            name: 'encrypteddegen.eth',
            avatar: 'https://euc.li/encrypteddegen.eth',
            records: {
              avatar: 'https://euc.li/encrypteddegen.eth',
              'com.discord': 'encrypteddegen.eth',
              'com.github': 'encryptedDegen',
              'com.twitter': 'ZunecJan',
              description: 'UI/UX Designer & Developer | Building the web3 social graph @efp.eth',
              header: 'https://i.imgur.com/pWYMFBn.jpeg',
              'org.telegram': 'encrypteddegen',
              url: 'https://encrypteddegensomethingsomething.eth',
            },
          },
          ranks: {
            mutuals_rank: 270,
            followers_rank: 119,
            following_rank: 694,
            top8_rank: 133,
            blocks_rank: 0,
          },
          primary_list: '1',
        },
        isLoading: false,
        refetch: () => {},
      },
      stats: {
        data: {
          followers_count: 100,
          following_count: 100,
        },
        isLoading: false,
        refetch: () => {},
      },
    },
  },
  onProfileClick,
  showFollowButton: false,
}

export const WithDelays = Template.bind({})
WithDelays.args = {
  addressOrName: 'vitalik.eth',
  connectedAddress: '0x983110309620d911731ac0932219af06091b6744',
  showFollowerState: true,
  showDelay: 500,
  hideDelay: 300,
  onProfileClick,
  showFollowButton: true,
}

export const EdgePositioning = () => (
  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
    <ProfileTooltip
      addressOrName="vitalik.eth"
      connectedAddress="0x983110309620d911731ac0932219af06091b6744"
      showFollowerState={true}
      onProfileClick={onProfileClick}
    >
      <button style={{ padding: '10px 20px' }}>Left Edge</button>
    </ProfileTooltip>
    <ProfileTooltip
      addressOrName="encrypteddegen.eth"
      connectedAddress="0x983110309620d911731ac0932219af06091b6744"
      showFollowerState={true}
      onProfileClick={onProfileClick}
    >
      <button style={{ padding: '10px 20px' }}>Right Edge</button>
    </ProfileTooltip>
  </div>
)

export const LeftTopAlignedWithArrow = Template.bind({})
LeftTopAlignedWithArrow.args = {
  addressOrName: 'encrypteddegen.eth',
  connectedAddress: '0x983110309620d911731ac0932219af06091b6744',
  horizontalPlacement: 'left',
  paddingTop: 300,
  showFollowerState: true,
  showArrow: true,
  onProfileClick,
  showFollowButton: true,
}
