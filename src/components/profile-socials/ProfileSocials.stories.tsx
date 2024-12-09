import { StoryFn, Meta } from "@storybook/react";
import ProfileSocials from "./ProfileSocials";

export default {
  title: "ReactComponentLibrary/Profile Socials",
  component: ProfileSocials,
} as Meta<typeof ProfileSocials>;

const Template: StoryFn<typeof ProfileSocials> = (args) => <ProfileSocials {...args} />;

export const ProfileSocialsTest = Template.bind({});
ProfileSocialsTest.args = {
  name: "vitalik.eth",
  userAddress: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  records: {
    url: "https://vitalik.ca",
    "com.github": "vbuterin",
    "com.twitter": "VitalikButerin",
    "contenthash": "ipfs://bafybeifvusbh4iunpvwjlowu47sxnt4hjlebx46kxi4yz5zdsoecfpkkei"
  },
  iconSize: 36,
};
