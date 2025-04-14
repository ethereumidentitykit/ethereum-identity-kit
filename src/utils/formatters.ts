export const formatNumber = (number: number) => new Intl.NumberFormat(navigator.language ?? 'en-US').format(number)

// formats the text shown in the common followers component next to the avatars
export const formatCommonFollowersText = (displayedNames: string[], resultLength: number) => {
  if (resultLength === 0) return 'No common followers'
  if (resultLength === 2) return `${displayedNames[0]} and ${displayedNames[1]} follow them`

  let text = displayedNames?.map((name, index) => `${name}${resultLength > 2 && index === 1 ? ',' : ''}`).join(', ')

  if (resultLength > 2) {
    text += ` and ${resultLength - 2} `
  }

  if (resultLength === 1) return (text += ' follows them')
  if (resultLength === 3) return (text += 'other you know follows them')
  return (text += 'others you know follow them')
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
