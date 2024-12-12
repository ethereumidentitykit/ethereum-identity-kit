import { Address } from '../../types/address'
import { ProfileListType, ProfileStatType } from '../../types/profile'

export interface ProfileStatsProps {
  addressOrName: Address | string
  list?: ProfileListType
  containerDirection?: 'row' | 'column'
  statsDirection?: 'row' | 'column'
  statsStyle?: React.CSSProperties
  onStatClick?: (stat: ProfileStatType) => void
  containerStyle?: React.CSSProperties
}
