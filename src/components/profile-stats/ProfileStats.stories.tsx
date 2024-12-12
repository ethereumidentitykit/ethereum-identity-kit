import { StoryFn, Meta } from "@storybook/react";
import ProfileStats from "./ProfileStats";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default {
  title: "Molecules/Profile Stats",
  component: ProfileStats,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        {Story()}
      </QueryClientProvider>
    ),
  ],
} as Meta<typeof ProfileStats>;

const Template: StoryFn<typeof ProfileStats> = (args) => <ProfileStats {...args} />

export const ProfileStatsAddress = Template.bind({});
ProfileStatsAddress.args = {
  addressOrName: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  containerStyle: {
    width: '100%',
    gap: '32px'
  },
  statsStyle: {
    gap: '8px'
  },
  statsDirection: 'column',
  containerDirection: 'row'
};

export const ProfileStatsENS = Template.bind({});
ProfileStatsENS.args = {
  addressOrName: "encrypteddegen.eth",
  containerStyle: {
    width: '100%',
    gap: '32px'
  },
};

export const ProfileStatsList = Template.bind({});
ProfileStatsList.args = {
  addressOrName: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  list: "1",
  containerStyle: {
    width: '100%',
    gap: '32px'
  },
};