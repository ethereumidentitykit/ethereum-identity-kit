import { ForwardedRef } from 'react'

/**
 * Props for the VirtualList component
 * @template T - The type of items in the list (must be serializable)
 */
export interface VirtualListProps<T = unknown> {
  /** Array of items to render */
  items: T[]
  /** Number of items visible at once */
  visibleCount: number
  /** Height of each row in pixels */
  rowHeight: number
  /** Number of extra items to render outside visible area for smooth scrolling */
  overscanCount?: number
  /** CSS class name for the container */
  containerClassName?: string
  /** Height of the list container */
  listHeight?: string
  /** Gap between items in pixels */
  gap?: number
  /** Function to render each item */
  renderItem: (item: T, index: number) => React.ReactNode
}

/**
 * Virtual list component type with generic constraint
 */
export type VirtualListComponentType = <T = unknown>(
  props: VirtualListProps<T>, 
  ref: ForwardedRef<HTMLDivElement>
) => JSX.Element
