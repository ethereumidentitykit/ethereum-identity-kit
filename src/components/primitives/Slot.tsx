import React from 'react'
import { clsx } from 'clsx'

type AnyProps = Record<string, unknown>

export function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref != null) {
        ;(ref as React.MutableRefObject<T | null>).current = node
      }
    })
  }
}

function mergeEventHandlers(
  theirs?: React.EventHandler<React.SyntheticEvent>,
  ours?: React.EventHandler<React.SyntheticEvent>
) {
  return (event: React.SyntheticEvent) => {
    theirs?.(event)
    if (!event.defaultPrevented) {
      ours?.(event)
    }
  }
}

export function mergeProps(
  slotProps: AnyProps,
  childProps: AnyProps,
  /** React 18: ref on the element; React 19 may also pass ref via props. */
  childRef?: React.Ref<unknown>
): AnyProps {
  const merged: AnyProps = { ...childProps, ...slotProps }

  if (slotProps.className || childProps.className) {
    merged.className = clsx(childProps.className as string | undefined, slotProps.className as string | undefined)
  }

  if (slotProps.style || childProps.style) {
    merged.style = { ...(childProps.style as React.CSSProperties), ...(slotProps.style as React.CSSProperties) }
  }

  const eventKeys = new Set([
    ...Object.keys(childProps).filter((key) => key.startsWith('on')),
    ...Object.keys(slotProps).filter((key) => key.startsWith('on')),
  ])

  eventKeys.forEach((key) => {
    merged[key] = mergeEventHandlers(
      childProps[key] as React.EventHandler<React.SyntheticEvent> | undefined,
      slotProps[key] as React.EventHandler<React.SyntheticEvent> | undefined
    )
  })

  const resolvedChildRef =
    childRef ?? (childProps.ref as React.Ref<unknown> | undefined)

  if (resolvedChildRef || slotProps.ref) {
    merged.ref = composeRefs(
      resolvedChildRef,
      slotProps.ref as React.Ref<unknown> | undefined
    )
  }

  return merged
}

/** React 18 stores ref on the element; types omit it — React 19 may use props.ref. */
function getChildRef(element: React.ReactElement<AnyProps>): React.Ref<unknown> | undefined {
  const elementRef = (element as React.ReactElement<AnyProps> & { ref?: React.Ref<unknown> }).ref
  return elementRef ?? (element.props.ref as React.Ref<unknown> | undefined)
}

export function isSlottableElement(child: React.ReactNode): child is React.ReactElement {
  return React.isValidElement(child) && child.type !== React.Fragment
}

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(({ children, ...props }, forwardedRef) => {
  if (!isSlottableElement(children)) {
    return null
  }

  const child = children as React.ReactElement<AnyProps>
  const childProps = child.props as AnyProps

  return React.cloneElement(child, {
    ...mergeProps({ ...props, ref: forwardedRef }, childProps, getChildRef(child)),
  })
})

Slot.displayName = 'Slot'

export interface SlottableProps {
  asChild?: boolean
  children?: React.ReactNode
}

export function Slottable({
  asChild,
  children,
  slotProps,
}: SlottableProps & { slotProps: React.HTMLAttributes<HTMLElement> }) {
  if (asChild) {
    return <Slot {...slotProps}>{children}</Slot>
  }

  return <>{children}</>
}
