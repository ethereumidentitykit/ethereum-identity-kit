import { normalize } from 'viem/ens'

export const isLinkValid = (link?: string) => {
  if (!link) return false
  return link.includes('https://') || link.includes('http://') || link.includes('public/') || link.includes('/assets')
}

export const isValidEnsName = (name: string) => {
  try {
    return !!normalize(name)
  } catch {
    return false
  }
}

export const validateEnsHeader = (headerUrl: string | undefined, name: string | null | undefined) => {
  return isLinkValid(headerUrl) ? headerUrl : name ? `https://metadata.ens.domains/mainnet/header/${name}` : undefined
}
