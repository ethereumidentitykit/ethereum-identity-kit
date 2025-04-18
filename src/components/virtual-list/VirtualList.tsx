import React, { useState, useRef, useCallback } from 'react'
import { VirtualListProps } from './VirtualList.types'
import './Virtuallist.css'
import clsx from 'clsx'

const VirtualList = <T,>({
  items,
  visibleCount,
  overscanCount = 3,
  rowHeight,
  renderItem,
  gap = 16,
  listHeight = '100%',
  containerClassName,
}: VirtualListProps<T>): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)

  const containerHeight = visibleCount * (rowHeight + gap)!

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  // Calculate startIndex and endIndex for the items to be rendered.
  let startIndex = 0
  let endIndex = items.length

  startIndex = Math.max(0, Math.floor(scrollTop / rowHeight!) - overscanCount)
  endIndex = Math.min(items.length, Math.ceil((scrollTop + containerHeight) / rowHeight!) + overscanCount)

  // Total height of the list.
  const totalHeight = items.length * (rowHeight + gap)!

  const getOffset = (index: number): number => {
    return index * rowHeight!
  }

  const visibleItems = items.slice(startIndex, endIndex)

  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      style={{
        maxHeight: listHeight,
        overflowY: 'auto',
        position: 'relative',
      }}
      className={clsx(containerClassName, 'hide-scrollbar')}
    >
      <div style={{ width: '100%', height: totalHeight, position: 'relative' }}>
        <div
          style={{
            width: '100%',
            position: 'absolute',
            top: getOffset(startIndex),
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap,
            paddingBottom: '32px',
          }}
        >
          {visibleItems.map((item, i) => {
            const index = startIndex + i
            return (
              <div
                key={index}
                style={{
                  width: '100%',
                  height: rowHeight,
                  display: 'flex',
                  alignItems: 'center',
                  boxSizing: 'border-box',
                  position: 'relative',
                }}
              >
                {renderItem(item, index)}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default VirtualList
