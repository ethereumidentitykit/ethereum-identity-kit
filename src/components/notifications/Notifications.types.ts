import { Address } from '../../types'

export interface NotificationsProps {
  addressOrName: Address | string
  position?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'left' | 'center' | 'right' | 'top' | 'bottom'
  darkMode?: boolean
}
