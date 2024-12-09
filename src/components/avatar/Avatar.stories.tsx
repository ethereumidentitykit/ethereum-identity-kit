import { StoryFn, Meta } from "@storybook/react";
import Avatar from "./Avatar";

export default {
  title: "ReactComponentLibrary/Avatar",
  component: Avatar,
} as Meta<typeof Avatar>;

const Template: StoryFn<typeof Avatar> = (args) => <Avatar {...args} />;

export const AvatarTest = Template.bind({});
AvatarTest.args = {
  address: '0x5B0f3DBdD49614476e4f5fF5Db6fe13d41fCB516',
  src: 'https://metadata.ens.domains/mainnet/avatar/efp.encrypteddegen.eth',
  name: 'efp.encrypteddegen.eth',
  fallback: 'https://ethfollow.xyz/assets/art/default-avatar.svg',
  style: {
    width: '100px',
    height: '100px'
  }
};

export const AvatarFallbackTest = Template.bind({});
AvatarFallbackTest.args = {
  address: '0x5B0f3DBdD49614476e4f5fF5Db6fe13d41fCB516',
  src: 'invalid link',
  name: 'efp.encrypteddegen.eth',
  fallback: 'https://ethfollow.xyz/assets/art/default-avatar.svg',
  style: {
    width: '100px',
    height: '100px'
  }
};
