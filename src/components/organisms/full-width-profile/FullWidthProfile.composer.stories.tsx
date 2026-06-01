import type { Meta, StoryFn } from '@storybook/react-vite'
import FullWidthProfile from './FullWidthProfile'
import type { FullWidthProfileProps } from './FullWidthProfile.types'
import { withThorinAppearance } from '../../../../.storybook/decorators/thorin'
import {
  withFullWidthCanvas,
  withProfileProviders,
} from '../../../../.storybook/decorators/profileProviders'

type ComposerArgs = FullWidthProfileProps & {
  showTopCard: boolean
  showRole: boolean
  showStatusSection: boolean
  showBio: boolean
  showSocials: boolean
  showCommonFollowers: boolean
}

const onProfileClick = (addressOrName: Address | string) => {
  alert(addressOrName)
}

const meta: Meta<ComposerArgs> = {
  title: 'Organisms/Full Width Profile',
  component: FullWidthProfile,
  tags: ['slots'],
  decorators: [withProfileProviders, withFullWidthCanvas],
  argTypes: {
    showTopCard: { control: 'boolean', table: { category: 'Slots' } },
    showRole: { control: 'boolean', table: { category: 'Slots' } },
    showStatusSection: { control: 'boolean', table: { category: 'Slots' } },
    showBio: { control: 'boolean', table: { category: 'Slots' } },
    showSocials: { control: 'boolean', table: { category: 'Slots' } },
    showCommonFollowers: { control: 'boolean', table: { category: 'Slots' } },
  },
}

export default meta

const SlotComposerStory: StoryFn<ComposerArgs> = (args) => {
  const {
    showTopCard,
    showRole,
    showStatusSection,
    showBio,
    showSocials,
    showCommonFollowers,
    extraOptions,
    ...rootProps
  } = args

  return (
    <FullWidthProfile.Root {...rootProps} extraOptions={{ ...extraOptions, role: showRole ? extraOptions?.role ?? 'Contributor' : undefined }}>
      {showTopCard && <FullWidthProfile.TopCard />}
      <FullWidthProfile.Main>
        <FullWidthProfile.Panel>
          <FullWidthProfile.HeaderBackground />
          {showRole && extraOptions?.role && <FullWidthProfile.Role />}
          <FullWidthProfile.MoreOptions />
          {showStatusSection && <FullWidthProfile.StatusSection />}
          <FullWidthProfile.Content>
            <FullWidthProfile.Avatar />
            <div className="user-profile-details">
              <FullWidthProfile.Name />
              <FullWidthProfile.Stats />
              <FullWidthProfile.StatusMobile />
              {showBio && <FullWidthProfile.Bio />}
              {showSocials && <FullWidthProfile.Socials />}
              {showCommonFollowers && (
                <div className="user-profile-mobile-common-followers-container">
                  <FullWidthProfile.CommonFollowers variant="mobile" />
                </div>
              )}
            </div>
          </FullWidthProfile.Content>
        </FullWidthProfile.Panel>
        <FullWidthProfile.HeaderBackgroundWide />
      </FullWidthProfile.Main>
    </FullWidthProfile.Root>
  )
}

export const SlotComposer = SlotComposerStory.bind({})
SlotComposer.args = {
  addressOrName: 'encrypteddegen.eth',
  connectedAddress: '0x983110309620d911731ac0932219af06091b6744',
  showFollowerState: true,
  showFollowButton: true,
  showEmptySocials: true,
  onProfileClick,
  showTopCard: true,
  showRole: true,
  showStatusSection: true,
  showBio: true,
  showSocials: true,
  showCommonFollowers: true,
  extraOptions: { role: 'Frontend developer' },
}

export const CustomSlottedLayout = SlotComposerStory.bind({})
CustomSlottedLayout.tags = ['slots']
CustomSlottedLayout.args = {
  ...SlotComposer.args,
  showTopCard: false,
  showRole: false,
}

export const ThorinSlotted = SlotComposerStory.bind({})
ThorinSlotted.tags = ['thorin', 'slots']
ThorinSlotted.args = { ...SlotComposer.args }
ThorinSlotted.decorators = [withThorinAppearance]
