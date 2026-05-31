import React from 'react'

export type SlotRenderFn<T> = (data: T) => React.ReactNode

export type SlotChildren<T> = React.ReactNode | SlotRenderFn<T>

export function isSlotRenderFn<T>(children: SlotChildren<T>): children is SlotRenderFn<T> {
  return typeof children === 'function'
}

export function resolveSlotChildren<T>(
  children: SlotChildren<T> | undefined,
  data: T,
  defaultNode: React.ReactNode
): React.ReactNode {
  if (isSlotRenderFn(children)) {
    return children(data)
  }

  if (children !== undefined && children !== null) {
    return children
  }

  return defaultNode
}
