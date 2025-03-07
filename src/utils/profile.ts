import { ProfileStatsClickProps } from '../types/profile'

export const defaultOnStatClick = ({ addressOrName, stat }: ProfileStatsClickProps) => {
  window.open(`https://efp.app/${addressOrName}?tab=${stat}`, 'noopener,noreferrer')
}
