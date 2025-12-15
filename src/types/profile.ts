import { Address } from '..'

/**
 * Profile list identifier type
 * Can be a number (list ID), string (ENS name), or null/undefined for no list
 */
export type ProfileListType = number | string | null | undefined

/**
 * ENS profile data structure containing all profile information
 */
export type ENSProfile = {
  /** ENS name (e.g., "vitalik.eth") */
  name?: string
  /** Avatar image URL or NFT reference */
  avatar?: string
  /** Display name for the profile */
  display?: string
  /** Header/banner image URL */
  header?: string
  /** IPFS content hash for decentralized content */
  contenthash?: string
  /** Key-value pairs of ENS text records */
  records?: Record<string, string>
  /** Cross-chain address mappings */
  chains?: Record<string, string>
  /** Timestamp of last data refresh */
  fresh?: number
  /** ENS resolver contract address */
  resolver?: string
  /** Any errors encountered during profile resolution */
  errors?: Record<string, string>
}

export type ENSMetadataProfile = {
  uri: string
  is_owner: boolean
  full_image: string
  full_svg: string
  svg: string
  host_meta: {
    chain_id: string | number
    namespace: string
    contract_address: string
    token_id: string | number
    reference_url: string
  }
  name: string
  description: string
  attribute: string
  image: string
  image_url: string
  image_data: string
  background_color: string
  youtube_url: string
}

export type LeaderboardItem = {
  address: Address
  name: string | null
  avatar: string | null
  mutuals_rank: string
  followers_rank: string
  following_rank: string
  top8_rank: string
  blocks_rank: string
  top8?: string
  following?: string
  followers: string
  blocks?: string
  mutuals?: string
}

export type StatsResponse = {
  followers_count: number
  following_count: number
}

export type ProfileRanks = {
  mutuals_rank: number
  followers_rank: number
  following_rank: number
  blocks_rank: number
  top8_rank: number
}

export type ProfileDetailsResponse = {
  address: Address
  ens: ENSProfile
  primary_list?: string | null
  ranks: ProfileRanks
}

export type ProfileAccountResponse = {
  address: Address
  ens: ENSProfile
  primary_list?: string | null
}

export interface ProfileBadgesResponse {
  eventId: string
  participated: boolean
  collection: ProfileBadgeColletionType | null
}

export interface ProfileBadgeColletionType {
  event: {
    id: number
    fancy_id: string
    name: string
    event_url: string
    image_url: string
    country: string
    city: string
    description: string
    year: number
    start_date: string
    end_date: string
    expiry_date: string
  }
  tokenId: string
  owner: string
}

export interface ProfileDetailsWithStats extends ProfileDetailsResponse {
  stats: StatsResponse
}

export interface ProfileListsResponse {
  primary_list?: string | null
  lists?: string[]
}

export type ProfileRoles = {
  isOwner: boolean
  isManager: boolean
  isUser: boolean
  listChainId: number
  listRecordsContract: Address
  listSlot: bigint
}

export type AccountResponseType = {
  address: Address
  ens: {
    name: string | null
    avatar: string | null
  }
  primary_list: string | null
}

export type ProfileStatType = 'followers' | 'following'

export type ProfileStatsClickProps = {
  addressOrName: Address | string
  stat: ProfileStatType
}

export type RecommendedItemType = {
  address: Address
  name?: string
  avatar?: string
  header?: string
}

export type DiscoverResponseType = {
  latestFollows: RecommendedItemType[]
  recommended: RecommendedItemType[]
}

export type FollowerYouKnow = {
  address: Address
  name: string | null
  avatar: string | null
  mutuals_rank: string
  header: string | null
}

export interface FollowersYouKnowResponse {
  results: FollowerYouKnow[]
  length: number
}

export interface ProfileEFPPoapResponse {
  eventId: string
  participated: boolean
  collection: ProfileEFPPoapColletionType | null
}

export interface ProfileEFPPoapColletionType {
  event: {
    id: number
    fancy_id: string
    name: string
    event_url: string
    image_url: string
    country: string
    city: string
    description: string
    year: number
    start_date: string
    end_date: string
    expiry_date: string
  }
  tokenId: string
  owner: string
}

export type NotificationItemType = {
  address: Address
  name: string | null
  avatar: string | null
  token_id: number
  action: string
  opcode: number
  op: Address
  tag: string
  updated_at: string
}

export type NotificationsResponse = {
  summary: {
    interval: string
    opcode: string
    total: number
    total_follows: number
    total_unfollows: number
    total_tags: number
    total_untags: number
  }
  notifications: NotificationItemType[]
}

export type ProfileTabType = 'following' | 'followers'
export type BlockedMutedTabType = 'Blocked/Muted' | 'Blocked/Muted By'
export type ProfileTableTitleType = ProfileTabType | BlockedMutedTabType
export type FollowSortType = 'latest first' | 'earliest first' | 'follower count'

export interface FollowerResponse {
  address: Address
  tags: string[]
  is_muted: boolean
  is_blocked: boolean
  is_following: boolean
}

export interface FollowingResponse {
  version: 1
  record_type: 'address' & string
  address: Address
  tags: string[]
  ens?: ENSProfile
}

export type TagCountType = {
  tag: string
  count: number
}

export interface InfiniteProfileQueryProps {
  addressOrName: string
  list?: number | string
  limit: number
  tags?: string[]
  sort?: FollowSortType
  pageParam: number
  allResults?: boolean
  search?: string
  fresh?: boolean
}

export interface FollowingTagsResponse {
  token_id: string | number
  tags: string[]
  tagCounts: TagCountType[]
  taggedAddresses: {
    address: Address
    tag: string
  }[]
}

export type ProfileEFPSocialType =
  | 'etherscan'
  | 'com.twitter'
  | 'com.github'
  | 'org.telegram'
  | 'com.discord'
  | 'etherscan'
  | 'grails'
  | 'website'
  | 'email'
