import { ForwardedRef } from 'react'

export interface VirtualListProps<T> {
  items: T[]
  visibleCount: number
  rowHeight: number
  overscanCount?: number
  containerClassName?: string
  listHeight?: string
  gap?: number
  renderItem: (item: T, index: number) => React.ReactNode
}

export type VirtualListComponentType = <T>(props: VirtualListProps<T>, ref: ForwardedRef<HTMLDivElement>) => JSX.Element
