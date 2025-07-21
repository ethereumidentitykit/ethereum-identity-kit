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

export const ByAddress = Template.bind({})
ByAddress.args = {
  addressOrName: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  statsDirection: 'column',
  containerDirection: 'row',
}

export const ByENS = Template.bind({})
ByENS.args = {
  addressOrName: 'encrypteddegen.eth',
}

export const ByList = Template.bind({})
ByList.args = {
  list: '1',
}

export const PrefetchedData = Template.bind({})
PrefetchedData.args = {
  addressOrName: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  prefetched: {
    stats: {
      followers_count: 100,
      following_count: 100,
    },
    isLoading: false,
  },
}
