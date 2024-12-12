import { Address, ProfileListType } from "../../types"

export type FollowerTagProps = {
  addressOrName: Address | string
  connectedAddress: Address
  list?: ProfileListType
} & React.HTMLAttributes<HTMLDivElement>

