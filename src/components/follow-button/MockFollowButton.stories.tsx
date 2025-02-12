import { StoryFn } from "@storybook/react/*"
import { Meta } from "@storybook/react/*"
import MockFollowButton from "./MockFollowButton"

export default {
  title: 'Molecules/Mock Follow Button',
  component: MockFollowButton,
} as Meta<typeof MockFollowButton>

const Template: StoryFn<typeof MockFollowButton> = (args) => <MockFollowButton {...args} />

export const MockFollowButtonTest = Template.bind({})
MockFollowButtonTest.args = {
  lookupAddress: '0x983110309620d911731ac0932219af06091b6744',
  connectedAddress: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  mockButtonState: 'Follow',
}

export const MockBlockButtonTest = Template.bind({})
MockBlockButtonTest.args = {
  lookupAddress: '0x983110309620d911731ac0932219af06091b6744',
  connectedAddress: '0xc983ebc9db969782d994627bdffec0ae6efee1b3',
  mockButtonState: 'Block',
}