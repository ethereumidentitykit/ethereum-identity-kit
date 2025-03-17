import { toHex } from 'viem'
import { Opcode } from '../constants'
import { Address, ListOpType } from '../types'

export const listOpAddListRecord = (address: Address): ListOpType => {
  return {
    version: 1,
    opcode: Opcode.FOLLOW,
    data: address,
  }
}

export const listOpRemoveListRecord = (address: Address): ListOpType => {
  return {
    version: 1,
    opcode: Opcode.UNFOLLOW,
    data: address,
  }
}

export const listOpAddTag = (address: Address, tag: string): ListOpType => {
  return {
    version: 1,
    opcode: Opcode.TAG,
    data: `${address}${toHex(tag).slice(2)}`,
  }
}

export const listOpRemoveTag = (address: Address, tag: string): ListOpType => {
  return {
    version: 1,
    opcode: Opcode.UNTAG,
    data: `${address}${toHex(tag).slice(2)}`,
  }
}
