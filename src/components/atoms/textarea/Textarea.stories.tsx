import { useState } from 'react'
import { StoryFn, Meta } from '@storybook/react'
import Textarea from './Textarea'
import { TextareaProps } from './Textarea.types'

const TextareaWrapper = (args: TextareaProps) => {
  const [value, setValue] = useState(typeof args.value === 'string' ? args.value : '')
  return (
    <div style={{ width: '300px' }}>
      <Textarea {...args} value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}

export default {
  title: 'Atoms/Textarea',
  component: TextareaWrapper,
} as Meta<typeof Textarea>

const Template: StoryFn<typeof TextareaWrapper> = (args) => <TextareaWrapper {...args} />

export const Default = Template.bind({})
Default.args = {
  placeholder: 'Enter text...',
  darkMode: false,
  disabled: false,
  rows: 4,
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: 'Bio',
  placeholder: 'Tell us about yourself',
  darkMode: false,
  disabled: false,
  rows: 4,
}

export const Dark = Template.bind({})
Dark.args = {
  label: 'Bio',
  placeholder: 'Enter text...',
  darkMode: true,
  disabled: false,
  rows: 4,
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Bio',
  placeholder: 'Disabled textarea',
  disabled: true,
  rows: 4,
}
