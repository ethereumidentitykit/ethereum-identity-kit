import { Address } from '../../../../types/address'

export interface CommonFollowersModalProps {
  isOpen: boolean
  onClose: () => void
  darkMode: boolean
  connectedAddress: Address
  lookupAddressOrName: Address | string
  onProfileClick?: (address: Address) => void
}
