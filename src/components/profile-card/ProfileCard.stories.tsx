import { StoryFn, Meta } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfileCard from "./ProfileCard";

const queryClient = new QueryClient();

export default {
  title: "ReactComponentLibrary/Profile Card",
  component: ProfileCard,
} as Meta<typeof ProfileCard>;

const Template: StoryFn<typeof ProfileCard> = (args) => <QueryClientProvider client={queryClient}><ProfileCard {...args} /></QueryClientProvider>;

export const ProfileCardTest = Template.bind({});
ProfileCardTest.args = {
  userAddress: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
};