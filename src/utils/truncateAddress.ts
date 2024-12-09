import { Address } from "../types/address"

export const truncateAddress = (address?: Address) => {
  if (!address) return null
  return `${address.slice(0, 6)}…${address.slice(38, 42)}`
}