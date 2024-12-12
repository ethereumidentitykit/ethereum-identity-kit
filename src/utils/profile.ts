import { ProfileStatsClickProps } from "../types/profile";

export const defaultOnStatClick = ({ addressOrName, stat }: ProfileStatsClickProps) => {
  window.open(`https://ethfollow.xyz/${addressOrName}?tab=${stat}`, 'noopener,noreferrer')
} 