import type { Meta, StoryFn } from '@storybook/react-vite'
import ProfileTooltip from './ProfileTooltip'
import ProfileTooltipCard from './ProfileTooltipCard'
import type { ProfileTooltipWrapperProps } from './ProfileTooltip.types'
import { withThorinAppearance } from '../../../../.storybook/decorators/thorin'
import {
  withProfileProviders,
  withTooltipCanvas,
} from '../../../../.storybook/decorators/profileProviders'

type ComposerArgs = ProfileTooltipWrapperProps & {
  showHeader: boolean
  showBody: boolean
  showAvatarRow: boolean
  showName: boolean
  showStats: boolean
  showStatus: boolean
  showBio: boolean
  showSocials: boolean
  showGrails: boolean
  useCustomNameSlot: boolean
}

const meta: Meta<ComposerArgs> = {
  title: 'Organisms/Profile Tooltip',
  component: ProfileTooltip,
  tags: ['slots'],
  decorators: [withProfileProviders, withTooltipCanvas],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    showHeader: { control: 'boolean', table: { category: 'Slots' } },
    showBody: { control: 'boolean', table: { category: 'Slots' } },
    showAvatarRow: { control: 'boolean', table: { category: 'Slots' } },
    showName: { control: 'boolean', table: { category: 'Slots' } },
    showStats: { control: 'boolean', table: { category: 'Slots' } },
    showStatus: { control: 'boolean', table: { category: 'Slots' } },
    showBio: { control: 'boolean', table: { category: 'Slots' } },
    showSocials: { control: 'boolean', table: { category: 'Slots' } },
    showGrails: { control: 'boolean', table: { category: 'Slots' } },
  },
}

export default meta

const SlotComposerStory: StoryFn<ComposerArgs> = (args) => {
  const {
    useCustomNameSlot,
    showHeader,
    showBody,
    showAvatarRow,
    showName,
    showStats,
    showStatus,
    showBio,
    showSocials,
    showGrails,
    ...wrapperProps
  } = args

  const content = (
    <ProfileTooltipCard.Root {...wrapperProps}>
      {showHeader && <ProfileTooltipCard.Header />}
      {showBody && (
        <ProfileTooltipCard.Body>
          {showAvatarRow && <ProfileTooltipCard.AvatarRow />}
          {showName &&
            (useCustomNameSlot ? (
              <ProfileTooltipCard.Name asChild>
                <h3 style={{ margin: '6px 0', fontSize: '18px', fontWeight: 700 }} />
              </ProfileTooltipCard.Name>
            ) : (
              <ProfileTooltipCard.Name />
            ))}
          {showStats && <ProfileTooltipCard.Stats />}
          {showStatus && <ProfileTooltipCard.Status />}
          {showBio && <ProfileTooltipCard.Bio />}
          {showSocials && <ProfileTooltipCard.Socials />}
          {showGrails && <ProfileTooltipCard.Grails />}
        </ProfileTooltipCard.Body>
      )}
    </ProfileTooltipCard.Root>
  )

  return (
    <ProfileTooltip {...wrapperProps} content={content}>
      <button type="button" style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Hover for composed tooltip
      </button>
    </ProfileTooltip>
  )
}

export const SlotComposer = SlotComposerStory.bind({})
SlotComposer.args = {
  addressOrName: 'encrypteddegen.eth',
  connectedAddress: '0x983110309620d911731ac0932219af06091b6744',
  showFollowerState: true,
  showFollowButton: true,
  showSocials: true,
  showBio: true,
  showStatus: true,
  onProfileClick,
  includeGrails: false,
  useCustomNameSlot: false,
  showHeader: true,
  showBody: true,
  showAvatarRow: true,
  showName: true,
  showStats: true,
  showStatus: true,
  showBio: true,
  showSocials: true,
  showGrails: false,
}

export const CustomSlottedLayout = SlotComposerStory.bind({})
CustomSlottedLayout.tags = ['slots']
CustomSlottedLayout.args = {
  ...SlotComposer.args,
  showGrails: false,
  showStatus: false,
}

export const ThorinSlotted = SlotComposerStory.bind({})
ThorinSlotted.tags = ['thorin', 'slots']
ThorinSlotted.args = {
  ...SlotComposer.args,
  showFollowButton: true,
}
ThorinSlotted.decorators = [withThorinAppearance]
