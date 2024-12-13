import { StoryFn, Meta } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import FollowerTag from './FollowerTag'

const queryClient = new QueryClient()

export default {
  title: 'Molecules/Follower Tag',
  component: FollowerTag,
  decorators: [(Story) => <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>],
} as Meta<typeof FollowerTag>

const Template: StoryFn<typeof FollowerTag> = (args) => <FollowerTag {...args} />

export const FollowerTagAddress = Template.bind({})
FollowerTagAddress.args = {
  addressOrName: '0x983110309620d911731ac0932219af06091b6744',
  connectedAddress: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
}

export const FollowerTagList = Template.bind({})
FollowerTagList.args = {
  addressOrName: '0x983110309620d911731ac0932219af06091b6744',
  list: '1',
}

export const FollowerTagBlocks = Template.bind({})
FollowerTagBlocks.args = {
  addressOrName: '0x5247299421a3ff724c41582e5a44c6551d135fd3',
  connectedAddress: '0x983110309620d911731ac0932219af06091b6744',
}

export const FollowerTagMutes = Template.bind({})
FollowerTagMutes.args = {
  addressOrName: '0x5247299421a3ff724c41582e5a44c6551d135fd3',
  connectedAddress: '0x983110309620d911731ac0932219af06091b6744',
}
