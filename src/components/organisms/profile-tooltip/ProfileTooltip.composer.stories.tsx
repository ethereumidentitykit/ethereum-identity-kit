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
  slotShowStatus: boolean
  slotShowBio: boolean
  slotShowSocials: boolean
  showGrails: boolean
  useCustomNameSlot: boolean
}

const onProfileClick = (addressOrName: Address | string) => {
  alert(addressOrName)
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
    slotShowStatus: { control: 'boolean', table: { category: 'Slots' } },
    slotShowBio: { control: 'boolean', table: { category: 'Slots' } },
    slotShowSocials: { control: 'boolean', table: { category: 'Slots' } },
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
    slotShowStatus,
    slotShowBio,
    slotShowSocials,
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
          {slotShowStatus && <ProfileTooltipCard.Status />}
          {slotShowBio && <ProfileTooltipCard.Bio />}
          {slotShowSocials && <ProfileTooltipCard.Socials />}
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
  slotShowStatus: true,
  slotShowBio: true,
  slotShowSocials: true,
  showGrails: false,
}

export const CustomSlottedLayout = SlotComposerStory.bind({})
CustomSlottedLayout.tags = ['slots']
CustomSlottedLayout.args = {
  ...SlotComposer.args,
  showGrails: false,
  slotShowStatus: false,
}

export const ThorinSlotted = SlotComposerStory.bind({})
ThorinSlotted.tags = ['thorin', 'slots']
ThorinSlotted.args = {
  ...SlotComposer.args,
  showFollowButton: true,
}
ThorinSlotted.decorators = [withThorinAppearance]
