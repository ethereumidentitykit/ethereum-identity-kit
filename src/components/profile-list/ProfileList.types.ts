import { Address, ENSProfile, InitialFollowingState } from '../../types'

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
  initialFollowState?: InitialFollowingState
}

export type ProfileItemType = {
  address: Address
  tags: string[]
  ens?: ENSProfile
}
