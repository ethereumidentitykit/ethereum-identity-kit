/**
 * SSR-safe localStorage wrapper
 * Provides safe access to localStorage that won't break during server-side rendering
 */

export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.warn('Failed to get item from localStorage:', error)
      return null
    }
  },

  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      console.warn('Failed to set item in localStorage:', error)
    }
  },

  removeItem: (key: string): void => {
    if (typeof window === 'undefined') return
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.warn('Failed to remove item from localStorage:', error)
    }
  },

  clear: (): void => {
    if (typeof window === 'undefined') return
    try {
      localStorage.clear()
    } catch (error) {
      console.warn('Failed to clear localStorage:', error)
    }
  },
}

/**
 * SSR-safe window accessor
 * Returns undefined on server, actual value on client
 */
export const safeWindow = <T>(accessor: () => T, fallback?: T): T | undefined => {
  if (typeof window === 'undefined') return fallback
  try {
    return accessor()
  } catch (error) {
    console.warn('Failed to access window property:', error)
    return fallback
  }
}
