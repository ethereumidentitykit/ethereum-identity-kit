import { Address, ENSProfile } from '../../types'

export type ProfileListProps = {
  profiles: ProfileItemType[]
  darkMode?: boolean
  connectedAddress?: Address
  isLoading?: boolean
  loadingRows?: number
}

export type ProfileItemType = {
  address: Address
  tags: string[]
  ens?: ENSProfile
}
