import { ens_beautify } from '@adraffy/ens-normalize'

export const formatNumber = (number: number) => {
  const formattedNumber = new Intl.NumberFormat(navigator.language ?? 'en-US').format(number)

  return formattedNumber
}

export const formatCommonFollowersText = (displayedNames: string[], resultLength: number) => {
  if (resultLength === 0) return 'No common followers'
  if (resultLength === 2) return `${ens_beautify(displayedNames[0])} and ${ens_beautify(displayedNames[1])} follow them`

  let text = displayedNames
    ?.map((name, index) => `${ens_beautify(name)}${resultLength > 2 && index === 1 ? ',' : ''}`)
    .join(', ')

  if (resultLength > 2) {
    text += ` and ${resultLength - 2} `
  }

  if (resultLength === 1) return (text += ' follows them')
  if (resultLength === 3) return (text += 'other you know follows them')
  return (text += 'others you know follow them')
}

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
