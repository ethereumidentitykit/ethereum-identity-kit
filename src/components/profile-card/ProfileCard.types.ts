import { Address } from '../../types/address'
import { ProfileDetailsResponse, ProfileListType, ProfileStatsClickProps, StatsResponse } from '../../types/profile'

type ProfileCardOptions = {
  followButton?: React.ReactNode
  nameMenu?: React.ReactNode
  profileData?: ProfileDetailsResponse
  prefetchedProfileLoading?: boolean
  refetchProfileData?: () => void
  statsData?: StatsResponse | null
  prefetchedStatsLoading?: boolean
  refetchStatsData?: () => void
}

export type ProfileCardProps = {
  addressOrName: Address | string
  list?: ProfileListType
  connectedAddress?: Address
  darkMode?: boolean
  showFollowerState?: boolean
  onStatClick?: ({ addressOrName, stat }: ProfileStatsClickProps) => void
  options?: ProfileCardOptions
} & React.HTMLAttributes<HTMLDivElement>
