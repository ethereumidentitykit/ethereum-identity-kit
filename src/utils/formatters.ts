export const formatNumber = (number: number) => new Intl.NumberFormat(navigator.language ?? 'en-US').format(number)

// formats the text shown in the common followers component next to the avatars
export const formatFollowersYouKnowText = (resultLength: number) => {
  if (resultLength === 0) return 'No common followers'
  if (resultLength === 2) return ` follow them`

  if (resultLength === 1) return ' follows them'
  if (resultLength === 3) return '1 other you know follows them'
  return `${resultLength - 2} others you know follow them`
}

// formats the query parameters for api calls
export const formatQueryParams = (inputs: Record<string, string | number | string[] | null | undefined>) =>
  Object.entries(inputs)
    .filter(([, value]) => !!value)
    .map(([param, value]) => {
      if (Array.isArray(value)) {
        return `${param}=${value.join(',')}`
      }

      return `${param}=${value}`
    })
    .join('&')
