import { StoryFn, Meta } from '@storybook/react'
import ImageWithFallback from './ImageWithFallback'
import { DEFAULT_FALLBACK_AVATAR } from '../../../constants'

export default {
  title: 'Atoms/Image With Fallback',
  component: ImageWithFallback,
} as Meta<typeof ImageWithFallback>

const Template: StoryFn<typeof ImageWithFallback> = (args) => <ImageWithFallback {...args} />

export const ValidLink = Template.bind({})
ValidLink.args = {
  src: 'https://metadata.ens.domains/mainnet/avatar/brantly.eth',
  fallback: DEFAULT_FALLBACK_AVATAR,
  style: {
    width: '100px',
    height: '100px',
  },
}

export const InvalidLink = Template.bind({})
InvalidLink.args = {
  src: 'https://metadata.ens.domains/mainnet/avatar/invalidname.eth',
  fallback: DEFAULT_FALLBACK_AVATAR,
  style: {
    width: '100px',
    height: '100px',
  },
}
