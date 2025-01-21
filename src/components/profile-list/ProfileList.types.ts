import { Address } from '../../types'

export type ProfileListProps = {
  profiles: ProfileItemType[]
  darkMode?: boolean
  connectedAddress?: Address
}

export type ProfileItemType = {
  address: Address
  tag: string
}
