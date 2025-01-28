export const formatNumber = (number: number) => {
  const formattedNumber = new Intl.NumberFormat(navigator.language ?? 'en-US').format(number)

  return formattedNumber
}

export const formatCommonFollowersText = (displayedNames: string[], resultLength: number) => {
  if (resultLength === 0) return 'No common followers'

  let text = displayedNames?.map((name, index) => `${name}${resultLength > 2 && index === 1 ? ',' : ''}`).join(', ')

  if (resultLength > 2) {
    text += ` and ${resultLength - 2} `
  }

  if (resultLength === 1) return (text += 'follows them')
  if (resultLength === 2) return (text += 'follow them')
  if (resultLength === 3) return (text += 'other you know follows them')

  return (text += 'others you know follow them')
}
