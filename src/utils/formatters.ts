import { TranslationFunction } from '../types/translations'

/**
 * Formats a number using the user's locale
 * @param number - The number to format
 * @returns Formatted number string
 * @example
 * formatNumber(1234567) // Returns: "1,234,567" (en-US locale)
 */
export const formatNumber = (number: number): string => {
  const locale = typeof navigator !== 'undefined' ? navigator.language : 'en-US'
  return new Intl.NumberFormat(locale).format(number)
}

/**
 * Formats the text shown in the common followers component next to the avatars
 * @param resultLength - Number of common followers
 * @param t - Translation function
 * @returns Formatted text string
 */
export const formatFollowersYouKnowText = (resultLength: number, t: TranslationFunction): string => {
  if (resultLength === 0) return t('followersYouKnow.noCommon')
  if (resultLength === 1) return t('followersYouKnow.followsThem')

  if (resultLength === 2) return t('followersYouKnow.oneOtherFollows')
  if (resultLength === 3) return t('followersYouKnow.othersFollow')
  return `${resultLength - 2} ${t('followersYouKnow.othersFollow')}`
}

/**
 * Formats an object into a URL query string
 * @param inputs - Object with string keys and various value types
 * @returns Formatted query string (without leading '?')
 * @example
 * formatQueryParams({ name: 'john', age: 30, tags: ['dev', 'web3'] })
 * // Returns: "name=john&age=30&tags=dev,web3"
 */
export const formatQueryParams = (inputs: Record<string, string | number | string[] | null | undefined>): string =>
  Object.entries(inputs)
    .filter(([, value]) => !!value)
    .map(([param, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        return `${param}=${value.join(',')}`
      }

      return `${param}=${value}`
    })
    .join('&')

/**
 * Formats a time difference in seconds into a human-readable string
 * @param timeDiff - Time difference in seconds
 * @returns Formatted time string (e.g., "5m", "2h", "3d")
 * @example
 * formatTimeDiff(3600) // Returns: "1h"
 * formatTimeDiff(86400) // Returns: "1d"
 */
export const formatTimeDiff = (timeDiff: number): string => {
  if (timeDiff < 60) {
    return `${Math.floor(timeDiff)}s`
  } else if (timeDiff < 3600) {
    return `${Math.floor(timeDiff / 60)}m`
  } else if (timeDiff < 86400) {
    return `${Math.floor(timeDiff / 3600)}h`
  } else if (timeDiff < 2592000) {
    return `${Math.floor(timeDiff / 86400)}d`
  } else if (timeDiff < 31536000) {
    return `${Math.floor(timeDiff / 2592000)}m`
  } else {
    return `${Math.floor(timeDiff / 31536000)}y`
  }
}
