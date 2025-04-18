import { Address } from '..'

export type ProfileListType = number | string | null | undefined

export type ENSProfile = {
  name?: string
  avatar?: string
  display?: string
  header?: string
  contenthash?: string
  records?: Record<string, string>
  chains?: Record<string, string>
  fresh?: number
  resolver?: string
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

export type CommonFollower = {
  address: Address
  name: string | null
  avatar: string | null
  mutuals_rank: string
  header: string | null
}

export interface CommonFollowersResponse {
  results: CommonFollower[]
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
