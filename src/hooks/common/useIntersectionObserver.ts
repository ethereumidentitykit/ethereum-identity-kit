import { useRef, useEffect, useCallback } from 'react'

export const useIntersectionObserver = (callback: IntersectionObserverCallback, options?: IntersectionObserverInit) => {
  const currentElementRef = useRef<HTMLElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const callbackRef = useRef(callback)

  // Keep callback ref updated
  callbackRef.current = callback

  // Stable callback wrapper
  const stableCallback = useCallback<IntersectionObserverCallback>((entries, observer) => {
    callbackRef.current(entries, observer)
  }, [])

  // Initialize observer once
  useEffect(() => {
    observerRef.current = new IntersectionObserver(stableCallback, options)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [stableCallback, options])

  // Handle element observation when ref changes
  const setRef = useCallback((element: HTMLElement | null) => {
    // Unobserve previous element
    if (currentElementRef.current && observerRef.current) {
      observerRef.current.unobserve(currentElementRef.current)
    }

    // Update ref
    currentElementRef.current = element

    // Observe new element
    if (element && observerRef.current) {
      observerRef.current.observe(element)
    }
  }, [])

  return setRef
}
