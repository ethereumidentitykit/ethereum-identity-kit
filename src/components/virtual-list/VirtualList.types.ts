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
