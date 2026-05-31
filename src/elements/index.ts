export { Slot, Slottable, composeRefs, mergeProps, resolveSlotChildren, isSlotRenderFn } from '../components/primitives'
export type { SlotProps, SlottableProps, SlotRenderFn, SlotChildren } from '../components/primitives'

export { ProfileCardRoot, useProfileCardContext } from '../components/organisms/profile-card/ProfileCardContext'
export type {
  ProfileCardContextValue,
  ProfileCardRootProps,
} from '../components/organisms/profile-card/ProfileCardContext'

export {
  ProfileCardHeader,
  ProfileCardCardHeader,
  ProfileCardBody,
  ProfileCardAvatarRow,
  ProfileCardAvatar,
  ProfileCardConnectButton,
  ProfileCardName,
  ProfileCardStats,
  ProfileCardStatus,
  ProfileCardBioContainer,
  ProfileCardBio,
  ProfileCardSocials,
  ProfileCardFollowersYouKnow,
  ProfileCardPoaps,
} from '../components/organisms/profile-card/slots'

export type {
  ProfileCardHeaderSlotData,
  ProfileCardCardHeaderSlotData,
  ProfileCardBodySlotData,
  ProfileCardAvatarRowSlotData,
  ProfileCardAvatarSlotData,
  ProfileCardConnectButtonSlotData,
  ProfileCardNameSlotData,
  ProfileCardStatsSlotData,
  ProfileCardStatusSlotData,
  ProfileCardBioContainerSlotData,
  ProfileCardBioSlotData,
  ProfileCardSocialsSlotData,
  ProfileCardFollowersYouKnowSlotData,
  ProfileCardPoapsSlotData,
  ProfileCardSlotProps,
} from '../components/organisms/profile-card/slots'

export { default as ProfileCard } from '../components/organisms/profile-card/ProfileCard'
export type { ProfileCardProps } from '../components/organisms/profile-card/ProfileCard.types'
