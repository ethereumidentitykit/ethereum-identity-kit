import { StoryFn, Meta } from "@storybook/react";
import ProfileStats from "./ProfileStats";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default {
  title: "ReactComponentLibrary/Profile Stats",
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

export const ProfileStatsTest = Template.bind({});
ProfileStatsTest.args = {
  userAddress: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  style: {
    width: '100%',
    gap: '32px'
  },
  statsStyle: {
    gap: '8px'
  },
  statsDirection: 'column',
  direction: 'row'
};
