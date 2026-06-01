import type { Meta, StoryFn } from '@storybook/react-vite'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import ProfileCard from './ProfileCard'
import type { ProfileCardProps } from './ProfileCard.types'
import { wagmiConfig } from '../../../constants/wagmi'
import { TransactionProvider } from '../../../context'
import TransactionModal from '../transaction-modal/TransactionModal'
import {
  PROFILE_IDENTITY_SLOT_IDS,
  PROFILE_SLOT_LAYOUT_PRESETS,
  type ProfileIdentitySlotId,
  type ProfileSlotLayoutPreset,
} from '../../profile-identity'
import { Address } from '../../../types'

const queryClient = new QueryClient()

const onProfileClick = (addressOrName: Address | string) => {
  alert(addressOrName)
}

type SlotToggleArgs = {
  [K in ProfileIdentitySlotId as `show${Capitalize<K>}`]: boolean
}

type ComposerArgs = ProfileCardProps &
  SlotToggleArgs & {
    layoutPreset: ProfileSlotLayoutPreset
    useCustomNameSlot: boolean
  }

const slotArgKey = (id: ProfileIdentitySlotId) =>
  `show${id.charAt(0).toUpperCase()}${id.slice(1)}` as keyof SlotToggleArgs

const defaultSlotToggles = PROFILE_SLOT_LAYOUT_PRESETS.default
const defaultToggleArgs = Object.fromEntries(
  PROFILE_IDENTITY_SLOT_IDS.map((id) => [slotArgKey(id), defaultSlotToggles[id]])
) as SlotToggleArgs

const meta: Meta<ComposerArgs> = {
  title: 'Organisms/Profile Card',
  tags: ['slots'],
  parameters: {
    docs: {
      description: {
        story:
          'Toggle profile-identity slots in Controls and switch layout presets. Use this to prototype compositions before wiring new organisms (e.g. ProfileTooltip).',
      },
    },
    controls: { expanded: true },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <TransactionProvider>
            <div style={{ padding: 20, backgroundColor: '#AAAAAA' }}>
              <Story />
            </div>
            <TransactionModal />
          </TransactionProvider>
        </WagmiProvider>
      </QueryClientProvider>
    ),
  ],
  argTypes: {
    layoutPreset: {
      control: 'select',
      options: ['default', 'minimal', 'full', 'custom'] satisfies ProfileSlotLayoutPreset[],
      description: 'Applies a preset; set to "custom" to use individual slot toggles below.',
    },
    useCustomNameSlot: {
      control: 'boolean',
      description: 'Render Name with asChild + custom heading (demo of slot override).',
    },
    ...Object.fromEntries(
      PROFILE_IDENTITY_SLOT_IDS.map((id) => [
        slotArgKey(id),
        { control: 'boolean', table: { category: 'Slots' } },
      ])
    ),
  },
}

export default meta

const toRootProps = (args: ComposerArgs): ProfileCardProps => {
  const root = { ...args } as Record<string, unknown>
  delete root.layoutPreset
  delete root.useCustomNameSlot
  for (const id of PROFILE_IDENTITY_SLOT_IDS) {
    delete root[slotArgKey(id)]
  }
  return root as unknown as ProfileCardProps
}

const SlotComposerStory: StoryFn<ComposerArgs> = (args) => {
  const { layoutPreset, useCustomNameSlot } = args
  const rootProps = toRootProps(args)

  const preset = layoutPreset !== 'custom' ? PROFILE_SLOT_LAYOUT_PRESETS[layoutPreset] : null
  const isOn = (id: ProfileIdentitySlotId) => (preset ? preset[id] : args[slotArgKey(id)])

  return (
    <ProfileCard.Root {...rootProps}>
      {isOn('header') && <ProfileCard.Header />}
      {isOn('cardHeader') && <ProfileCard.CardHeader />}
      {isOn('body') && (
        <ProfileCard.Body>
          {isOn('avatarRow') && <ProfileCard.AvatarRow />}
          {isOn('avatar') && !isOn('avatarRow') && <ProfileCard.Avatar />}
          {isOn('connectButton') && !isOn('avatarRow') && <ProfileCard.ConnectButton />}
          {isOn('name') &&
            (useCustomNameSlot ? (
              <ProfileCard.Name asChild>
                <h2 style={{ margin: '8px 0', fontSize: '22px', fontWeight: 700 }} />
              </ProfileCard.Name>
            ) : (
              <ProfileCard.Name />
            ))}
          {isOn('stats') && <ProfileCard.Stats />}
          {isOn('status') && <ProfileCard.Status />}
          {isOn('bioContainer') && (
            <ProfileCard.BioContainer>
              {isOn('bio') && <ProfileCard.Bio />}
              {isOn('socials') && <ProfileCard.Socials />}
            </ProfileCard.BioContainer>
          )}
          {!isOn('bioContainer') && (
            <>
              {isOn('bio') && <ProfileCard.Bio />}
              {isOn('socials') && <ProfileCard.Socials />}
            </>
          )}
        </ProfileCard.Body>
      )}
      {isOn('followersYouKnow') && <ProfileCard.FollowersYouKnow />}
      {isOn('poaps') && <ProfileCard.Poaps />}
    </ProfileCard.Root>
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
  style: { width: 420 },
  layoutPreset: 'default',
  useCustomNameSlot: false,
  ...defaultToggleArgs,
}
