import { Address } from '../../../types'

export interface RecommendedProps {
  endpoint?: 'recommended' | 'discover'
  connectedAddress: Address
  selectedList?: string
  limit?: number
  onProfileClick?: (address: Address) => void
  listHeight?: string
  style?: React.CSSProperties
  className?: string
  title?: string
  useVirtualList?: boolean
  showHeaderImage?: boolean
}
