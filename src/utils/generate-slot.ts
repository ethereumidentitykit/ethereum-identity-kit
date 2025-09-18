import { keccak256, toHex } from 'viem/utils'
import { Address } from '../types'

export function generateSlot(address: Address) {
  const hash = keccak256(toHex(Date.now() * Math.floor(Math.random() * 1000)))
  const trimmedHash = BigInt(hash.slice(0, 26)) & ((BigInt(1) << BigInt(96)) - BigInt(1))
  return BigInt(address + trimmedHash.toString(16))
}
