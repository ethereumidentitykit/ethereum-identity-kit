/**
 * Canonical profile-identity slots shared across organisms.
 * Organism-specific wrappers (ProfileCard.Name, ProfileTooltip.Name, …) should map to these IDs.
 */
export const PROFILE_IDENTITY_SLOT_IDS = [
  'header',
  'cardHeader',
  'body',
  'avatarRow',
  'avatar',
  'connectButton',
  'name',
  'stats',
  'status',
  'bioContainer',
  'bio',
  'socials',
  'followersYouKnow',
  'poaps',
  'grails',
] as const

export type ProfileIdentitySlotId = (typeof PROFILE_IDENTITY_SLOT_IDS)[number]

/** Visual surface — className prefixes differ per organism. */
export type ProfileSurface = 'card' | 'tooltip' | 'fullWidth'

export type ProfileSlotLayoutPreset = 'default' | 'minimal' | 'full' | 'custom'

export type ProfileSlotLayoutFlags = Record<ProfileIdentitySlotId, boolean>

export const PROFILE_SLOT_LAYOUT_PRESETS: Record<Exclude<ProfileSlotLayoutPreset, 'custom'>, ProfileSlotLayoutFlags> = {
  default: {
    header: true,
    cardHeader: true,
    body: true,
    avatarRow: true,
    avatar: true,
    connectButton: true,
    name: true,
    stats: true,
    status: true,
    bioContainer: true,
    bio: true,
    socials: true,
    followersYouKnow: true,
    poaps: true,
    grails: false,
  },
  minimal: {
    header: false,
    cardHeader: false,
    body: true,
    avatarRow: true,
    avatar: true,
    connectButton: false,
    name: true,
    stats: true,
    status: false,
    bioContainer: true,
    bio: true,
    socials: false,
    followersYouKnow: false,
    poaps: false,
    grails: false,
  },
  full: {
    header: true,
    cardHeader: true,
    body: true,
    avatarRow: true,
    avatar: true,
    connectButton: true,
    name: true,
    stats: true,
    status: true,
    bioContainer: true,
    bio: true,
    socials: true,
    followersYouKnow: true,
    poaps: true,
    grails: true,
  },
}
