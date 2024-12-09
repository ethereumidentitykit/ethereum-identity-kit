import { Address } from "../../types/address";

export type ProfileCardProps = {
  userAddress: Address;
} & React.HTMLAttributes<HTMLDivElement>;
