import { GRAILS_API_URL } from '../../constants'
import { GrailsNameMetadataResponse } from '../../types'
import { normalizeEnsName } from '../ens'

export const fetchNameMetadata = async (name: string) => {
  const response = await fetch(`${GRAILS_API_URL}/names/${normalizeEnsName(name)}/metadata`)
  const results = (await response.json()) as GrailsNameMetadataResponse

  if (!results.success || !results.data) {
    return {}
  }

  return results.data.metadata
}
