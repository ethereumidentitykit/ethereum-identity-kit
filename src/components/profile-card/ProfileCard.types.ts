import { Address } from "../../types/address";
import { ProfileDetailsResponse, ProfileListType, ProfileStatsClickProps, StatsResponse } from "../../types/profile";

export type ProfileCardProps = {
  addressOrName: Address | string;
  list?: ProfileListType;
  connectedAddress?: Address;
  darkMode?: boolean;
  followButton?: React.ReactNode;
  nameMenu?: React.ReactNode;
  onStatClick?: ({
    addressOrName,
    stat
  }: ProfileStatsClickProps) => void;
  profileData?: ProfileDetailsResponse;
  refetchProfileData?: () => void;
  statsData?: StatsResponse | null;
  refetchStatsData?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;


