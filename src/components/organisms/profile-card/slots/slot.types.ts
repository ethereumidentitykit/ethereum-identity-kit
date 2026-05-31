import React from 'react'
import { SlotChildren } from '../../../primitives'

export type ProfileCardSlotProps<T = void> = {
  asChild?: boolean
  className?: string
  style?: React.CSSProperties
  children?: SlotChildren<T>
}
