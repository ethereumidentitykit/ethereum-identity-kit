import { StoryFn, Meta } from "@storybook/react";
import ImageWithFallback from "./ImageWithFallback";
import { DEFAULT_FALLBACK_AVATAR } from "../../constants";

export default {
  title: "Atoms/Image With Fallback",
  component: ImageWithFallback,
} as Meta<typeof ImageWithFallback>;

const Template: StoryFn<typeof ImageWithFallback> = (args) => <ImageWithFallback {...args} />;

export const ImageWithFallbackTest = Template.bind({});
ImageWithFallbackTest.args = {
  src: 'https://metadata.ens.domains/mainnet/avatar/encrypteddegen.eth',
  fallback: DEFAULT_FALLBACK_AVATAR,
  alt: 'encrypteddegen.eth',
  style: {
    width: '100px',
    height: '100px'
  }
};
