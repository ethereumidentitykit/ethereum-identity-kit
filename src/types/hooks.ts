import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query'
import { FollowState, FollowingState } from './followState'
import {
  ProfileTableTitleType,
  FollowSortType,
  FollowerResponse,
  FollowingResponse,
  FollowingTagsResponse,
  ProfileListType,
  ProfileRanks,
  ENSProfile,
} from './profile'
import { Address } from './address'

/**
 * Return type for useFollowingState hook
 */
export interface UseFollowingStateReturn {
  /** Current follow state */
  state: FollowState
  /** Whether the follow state is loading */
  isLoading: boolean
}

/**
 * Return type for useUserInfo hook
 */
export interface UseUserInfoReturn {
  /** The list number for the user */
  listNum: number | undefined
  /** Array of followers */
  followers: FollowerResponse[]
  /** Array of following */
  following: FollowingResponse[]
  /** Follower tag counts */
  followerTags: FollowingTagsResponse | undefined
  /** Following tag counts */
  followingTags: FollowingTagsResponse | undefined
  /** Whether the user is a list */
  userIsList: boolean
  /** Whether followers are loading */
  followersIsLoading: boolean
  /** Whether following are loading */
  followingIsLoading: boolean
  /** Whether follower tags are loading */
  followerTagsLoading: boolean
  /** Whether following tags are loading */
  followingTagsLoading: boolean
  /** Function to fetch more followers */
  fetchMoreFollowers: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<{ followers: FollowerResponse[]; nextPageParam: number }, unknown>, Error>
  >
  /** Function to fetch more following */
  fetchMoreFollowing: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<{ following: FollowingResponse[]; nextPageParam: number }, unknown>, Error>
  >
  /** Whether we've reached the end of following */
  isEndOfFollowing: boolean
  /** Whether we've reached the end of followers */
  isEndOfFollowers: boolean
  /** Whether we're fetching more followers */
  isFetchingMoreFollowers: boolean
  /** Whether we're fetching more following */
  isFetchingMoreFollowing: boolean
  /** Current following tags filter */
  followingTagsFilter: string[]
  /** Current followers tags filter */
  followersTagsFilter: string[]
  /** Current following search term */
  followingSearch: string
  /** Current followers search term */
  followersSearch: string
  /** Function to set followers search */
  setFollowersSearch: (search: string) => void
  /** Function to set following search */
  setFollowingSearch: (search: string) => void
  /** Current following sort */
  followingSort: FollowSortType
  /** Function to set following sort */
  setFollowingSort: (sort: FollowSortType) => void
  /** Current followers sort */
  followersSort: FollowSortType
  /** Function to toggle tag filter */
  toggleTag: (tab: ProfileTableTitleType, tag: string) => void
  /** Function to set followers sort */
  setFollowersSort: (sort: FollowSortType) => void
  /** Function to set followers tags filter */
  setFollowersTagsFilter: (filter: string[]) => void
  /** Function to set following tags filter */
  setFollowingTagsFilter: (filter: string[]) => void
}

/**
 * Return type for useFollowButton hook
 */
export interface UseFollowButtonReturn {
  /** Current follow button text */
  buttonText: string
  /** Whether the follow button is disabled */
  disableHover: boolean
  /** Function to set disable hover */
  setDisableHover: (disableHover: boolean) => void
  /** Current follow button state */
  buttonState: FollowingState
  /** Pending state of the follow action */
  pendingState:
    | false
    | 'Pending Following'
    | 'Unfollow'
    | 'Pending Block'
    | 'Pending Mute'
    | 'Unblock'
    | 'Unmute'
    | undefined
  /** Whether the follow action is loading */
  isLoading: boolean
  /** Function to handle follow/unfollow */
  handleAction: () => void
  /** Whether the button should be disabled */
  isDisabled: boolean
  /** Current error state */
  error: Error | null
  /** Function to clear error state */
  clearError: () => void
  /** Accessibility label for screen readers */
  ariaLabel: string
  /** Whether the button is in pressed state (for following) */
  ariaPressed: boolean
}

/**
 * Return type for useProfileDetails hook
 */
export interface UseProfileDetailsReturn {
  /** Profile details data */
  ens: ENSProfile | undefined
  ranks: ProfileRanks | undefined
  address: Address | undefined
  primaryList: ProfileListType | undefined
  detailsLoading: boolean
  refreshProfileDetails: () => void
}

/**
 * Return type for useTransactionItem hook
 */
export interface UseTransactionItemReturn {
  /** Current transaction hash */
  hash: string | undefined
  /** Whether the transaction is loading */
  isLoading: boolean
  /** Whether there was an error */
  isError: boolean
  /** Function to execute the transaction */
  executeTransaction: () => Promise<void>
}

/**
 * Return type for useETHPrice hook
 */
export interface UseETHPriceReturn {
  /** Current ETH price in USD */
  price: number | null
  /** Whether the price is loading */
  isLoading: boolean
  /** Whether there was an error fetching the price */
  isError: boolean
  /** Raw price data from oracle */
  rawData: readonly [bigint, bigint, bigint, bigint, bigint] | undefined
}
