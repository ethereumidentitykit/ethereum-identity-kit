import { Address } from "../types/address"

export const isAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const truncateAddress = (address?: Address) => {
  if (!address) return null
  return `${address.slice(0, 6)}…${address.slice(38, 42)}`
}