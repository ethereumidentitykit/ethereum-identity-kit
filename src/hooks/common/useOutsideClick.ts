import { useEffect, useRef } from 'react'

export const useOutsideClick = (callbackFn: () => void) => {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        callbackFn()
      }
    }

    const abortController = new AbortController()
    document.addEventListener('mousedown', handleClickOutside, { signal: abortController.signal })
    document.addEventListener('touchstart', handleClickOutside, { signal: abortController.signal })

    return () => abortController.abort()
  }, [callbackFn])

  return containerRef
}
