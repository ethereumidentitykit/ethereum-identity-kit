import { toHex } from 'viem'
import { Address, ListOpType } from '../types'

export const listOpAddListRecord = (address: Address): ListOpType => {
  return {
    version: 1,
    opcode: 1,
    data: address,
  }
}

export const listOpRemoveListRecord = (address: Address): ListOpType => {
  return {
    version: 1,
    opcode: 2,
    data: address,
  }
}

export const listOpAddTag = (address: Address, tag: string): ListOpType => {
  return {
    version: 1,
    opcode: 3,
    data: `${address}${toHex(tag).slice(2)}`,
  }
}

export const listOpRemoveTag = (address: Address, tag: string): ListOpType => {
  return {
    version: 1,
    opcode: 4,
    data: `${address}${toHex(tag).slice(2)}`,
  }
}
