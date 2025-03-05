import { Address, ENSProfile } from '../../types'

export type ProfileListProps = {
  profiles: ProfileItemType[]
  darkMode?: boolean
  connectedAddress?: Address
  selectedList?: string
  isLoading?: boolean
  loadingRows?: number
  tags?: string[]
  showTags?: boolean
  canEditTags?: boolean
}

export type ProfileItemType = {
  address: Address
  tags: string[]
  ens?: ENSProfile
}
