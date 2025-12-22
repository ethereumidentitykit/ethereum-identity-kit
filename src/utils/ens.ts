import { ens_beautify, ens_normalize } from '@adraffy/ens-normalize'

export const normalizeEnsName = (name: string) => {
  try {
    return ens_normalize(name)
  } catch (error) {
    console.error('Error normalizing name:', error)
    return name
  }
}

export const beautifyEnsName = (name: string) => {
  try {
    return ens_beautify(name)
  } catch (error) {
    console.error('Error beautifying name:', error)
    return name
  }
}
