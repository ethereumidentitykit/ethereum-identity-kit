import { Address } from './address'

// General Grails API repsonse type
export interface GrailsAPIResponse<T> {
  success?: boolean
  data?: T | null
  meta?: {
    timestamp?: string
    version?: string
  }
}

export type GrailsProfileResponse = GrailsAPIResponse<{
  lastSeenAt?: string | null
  lastSeenOnchain?: string | null
  stats?: {
    totalNames?: number
  }
  ownedNames?: Array<Record<string, unknown>>
}>

export type ENSNameMetadataValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | { protocol?: string; value?: string }
  | { chainName: string; address: string }[]

export type ENSNameMetadataResponse = Record<string, ENSNameMetadataValue>

export type GrailsNameMetadataResponse = GrailsAPIResponse<{
  metadata: ENSNameMetadataResponse
}>

export type RolesType = {
  name: string
  owner: Address
  manager: Address
  ethAddress: Address
  isWrapped: boolean
  fuses: null | number
  expiryDate: number
  resolver: Address
}

export type GrailsRolesResponse = GrailsAPIResponse<RolesType>
