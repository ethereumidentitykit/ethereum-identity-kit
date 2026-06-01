import { GRAILS_API_URL } from '../../constants'
import { normalizeEnsName } from '../ens'
import { GrailsRolesResponse } from '../../types'

export const fetchNameRoles = async (name: string) => {
  const response = await fetch(`${GRAILS_API_URL}/ens-roles/names/${normalizeEnsName(name)}/roles`)
  const results = (await response.json()) as GrailsRolesResponse

  if (!results.success || !results.data) {
    return null
  }

  return results.data
}
