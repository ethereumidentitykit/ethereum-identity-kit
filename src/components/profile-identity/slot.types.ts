import type React from 'react'
import type { SlotChildren } from '../primitives'

/** Shared slot props for profile-shaped organisms (card, tooltip, full-width, …). */
export type ProfileIdentitySlotProps<T = void> = {
  asChild?: boolean
  className?: string
  style?: React.CSSProperties
  children?: SlotChildren<T>
}
