import { Address } from '../../../types'

export type EFPPoapsProps = {
  addressOrName?: Address | string | null
  isLoading: boolean
  list?: number | null
  style?: React.CSSProperties
}
