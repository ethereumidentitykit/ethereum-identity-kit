import { useState } from 'react'
import { StoryFn, Meta } from '@storybook/react'
import TabSelector from './TabSelector'
import { TabSelectorProps } from './TabSelector.types'

const TabSelectorWrapper = (args: TabSelectorProps) => {
  const [selectedTab, setSelectedTab] = useState(args.selectedTab)
  return <TabSelector {...args} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
}

export default {
  title: 'Atoms/Tab Selector',
  component: TabSelectorWrapper,
} as Meta<typeof TabSelector>

const Template: StoryFn<typeof TabSelectorWrapper> = (args) => <TabSelectorWrapper {...args} />

export const Default = Template.bind({})
Default.args = {
  tabs: [
    { label: 'Profile', value: 'profile' },
    { label: 'Records', value: 'records' },
    { label: 'Activity', value: 'activity' },
  ],
  selectedTab: 'profile',
  darkMode: false,
}

export const TwoTabs = Template.bind({})
TwoTabs.args = {
  tabs: [
    { label: 'Following', value: 'following' },
    { label: 'Followers', value: 'followers' },
  ],
  selectedTab: 'following',
  darkMode: false,
}

export const Dark = Template.bind({})
Dark.args = {
  tabs: [
    { label: 'Profile', value: 'profile' },
    { label: 'Records', value: 'records' },
    { label: 'Activity', value: 'activity' },
  ],
  selectedTab: 'profile',
  darkMode: true,
}
