import { Address, ProfileListType } from "../../types"

export type FollowerTagProps = {
  address: Address
  connectedAddress: Address
  list?: ProfileListType
} & React.HTMLAttributes<HTMLDivElement>

