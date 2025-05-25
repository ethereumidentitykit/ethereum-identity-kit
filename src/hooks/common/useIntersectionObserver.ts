import { useRef, useEffect } from 'react'

export const useIntersectionObserver = (callback: IntersectionObserverCallback, options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options)
    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options, callback])

  return ref
}
