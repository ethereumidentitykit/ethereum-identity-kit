import { StoryFn, Meta } from "@storybook/react";
import ProfileStats from "./ProfileStats";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default {
  title: "ReactComponentLibrary/Profile Stats",
  component: ProfileStats,
} as Meta<typeof ProfileStats>;

const Template: StoryFn<typeof ProfileStats> = (args) => <QueryClientProvider client={queryClient}><ProfileStats {...args} /></QueryClientProvider>;

export const ProfileStatsTest = Template.bind({});
ProfileStatsTest.args = {
  userAddress: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  style: {
    width: '100%'
  }
};
