import { Address } from '../../types'

export interface NotificationsProps {
  addressOrName: Address | string
  onClose?: () => void
}
