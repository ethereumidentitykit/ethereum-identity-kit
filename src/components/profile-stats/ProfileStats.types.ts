import { Address } from '../../types/address'

export interface ProfileStatsProps {
  userAddress: Address
  direction?: 'row' | 'column'
  statsDirection?: 'row' | 'column'
  statsStyle?: React.CSSProperties
  style?: React.CSSProperties
}