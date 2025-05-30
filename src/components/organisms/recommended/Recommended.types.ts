import { Address } from '../../../types'

export interface RecommendedProps {
  connectedAddress: Address
  endpoint?: 'recommended' | 'discover'
  selectedList?: string
  limit?: number
  onProfileClick?: (address: Address) => void
  listHeight?: string
  style?: React.CSSProperties
  className?: string
  title?: string
  useVirtualList?: boolean
}
