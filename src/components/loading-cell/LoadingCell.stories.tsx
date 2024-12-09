import { StoryFn, Meta } from "@storybook/react";
import LoadingCell, { DEFAULT_LOADING_GRADIENT } from "./LoadingCell";

export default {
  title: "ReactComponentLibrary/Loading Cell",
  component: LoadingCell,
} as Meta<typeof LoadingCell>;

const Template: StoryFn<typeof LoadingCell> = (args) => <LoadingCell {...args} />;

export const LoadingCellTest = Template.bind({});
LoadingCellTest.args = {
  gradient: DEFAULT_LOADING_GRADIENT,
  height: '100px',
  width: '300px'
};
