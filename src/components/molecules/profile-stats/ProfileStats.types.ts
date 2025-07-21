import { SizeType } from '../../../types'
import { Address } from '../../../types'
import { ProfileListType, ProfileStatsClickProps, StatsResponse } from '../../../types/profile'

export interface ProfileStatsProps {
  addressOrName: Address | string
  list?: ProfileListType
  fontSize?: SizeType
  gap?: string
  prefetched?: {
    stats: StatsResponse
    isLoading: boolean
  }
  containerDirection?: 'row' | 'column'
  statsDirection?: 'row' | 'column'
  onStatClick?: ({ addressOrName, stat }: ProfileStatsClickProps) => void
}
