import { SiweMessageParams } from '../types'

export const createSiweMessageString = (params: SiweMessageParams) => {
  const {
    domain,
    address,
    statement,
    uri,
    version,
    chainId,
    nonce,
    issuedAt,
    expirationTime,
    notBefore,
    requestId,
    resources,
    scheme,
  } = params

  let message = ''

  // Scheme and Domain
  if (scheme) {
    message += `${scheme}://`
  }
  message += `${domain} wants you to sign in with your Ethereum account:\n`
  message += `${address}\n` // Address
  message += `\n` // Blank line for separation as per EIP-4361

  // Statement (optional)
  if (statement) {
    message += `${statement}\n`
  }

  // Core Fields
  message += `URI: ${uri}\n`
  message += `Version: ${version}\n`
  message += `Chain ID: ${chainId}\n` // chainId will be stringified if it's a number
  message += `Nonce: ${nonce}\n`
  message += `Issued At: ${issuedAt}` // No trailing newline for the last required field if no optionals follow

  // Optional Time-related Fields
  if (expirationTime) {
    message += `\nExpiration Time: ${expirationTime}`
  }
  if (notBefore) {
    message += `\nNot Before: ${notBefore}`
  }

  // Optional Request ID
  if (requestId) {
    message += `\nRequest ID: ${requestId}`
  }

  // Optional Resources
  if (resources && resources.length > 0) {
    message += `\nResources:`
    resources.forEach((resourceURI: string) => {
      message += `\n- ${resourceURI}`
    })
  }

  return message
}
