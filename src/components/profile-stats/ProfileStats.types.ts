import { Address } from '../../types/address'
import { ProfileListType, ProfileStatsClickProps, StatsResponse } from '../../types/profile'

export interface ProfileStatsProps {
  addressOrName: Address | string
  list?: ProfileListType
  prefetchedStats?: StatsResponse
  containerDirection?: 'row' | 'column'
  statsDirection?: 'row' | 'column'
  statsStyle?: React.CSSProperties
  onStatClick?: ({addressOrName, stat}: ProfileStatsClickProps) => void
  containerStyle?: React.CSSProperties
}
