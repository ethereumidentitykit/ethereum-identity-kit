import { TranslationFunction } from '../types/translations'

export const formatNumber = (number: number) => new Intl.NumberFormat(navigator.language ?? 'en-US').format(number)

// formats the text shown in the common followers component next to the avatars
export const formatFollowersYouKnowText = (resultLength: number, t: TranslationFunction) => {
  if (resultLength === 0) return t('followersYouKnow.noCommon')
  if (resultLength === 2) return t('followersYouKnow.followsThem')

  if (resultLength === 1) return t('followersYouKnow.oneOtherFollows')
  if (resultLength === 3) return t('followersYouKnow.othersFollow')
  return `${resultLength - 2} ${t('followersYouKnow.othersFollow')}`
}

// formats the query parameters for api calls
export const formatQueryParams = (inputs: Record<string, string | number | string[] | null | undefined>) =>
  Object.entries(inputs)
    .filter(([, value]) => !!value)
    .map(([param, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        return `${param}=${value.join(',')}`
      }

      return `${param}=${value}`
    })
    .join('&')

// formats the time difference for a certain number of milliseconds
export const formatTimeDiff = (timeDiff: number) => {
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
