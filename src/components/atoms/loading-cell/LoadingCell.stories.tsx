import { StoryFn, Meta } from '@storybook/react'
import LoadingCell from './LoadingCell'
import { DEFAULT_LOADING_GRADIENT } from '../../../constants'

export default {
  title: 'Atoms/Loading Cell',
  component: LoadingCell,
} as Meta<typeof LoadingCell>

const Template: StoryFn<typeof LoadingCell> = (args) => <LoadingCell {...args} />

export const LoadingCellSquare = Template.bind({})
LoadingCellSquare.args = {
  gradient: DEFAULT_LOADING_GRADIENT,
  height: '100px',
  width: '100px',
}

export const LoadingCellRound = Template.bind({})
LoadingCellRound.args = {
  gradient: DEFAULT_LOADING_GRADIENT,
  height: '100px',
  width: '100px',
  radius: '50%',
}
