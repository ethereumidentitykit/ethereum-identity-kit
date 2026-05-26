export interface GrailsProfileResponse {
  success?: boolean
  data?: {
    lastSeenAt?: string | null
    lastSeenOnchain?: string | null
    stats?: {
      totalNames?: number
    }
    ownedNames?: Array<Record<string, unknown>>
  } | null
  meta?: {
    timestamp?: string
    version?: string
  }
}
