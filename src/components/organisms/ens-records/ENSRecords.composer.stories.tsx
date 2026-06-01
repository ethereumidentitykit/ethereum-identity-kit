import type { Meta, StoryFn } from '@storybook/react-vite'
import ENSRecords from './ENSRecords'
import type { ENSRecordsProps } from './ENSRecords.types'
import { withENSRecordsProviders } from '../../../../.storybook/decorators/ensRecordsProviders'

type ComposerArgs = ENSRecordsProps & {
  showLoading: boolean
  showEmpty: boolean
  showContent: boolean
}

const meta: Meta<ComposerArgs> = {
  title: 'Organisms/ENS Records',
  tags: ['slots'],
  decorators: [withENSRecordsProviders],
  parameters: { controls: { expanded: true } },
  argTypes: {
    showLoading: { control: 'boolean', table: { category: 'Slots' } },
    showEmpty: { control: 'boolean', table: { category: 'Slots' } },
    showContent: { control: 'boolean', table: { category: 'Slots' } },
  },
}

export default meta

const toRootProps = (args: ComposerArgs): ENSRecordsProps => {
  const root = { ...args } as Record<string, unknown>
  delete root.showLoading
  delete root.showEmpty
  delete root.showContent
  return root as ENSRecordsProps
}

const SlotComposerStory: StoryFn<ComposerArgs> = (args) => {
  const { showLoading, showEmpty, showContent } = args
  const rootProps = toRootProps(args)

  return (
    <ENSRecords.Root {...rootProps}>
      {showLoading && <ENSRecords.Loading />}
      {showEmpty && <ENSRecords.Empty />}
      {showContent && <ENSRecords.Content />}
    </ENSRecords.Root>
  )
}

export const SlotComposer = SlotComposerStory.bind({})
SlotComposer.args = {
  name: 'encrypteddegen.eth',
  defaultTab: 'records',
  darkMode: false,
  showLoading: false,
  showEmpty: false,
  showContent: true,
}
