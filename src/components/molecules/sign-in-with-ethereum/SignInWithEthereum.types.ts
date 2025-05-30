export interface SignInWithEthereumProps {
  getNonce: () => Promise<string> | string
  verifySignature: (message: string, nonce: string, signature: string) => Promise<void> | void
  onSignInSuccess: (data: { address: string; message: string; signature: string }) => void
  onSignInError: (error: Error) => void
  message: string
  darkMode?: boolean
  expirationTime?: number
}
