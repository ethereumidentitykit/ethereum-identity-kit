import { StoryFn, Meta } from '@storybook/react'
import ProfileStats from './ProfileStats'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default {
  title: 'Molecules/Profile Stats',
  component: ProfileStats,
  decorators: [(Story) => <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>],
} as Meta<typeof ProfileStats>

const Template: StoryFn<typeof ProfileStats> = (args) => <ProfileStats {...args} />

export const ProfileStatsByAddress = Template.bind({})
ProfileStatsByAddress.args = {
  addressOrName: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  statsDirection: 'column',
  containerDirection: 'row',
}

export const ProfileStatsByENS = Template.bind({})
ProfileStatsByENS.args = {
  addressOrName: 'encrypteddegen.eth',
}

export const ProfileStatsByList = Template.bind({})
ProfileStatsByList.args = {
  addressOrName: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  list: '1',
  prefetchedStats: {
    followers_count: 100,
    following_count: 100,
  },
}
