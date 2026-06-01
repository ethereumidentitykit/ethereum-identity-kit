import { StoryFn, Meta } from '@storybook/react'
import ResolvedInput from './ResolvedInput'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ResolvedInputProps } from './ResolvedInput.types'
import { useState } from 'react'

const queryClient = new QueryClient()

const ResolvedInputWrapper = (args: ResolvedInputProps) => {
  const [value, setValue] = useState(args.value)
  return (
    <div style={{ width: '300px' }}>
      <ResolvedInput {...args} value={value} onChange={setValue} />
    </div>
  )
}

export default {
  title: 'Molecules/Resolved Input',
  component: ResolvedInputWrapper,
  decorators: [(Story) => <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>],
} as Meta<typeof ResolvedInput>

const Template: StoryFn<typeof ResolvedInputWrapper> = (args) => <ResolvedInputWrapper {...args} />

export const Default = Template.bind({})
Default.args = {
  value: '',
  onChange: () => {},
  placeholder: 'Search for an ENS or address',
  darkMode: false,
  disabled: false,
  className: '',
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  value: '',
  onChange: () => {},
  label: 'Recipient',
  placeholder: 'Search for an ENS or address',
  darkMode: false,
  disabled: false,
  className: '',
}
