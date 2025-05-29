export interface SignInWithEthereumProps {
  getNonce: () => string
  verifySignature: (message: string, signature: string) => Promise<void>
  onSignInSuccess: (data: { address: string; message: string; signature: string }) => void
  onSignInError: (error: Error) => void
  statement: string
  darkMode?: boolean
  expirationTime?: number
}
