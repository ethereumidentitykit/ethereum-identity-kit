import { Address } from '../../types'

export type TransactionModalProps = React.HTMLAttributes<HTMLDivElement> & {
  darkMode?: boolean
  onCartProfileClick?: (address: Address) => void
}
