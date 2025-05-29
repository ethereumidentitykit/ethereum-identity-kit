import { StoryFn, Meta } from '@storybook/react'
import Avatar from './Avatar'

export default {
  title: 'Molecules/Avatar',
  component: Avatar,
} as Meta<typeof Avatar>

const Template: StoryFn<typeof Avatar> = (args) => <Avatar {...args} />

export const ByAddress = Template.bind({})
ByAddress.args = {
  address: '0x5B0f3DBdD49614476e4f5fF5Db6fe13d41fCB516',
  src: 'https://metadata.ens.domains/mainnet/avatar/efp.encrypteddegen.eth',
  name: 'efp.encrypteddegen.eth',
  fallback: 'https://efp.app/assets/art/default-avatar.svg',
  style: {
    width: '100px',
    height: '100px',
  },
}

export const AvatarFallback = Template.bind({})
AvatarFallback.args = {
  address: '0xBA47418cd3bD9214250d251b6aF4DaFD14C5d0D6',
  src: 'invalid link',
  fallback: 'https://efp.app/assets/art/default-avatar.svg',
  style: {
    width: '100px',
    height: '100px',
  },
}
