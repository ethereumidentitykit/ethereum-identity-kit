import { useState } from 'react'
import { StoryFn, Meta } from '@storybook/react'
import Input from './Input'
import { InputProps } from './Input.types'

const InputWrapper = (args: InputProps) => {
  const [value, setValue] = useState(typeof args.value === 'string' ? args.value : '')
  return (
    <div style={{ width: '300px' }}>
      <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}

export default {
  title: 'Atoms/Input',
  component: InputWrapper,
} as Meta<typeof Input>

const Template: StoryFn<typeof InputWrapper> = (args) => <InputWrapper {...args} />

export const Default = Template.bind({})
Default.args = {
  placeholder: 'Enter text...',
  darkMode: false,
  disabled: false,
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: 'Username',
  placeholder: 'Enter your username',
  darkMode: false,
  disabled: false,
}

export const Dark = Template.bind({})
Dark.args = {
  label: 'Username',
  placeholder: 'Enter text...',
  darkMode: true,
  disabled: false,
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Username',
  placeholder: 'Disabled input',
  disabled: true,
}
