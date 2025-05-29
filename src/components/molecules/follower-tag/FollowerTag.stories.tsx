import { StoryFn, Meta } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import FollowerTag from './FollowerTag'

const queryClient = new QueryClient()

export default {
  title: 'Molecules/Follower Tag',
  component: FollowerTag,
  decorators: [(Story) => <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>],
} as Meta<typeof FollowerTag>

const Template: StoryFn<typeof FollowerTag> = (args) => <FollowerTag {...args} showLoading={true} />

export const ByAddress = Template.bind({})
ByAddress.args = {
  addressOrName: '0x983110309620d911731ac0932219af06091b6744',
  connectedAddress: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
}

export const ByList = Template.bind({})
ByList.args = {
  addressOrName: '0x983110309620d911731ac0932219af06091b6744',
  list: '1',
}

export const Blocks = Template.bind({})
Blocks.args = {
  addressOrName: '0x5247299421a3ff724c41582e5a44c6551d135fd3',
  connectedAddress: '0x983110309620d911731ac0932219af06091b6744',
}

export const Mutes = Template.bind({})
Mutes.args = {
  addressOrName: '0x5B0f3DBdD49614476e4f5fF5Db6fe13d41fCB516',
  connectedAddress: '0xd4713cca4068700cf722f8c2b6c05f948b75321b',
}
